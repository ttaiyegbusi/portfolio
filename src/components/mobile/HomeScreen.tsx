import { motion } from "framer-motion";
import type { AppId } from "../../types";
import { MOBILE_APPS, MOBILE_DOCK_APPS, type MobileAppDefinition } from "../../data/mobileApps";

interface HomeScreenProps {
  onOpen: (id: AppId) => void;
}

function AppTile({
  app,
  onOpen,
  showLabel = true,
  index = 0,
}: {
  app: MobileAppDefinition;
  onOpen: (id: AppId) => void;
  showLabel?: boolean;
  index?: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(app.id)}
      className="flex flex-col items-center gap-1.5 focus:outline-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.04 * index, type: "spring", stiffness: 320, damping: 24 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="block h-[60px] w-[60px] overflow-hidden rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
        {app.icon}
      </span>
      {showLabel && (
        <span className="max-w-[68px] truncate text-[11px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
          {app.name}
        </span>
      )}
    </motion.button>
  );
}

/**
 * iOS home screen: a grid of app icons over the wallpaper, with a frosted dock
 * pinned to the bottom safe area. Tapping a tile opens that app full-screen.
 */
export default function HomeScreen({ onOpen }: HomeScreenProps) {
  const gridApps = MOBILE_APPS.filter((a) => a.onHome);

  return (
    <div className="flex h-full flex-col">
      {/* App grid */}
      <div className="flex-1 overflow-y-auto px-7 pt-4">
        <div className="grid grid-cols-4 gap-x-5 gap-y-6">
          {gridApps.map((app, i) => (
            <AppTile key={app.id} app={app} onOpen={onOpen} index={i} />
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-2">
        <div className="mx-auto flex max-w-[420px] items-center justify-around rounded-[28px] border border-white/40 bg-white/25 px-4 py-3 backdrop-blur-2xl">
          {MOBILE_DOCK_APPS.map((app) => (
            <AppTile key={app.id} app={app} onOpen={onOpen} showLabel={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
