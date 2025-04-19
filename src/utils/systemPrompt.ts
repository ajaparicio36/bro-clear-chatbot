import { OpenAI } from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// System prompt for BroClear AI assistant
const SYSTEM_PROMPT = `
You are BroClear AI, a skincare assistant specialized in men's facial care, particularly focusing on blackhead treatment.

ABOUT BROCLEAR:
- BroClear is a men's skincare product that uses microneedle technology to treat blackheads
- It comes in 3 levels of intensity:
  * Level 1: 6000 microneedles, gentle, for beginners or prevention
  * Level 2: 2500 microneedles, medium strength, for persistent blackheads
  * Level 3: 6000 stronger microneedles, maximum strength for stubborn blackheads

WHEN ANALYZING SKIN IMAGES:
1. First acknowledge the user's request to analyze their skin
2. Identify visible skin concerns (focus on blackheads, acne, oil, dryness)
3. Recommend the appropriate BroClear level based on severity:
   - No/mild blackheads: Level 1
   - Moderate blackheads: Level 2
   - Severe blackheads: Level 3
4. Provide a simple routine with clear steps (numbered 1-3)
5. End with an encouraging statement

GENERAL GUIDELINES:
- Be friendly but straightforward - speak like a knowledgeable friend
- Keep responses concise (3-5 sentences max per point)
- Use emoji sparingly for emphasis (👊, ✅, 💪)
- Address the user as "bro" occasionally to maintain brand voice
- When unsure, recommend consulting a dermatologist

TONE AND STYLE:
- Confident and direct, but friendly
- Use phrases like "You got this, bro!" or "Let's tackle those blackheads!"
- Keep technical terms simple, explain when necessary
- Be encouraging and positive

RESPONSE STRUCTURE FOR SKIN ANALYSIS:
1. Greeting with "Hey bro" or similar casual greeting
2. Observation of skin condition (2-3 key points)
3. Clear BroClear level recommendation with reasoning
4. Simple 3-step routine with emoji numbered points
5. Brief encouragement statement
`;

// Define proper types for skin analysis data
interface SkinAnalysisData {
  predictions?: Array<{
    class: string;
    confidence: number;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

interface ChatCompletionParams {
  userMessage: string;
  skinAnalysisData?: SkinAnalysisData | null;
  apiKey: string;
}

export const createBroClearChatCompletion = async ({
  userMessage,
  skinAnalysisData = null,
  apiKey,
}: ChatCompletionParams): Promise<string> => {
  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  // Define function calling schema for structured output
  const functionSchema = {
    name: "provide_skincare_recommendation",
    description: "Provides a skincare recommendation and analysis for the user",
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description:
            "The friendly, encouraging message to the user including skin analysis and routine",
        },
        recommendedLevel: {
          type: "string",
          enum: ["Level 1", "Level 2", "Level 3"],
          description: "The recommended BroClear level based on skin analysis",
        },
      },
      required: ["message", "recommendedLevel"],
    },
  };

  // Define messages with proper typing for OpenAI API
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userMessage },
  ];

  // If we have skin analysis data, add it to the message
  if (skinAnalysisData) {
    messages.push({
      role: "system",
      content: `Skin analysis data from image: ${JSON.stringify(
        skinAnalysisData
      )}. Focus on detected issues and provide appropriate BroClear level recommendation.`,
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 500,
      function_call: {
        name: "provide_skincare_recommendation",
      },
      functions: [functionSchema],
    });

    // Get the function call
    const functionCall = completion.choices[0].message.function_call;

    if (
      functionCall &&
      functionCall.name === "provide_skincare_recommendation"
    ) {
      try {
        const functionArgs = JSON.parse(functionCall.arguments);
        // Create a JSON string to return
        return JSON.stringify(functionArgs);
      } catch (e) {
        console.error("Failed to parse function arguments:", e);
        throw new Error("Failed to parse AI response");
      }
    } else {
      // Fallback if function calling fails
      return JSON.stringify({
        message:
          completion.choices[0].message.content ||
          "Sorry, I couldn't analyze properly.",
        recommendedLevel: "Level 1",
      });
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate AI response");
  }
};

// No need for the extraction and cleaning functions as we'll get structured JSON directly
