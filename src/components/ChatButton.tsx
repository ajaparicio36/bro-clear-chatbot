"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ChatButton = () => {
  const router = useRouter();

  return (
    <Button
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
      }}
      onClick={() => router.push("/chat")}
      className="hover:opacity-80 transition-opacity w-full max-w-md mb-5 bg-green-500 hover:bg-green-600 border-white border-3 text-shadow-lg text-white py-14 rounded-xl text-center font-medium text-xl"
    >
      TALK WITH AI CHATBOT
    </Button>
  );
};

export default ChatButton;
