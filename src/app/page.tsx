import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChatButton from "@/components/ChatButton";
import ClaimRewardsButton from "@/components/ClaimRewardsButton";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-black text-white px-6">
      {/* L'OREAL Logo */}
      <Image
        src="/logos/loreal-men-expert.png"
        alt="L'ORÉAL MEN EXPERT"
        width={200}
        height={67}
        priority
        className="mb-2 mt-4"
      />

      <p className="text-sm text-center max-w-lg px-1 mb-2 mt-2">
        Your ultimate app for men&apos;s skincare, fitness, health, and life.
        Get BroReady while earning rewards you can redeem, donate, or use to
        support social causes.
      </p>

      {/* BRO READY Logo */}
      <div className="mb-2">
        <Image
          src="/logos/broclear-logo.png"
          alt="BRO READY WITH BROCLEAR"
          width={300}
          height={100}
          priority
        />
      </div>

      <h2
        className="text-4xl font-bold tracking-wider text-white mb-1"
        style={{
          textShadow: "0 0 15px rgba(249, 115, 22, 1)",
        }}
      >
        CHALLENGES:
      </h2>

      {/* Strava button */}
      <Button
        className="w-full max-w-md mb-2 bg-white hover:bg-gray-100 text-black py-9 rounded-full text-center font-medium text-xl flex items-center justify-between"
        variant="outline"
      >
        <Image src="/logos/strava.png" alt="Strava" width={64} height={64} />
        <span className="flex-1 text-center">RUN 10KM</span>
        <div className="w-8"></div> {/* Spacer to balance the layout */}
      </Button>

      {/* MYROX button */}
      <Button
        className="w-full max-w-md mb-2 bg-white hover:bg-gray-100 text-black py-9 rounded-full text-center font-medium text-xl flex items-center justify-between"
        variant="outline"
      >
        <Image src="/logos/hyrox.png" alt="MYROX" width={64} height={64} />
        <span className="flex-1 text-center">PARTICIPATE</span>
        <div className="w-8"></div> {/* Spacer to balance the layout */}
      </Button>

      {/* Cycling button */}
      <Button
        className="w-full max-w-md mb-2 bg-white hover:bg-gray-100 text-black py-9 rounded-full text-center font-medium text-xl flex items-center justify-between"
        variant="outline"
      >
        <Image src="/logos/CYCLING.png" alt="Cycling" width={64} height={64} />
        <span className="flex-1 text-center">CYCLING</span>
        <div className="w-8"></div> {/* Spacer to balance the layout */}
      </Button>

      <div className="w-full max-w-md mt-4 flex flex-row items-center justify-center gap-2">
        <ClaimRewardsButton />

        {/* Chat button */}
        <ChatButton />
      </div>
    </main>
  );
};

export default HomePage;
