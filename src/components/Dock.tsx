import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_LIST } from "../data/apps";
import { useWindowManager } from "../context/WindowManager";
import { TrashIcon } from "./icons/AppIcons";
import type { AppDefinition } from "../types";

function DockIcon({ app }: { app: AppDefinition }) {
  const { windows, zTop, handleDockClick, registerDockIcon } = useWindowManager();
  const win = windows[app.id];
  const [hovered, setHovered] = useState(false);

  const isOpen = win.open;
  const isActive = isOpen && !win.minimized && win.z === zTop;

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.16 }}
            className="glass-tooltip pointer-events-none absolute -top-9 whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-medium text-inkStrong"
          >
            {app.name}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        ref={(el) => registerDockIcon(app.id, el)}
        onClick={() => handleDockClick(app.id)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.22, y: -7 }}
        whileTap={{ scale: 1.05, y: -2 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        aria-label={`${app.name}${isOpen ? " (open)" : ""}`}
        className="relative h-[34px] w-[34px] drop-shadow-[0_3px_5px_rgba(0,0,0,0.16)]"
      >
        {app.icon}
        {/* glossy top reflection on the icon tile */}
        <span className="pointer-events-none absolute inset-0 rounded-[9px] bg-gradient-to-b from-white/35 via-transparent to-transparent opacity-60" />
      </motion.button>

      {/* open / active indicator */}
      <span
        className={`absolute -bottom-[7px] h-[3.5px] w-[3.5px] rounded-full transition-all duration-200 ${
          isOpen ? (isActive ? "bg-inkStrong/70" : "bg-inkStrong/35") : "bg-transparent"
        }`}
      />
    </div>
  );
}

export default function Dock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[9999] flex justify-center">
      <motion.div
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.15 }}
        className="liquid-glass pointer-events-auto relative flex items-center gap-[13px] rounded-[15px] px-[15px] py-[9px]"
      >
        {/* sheen sweep */}
        <span className="dock-sheen absolute inset-0 rounded-[15px]" />

        {APP_LIST.map((app) => (
          <DockIcon key={app.id} app={app} />
        ))}

        {/* divider + trash, like the screenshot */}
        <span className="mx-0.5 h-[32px] w-px bg-black/15" />
        <motion.div
          whileHover={{ scale: 1.18, y: -6 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          title="Trash (empty — nothing to see here)"
          className="h-[34px] w-[30px] cursor-default drop-shadow-[0_3px_5px_rgba(0,0,0,0.14)]"
        >
          <TrashIcon />
        </motion.div>
      </motion.div>
    </div>
  );
}
