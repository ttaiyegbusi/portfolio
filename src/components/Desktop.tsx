import { AnimatePresence, motion } from "framer-motion";
import { APP_LIST } from "../data/apps";
import { useWindowManager } from "../context/WindowManager";
import { useBackground } from "../context/BackgroundProvider";
import AppWindow from "./AppWindow";
import Dock from "./Dock";
import TopNav from "./appearance/TopNav";

export default function Desktop() {
  const { windows } = useWindowManager();
  const { background } = useBackground();

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#9bd5c3]">
      {/* Background layer — crossfades between selections */}
      <AnimatePresence initial={false}>
        <motion.div
          key={background.id}
          className="absolute inset-0"
          style={{ background: background.css }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Windows layer */}
      <AnimatePresence>
        {APP_LIST.filter((app) => windows[app.id].open).map((app) => (
          <AppWindow key={app.id} app={app} />
        ))}
      </AnimatePresence>

      <Dock />
      <TopNav />
    </div>
  );
}
