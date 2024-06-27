"use client"

import {createTopic} from "@/app/actions"
import {Input} from "@/components/ui/input"
import {useMutation} from "@tanstack/react-query"
import {useState} from "react"
import {Button} from "./ui/button"

const TopicCreator = () => {
  const [input, setInput] = useState<string>("")

  const {mutate, error, isPending} = useMutation({
    mutationFn: createTopic,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({topicName: input});
  }

  return (
    <div className="mt-12 flex flex-col gap-2 md:w-2/3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={({target}) => setInput(target.value)}
          className="bg-white min-w-64"
          placeholder="Enter topic here..."
        />
        <Button
          disabled={isPending}
          type="submit"
        >
          Create
        </Button>
      </form>

      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  )
}

export default TopicCreator
