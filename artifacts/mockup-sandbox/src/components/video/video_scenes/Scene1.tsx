import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Helper for staggered character animation
const StaggeredText = ({ text, phase, minPhase, maxPhase, className = "" }: { text: string, phase: number, minPhase: number, maxPhase: number, className?: string }) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`}>
      {characters.map((char, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0, rotateX: 90 }}
            animate={
              phase >= minPhase && phase < maxPhase 
                ? { y: '0%', opacity: 1, rotateX: 0 } 
                : phase >= maxPhase 
                ? { y: '-100%', opacity: 0, rotateX: -90 } 
                : { y: '100%', opacity: 0, rotateX: 90 }
            }
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1], 
              delay: phase >= minPhase && phase < maxPhase ? i * 0.05 : 0 // Stagger in, but out all together
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export const LogoRevealScene = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 5800),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] rounded-full bg-white opacity-[0.03] blur-[100px] pointer-events-none"
        initial={{ x: '-50%', y: '-50%', scale: 0.8, opacity: 0 }}
        animate={{ scale: phase >= 5 ? 0.9 : 1.3, opacity: phase >= 5 ? 0 : 0.05 }}
        transition={{ duration: 5, ease: 'easeOut', delay: 0.5 }}
      />
      
      {/* Subtle Grid overlay for cinematic texture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '4vw 4vw'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 5 ? 0 : 0.03 }}
        transition={{ duration: 2 }}
      />

      {/* Main container with slow continuous scale */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: phase >= 5 ? 0.95 : 1.05 }}
        transition={{ duration: 7, ease: 'linear' }}
      >
        {/* Logo Icon Container */}
        <motion.div
          className="relative overflow-hidden mb-6 flex justify-center items-start"
          style={{ width: '24vw', height: '18vw' }}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 30 }}
          animate={
            phase >= 1 && phase < 5 
              ? { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 } 
              : phase >= 5 
              ? { opacity: 0, scale: 0.9, filter: 'blur(20px)', y: -20 } 
              : { opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 30 }
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* mix-blend-mode: screen hides the black background of the image */}
          <img 
            src={`${import.meta.env.BASE_URL}images/logo.png`} 
            alt="Logo Icon"
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ 
              width: '120%',
              height: 'auto',
              mixBlendMode: 'screen',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              transform: 'scale(1.2)'
            }}
          />
        </motion.div>

        {/* Brand Text Container */}
        <div className="text-center flex flex-col items-center z-20">
          <StaggeredText 
            text="ONEX" 
            phase={phase} 
            minPhase={2} 
            maxPhase={5} 
            className="text-[8vw] leading-[0.85] font-display font-black tracking-tight" 
          />
          <StaggeredText 
            text="GLOBAL" 
            phase={phase} 
            minPhase={3} 
            maxPhase={5} 
            className="text-[8vw] leading-[0.85] font-display font-black tracking-[0.2em] text-gradient mt-2" 
          />
        </div>
      </motion.div>

      {/* Bottom Left Corner Text */}
      <motion.div
        className="absolute bottom-[4vw] left-[4vw] font-display font-bold text-[1.2vw] tracking-[0.3em] text-white/40"
        initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
        animate={
          phase >= 4 && phase < 5 
            ? { opacity: 1, x: 0, filter: 'blur(0px)' } 
            : phase >= 5 
            ? { opacity: 0, x: -20, filter: 'blur(10px)' } 
            : { opacity: 0, x: -30, filter: 'blur(10px)' }
        }
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        ONEX GLOBAL
      </motion.div>

      {/* Bottom Right Corner Text */}
      <motion.div
        className="absolute bottom-[4vw] right-[4vw] font-mono text-[1.2vw] tracking-wider text-white/40"
        initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
        animate={
          phase >= 4 && phase < 5 
            ? { opacity: 1, x: 0, filter: 'blur(0px)' } 
            : phase >= 5 
            ? { opacity: 0, x: 20, filter: 'blur(10px)' } 
            : { opacity: 0, x: 30, filter: 'blur(10px)' }
        }
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        2025 - 2026
      </motion.div>

      {/* Decorative vertical lines for cinematic framing */}
      <motion.div 
        className="absolute top-0 bottom-0 left-[4vw] w-px bg-white/5 pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 && phase < 5 ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ originY: 0 }}
      />
      <motion.div 
        className="absolute top-0 bottom-0 right-[4vw] w-px bg-white/5 pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 && phase < 5 ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ originY: 1 }}
      />
    </motion.div>
  );
};
