"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, ImageIcon, LayoutList, ScanText, TextSearch, Shapes, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/text-generation",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  }, {
    label: "Text Summerization",
    icon: TextSearch,
    href: "/text-summerization",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }, {
    label: "Text Classification",
    icon: Shapes,
    href: "/text-classification",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    label: "Image Generation",
    icon: Sparkles,
    href: "/image-generation",
    color: "text-sky-700",
    bgColor: "bg-sky-500/10"
  },
]
const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {
          tools.map((tool) => {
            return (
              <Card onClick={() => router.push(tool.href)}
                key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-x-4">
                  <div className={
                    cn("p-2 w-fit rounded-md", tool.bgColor)
                  }>
                    <tool.icon className={cn("w-8, h-8", tool.color)} />
                  </div>
                  <div className="font-semibold">
                    {tool.label}
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>

              </Card>
            )
          })
        }

      </div>
    </div>
  )
}

export default DashboardPage;
