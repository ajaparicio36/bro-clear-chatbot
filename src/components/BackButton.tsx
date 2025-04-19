"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="text-orange-500"
      variant="ghost"
      onClick={() => router.push("/")}
    >
      <ChevronLeft size={36} />
    </Button>
  );
};

export default BackButton;
