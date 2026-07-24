import { motion } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 9 sun rays across a 150° fan
const RAYS = Array.from({ length: 9 }, (_, i) => -75 + i * (150 / 8));
const SX = 64, SY = 44; // sun centre in SVG viewBox

function toRad(deg: number) { return (deg * Math.PI) / 180; }

/**
 * Book page rows, bottom → top.
 * initialOffset: how far DOWN each row starts so they all appear stacked
 * at the bottom row when closed, then spread upward as the book opens.
 */
const ROWS = [
  { yBase: 96, yMid: 88, offset: 0  },
  { yBase: 83, yMid: 75, offset: 13 },
  { yBase: 70, yMid: 62, offset: 26 },
];

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
        transition={{ delay: 1.2, duration: 2.5 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 62%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Full lockup ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>

        {/*
          ── Icon ──
          The icon itself starts slightly compressed on X (like a book seen
          edge-on) and opens to full width — combined with page rows
          spreading from a stacked/closed position upward.
        */}
        <motion.div
          initial={{ scaleX: 0.35, opacity: 0 }}
          animate={{ scaleX: 1,    opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 118, height: 96, flexShrink: 0, transformOrigin: 'center center' }}
        >
          <svg viewBox="0 0 128 105" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>

            {/* Book page arcs — start stacked at bottom, spread upward */}
            {ROWS.map((row, i) => (
              <motion.g
                key={i}
                // translateY starts at offset (so all rows are at the bottom)
                // then animates to 0 (spreads to final position)
                initial={{ y: row.offset, opacity: i === 0 ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  y:       { delay: 0.05 + i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  opacity: { delay: 0.05 + i * 0.12, duration: 0.45, ease },
                }}
              >
                {/* left page arc */}
                <path
                  d={`M 3 ${row.yBase} Q 36 ${row.yBase - 4} ${SX} ${row.yMid}`}
                  stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"
                />
                {/* right page arc */}
                <path
                  d={`M 125 ${row.yBase} Q 92 ${row.yBase - 4} ${SX} ${row.yMid}`}
                  stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"
                />
              </motion.g>
            ))}

            {/* Sun circle — rises as book opens */}
            <motion.circle
              cx={SX} cy={SY} r={7.5} fill="white"
              initial={{ opacity: 0, cy: SY + 16 }}
              animate={{ opacity: 1, cy: SY }}
              transition={{ delay: 0.42, duration: 0.55, ease }}
            />

            {/* Rays — fan from center outward after sun appears */}
            {RAYS.map((angleDeg, i) => {
              const r = toRad(angleDeg);
              const distFromCenter = Math.abs(i - 4);
              const x1 = SX + Math.sin(r) * 13, y1 = SY - Math.cos(r) * 13;
              const x2 = SX + Math.sin(r) * 40, y2 = SY - Math.cos(r) * 40;
              return (
                <motion.line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="white" strokeWidth="4.5" strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.52 + distFromCenter * 0.05, duration: 0.38, ease }}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.55, ease }}
          style={{
            width: 1.5, height: 60,
            background: 'rgba(255,255,255,0.22)',
            borderRadius: 2,
            transformOrigin: 'center top',
          }}
        />

        {/* Text: ONEX / GLOBAL */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.18, gap: 3 }}>
          {[
            { label: 'ONEX',   size: 36, weight: 800, spacing: '0.07em',  delay: 0.82 },
            { label: 'GLOBAL', size: 22, weight: 400, spacing: '0.22em',  delay: 0.95 },
          ].map(({ label, size, weight, spacing, delay }) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, x: -14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0,   filter: 'blur(0px)' }}
              transition={{ delay, duration: 0.85, ease }}
              style={{ color: 'white', fontSize: size, fontWeight: weight, letterSpacing: spacing }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.1 }}
        style={{
          position: 'absolute', bottom: 32, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', padding: '0 44px',
        }}
      >
        {['ONEX GLOBAL', '2025 – 2026'].map((t) => (
          <span key={t} style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, letterSpacing: '0.12em' }}>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
