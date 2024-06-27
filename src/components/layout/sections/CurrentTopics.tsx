"use client";

import {Label} from "@radix-ui/react-label";
import Link from "next/link";
import {useEffect, useState} from "react";

import {getTopics} from "@/app/actions";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
export default function CurrentTopics() {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Skeleton = () => (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex animate-pulse items-center justify-center gap-4 p-4">
        <div className="h-4 w-24 rounded-md bg-gradient-to-r from-[#D247BF] to-primary" />
        <div className="h-4 w-12 rounded-md bg-gradient-to-r from-[#D247BF] to-primary" />
        <div className="h-4 w-20 rounded-md bg-gradient-to-r from-[#D247BF] to-primary" />
        <div className="h-4 w-8 rounded-md bg-gradient-to-r from-[#D247BF] to-primary" />
      </div>
      <div className="flex animate-pulse gap-4">
        <div className="h-4 w-20 rounded-md bg-gradient-to-r from-[#D247BF] to-primary" />
        <div className="h-4 w-20 rounded-md bg-gradient-to-r from-[#D247BF] to-primary" />
      </div>
    </div>
  );

  return !loading ? (
    <Card
      className={cn(
        "m-2 flex w-4/5 flex-col items-center justify-center",
        "border-0 border-t border-primary/20 shadow-xl shadow-primary/10",
        "bg-transparent backdrop-blur-[2px]",
      )}
    >
      <CardContent className="flex w-full flex-col items-center justify-center gap-2 p-4">
        <h1 className="text-center text-2xl font-bold text-primary-foreground/90 dark:text-primary/80">
          Current Topics
        </h1>
        {topics.length > 0 ? (
          <ul
            className={cn(
              "flex w-full flex-wrap items-center justify-center gap-3 gap-y-1 px-20",
              "bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text text-transparent",
            )}
          >
            {topics?.map((topic) => (
              <li key={topic}>
                <Link className="text-primary-foreground" href={`/${topic}`}>
                  <Button className="p-0 text-lg text-transparent" variant={"link"}>
                    #{topic}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Label className="my-8 text-base font-semibold text-primary-foreground/60 dark:text-primary/60">
            It&apos;s empty here...
          </Label>
        )}
      </CardContent>
    </Card>
  ) : (
    <Card className="m-2 flex w-4/5 flex-col items-center justify-center border-0 border-t border-primary/20 shadow-xl shadow-primary/10">
      <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
        <Skeleton />
      </CardContent>
    </Card>
  );
}
