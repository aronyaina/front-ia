"use client"

import * as z from "zod"
import { Heading } from "@/components/heading";
import { Shapes } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: "user" | "chat";
  content: string;
}
const TextClassificationPage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = { role: "user", content: values.prompt }
      const newMessages = [...messages, userMessage]

      const response = await axios.post("/api/text-classification", { messages: newMessages })
      const positiveScore = response.data.filter((result: any) => result.label === "POSITIVE").map((result: any) => result.score);

      const result = parseFloat(positiveScore[0]) * 100
      const chatMessage: Message = { role: "chat", content: result.toString() }
      setMessages((current) => [...current, chatMessage, userMessage]);
      form.reset();
    } catch (error: any) {
      console.log(error)
    }
    finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Text Classification"
        description="Show the classification of a text with the help of Text Classification."
        icon={Shapes}
        iconColor="text-yellow-200"
        bgColor="bg-yellow-100/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Create a text to classify here." {...field} />

                  </FormControl>
                </FormItem>
              )} />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Classify
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted"><Loader /></div>}
          {messages.length === 0 && !isLoading && <p className="text-center"><Empty label="No Conversation Started" /></p>}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                key={index}>
                {message.role === "user" ? <div className="flex items-starts gap-x-4"><UserAvatar /><p className="text-sm">{message.content}</p></div> :
                  <div className="flex items-start gap-x-4">
                    <BotAvatar />
                    <div className="flex flex-col gap-y-1 w-full">
                      <p className="text-sm">{parseFloat(message.content).toFixed(2)}% POSITIVE</p>
                      <Progress value={parseFloat(message.content)} className="w-full bg-red-200 h-1" />
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}

export default TextClassificationPage;
