import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { LogoRevealScene } from './video_scenes/Scene1';

const SCENE_DURATIONS = {
  logoReveal1: 7000,
  logoReveal2: 7000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <LogoRevealScene key="reveal1" />}
        {currentScene === 1 && <LogoRevealScene key="reveal2" />}
      </AnimatePresence>
    </div>
  );
}
