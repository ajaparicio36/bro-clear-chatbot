"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import ReactMarkdown from "react-markdown";

// Chat message type definition
type MessageType = {
  sender: "AI" | "ME";
  text: string;
  options?: { text: string; nextStep: string }[];
  image?: string;
  isTyping?: boolean;
  recommendedLevel?: string;
};

// Chat flow definition based on the markdown file
const chatFlow: Record<string, MessageType> = {
  "1": {
    sender: "AI",
    text: "👋 Hey! I'm **BRO Skin Expert** – let's get your skin BroReady!\n\nEveryone starts light. Ready for your custom skincare journey?",
    options: [
      { text: "Yes, let's go!", nextStep: "2a" },
      { text: "What's in it?", nextStep: "FAQ" },
    ],
  },
  "2a": {
    sender: "AI",
    text: "✅ Start with **Level 1** (1,000 microneedles) – gentle and perfect for all skin types.\n\n**Apply daily for 2 weeks.**",
    options: [
      { text: "Tell me more about Level 1", nextStep: "3a1" },
      { text: "Any side effects?", nextStep: "3a2" },
      { text: "What's next after 2 weeks?", nextStep: "3a3" },
    ],
    image: "/levels/level-1.png",
  },
  "2b": {
    sender: "AI",
    text: "Time to go deeper.\n\n✅ Try **Level 2** (2,500 microneedles).\n\n**Use 2–3x a week** for persistent blackheads.",
    options: [
      { text: "Tell me more about Level 2", nextStep: "3b1" },
      { text: "Can I move up again later?", nextStep: "3b2" },
    ],
    image: "/levels/level-2.png",
  },
  "2c": {
    sender: "AI",
    text: "Go big with **Level 3** (6,000 microneedles)\n\n**Use 2x a week** for stubborn blackheads.",
    options: [
      { text: "Tell me more about Level 3", nextStep: "3c1" },
      { text: "What happens after clearing?", nextStep: "3c2" },
    ],
    image: "/levels/level-3.png",
  },
  "3a1": {
    sender: "AI",
    text: "**Level 1** is gentle, with 1,000 microneedles.\n\nPerfect for beginners and mild blackheads.",
    options: [
      { text: "Back", nextStep: "2a" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3a2": {
    sender: "AI",
    text: "You may feel a light tingling – *that's normal!*\n\nIf you feel irritation, just reduce frequency.",
    options: [
      { text: "Back", nextStep: "2a" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3a3": {
    sender: "AI",
    text: "After 2 weeks, you can either:\n\n🔹 Continue **Level 1** weekly for prevention\n🔸 OR move to **Level 2** if blackheads persist.",
    options: [{ text: "Show me Level 2", nextStep: "2b" }],
  },
  "3b1": {
    sender: "AI",
    text: "**Level 2** reaches deeper pores with 2,500 microneedles.\n\nGreat for persistent blackheads.",
    options: [
      { text: "Back", nextStep: "2b" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3b2": {
    sender: "AI",
    text: "**Absolutely!**\n\nIf needed, you can level up to **Level 3** later — or step back to **Level 1** for prevention.",
    options: [
      { text: "Got it", nextStep: "4" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3c1": {
    sender: "AI",
    text: "**Level 3** is intense — combining power and depth.\n\nTargets the most stubborn blackheads.",
    options: [
      { text: "Back", nextStep: "2b" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3c2": {
    sender: "AI",
    text: "Once your skin is clear, switch back to **Level 1** 1–2x/week to prevent blackheads from coming back.",
    options: [
      { text: "Got it", nextStep: "4" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "4": {
    sender: "AI",
    text: "🌀 Let's keep those blackheads away.\n\n✅ Once skin clears, use **Level 1** weekly for prevention.",
    options: [
      { text: "Set reminder", nextStep: "end" },
      { text: "Show skincare routine", nextStep: "end" },
      { text: "Start over", nextStep: "1" },
    ],
  },
  FAQ: {
    sender: "AI",
    text: "**Powered by:**\n\n🔹 **Microneedling Technology** — Boosts absorption and tightens pores\n\n🔹 **Salicylic Acid** — Clears pores & prevents blackheads\n\n🔹 **Panthenol (Pro-Vitamin B5)** — Soothes skin and strengthens the barrier",
    options: [{ text: "Back", nextStep: "1" }],
  },
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { ...chatFlow["1"], isTyping: true },
  ]);
  const [userResponses, setUserResponses] = useState<MessageType[]>([]);
  const [currentStep, setCurrentStep] = useState<string>("1");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle the initial message typing animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{ ...chatFlow["1"], isTyping: false }]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (text: string, nextStep: string) => {
    const userMessage: MessageType = {
      sender: "ME",
      text,
    };

    if (text === "Back") {
      setUserResponses([...userResponses, userMessage]);

      const lastAIMessageIndex = messages.length - 1;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[lastAIMessageIndex] = {
          ...updatedMessages[lastAIMessageIndex],
          options: chatFlow[nextStep].options,
          image: chatFlow[nextStep].image,
        };
        setCurrentStep(nextStep);
        return updatedMessages;
      });

      return;
    }

    setUserResponses([...userResponses, userMessage]);

    if (nextStep === "startOver") {
      setMessages([{ ...chatFlow["1"], isTyping: true }]);
      setUserResponses([]);
      setCurrentStep("1");

      setTimeout(() => {
        setMessages([{ ...chatFlow["1"], isTyping: false }]);
      }, 3000);
      return;
    }

    if (nextStep === "end") {
      return;
    }

    const nextMessage = { ...chatFlow[nextStep], isTyping: true };
    setMessages([...messages, nextMessage]);
    setCurrentStep(nextStep);

    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg, idx) =>
          idx === prevMessages.length - 1 ? { ...msg, isTyping: false } : msg
        )
      );
    }, 3000);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;

      if (!fileType.startsWith("image/")) {
        alert("Please upload only image files");
        return;
      }

      setSelectedImage(file);

      // Automatically trigger analysis when file is selected
      await handleImageAnalysis(file);
    }
  };

  const handleImageAnalysis = async (imageFile = selectedImage) => {
    if (!imageFile) return;

    const imageUrl = URL.createObjectURL(imageFile);

    const userMessage: MessageType = {
      sender: "ME",
      text: "Please analyze my skin",
      image: imageUrl,
    };

    setUserResponses([...userResponses, userMessage]);

    const aiTypingMessage: MessageType = {
      sender: "AI",
      text: "",
      isTyping: true,
    };

    setMessages([...messages, aiTypingMessage]);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "text",
        "Analyze this skin image and recommend BroClear level"
      );

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      setMessages((prevMessages) =>
        prevMessages.filter((msg, idx) => idx !== prevMessages.length - 1)
      );

      // Parse the AI response which is now directly structured as JSON
      const aiResponseObj =
        typeof result.aiResponse === "string"
          ? JSON.parse(result.aiResponse)
          : result.aiResponse;

      const recommendedLevel = aiResponseObj.recommendedLevel;
      const messageText = aiResponseObj.message;

      // Determine which level image to show
      let levelImage;
      if (recommendedLevel) {
        switch (recommendedLevel) {
          case "Level 1":
            levelImage = "/levels/level-1.png";
            break;
          case "Level 2":
            levelImage = "/levels/level-2.png";
            break;
          case "Level 3":
            levelImage = "/levels/level-3.png";
            break;
          default:
            levelImage = undefined;
        }
      }

      const aiResponse: MessageType = {
        sender: "AI",
        text: messageText, // This already contains markdown formatting from the AI
        options: [{ text: "Start over", nextStep: "1" }],
        image: levelImage,
        recommendedLevel: recommendedLevel || undefined,
      };

      setMessages([...messages, aiResponse]);
    } catch (error) {
      console.error("Error analyzing image:", error);

      setMessages((prevMessages) =>
        prevMessages.filter((msg, idx) => idx !== prevMessages.length - 1)
      );

      const errorMessage: MessageType = {
        sender: "AI",
        text: "Sorry, there was an error analyzing your skin. Please try again.",
        options: [{ text: "Start over", nextStep: "1" }],
      };

      setMessages([...messages, errorMessage]);
    }

    setIsAnalyzing(false);
    setSelectedImage(null);
  };

  const TypingIndicator = () => (
    <div className="flex space-x-2 px-4 py-3">
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "600ms" }}
      ></div>
    </div>
  );

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white px-6">
      <div className="w-full py-5 border-b border-gray-800 flex items-center relative">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <div className="w-full flex justify-center">
          <Image
            src="/logos/loreal-men-expert.png"
            alt="L'Oreal Men Expert"
            width={300}
            height={80}
          />
        </div>
      </div>

      <div className="w-full max-w-md flex-1 flex flex-col mt-4 mb-20 overflow-y-auto">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="flex-1 space-y-4 mb-4">
          {messages.map((message, aiIndex) => {
            const userResponse = userResponses[aiIndex]
              ? [userResponses[aiIndex]]
              : [];

            return (
              <React.Fragment key={aiIndex}>
                <div className="flex flex-col items-start">
                  <div className="bg-orange-500 text-white rounded-lg px-4 py-2 max-w-[80%]">
                    {message.isTyping ? (
                      <TypingIndicator />
                    ) : (
                      <ReactMarkdown className="markdown">
                        {message.text}
                      </ReactMarkdown>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 ml-2">AI</div>

                  {message.image && !message.isTyping && (
                    <div className="mt-2 ml-2">
                      <Image
                        src={message.image}
                        alt={`${message.recommendedLevel || "Level"} image`}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {userResponse.map((resp, idx) => (
                  <div key={idx} className="flex flex-col items-end">
                    <div className="bg-white text-black rounded-lg px-4 py-2 max-w-[80%]">
                      {resp.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 mr-2">ME</div>

                    {resp.image && (
                      <div className="mt-2 mr-2">
                        <Image
                          src={resp.image}
                          alt="Uploaded skin"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex flex-col space-y-2 mt-auto">
          {messages[messages.length - 1]?.options?.map((option, index) => (
            <Button
              key={index}
              variant="secondary"
              className="bg-gray-300 text-black hover:bg-gray-400 w-full text-sm rounded-full"
              onClick={() => handleOptionClick(option.text, option.nextStep)}
              disabled={messages[messages.length - 1]?.isTyping || isAnalyzing}
            >
              {option.text}
            </Button>
          ))}

          {currentStep === "1" && (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full text-sm rounded-full"
              disabled={isAnalyzing || messages[messages.length - 1]?.isTyping}
            >
              👊 BroAnalyze My Skin
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatbotPage;
