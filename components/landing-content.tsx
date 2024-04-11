"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
  {
    name: "Aro Ny Aina",
    avatar: "A",
    title: "Devops",
    description: "This is the best application i've used !"
  },
  {
    name: "Chris Johnes",
    avatar: "C",
    title: "Devops",
    description: "So cool this application.You can really use it for free ???"
  },
  {
    name: "Mialy",
    avatar: "M",
    title: "Data Ingenieur",
    description: "This get the job done !!!"
  },
  {
    name: "Fabrice",
    avatar: "M",
    title: "Electronic",
    description: "Great generation ..."
  }
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">
                    {item.name}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {item.title}
                  </p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
