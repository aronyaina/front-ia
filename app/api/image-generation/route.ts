
import { auth } from "@clerk/nextjs"
import axios from "axios";
import { NextResponse } from "next/server"

const configuration = process.env.LOCAL_SERVER
const payload = { inputs: "" }
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json()

    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!configuration) {
      return new NextResponse("Not configured", { status: 500 })
    }
    if (!messages) {
      return new NextResponse("Message are required", { status: 400 })
    }

    payload.inputs = messages[messages.length - 1].content
    const response = await axios.post(`${configuration}/images/generation`,
      payload
      , {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    console.log(response.data)
    //console.log("http://localhost:8080/" + response.data.image_url)
    const result = `http://localhost:8080/` + response.data.image_url
    return NextResponse.json(result, { status: 200 })
    //return NextResponse.json("All set", { status: 200 })
  }
  catch (e) {
    console.log("[IMAGE ERROR]", e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
