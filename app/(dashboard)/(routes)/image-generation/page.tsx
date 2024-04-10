
"use client"

import * as z from "zod"
import { Heading } from "@/components/heading";
import { Download, MessageSquare, Shapes, Sparkles, TextSearch } from "lucide-react";
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
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const Message = {
  role: "",
  content: ""
}

const ImageGeneration = () => {
  const [images, setImages] = useState<string[]>([])
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
      //      const userMessage = { role: "user", content: values.prompt }
      //      const newMessages = [...messages, userMessage.content]

      setImages([]);
      const response = await axios.post("/api/image-generation", { messages: values })
      console.log(response.data)
      const urls = [response.data]
      setImages(urls);

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
        title="Image Generation"
        description="Surpass your imagination with our powerful image generation tool."
        icon={Sparkles}
        iconColor="text-orange-700"
        bgColor="bg-orange-100/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Red Horse in swiss alpe ." {...field} />

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
          {isLoading && <div className="p-20"><Loader /></div>}
          {images.length === 0 && !isLoading && <p className="text-center"><Empty label="No images generated" /></p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((img, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                  < Image key={index} alt="" fill src={img} />
                </div>

                <CardFooter className="p-2">
                  <Button onClick={() => { window.open(img) }} className="w-full" variant="secondary">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div >
  )

}

export default ImageGeneration;
