import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function DribbbleApp() {
  const [selectedYear, setSelectedYear] = useState(2026);

  const filteredItems = designItems.filter((item) => item.year === selectedYear);

  return (
    <div className="flex h-full w-full bg-white">
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
  );
}
