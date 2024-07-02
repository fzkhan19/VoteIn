"use client";

import {useMutation} from "@tanstack/react-query";
import {scaleLog} from "@visx/scale";
import {Text} from "@visx/text";
import {Wordcloud} from "@visx/wordcloud";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

import {Icons} from "@/components/Icons";
import {useSocket} from "@/components/SocketProvider";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Particles from "@/components/ui/particles";
import {cn} from "@/lib/utils";

import {submitComment} from "../actions";

interface ClientPageProps {
  topicName: string;
  initialData: {text: string; value: number}[];
}

const COLORS = ["#d451b5", "#df7f85", "#e7a65a", "#d0d02a", "#fdf808"];

const ClientPage = ({topicName, initialData}: ClientPageProps) => {
  const [words, setWords] = useState(initialData);
  const [input, setInput] = useState<string>("");
  const {theme} = useTheme();
  const [color, setColor] = useState("#ffffff");
  const {isConnected, socket} = useSocket();

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  useEffect(() => {
    isConnected && socket.emit("join-room", `room:${topicName}`);
  }, []);

  useEffect(() => {
    if (isConnected) {
      socket.on("room-update", (message: string) => {
        const data = JSON.parse(message) as {
          text: string;
          value: number;
        }[];

        data.map((newWord) => {
          const isWordAlreadyIncluded = words.some((word) => word.text === newWord.text);

          if (isWordAlreadyIncluded) {
            // increment
            setWords((prev) => {
              const before = prev.find((word) => word.text === newWord.text);
              const rest = prev.filter((word) => word.text !== newWord.text);

              return [...rest, {text: before!.text, value: before!.value + newWord.value}];
            });
          } else if (words.length < 50) {
            // add to state
            setWords((prev) => [...prev, newWord]);
          }
        });
      });
    }

    return () => {
      isConnected && socket.off("room-update");
    };
  }, [words]);

  const fontScaleMd = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [10, 100],
  });

  const fontScaleSm = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [10, 90],
  });

  const {mutate, isPending} = useMutation({
    mutationFn: submitComment,
  });

  return (
    <div
      className={cn(
        "bg-grid-zinc-50 flex flex-col items-center justify-between",
        "overflow-x-hidden pb-8 pt-20",
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-balance text-center text-4xl font-bold">
          What people{" "}
          <span className="whitespace-nowrap">
            th
            <span className="relative">
              i
              <span className="absolute inset-x-0 left-1 top-0.5 -translate-x-3 md:top-[-1.3px]">
                <Icons.brain className="h-5 w-5 md:h-6 md:w-6" />
              </span>
            </span>
            nk
          </span>{" "}
          about{" "}
          <span
            className={cn(
              "whitespace-nowrap capitalize",
              "bg-gradient-to-r from-[#D247BF] to-primary",
              "bg-clip-text text-transparent underline decoration-orange-300",
            )}
          >
            {topicName}.
          </span>
        </h1>
        <p className="mt-1 text-xs opacity-60">*updated in real-time</p>
      </div>

      <div className="hidden w-full items-center justify-center md:flex md:max-w-xl">
        <Wordcloud
          font={"Impact"}
          fontSize={(data) => fontScaleMd(data.value)}
          height={400}
          padding={2}
          random={() => 0.5}
          rotate={0}
          spiral="archimedean"
          width={600}
          words={words}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={COLORS[i % COLORS.length]}
                fontFamily={w.font}
                fontSize={w.size}
                textAnchor="middle"
                transform={`translate(${w.x}, ${w.y})`}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
      <div className="flex aspect-square items-center justify-center md:hidden md:max-w-xl">
        <Wordcloud
          font={"Impact"}
          fontSize={(data) => fontScaleSm(data.value)}
          height={300}
          padding={2}
          random={() => 0.5}
          rotate={0}
          spiral="archimedean"
          width={300}
          words={words}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={COLORS[i % COLORS.length]}
                fontFamily={w.font}
                fontSize={w.size}
                textAnchor="middle"
                transform={`translate(${w.x}, ${w.y})`}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>

      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "w-full px-4 md:w-4/5 md:max-w-lg md:px-0",
        )}
      >
        <Label className="pb-2 text-base font-semibold tracking-tight">
          Here&apos;s what I think about {topicName}
        </Label>
        <div className="mt-1 w-full gap-2">
          <form
            className="flex w-full items-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setInput("");
              mutate({comment: input, topicName});
            }}
          >
            <Input
              placeholder={`${topicName} is absolutely...`}
              value={input}
              onChange={({target}) => setInput(target.value)}
            />
            <Button disabled={isPending} type="submit">
              Share
            </Button>
          </form>
        </div>
      </div>
      <Particles
        refresh
        className="absolute inset-0 -z-10"
        color={color}
        ease={80}
        quantity={100}
      />
    </div>
  );
};

export default ClientPage;
