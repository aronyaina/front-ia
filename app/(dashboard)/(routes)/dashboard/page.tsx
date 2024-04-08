"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ImageIcon, LayoutList, ScanText, TextSearch, Shapes } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [

	{
		label: "Image Classification",
		icon: ImageIcon,
		href: "/image-classification",
		color: "text-violet-500",
		bgColor: "bg-violet-500/10"

	},
	{
		label: "Image To Text",
		icon: LayoutList,
		href: "/image-to-text",
		color: "text-pink-700",
		bgColor: "bg-pink-500/10"
	}, {
		label: "Text To Image",
		icon: ScanText,
		href: "/text-to-image",
		color: "text-green-500",
		bgColor: "bg-green-500/10"
	}, {
		label: "Text Summerization",
		icon: TextSearch,
		href: "/text-summerization",
		color: "text-blue-700",
		bgColor: "bg-blue-500/10"
	}, {
		label: "Text Classification",
		icon: Shapes,
		href: "/text-classification",
		color: "text-yellow-200",
		bgColor: "bg-yellow-500/10"
	},]
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
