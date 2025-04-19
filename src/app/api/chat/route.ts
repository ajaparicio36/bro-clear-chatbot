import { NextRequest } from "next/server";
import { createBroClearChatCompletion } from "@/utils/systemPrompt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await createBroClearChatCompletion({
      userMessage: message,
      apiKey: process.env.OPENAI_KEY || "",
    });

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
