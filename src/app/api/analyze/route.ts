import { NextRequest, NextResponse } from "next/server";
import { createBroClearChatCompletion } from "@/utils/systemPrompt";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const text = formData.get("text") as string;

  if (!file || !text) {
    return NextResponse.json(
      { success: false, message: "Missing file or text" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Convert buffer to base64
  const base64Image = buffer.toString("base64");

  try {
    // Send the image to Roboflow API
    const response = await fetch(
      `https://detect.roboflow.com/skin-problems-detection-jp4jv/4?api_key=${process.env.ROBOFLOW_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: base64Image,
      }
    );

    const result = await response.json();

    // Get AI-generated response using the skin analysis data
    const aiResponse = await createBroClearChatCompletion({
      userMessage: text,
      skinAnalysisData: result,
      apiKey: process.env.OPENAI_KEY || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image analyzed successfully",
        data: result,
        aiResponse, // This is now structured JSON directly from the API
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to analyze image",
      },
      { status: 500 }
    );
  }
};
