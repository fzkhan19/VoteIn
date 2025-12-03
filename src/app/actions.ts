"use server";

import {redirect} from "next/navigation";

import {redis} from "@/lib/redis";

export const createTopic = async ({topicName}: {topicName: string}) => {
  const regex = /^[a-zA-Z-]+$/;

  if (!topicName || topicName.length > 50) {
    return {error: "Name must be between 1 and 50 chars"};
  }

  if (!regex.test(topicName)) {
    return {error: "Only letters and hyphens allowed in name"};
  }

  await redis.sadd("existing-topics", topicName);

  // redirect -> localhost:3000/redis
  redirect(`/${topicName}`);
};

//  hello -> 1
//  world -> 2
function wordFreq(text: string): {text: string; value: number}[] {
  const words: string[] = text.replace(/\./g, "").split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }

  return Object.keys(freqMap).map((word) => ({
    text: word,
    value: freqMap[word],
  }));
}

export const submitComment = async ({comment, topicName}: {comment: string; topicName: string}) => {
  const words = wordFreq(comment);

  await Promise.all(
    words.map(async (word) => {
      await redis.zadd(`room:${topicName}`, {incr: true}, {member: word.text, score: word.value});
    }),
  );

  await redis.incr("served-requests");

  // Fetch the updated word cloud from Redis
  const updatedWords: Array<string | number> = await redis.zrange(`room:${topicName}`, 0, -1, {
    withScores: true,
  });

  const formattedWords = [];

  for (let i = 0; i < updatedWords.length; i += 2) {
    formattedWords.push({
      text: updatedWords[i] as string,
      value: updatedWords[i + 1] as number,
    });
  }

  const baseUrl = "https://vote-in.vercel.app";

  await fetch(`${baseUrl}/api/pusher/trigger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: `room-${topicName}`,
      event: "room-update",
      data: formattedWords,
    }),
  });

  return comment;
};

export const getTopics = async () => {
  const topics = await redis.smembers("existing-topics");

  return topics;
};
