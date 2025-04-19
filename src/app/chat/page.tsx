"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
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
    text: "👋 Hi! I'm BroClear AI – here to help you get BroReady. Let's tackle those blackheads! What's your current skin concern?",
    options: [
      { text: "Just starting skincare", nextStep: "2a" },
      { text: "Mild blackheads", nextStep: "2a" },
      { text: "Persistent blackheads", nextStep: "2b" },
      { text: "Stubborn blackheads", nextStep: "2c" },
    ],
  },
  "2a": {
    sender: "AI",
    text: "Got it. Prevention is key. Let's keep it light. ✅ Start with Level 1 (6000 microneedles) 💡 Apply daily for 2 weeks if you have blackheads.",
    options: [
      { text: "Tell me more about Level 1", nextStep: "3a1" },
      { text: "Any side effects?", nextStep: "3a2" },
      { text: "What's next after 2 weeks?", nextStep: "3a3" },
    ],
    image: "/levels/level-1.png",
  },
  "2b": {
    sender: "AI",
    text: "Sounds like your skin needs a bit more power. ✅ Go with Level 2 (2500 microneedles) 💡 Use twice a week for persistent blackheads.",
    options: [
      { text: "Tell me more about Level 2", nextStep: "3b1" },
      { text: "Can I switch levels later?", nextStep: "3b2" },
    ],
    image: "/levels/level-2.png",
  },
  "2c": {
    sender: "AI",
    text: "Let's bring in the heavy hitter. ✅ Use Level 3 (6000 microneedles) 💡 Twice a week for stubborn blackheads.",
    options: [
      { text: "Tell me more about Level 3", nextStep: "3c1" },
      { text: "How do I prevent them from coming back?", nextStep: "3c2" },
    ],
    image: "/levels/level-3.png",
  },
  "3a1": {
    sender: "AI",
    text: "Level 1 is great for beginners and prevention. It uses 6000 microneedles to gently clear pores.",
    options: [
      { text: "Back", nextStep: "2a" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3a2": {
    sender: "AI",
    text: "Possible mild tingling, but nothing harsh. If irritation occurs, reduce frequency.",
    options: [
      { text: "Back", nextStep: "2a" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3a3": {
    sender: "AI",
    text: "After 2 weeks, shift to 1–2x per week to maintain clear skin.",
    options: [{ text: "Got it", nextStep: "4" }],
  },
  "3b1": {
    sender: "AI",
    text: "Level 2 delivers 2500 microneedles with more depth, designed for persistent blackheads.",
    options: [
      { text: "Back", nextStep: "2b" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3b2": {
    sender: "AI",
    text: "Yes! You can adjust levels as your skin improves—start strong, then step down.",
    options: [
      { text: "Got it", nextStep: "4" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3c1": {
    sender: "AI",
    text: "Level 3 combines power and depth (6000 microneedles) to target the most stubborn blackheads.",
    options: [
      { text: "Back", nextStep: "2c" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "3c2": {
    sender: "AI",
    text: "Once cleared, switch to Level 1 once or twice weekly to prevent buildup.",
    options: [
      { text: "Got it", nextStep: "4" },
      { text: "Start Over", nextStep: "startOver" },
    ],
  },
  "4": {
    sender: "AI",
    text: "🌀 Let's keep those blackheads away. ✅ Once skin clears, use Level 1 weekly for prevention.",
    options: [
      { text: "Set reminder", nextStep: "end" },
      { text: "Show skincare routine", nextStep: "end" },
      { text: "Start over", nextStep: "1" },
    ],
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;

      if (!fileType.startsWith("image/")) {
        alert("Please upload only image files");
        return;
      }

      setSelectedImage(file);
    }
  };

  const handleImageAnalysis = async () => {
    if (!selectedImage) return;

    const imageUrl = URL.createObjectURL(selectedImage);

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
      formData.append("file", selectedImage);
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
        text: messageText,
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
      <div className="w-full py-5 border-b border-gray-800">
        <Image
          src="/logos/loreal-men-expert.png"
          alt="L'Oreal Men Expert"
          width={300}
          height={80}
          className="mx-auto"
        />
      </div>

      {currentStep === "1" && (
        <div className="w-full max-w-md mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 mb-4 flex items-center justify-center"
            disabled={isAnalyzing}
          >
            <Upload className="mr-2 h-5 w-5" />
            BroAnalyze My Skin
          </Button>

          {selectedImage && (
            <div className="flex justify-between items-center bg-gray-800 rounded-lg p-3 mb-4">
              <span className="text-sm truncate">{selectedImage.name}</span>
              <Button
                onClick={handleImageAnalysis}
                className="bg-orange-500 hover:bg-orange-600 text-sm"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-md flex-1 flex flex-col mt-4 mb-20 overflow-y-auto">
        <div className="flex-1 space-y-4 mb-4">
          {messages.map((message, aiIndex) => {
            const userResponse = userResponses[aiIndex]
              ? [userResponses[aiIndex]]
              : [];

            return (
              <React.Fragment key={aiIndex}>
                <div className="flex flex-col items-start">
                  <div className="bg-orange-500 text-white rounded-lg px-4 py-2 max-w-[80%]">
                    {message.isTyping ? <TypingIndicator /> : message.text}
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
        </div>
      </div>
    </main>
  );
};

export default ChatbotPage;
