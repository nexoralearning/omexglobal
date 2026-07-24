import { motion } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 9 rays fanning 150° upward
const RAYS = Array.from({ length: 9 }, (_, i) => -75 + i * (150 / 8));
const SX = 64, SY = 44;

function toRad(deg: number) { return (deg * Math.PI) / 180; }

export default function App() {
  return (
    <div style={{
      minHeight: '100dvh',
      width: '100%',
      background: '#090909',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    }}>

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 2.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.045) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Logo lockup: icon + divider + text ── */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease }}
        style={{ display: 'flex', alignItems: 'center', gap: 30 }}
      >

        {/* Icon SVG */}
        <svg
          viewBox="0 0 128 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 118, height: 96, flexShrink: 0 }}
        >
          {/* Book page arcs — 3 pairs, each staggered */}
          {[0, 1, 2].map((row) => {
            const yB = 96 - row * 13;
            const yM = yB - 8;
            return (
              <motion.g key={row}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + row * 0.13, duration: 0.55, ease }}
              >
                <path
                  d={`M 3 ${yB} Q 36 ${yB - 4} ${SX} ${yM}`}
                  stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"
                />
                <path
                  d={`M 125 ${yB} Q 92 ${yB - 4} ${SX} ${yM}`}
                  stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"
                />
              </motion.g>
            );
          })}

          {/* Sun circle */}
          <motion.circle
            cx={SX} cy={SY} r={7.5} fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.35, ease }}
          />

          {/* Sun rays — staggered outward from center */}
          {RAYS.map((angleDeg, i) => {
            const r = toRad(angleDeg);
            const distFromCenter = Math.abs(i - 4); // 0 = middle ray
            return (
              <motion.line
                key={i}
                x1={SX + Math.sin(r) * 13}
                y1={SY - Math.cos(r) * 13}
                x2={SX + Math.sin(r) * 40}
                y2={SY - Math.cos(r) * 40}
                stroke="white" strokeWidth="4.5" strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.62 + distFromCenter * 0.055,
                  duration: 0.4,
                  ease,
                }}
              />
            );
          })}
        </svg>

        {/* Vertical divider */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.55, ease }}
          style={{
            width: 1.5,
            height: 72,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            transformOrigin: 'center top',
          }}
        />

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          {[
            { label: 'ARCADIA',       size: 29, weight: 800, spacing: '0.06em' },
            { label: 'INTERNATIONAL', size: 29, weight: 800, spacing: '0.06em' },
            { label: 'UNIVERSITY',    size: 21, weight: 400, spacing: '0.2em'  },
          ].map(({ label, size, weight, spacing }, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.05 + i * 0.13, duration: 0.85, ease }}
              style={{ color: 'white', fontSize: size, fontWeight: weight, letterSpacing: spacing }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.85, duration: 1.1 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 44px',
        }}
      >
        {['ARCADIA UNIVERSITY', '2025 – 2026'].map((t) => (
          <span key={t} style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, letterSpacing: '0.12em' }}>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
