"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ClaimRewardsButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/rewards")}
      className="w-full max-w-md mb-5 text-white py-9 rounded-full text-center font-medium text-xl"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
      }}
    >
      CLAIM YOUR REWARDS
    </Button>
  );
};

export default ClaimRewardsButton;
