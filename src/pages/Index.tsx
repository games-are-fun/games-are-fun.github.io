
import React from "react";
import GameOfLifeBackground from "../components/GameOfLifeBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Animated background */}
      <GameOfLifeBackground />
      
      {/* Content */}
      <div className="z-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-mono tracking-wider animate-float text-gradient lowercase">
          coming soon
        </h1>
        <div className="mt-6 animate-pulse-slow">
          <div className="h-1 w-16 bg-white mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Index;
