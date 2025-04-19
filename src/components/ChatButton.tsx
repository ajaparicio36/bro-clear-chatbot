"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ChatButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/chat")}
      className="w-full max-w-md mb-5 bg-green-500 hover:bg-green-600 text-white py-9 rounded-full text-center font-medium text-xl"
    >
      TALK WITH AI CHATBOT
    </Button>
  );
};

export default ChatButton;
