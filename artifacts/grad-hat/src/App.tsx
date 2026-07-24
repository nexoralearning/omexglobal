import { motion } from 'framer-motion';

const GradHat = () => (
  <svg viewBox="20 75 460 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Hat body — left face visible below brim */}
    <path d="M 60 248 L 60 316 L 250 416 L 250 348 Z" fill="white" />
    {/* Hat body — right face visible below brim */}
    <path d="M 440 248 L 440 316 L 250 416 L 250 348 Z" fill="white" />

    {/*
      Brim (flat mortarboard top) — outer diamond with two parallelogram holes
      that create the S negative-space letterform.

      Hole 1: upper-left region  → top opening of S
      Hole 2: lower-right region → bottom opening of S
      The remaining interior becomes the S body.
    */}
    <path
      fillRule="evenodd"
      fill="white"
      d={[
        // Outer diamond brim
        'M 250 98 L 442 242 L 250 386 L 58 242 Z',
        // Hole 1 — upper-left (top S opening)
        'M 250 152 L 104 242 L 192 242 L 250 204 Z',
        // Hole 2 — lower-right (bottom S opening)
        'M 250 332 L 396 242 L 308 242 L 250 280 Z',
      ].join(' ')}
    />

    {/* Tassel cord from left brim corner */}
    <line
      x1="58" y1="242"
      x2="30" y2="352"
      stroke="white" strokeWidth="2.8" strokeLinecap="round"
    />
    {/* Tassel knot / ball */}
    <circle cx="30" cy="360" r="7" fill="white" />
    {/* Tassel hanging strings */}
    <path
      d="M 21 367 L 10 412 M 30 368 L 28 414 M 39 367 L 48 412"
      stroke="white" strokeWidth="2.8" strokeLinecap="round"
    />
  </svg>
);

export default function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow behind the hat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 2 }}
        style={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main hat — Apple-style entrance */}
      <motion.div
        initial={{ opacity: 0, y: 64, scale: 0.72 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: 380, height: 380 }}
      >
        {/* Tassel sway after hat lands */}
        <motion.div
          initial={{ rotate: 0, originX: '58px', originY: '242px' }}
          animate={{ rotate: [0, 6, -4, 2, 0] }}
          transition={{ delay: 1.55, duration: 1.1, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          <GradHat />
        </motion.div>
      </motion.div>

      {/* Tagline fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 40,
          color: 'rgba(255,255,255,0.35)',
          fontSize: 13,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontWeight: 400,
        }}
      >
        Creative Design
      </motion.p>
    </div>
  );
}
