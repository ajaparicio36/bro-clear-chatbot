import React from "react";

const RewardsSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full bg-black text-white py-8 px-4">
      {/* Points Circle */}
      <div
        className="w-36 h-36 rounded-full flex flex-col items-center justify-center mb-8 relative"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
          boxShadow: "0 0 20px 5px rgba(255, 165, 0, 0.7)",
        }}
      >
        <span className="text-3xl font-bold">101,314</span>
        <span className="text-sm">POINTS</span>
      </div>

      {/* Claim Rewards Heading with Glow */}
      <h2
        className="text-4xl font-bold text-white mb-8"
        style={{
          textShadow: "0 0 15px rgba(249, 115, 22, 1)",
        }}
      >
        CLAIM REWARDS
      </h2>

      {/* BroClear Level Buttons */}
      <div className="flex flex-col w-full max-w-md gap-4 mb-8">
        <button
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
          }}
          className="flex justify-between items-center bg-orange-500 text-white px-6 py-3 rounded-full"
        >
          <span className="font-bold text-xl tracking-wider">
            BROCLEAR LEVEL 1
          </span>
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
            }}
            className="bg-white border-white border-2 bg-opacity-20 rounded-full px-4 py-1"
          >
            <div className="text-sm">1,300</div>
            <div className="text-xs">POINTS</div>
          </div>
        </button>

        <button
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
          }}
          className="flex justify-between items-center bg-orange-500 text-white px-6 py-3 rounded-full"
        >
          <span className="font-bold text-xl tracking-wider">
            BROCLEAR LEVEL 2
          </span>
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
            }}
            className="bg-white border-white border-2 bg-opacity-20 rounded-full px-4 py-1"
          >
            <div className="text-sm">1,500</div>
            <div className="text-xs">POINTS</div>
          </div>
        </button>

        <button
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
          }}
          className="flex justify-between items-center bg-orange-500 text-white px-6 py-3 rounded-full"
        >
          <span className="font-bold text-xl tracking-wider">
            BROCLEAR LEVEL 3
          </span>
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #ffb800 0%, #ff6b00 100%)",
            }}
            className="bg-white border-white border-2 bg-opacity-20 rounded-full px-4 py-1"
          >
            <div className="text-sm">1,900</div>
            <div className="text-xs">POINTS</div>
          </div>
        </button>
      </div>

      {/* Cause Contribution Section */}

      {/* Cause Contribution Buttons */}
      <div className="flex flex-col w-full max-w-md gap-4">
        <h3 className="text-green-500 font-bold text-xl tracking-wider mb-4 self-start">
          CAUSE CONTRIBUTION
        </h3>

        <button
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
          }}
          className="flex justify-between items-center text-white px-6 py-3 rounded-full"
        >
          <div className="text-left">
            <div className="font-bold text-md tracking-wider">
              DONATE ₱300 TO MentalHeathPH
            </div>
            <div className="text-xs">
              Support mental health care for those in need
            </div>
          </div>
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
            }}
            className="bg-white bg-opacity-20 border-white border-2 rounded-full px-4 py-1"
          >
            <div className="text-sm">300</div>
            <div className="text-xs">POINTS</div>
          </div>
        </button>

        <button
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
          }}
          className="flex justify-between items-center bg-green-500 text-white px-6 py-3 rounded-full"
        >
          <div className="text-left">
            <div className="font-bold text-xl tracking-wider">PLANT A TREE</div>
            <div className="text-xs">Support reforestation efforts.</div>
          </div>
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
            }}
            className="bg-white border-white border-2 bg-opacity-20 rounded-full px-4 py-1"
          >
            <div className="text-sm">500</div>
            <div className="text-xs">POINTS</div>
          </div>
        </button>

        <button
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
          }}
          className="flex justify-between items-center bg-green-500 text-white px-6 py-3 rounded-full"
        >
          <div className="text-left">
            <div className="font-bold text-xl tracking-wider">
              DONATE ₱300 TO PAWS
            </div>
            <div className="text-xs">Help rescue and care for animals.</div>
          </div>
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #00ff02 0%, #029204 100%)",
            }}
            className="bg-orange-500 border-white border-2 bg-opacity-20 rounded-full px-4 py-1"
          >
            <div className="text-sm">300</div>
            <div className="text-xs">POINTS</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RewardsSection;
