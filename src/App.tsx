import { MotionConfig } from "framer-motion";
import { WindowManagerProvider } from "./context/WindowManager";
import { BackgroundProvider } from "./context/BackgroundProvider";
import { PreviewProvider } from "./context/PreviewContext";
import Desktop from "./components/Desktop";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BackgroundProvider>
        <PreviewProvider>
          <WindowManagerProvider>
            <Desktop />
          </WindowManagerProvider>
        </PreviewProvider>
      </BackgroundProvider>
    </MotionConfig>
  );
}
