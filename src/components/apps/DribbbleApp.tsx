import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppContentProps } from "../../types";

const YEARS = [2026, 2025, 2024, 2023, 2022];

interface DesignItem {
  id: string;
  title: string;
  year: number;
  imageUrl?: string;
}

// Placeholder — you'll replace with actual images
const designItems: DesignItem[] = [
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
  const [selectedYear, setSelectedYear] = useState(2026);

  const filteredItems = designItems.filter((item) => item.year === selectedYear);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
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

      {/* Main content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-[200px] shrink-0 flex-col border-r border-borderLight bg-white/60 px-4 py-4">
          <h3 className="mb-4 text-[13px] font-semibold text-inkStrong">Explorations</h3>
          <div className="space-y-1">
            {YEARS.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left px-3 py-2 rounded text-[13px] transition-all ${
                  selectedYear === year
                    ? "bg-black/[0.06] font-medium text-inkStrong"
                    : "text-inkTertiary hover:bg-black/[0.03] font-normal"
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 auto-fill" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex flex-col gap-2 cursor-pointer group"
                >
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 group-hover:shadow-md transition-shadow overflow-hidden">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <p className="text-center text-[12px] font-medium text-inkStrong">{item.title}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
