
import React from "react";
import ParticleBackground from "../components/ParticleBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Animated background */}
      <ParticleBackground />
      
      {/* Content */}
      <div className="z-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider animate-float text-gradient">
          COMING SOON
        </h1>
        <div className="mt-8 animate-pulse-slow">
          <div className="h-1 w-20 bg-white mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Index;
