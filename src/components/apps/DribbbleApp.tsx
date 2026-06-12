import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelLeftOpen } from "lucide-react";
import type { AppContentProps } from "../../types";

const YEARS = [2026, 2025, 2024, 2023, 2022];

interface DribbbleItem {
  id: string;
  title: string;
  year: number;
}

const items: DribbbleItem[] = [
  { id: "1", title: "Clockin App", year: 2026 },
  { id: "2", title: "Dashboard Design", year: 2026 },
  { id: "3", title: "Mobile Exploration", year: 2026 },
  { id: "4", title: "Design System", year: 2026 },
  { id: "5", title: "Football Booth", year: 2025 },
  { id: "6", title: "Task Management", year: 2025 },
  { id: "7", title: "Landing Page", year: 2025 },
  { id: "8", title: "Mobile App", year: 2025 },
  { id: "9", title: "icametoo", year: 2024 },
  { id: "10", title: "Keyboard App", year: 2024 },
  { id: "11", title: "Chain Core", year: 2024 },
  { id: "12", title: "Portfolio Concept", year: 2024 },
];

export default function DribbbleApp({ controls, dragHandleProps }: AppContentProps) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2026);

  const filteredItems = items.filter((item) => item.year === selectedYear);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white/90">
      <header
        {...dragHandleProps}
        className="flex h-[38px] shrink-0 cursor-default select-none items-stretch border-b border-borderLight bg-chrome"
      >
        <div className="flex items-center border-r border-borderLight px-4">{controls}</div>
        <div className="flex items-center border-r border-borderLight px-4 text-[12px] font-semibold text-[#2F2F2F]">
          Dribbble
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[7px] w-[7px] rounded-full bg-[#D5D5D5]" />
          ))}
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Floating sidebar */}
        <AnimatePresence>
          {sidebarVisible && (
            <motion.div
              key="sidebar"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-[180px] bg-white/80 border-r border-borderFaint p-4 z-10"
            >
              <h3 className="text-[13px] font-semibold text-inkStrong mb-3">Explorations</h3>
              <div className="space-y-1">
                {YEARS.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`w-full text-left px-3 py-2 rounded text-[13px] transition-colors ${
                      selectedYear === year
                        ? "bg-black/[0.06] font-medium text-inkStrong"
                        : "text-inkTertiary hover:bg-black/[0.03]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid area */}
        <div className={`flex-1 transition-all ${sidebarVisible ? "ml-[180px]" : ""}`}>
          <div className="grid gap-4 p-6 overflow-y-auto h-full" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="aspect-square rounded-lg bg-gradient-to-br from-purple-200 to-blue-200 p-3 flex flex-col items-center justify-center group hover:shadow-md transition-shadow"
              >
                <span className="text-[12px] font-medium text-center text-gray-700">{item.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sidebar toggle */}
        <AnimatePresence>
          {!sidebarVisible && (
            <motion.button
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              onClick={() => setSidebarVisible(true)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
            >
              <PanelLeftOpen size={16} className="text-inkStrong" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
