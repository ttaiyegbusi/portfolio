import { forwardRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useBackground } from "../../context/BackgroundProvider";
import BackgroundThumbnail from "./BackgroundThumbnail";

interface AppearanceDropdownProps {
  onClose: () => void;
}

const AppearanceDropdown = forwardRef<HTMLDivElement, AppearanceDropdownProps>(({ onClose }, ref) => {
  const { background, backgrounds, setBackgroundId } = useBackground();

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-label="Appearance settings"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.14 } }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      style={{ transformOrigin: "top right" }}
      className="liquid-glass-panel absolute right-0 top-[calc(100%+12px)] w-[250px] max-w-[calc(100vw-32px)] rounded-[20px] p-3"
    >
      {/* glossy reflection sweep */}
      <span className="dock-sheen pointer-events-none absolute inset-0 rounded-[20px] opacity-60" />

      <div className="relative mb-2.5 flex items-center justify-between pl-1">
        <h2 className="text-[13px] font-semibold tracking-tight text-inkStrong/90">Appearance</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close appearance settings"
          className="rounded-full p-1 text-inkStrong/60 transition-colors hover:bg-black/[0.07] hover:text-inkStrong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inkStrong/60"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="relative grid grid-cols-4 gap-2">
        {backgrounds.map((bg, i) => (
          <BackgroundThumbnail
            key={bg.id}
            background={bg}
            index={i}
            isSelected={bg.id === background.id}
            onSelect={() => setBackgroundId(bg.id)}
          />
        ))}
      </div>
    </motion.div>
  );
});

AppearanceDropdown.displayName = "AppearanceDropdown";

export default AppearanceDropdown;
