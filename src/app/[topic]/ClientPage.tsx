"use client";

import {Icons} from "@/components/Icons";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import {useMutation} from "@tanstack/react-query";
import {scaleLog} from "@visx/scale";
import {Text} from "@visx/text";
import {Wordcloud} from "@visx/wordcloud";
import {useEffect, useState} from "react";
import {socket} from "../../socket";
import {submitComment} from "../actions";

interface ClientPageProps {
  topicName: string;
  initialData: {text: string; value: number}[];
}

const COLORS = ["#FFDD00", "#66AA00", "#FF8800", "#AADD00", "#FF5900"];

const ClientPage = ({topicName, initialData}: ClientPageProps) => {
  const [words, setWords] = useState(initialData);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    socket.emit("join-room", `room:${topicName}`);
  }, []);

  useEffect(() => {
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

    return () => {
      socket.off("room-update");
    };
  }, [words]);

  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [20, 90],
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

      <div className="flex aspect-square items-center justify-center md:max-w-xl">
        <Wordcloud
          words={words}
          width={400}
          height={400}
          fontSize={(data) => fontScale(data.value)}
          font={"Impact"}
          padding={2}
          spiral="archimedean"
          rotate={0}
          random={() => 0.5}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={COLORS[i % COLORS.length]}
                textAnchor="middle"
                transform={`translate(${w.x}, ${w.y})`}
                fontSize={w.size}
                fontFamily={w.font}
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
          Here's what I think about {topicName}
        </Label>
        <div className="mt-1 w-full gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInput("");
              mutate({comment: input, topicName});
            }}
            className="flex w-full items-center gap-4"
          >
            <Input
              value={input}
              onChange={({target}) => setInput(target.value)}
              placeholder={`${topicName} is absolutely...`}
            />
            <Button disabled={isPending} type="submit">
              Share
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
