import { useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { WindowManagerProvider } from "./context/WindowManager";
import { BackgroundProvider } from "./context/BackgroundProvider";
import { PreviewProvider } from "./context/PreviewContext";
import Desktop from "./components/Desktop";
import Preloader from "./components/preloader/Preloader";

export default function App() {
  // Desktop renders underneath from the start (so its assets load behind the
  // overlay), but stays visually hidden until the preloader has exited.
  const [revealed, setRevealed] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <BackgroundProvider>
        <PreviewProvider>
          <WindowManagerProvider>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              aria-hidden={!revealed}
            >
              <Desktop />
            </motion.div>
          </WindowManagerProvider>
        </PreviewProvider>
      </BackgroundProvider>

      <Preloader onComplete={() => setRevealed(true)} />
    </MotionConfig>
  );
}
