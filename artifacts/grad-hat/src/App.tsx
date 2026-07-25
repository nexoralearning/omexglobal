import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const StaggeredText = ({
  text, phase, minPhase, maxPhase, style = {},
}: {
  text: string; phase: number; minPhase: number; maxPhase: number; style?: React.CSSProperties;
}) => (
  <div style={{ display: 'flex', ...style }}>
    {text.split('').map((char, i) => (
      <div key={i} style={{ overflow: 'hidden' }}>
        <motion.span
          style={{ display: 'inline-block' }}
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
            ease: EASE,
            delay: phase >= minPhase && phase < maxPhase ? i * 0.05 : 0,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      </div>
    ))}
  </div>
);

function LogoRevealScene() {
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
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'black', color: 'white', overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '80vw', height: '80vw', borderRadius: '50%',
          background: 'white', pointerEvents: 'none', filter: 'blur(100px)',
        }}
        initial={{ x: '-50%', y: '-50%', scale: 0.8, opacity: 0 }}
        animate={{ scale: phase >= 5 ? 0.9 : 1.3, opacity: phase >= 5 ? 0 : 0.05 }}
        transition={{ duration: 5, ease: 'easeOut', delay: 0.5 }}
      />

      {/* Grid overlay */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '4vw 4vw',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 5 ? 0 : 0.03 }}
        transition={{ duration: 2 }}
      />

      {/* Main container — slow continuous scale */}
      <motion.div
        style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        initial={{ scale: 0.95 }}
        animate={{ scale: phase >= 5 ? 0.95 : 1.05 }}
        transition={{ duration: 7, ease: 'linear' }}
      >
        {/* Logo icon */}
        <motion.div
          style={{
            position: 'relative', overflow: 'hidden', marginBottom: '1.5rem',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
            width: '24vw', height: '18vw',
          }}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 30 }}
          animate={
            phase >= 1 && phase < 5
              ? { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }
              : phase >= 5
              ? { opacity: 0, scale: 0.9, filter: 'blur(20px)', y: -20 }
              : { opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 30 }
          }
          transition={{ duration: 1.2, ease: EASE }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="ONEX GLOBAL"
            style={{
              position: 'absolute', top: 0, left: '50%',
              width: '120%', height: 'auto',
              mixBlendMode: 'screen',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              transform: 'translateX(-50%) scale(1.2)',
            }}
          />
        </motion.div>

        {/* Brand text */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StaggeredText
            text="ONEX"
            phase={phase} minPhase={2} maxPhase={5}
            style={{
              fontSize: '8vw', lineHeight: '0.85', fontWeight: 900,
              letterSpacing: '-0.01em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
            }}
          />
          <StaggeredText
            text="GLOBAL"
            phase={phase} minPhase={3} maxPhase={5}
            style={{
              fontSize: '5vw', lineHeight: '0.85', marginTop: '0.5rem',
              fontWeight: 400, letterSpacing: '0.22em',
              background: 'linear-gradient(to bottom, #ffffff, #888888)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
            }}
          />
        </div>
      </motion.div>

      {/* Bottom-left corner */}
      <motion.div
        style={{
          position: 'absolute', bottom: '4vw', left: '4vw',
          fontWeight: 700, fontSize: '1.2vw', letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.4)',
        }}
        initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
        animate={
          phase >= 4 && phase < 5 ? { opacity: 1, x: 0, filter: 'blur(0px)' }
          : phase >= 5             ? { opacity: 0, x: -20, filter: 'blur(10px)' }
                                   : { opacity: 0, x: -30, filter: 'blur(10px)' }
        }
        transition={{ duration: 1, ease: EASE }}
      >
        ONEX GLOBAL
      </motion.div>

      {/* Bottom-right corner */}
      <motion.div
        style={{
          position: 'absolute', bottom: '4vw', right: '4vw',
          fontSize: '1.2vw', letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace',
        }}
        initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
        animate={
          phase >= 4 && phase < 5 ? { opacity: 1, x: 0, filter: 'blur(0px)' }
          : phase >= 5             ? { opacity: 0, x: 20, filter: 'blur(10px)' }
                                   : { opacity: 0, x: 30, filter: 'blur(10px)' }
        }
        transition={{ duration: 1, ease: EASE }}
      >
        2025 – 2026
      </motion.div>

      {/* Cinematic vertical lines */}
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0, left: '4vw',
          width: 1, background: 'rgba(255,255,255,0.05)', pointerEvents: 'none', originY: '0',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 && phase < 5 ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0, right: '4vw',
          width: 1, background: 'rgba(255,255,255,0.05)', pointerEvents: 'none', originY: '1',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase >= 1 && phase < 5 ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function App() {
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLoopKey((k) => k + 1), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <LogoRevealScene key={loopKey} />
      </AnimatePresence>
    </div>
  );
}
