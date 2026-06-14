import { AnimatePresence } from "framer-motion";
import { useBackground } from "../../context/BackgroundProvider";
import { useRevealed } from "../../context/RevealContext";
import { useMobileNav } from "../../hooks/useMobileNav";
import { getMobileApp } from "../../data/mobileApps";
import StatusBar from "./StatusBar";
import HomeScreen from "./HomeScreen";
import AppSheet from "./AppSheet";

/**
 * Root of the iOS-style mobile experience. Renders the themed wallpaper, the
 * home screen (status bar + app grid + dock), and—when an app is open—a
 * full-screen sheet over the top. Shares the same Background/Preview/Window
 * contexts as the desktop, so wallpaper theming and app data stay unified.
 */
export default function MobileShell() {
  const { background } = useBackground();
  const revealed = useRevealed();
  const { openAppId, openApp, closeApp } = useMobileNav();
  const activeApp = openAppId ? getMobileApp(openAppId) : undefined;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div className="absolute inset-0" style={{ background: background.css }} />

      {/* Home layer — waits for the preloader to exit so the app tiles animate
          in visibly rather than behind the loader. */}
      {revealed && (
        <div className="absolute inset-0 flex flex-col">
          <StatusBar tone="dark" />
          <div className="min-h-0 flex-1">
            <HomeScreen onOpen={openApp} />
          </div>
        </div>
      )}

      {/* Open app sheet */}
      <AnimatePresence>
        {activeApp && (
          <AppSheet key={activeApp.id} title={activeApp.name} onClose={closeApp}>
            {activeApp.render()}
          </AppSheet>
        )}
      </AnimatePresence>
    </div>
  );
}
