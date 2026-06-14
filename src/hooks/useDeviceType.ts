import { useEffect, useState } from "react";

export type DeviceType = "phone" | "desktop";

/** Phones below this width get the iOS shell; tablets and up get the macOS desktop. */
export const PHONE_MAX_WIDTH = 768;

function detect(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < PHONE_MAX_WIDTH ? "phone" : "desktop";
}

/**
 * Live device classification. Re-evaluates on resize and orientation change so
 * rotating a phone or resizing a window swaps shells correctly. Width-based
 * (not user-agent sniffing) so it stays robust across devices.
 */
export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>(detect);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setDevice(detect()));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return device;
}
