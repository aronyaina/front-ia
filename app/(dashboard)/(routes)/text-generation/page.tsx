
"use client"

import * as z from "zod"
import { Heading } from "@/components/heading";
import { MessageSquare, Shapes, TextSearch } from "lucide-react";
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

const Message = {
  role: "",
  content: ""
}

const TextGeneration = () => {
  const [messages, setMessages] = useState<typeof Message[]>([])
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
      const userMessage = { role: "user", content: values.prompt }
      const newMessages = [...messages, userMessage.content]

      const response = await axios.post("/api/text-generation", { messages: newMessages })
      //console.log(response.data.summary_text)
      const chatMessage = { role: "chat", content: response.data.generated_text }
      setMessages((current) => [...current, userMessage, chatMessage]);
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
        title="Text Generation"
        description="Generate text and answer the question you don't know."
        icon={MessageSquare}
        iconColor="text-blue-700"
        bgColor="bg-blue-100/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Generate many text as you want in this application ." {...field} />

                  </FormControl>
                </FormItem>
              )} />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted"><Loader /></div>}
          {messages.length === 0 && !isLoading && <p className="text-center"><Empty label="No Conversation Started" /></p>}
          <div className="flex flex-col-reverse gap-y-4">
            <div>
              {messages.map((message) => (
                <div
                  className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                  key={message.content}>
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default TextGeneration;
