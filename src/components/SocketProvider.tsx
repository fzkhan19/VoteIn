/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PusherClient from "pusher-js";
import {createContext, useContext, useEffect, useState} from "react";
type PusherContextType = {
  pusher: PusherClient | null;
  isConnected: boolean;
  subscribe: (channelName: string, eventName: string, callback: (data: any) => void) => void;
  unsubscribe: (channelName: string) => void;
};

const PusherContext = createContext<PusherContextType>({
  pusher: null,
  isConnected: false,
  subscribe: () => {},
  unsubscribe: () => {},
});

export const usePusher = () => {
  return useContext(PusherContext);
};

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
  const [pusher, setPusher] = useState<PusherClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pusherInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      // Add any other Pusher options here, e.g., authEndpoint for private channels
    });

    pusherInstance.connection.bind("connected", () => {
      setIsConnected(true);
    });

    pusherInstance.connection.bind("disconnected", () => {
      setIsConnected(false);
    });

    setPusher(pusherInstance);

    return () => {
      pusherInstance.disconnect();
    };
  }, []);

  const subscribe = (channelName: string, eventName: string, callback: (data: any) => void) => {
    if (pusher) {
      const channel = pusher.subscribe(channelName);

      channel.bind(eventName, callback);
    }
  };

  const unsubscribe = (channelName: string) => {
    if (pusher) {
      pusher.unsubscribe(channelName);
    }
  };

  return (
    <PusherContext.Provider value={{pusher, isConnected, subscribe, unsubscribe}}>
      {children}
    </PusherContext.Provider>
  );
};
