import { useCallback, useState } from "react";
import type { AppId } from "../types";

export interface MobileNav {
  /** currently open app, or null when on the home screen */
  openAppId: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: () => void;
}

/**
 * Minimal mobile navigation: one app open at a time, full-screen, or the home
 * screen when none is open. Sheets handle their own entrance/exit animation;
 * this just tracks which app is active.
 */
export function useMobileNav(): MobileNav {
  const [openAppId, setOpenAppId] = useState<AppId | null>(null);

  const openApp = useCallback((id: AppId) => setOpenAppId(id), []);
  const closeApp = useCallback(() => setOpenAppId(null), []);

  return { openAppId, openApp, closeApp };
}
