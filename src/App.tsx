import { MotionConfig } from "framer-motion";
import { WindowManagerProvider } from "./context/WindowManager";
import { BackgroundProvider } from "./context/BackgroundProvider";
import Desktop from "./components/Desktop";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BackgroundProvider>
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      </BackgroundProvider>
    </MotionConfig>
  );
}
