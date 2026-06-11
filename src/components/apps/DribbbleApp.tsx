import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelLeft, PanelLeftOpen } from "lucide-react";
import { DribbbleGlyph } from "./figma/glyphs";

const YEARS = ["2026", "2025", "2024", "2023", "2022"] as const;
type Year = (typeof YEARS)[number];

/** explorations per year — 12 each, filling the 4-column grid */
const SHOTS: Record<Year, string[]> = {
  "2026": ["Football Booth", "Football Booth", "Knit", "Knit", "icametoo", "icametoo", "Chain Core", "Chain Core", "Football Booth", "Knit", "icametoo", "Chain Core"],
  "2025": ["Knit", "Knit", "Knit", "icametoo", "icametoo", "Football Booth", "Football Booth", "Chain Core", "Chain Core", "Keyboard", "Keyboard", "Knit"],
  "2024": ["icametoo", "icametoo", "Keyboard", "Keyboard", "Mobile Banking", "Mobile Banking", "icametoo", "Keyboard", "Mobile Banking", "icametoo", "Keyboard", "Mobile Banking"],
  "2023": ["Mobile App", "Mobile App", "Landing Page", "Landing Page", "Dashboard", "Dashboard", "Mobile App", "Landing Page", "Dashboard", "Mobile App", "Landing Page", "Dashboard"],
  "2022": ["Logofolio", "Logofolio", "UI Challenge", "UI Challenge", "Icon Set", "Icon Set", "Logofolio", "UI Challenge", "Icon Set", "Logofolio", "UI Challenge", "Icon Set"],
};

const spring = { type: "spring", stiffness: 380, damping: 34 } as const;

export default function DribbbleApp() {
  const [year, setYear] = useState<Year>("2026");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="relative h-full overflow-hidden bg-windowBody">
      {/* ------------------------- shots grid ------------------------- */}
      <div
        className="app-scroll h-full overflow-y-auto py-9 pr-10 transition-[padding] duration-300"
        style={{ paddingLeft: sidebarVisible ? 248 : 64 }}
      >
        <div
          className="grid gap-x-7 gap-y-9"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
        >
          {SHOTS[year].map((name, i) => (
            <figure key={`${year}-${i}`} className="group cursor-pointer">
              <div className="aspect-[4/5] w-full rounded-[8px] border border-black/[0.05] bg-[#F7F7F7] shadow-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-black/[0.09] group-hover:bg-[#FAFAFA]" />
              <figcaption className="mt-2.5 text-center text-[12px] text-inkSecondary">{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* --------------------- floating sidebar --------------------- */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.aside
            key="explorations"
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            transition={spring}
            className="absolute bottom-[26px] left-[26px] top-[26px] w-[188px]"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-panel border border-borderLight bg-white/90 shadow-panel backdrop-blur-sm">
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-borderFaint px-3.5">
                <span className="text-[15px] font-medium tracking-tight text-[#626262]">Explorations</span>
                <button
                  onClick={() => setSidebarVisible(false)}
                  title="Hide sidebar"
                  className="rounded p-1 text-iconSoft transition-colors hover:bg-black/[0.05] hover:text-inkSecondary"
                >
                  <PanelLeft size={14} strokeWidth={1.6} />
                </button>
              </div>
              <div className="px-2 pt-2.5">
                {YEARS.map((y) => {
                  const isActive = y === year;
                  return (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className={`flex h-[31px] w-full items-center gap-2 rounded-md px-1.5 text-left text-[12.5px] transition-colors ${
                        isActive ? "bg-black/[0.05] text-inkSecondary" : "text-inkTertiary hover:bg-black/[0.03]"
                      }`}
                    >
                      <span className={isActive ? "text-inkMuted" : "text-iconMuted"}>
                        <DribbbleGlyph size={12} />
                      </span>
                      {y}
                    </button>
                  );
                })}
              </div>
              <div className="flex-1" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* restore handle when hidden */}
      <AnimatePresence>
        {!sidebarVisible && (
          <motion.button
            key="handle"
            initial={{ x: -36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -36, opacity: 0 }}
            transition={spring}
            onClick={() => setSidebarVisible(true)}
            title="Show sidebar"
            className="glass-tooltip absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-inkSecondary transition-transform hover:scale-110"
          >
            <PanelLeftOpen size={15} strokeWidth={1.7} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
