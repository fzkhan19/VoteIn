import {Redis} from "ioredis";
import next from "next";
import {createServer} from "node:http";
import {Server} from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  const redis = new Redis(process.env.REDIS_CONNECTION_STRING || "")
  const subRedis = new Redis(process.env.REDIS_CONNECTION_STRING || "")

  subRedis.on("message", (channel, message) => {
    io.to(channel).emit("room-update", message)
  })

  subRedis.on("error", (err) => {
    console.error("Redis subscription error", err)
  })

  io.on("connection", async (socket) => {
    const { id } = socket

    socket.on("join-room", async (room) => {
      console.log("User joined room:", room)

      const subscribedRooms = await redis.smembers("subscribed-rooms")
      await socket.join(room)
      await redis.sadd(`rooms:${id}`, room)
      await redis.hincrby("room-connections", room, 1)

      if (!subscribedRooms.includes(room)) {
        subRedis.subscribe(room, async (err) => {
          if (err) {
            console.error("Failed to subscribe:", err)
          } else {
            await redis.sadd("subscribed-rooms", room)

            console.log("Subscribed to room:", room)
          }
        })
      }
    })

    socket.on("disconnect", async () => {
      const { id } = socket

      const joinedRooms = await redis.smembers(`rooms:${id}`)
      await redis.del(`rooms:${id}`)

      joinedRooms.forEach(async (room) => {
        const remainingConnections = await redis.hincrby(
          `room-connections`,
          room,
          -1
        )

        if (remainingConnections <= 0) {
          await redis.hdel(`room-connections`, room)

          subRedis.unsubscribe(room, async (err) => {
            if (err) {
              console.error("Failed to unsubscribe", err)
            } else {
              await redis.srem("subscribed-rooms", room)

              console.log("Unsubscribed from room:", room)
            }
          })
        }
      })
    })
  })

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});