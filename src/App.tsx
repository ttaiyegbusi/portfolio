import { MotionConfig } from "framer-motion";
import { WindowManagerProvider } from "./context/WindowManager";
import Desktop from "./components/Desktop";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WindowManagerProvider>
        <Desktop />
      </WindowManagerProvider>
    </MotionConfig>
  );
}
