
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

    payload.inputs = messages[0]
    const response = await axios.post(`${configuration}/texts/generation`,
      payload
      , {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    return NextResponse.json(response.data)
    //return NextResponse.json("All set", { status: 200 })

  }
  catch (e) {
    console.log("[CONVERSATION ERROR]", e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
