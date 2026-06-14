import type { ReactNode } from "react";
import type { AppId } from "../types";
import { APPS } from "./apps";

/**
 * Mobile app registry. Reuses the same icons + names from the desktop APPS
 * record, but each app renders a touch-native mobile screen instead of a
 * draggable window. Screens are placeholders in this phase; real content is
 * wired app-by-app in the next phase.
 *
 * `imagePreview` is intentionally excluded from the home grid/dock: on mobile
 * the Preview opens as a full-screen viewer launched from Dribbble, not as a
 * standalone home-screen app.
 */

export interface MobileAppDefinition {
  id: AppId;
  name: string;
  icon: ReactNode;
  /** the full-screen mobile content for this app */
  render: () => ReactNode;
  /** show on the home-screen grid */
  onHome: boolean;
  /** pin to the bottom dock */
  inDock: boolean;
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-8 text-center">
      <p className="text-[17px] font-semibold text-inkStrong">{name}</p>
      <p className="text-[14px] text-inkTertiary">Coming to mobile soon.</p>
    </div>
  );
}

const def = (
  id: AppId,
  opts: { onHome?: boolean; inDock?: boolean; render?: () => ReactNode } = {},
): MobileAppDefinition => ({
  id,
  name: APPS[id].name,
  icon: APPS[id].icon,
  render: opts.render ?? (() => <Placeholder name={APPS[id].name} />),
  onHome: opts.onHome ?? true,
  inDock: opts.inDock ?? false,
});

/** Home-screen grid order. */
export const MOBILE_APPS: MobileAppDefinition[] = [
  def("figma", { inDock: true }),
  def("notes", { inDock: true }),
  def("dribbble", { inDock: true }),
  def("projects"),
  def("finder", { inDock: true }),
];

export const MOBILE_DOCK_APPS: MobileAppDefinition[] = MOBILE_APPS.filter((a) => a.inDock);

export function getMobileApp(id: AppId): MobileAppDefinition | undefined {
  return MOBILE_APPS.find((a) => a.id === id);
}
