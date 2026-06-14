import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { WindowManagerProvider } from "./context/WindowManager";
import { BackgroundProvider } from "./context/BackgroundProvider";
import { PreviewProvider } from "./context/PreviewContext";
import { RevealContext } from "./context/RevealContext";
import Desktop from "./components/Desktop";
import Preloader from "./components/preloader/Preloader";

export default function App() {
  // Flipped true once the preloader has fully animated out. The desktop
  // background is always mounted underneath; the windows/dock/topnav wait
  // for this flag so their entrance animations play visibly on reveal.
  const [revealed, setRevealed] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <BackgroundProvider>
        <PreviewProvider>
          <WindowManagerProvider>
            <RevealContext.Provider value={revealed}>
              <Desktop />
            </RevealContext.Provider>
          </WindowManagerProvider>
        </PreviewProvider>
      </BackgroundProvider>

      <Preloader onComplete={() => setRevealed(true)} />
    </MotionConfig>
  );
}
