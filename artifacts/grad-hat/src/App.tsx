import React from 'react';
import { motion } from 'framer-motion';

const HatSVG = () => (
  <svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 400 400" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-2xl relative z-10"
  >
    <defs>
      <linearGradient id="boardGrad" x1="60" y1="80" x2="340" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#a3a3a3" />
      </linearGradient>
      
      <linearGradient id="baseGrad" x1="140" y1="140" x2="260" y2="220" gradientUnits="userSpaceOnUse">
        <stop stopColor="#cccccc" />
        <stop offset="1" stopColor="#525252" />
      </linearGradient>
      
      <linearGradient id="tasselGrad" x1="90" y1="150" x2="90" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" />
        <stop offset="1" stopColor="#737373" />
      </linearGradient>
    </defs>

    {/* Base / Crown */}
    <path 
      d="M 140 140 L 140 190 Q 200 220 260 190 L 260 140 Z" 
      fill="url(#baseGrad)" 
    />

    {/* Board */}
    <path 
      d="M 200 70 L 340 120 L 200 170 L 60 120 Z" 
      fill="url(#boardGrad)" 
    />

    {/* S Cutout (Renders as #000 to match background and act as a negative space) */}
    <path 
      d="M 215 95 
         C 215 80, 185 80, 185 95 
         C 185 120, 215 120, 215 145 
         C 215 160, 185 160, 185 145" 
      stroke="#000000" 
      strokeWidth="12" 
      strokeLinecap="round" 
      fill="none" 
    />

    {/* Tassel Sway Group */}
    <g className="tassel-sway">
      {/* Cord */}
      <path 
        d="M 200 120 Q 140 125 90 150" 
        stroke="#d4d4d4" 
        strokeWidth="2.5" 
        fill="none" 
      />
      {/* Tassel Knot */}
      <circle cx="90" cy="150" r="4.5" fill="#d4d4d4" />
      {/* Tassel Strings */}
      <path 
        d="M 88 154 L 84 190 M 90 155 L 90 196 M 92 154 L 96 190" 
        stroke="url(#tasselGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
    </g>

    {/* Center Button Base (Black cutout ring to separate it from the 'S' spine) */}
    <circle cx="200" cy="120" r="8" fill="#000000" />
    
    {/* Center Button */}
    <circle cx="200" cy="120" r="5" fill="#ffffff" />
  </svg>
);

export default function App() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden font-sans">
      
      {/* Main Hero Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1], // Apple-style custom spring ease
        }}
        className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] flex items-center justify-center"
      >
        {/* Subtle background glow grounding the hat */}
        <div className="absolute inset-0 bg-white/5 rounded-full blur-[80px] mix-blend-screen scale-75" />
        
        <HatSVG />
      </motion.div>

      {/* Typography / Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 1.4,
          delay: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute bottom-24 md:bottom-32 flex flex-col items-center gap-3 text-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-white/95">
          Savant
        </h1>
        <p className="text-base md:text-xl text-white/40 tracking-wide font-light max-w-sm">
          The modern standard for academic distinction.
        </p>
      </motion.div>
      
    </div>
  );
}
