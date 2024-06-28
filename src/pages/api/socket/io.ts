/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Server as NetServer} from "http";

import {Redis} from "ioredis";
import {NextApiRequest} from "next";
import {Server as ServerIO} from "socket.io";

import {NextApiResponseServerIO} from "./types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {path: path, addTrailingSlash: false});

    const redis = new Redis(process.env.REDIS_CONNECTION_STRING || "");
    const subRedis = new Redis(process.env.REDIS_CONNECTION_STRING || "");

    subRedis.on("message", (channel, message) => {
      io.to(channel).emit("room-update", message);
    });

    subRedis.on("error", (err) => {
      console.error("Redis subscription error", err);
    });

    io.on("connection", async (socket) => {
      const {id} = socket;

      console.log(
        ":::::::::::::::::::::::::::::::::::::::::::::SOCKET CONNECTED:::::::::::::::::::::::::::::::::::::::::::::",
      );
      console.log("Socket connected:", id);

      socket.on("join-room", async (room: string) => {
        console.log("User joined room:", room);

        const subscribedRooms = await redis.smembers("subscribed-rooms");

        await socket.join(room);
        await redis.sadd(`rooms:${id}`, room);
        await redis.hincrby("room-connections", room, 1);

        if (!subscribedRooms.includes(room)) {
          subRedis.subscribe(room, async (err) => {
            if (err) {
              console.error("Failed to subscribe:", err);
            } else {
              await redis.sadd("subscribed-rooms", room);

              console.log("Subscribed to room:", room);
            }
          });
        }
      });

      socket.on("disconnect", async () => {
        const {id} = socket;

        const joinedRooms = await redis.smembers(`rooms:${id}`);

        await redis.del(`rooms:${id}`);

        joinedRooms.forEach(async (room) => {
          const remainingConnections = await redis.hincrby(`room-connections`, room, -1);

          if (remainingConnections <= 0) {
            await redis.hdel(`room-connections`, room);

            subRedis.unsubscribe(room, async (err) => {
              if (err) {
                console.error("Failed to unsubscribe", err);
              } else {
                await redis.srem("subscribed-rooms", room);
                console.log("Unsubscribed from room:", room);
              }
            });
          }
        });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
