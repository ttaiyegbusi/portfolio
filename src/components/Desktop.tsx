import { AnimatePresence } from "framer-motion";
import { APP_LIST } from "../data/apps";
import { useWindowManager } from "../context/WindowManager";
import AppWindow from "./AppWindow";
import Dock from "./Dock";

export default function Desktop() {
  const { windows } = useWindowManager();

  return (
    <div className="desktop-wallpaper fixed inset-0 overflow-hidden">
      {/* Windows layer */}
      <AnimatePresence>
        {APP_LIST.filter((app) => windows[app.id].open).map((app) => (
          <AppWindow key={app.id} app={app} />
        ))}
      </AnimatePresence>

      <Dock />
    </div>
  );
}
