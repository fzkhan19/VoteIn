"use client";
import {Circle} from "lucide-react";

import {useSocket} from "./SocketProvider";
import {Badge} from "./ui/badge";
import {Label} from "./ui/label";
export default function Indicator() {
  const {isConnected, socket} = useSocket();

  if (!isConnected) {
    socket?.connect();

    return (
      <Badge className="flex items-center gap-2 border-none py-1" variant={"loading"}>
        <Circle className="mt-[1px] h-2 w-2 animate-ping fill-yellow-600 text-yellow-600 duration-1000 ease-in" />
        <Label className="text-xs">Connecting</Label>
      </Badge>
    );
  } else {
    return (
      <Badge className="flex items-center gap-1 py-1" variant={"success"}>
        <Circle className="mt-[1px] h-2.5 w-2.5 fill-emerald-600 text-emerald-600" />
        <Label className="text-xs">Connected</Label>
      </Badge>
    );
  }
}
