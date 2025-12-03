import type {NextApiRequest, NextApiResponse} from "next";

import Pusher from "pusher";

export const config = {
  api: {
    bodyParser: true,
  },
};

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {channel, event, data} = req.body;

    if (!channel || !event || !data) {
      return res.status(400).json({error: "Missing channel, event, or data in request body"});
    }

    try {
      await pusher.trigger(channel, event, data);
      console.log(`Pusher event triggered: channel=${channel}, event=${event}`);
      return res.status(200).json({message: "Event triggered successfully"});
    } catch (error) {
      console.error("Pusher trigger error:", error);
      return res.status(500).json({error: "Failed to trigger event"});
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
