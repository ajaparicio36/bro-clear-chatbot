import BackButton from "@/components/BackButton";
import RewardsSection from "@/components/RewardsSection";
import Image from "next/image";
import React from "react";

const RewardsPage = () => {
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

      <RewardsSection />
    </main>
  );
};

export default RewardsPage;
