import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white p-6">
      {/* L'OREAL Logo */}
      <div className="mt-10 mb-4">
        <Image
          src="/images/loreal-men-expert-logo.png"
          alt="L'ORÉAL MEN EXPERT"
          width={240}
          height={80}
          priority
        />
      </div>

      {/* Description text */}
      <div className="text-center max-w-xs mb-10">
        <p className="text-sm">
          your ultimate app for men&apos;s skincare, fitness, health, and life.
          Get BroReady while earning rewards you can redeem, donate, or use to
          support social causes.
        </p>
      </div>

      {/* BRO READY Logo */}
      <div className="mb-10">
        <Image
          src="/images/bro-ready-logo.png"
          alt="BRO READY WITH BROCLEAR"
          width={300}
          height={100}
          priority
        />
      </div>

      {/* Chat button */}
      <Button className="w-full max-w-md mb-5 bg-green-500 hover:bg-green-600 text-white py-5 rounded-full text-center font-medium text-lg">
        TALK WITH AI CHATBOT
      </Button>

      {/* Strava button */}
      <Button
        className="w-full max-w-md mb-5 bg-white hover:bg-gray-100 text-black py-5 rounded-full text-center font-medium text-lg flex items-center justify-center"
        variant="outline"
      >
        <Image
          src="/images/strava-logo.png"
          alt="Strava"
          width={32}
          height={32}
          className="mr-3"
        />
        RUN 10KM
      </Button>

      {/* MYROX button */}
      <Button
        className="w-full max-w-md mb-5 bg-white hover:bg-gray-100 text-black py-5 rounded-full text-center font-medium text-lg flex items-center justify-center"
        variant="outline"
      >
        <Image
          src="/images/myrox-logo.png"
          alt="MYROX"
          width={32}
          height={32}
          className="mr-3"
        />
        PARTICIPATE
      </Button>

      {/* Cycling button */}
      <Button
        className="w-full max-w-md mb-5 bg-white hover:bg-gray-100 text-black py-5 rounded-full text-center font-medium text-lg flex items-center justify-center"
        variant="outline"
      >
        <Image
          src="/images/cycling-logo.png"
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
