"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ClaimRewardsButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/rewards")}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
      }}
      className="hover:opacity-80 transition-opacity w-full max-w-md mb-5 bg-orange-500 hover:bg-orange-700 text-white py-14 rounded-xl border-white border-3 text-shadow-lg text-center font-medium text-xl "
    >
      CLAIM YOUR REWARDS
    </Button>
  );
};

export default ClaimRewardsButton;
