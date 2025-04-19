import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChatButton from "@/components/ChatButton";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white px-6">
      {/* L'OREAL Logo */}
      <div className="mt-10 mb-10 flex flex-col gap-0 items-center">
        <Image
          src="/logos/loreal-men-expert.png"
          alt="L'ORÉAL MEN EXPERT"
          width={200}
          height={67}
          priority
          className="mb-2"
        />

        <p className="text-[10px] text-center max-w-xs px-12">
          your ultimate app for men&apos;s skincare, fitness, health, and life.
          Get BroReady while earning rewards you can redeem, donate, or use to
          support social causes.
        </p>
      </div>

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

      {/* Chat button */}
      <ChatButton />

      {/* Strava button */}
      <Button
        className="w-full max-w-md mb-5 bg-white hover:bg-gray-100 text-black py-7 rounded-full text-center font-medium text-lg flex items-center justify-center"
        variant="outline"
      >
        <Image
          src="/logos/strava.png"
          alt="Strava"
          width={32}
          height={32}
          className="mr-3"
        />
        RUN 10KM
      </Button>

      {/* MYROX button */}
      <Button
        className="w-full max-w-md mb-5 bg-white hover:bg-gray-100 text-black py-7 rounded-full text-center font-medium text-lg flex items-center justify-center"
        variant="outline"
      >
        <Image
          src="/logos/hyrox.png"
          alt="MYROX"
          width={32}
          height={32}
          className="mr-3"
        />
        PARTICIPATE
      </Button>

      {/* Cycling button */}
      <Button
        className="w-full max-w-md mb-5 bg-white hover:bg-gray-100 text-black py-7 rounded-full text-center font-medium text-lg flex items-center justify-center"
        variant="outline"
      >
        <Image
          src="/logos/CYCLING.png"
          alt="Cycling"
          width={32}
          height={32}
          className="mr-3"
        />
        CYCLING
      </Button>
    </main>
  );
};

export default HomePage;
