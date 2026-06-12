import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreview } from "../../context/PreviewContext";
import { useWindowManager } from "../../context/WindowManager";

const YEARS = [2026, 2025, 2024, 2023, 2022];

interface DesignItem {
  id: string;
  title: string;
  year: number;
  imageUrl?: string;
}

const designItems: DesignItem[] = [
  // 2026
  { id: "1", title: "Account Settings", year: 2026, imageUrl: "/images/dribbble/ACCOUNT SETTINGS.png" },
  { id: "2", title: "Messages", year: 2026, imageUrl: "/images/dribbble/Messages.png" },
  { id: "3", title: "Suggestion History", year: 2026, imageUrl: "/images/dribbble/Suggestion History.png" },
  { id: "4", title: "View Event", year: 2026, imageUrl: "/images/dribbble/VIew Event.png" },
  
  // 2025
  { id: "5", title: "Campaigns", year: 2025, imageUrl: "/images/dribbble/Campaigns.png" },
  { id: "6", title: "Classic Italian Carbonara", year: 2025, imageUrl: "/images/dribbble/Classic Italian Carbonara_ The Authentic Recipe.png" },
  { id: "7", title: "Complete Your Account", year: 2025, imageUrl: "/images/dribbble/Complete your account now.png" },
  { id: "8", title: "Confirm Identity", year: 2025, imageUrl: "/images/dribbble/Confirm your identity.png" },
  { id: "9", title: "Core AI", year: 2025, imageUrl: "/images/dribbble/Core Ai.png" },
  { id: "10", title: "Manual Journal Entry", year: 2025, imageUrl: "/images/dribbble/Create  Manual Journal Entry.png" },
  { id: "11", title: "Documents", year: 2025, imageUrl: "/images/dribbble/Documents.png" },
  { id: "12", title: "Journal Entries", year: 2025, imageUrl: "/images/dribbble/Journal  Entries.png" },
  { id: "13", title: "Messages", year: 2025, imageUrl: "/images/dribbble/Messages.png" },
  { id: "14", title: "More Options", year: 2025, imageUrl: "/images/dribbble/More dropdown 1.png" },
  { id: "15", title: "Publication Selection", year: 2025, imageUrl: "/images/dribbble/Publication selection.png" },
  
  // 2024-2022 placeholders
  { id: "16", title: "icametoo", year: 2024 },
  { id: "17", title: "Keyboard App", year: 2024 },
  { id: "18", title: "Chain Core", year: 2024 },
  { id: "19", title: "Portfolio Concept", year: 2024 },
  { id: "20", title: "SaaS Platform", year: 2023 },
  { id: "21", title: "Fintech App", year: 2023 },
  { id: "22", title: "Social Network", year: 2023 },
  { id: "23", title: "E-commerce", year: 2023 },
  { id: "24", title: "Knit", year: 2022 },
  { id: "25", title: "Collaboration Tool", year: 2022 },
  { id: "26", title: "Music App", year: 2022 },
  { id: "27", title: "Health Tracker", year: 2022 },
];

export default function DribbbleApp() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const { setPreview } = usePreview();
  const { openApp } = useWindowManager();

  const filteredItems = designItems.filter((item) => item.year === selectedYear);

  const handleImageClick = (item: DesignItem) => {
    if (!item.imageUrl) return;
    setPreview(item.imageUrl, item.title);
    openApp("imagePreview");
  };

  return (
    <div className="flex h-full w-full bg-[#F7F7F7] p-4">
      {/* Floating sidebar */}
      <aside className="w-[180px] shrink-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-white/40 p-4 flex flex-col">
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
      <div className="flex-1 overflow-y-auto pl-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleImageClick(item)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex flex-col gap-2 cursor-pointer group text-left"
              >
                <div className="aspect-square rounded-lg bg-[#F7F7F7] group-hover:shadow-md transition-shadow overflow-hidden flex items-center justify-center p-4 border border-slate-200">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                  )}
                </div>
                <p className="text-center text-[12px] font-medium text-inkStrong">{item.title}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
