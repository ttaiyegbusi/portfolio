import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { File, Hash, PanelLeft, Plus, Search } from "lucide-react";

const PAGES = ["About Me", "Knit", "icametoo", "Football booth", "Chain Core"];
const PROJECTS = ["Keyboard", "Mobile App", "Mobile App"];

/** name + category line shown in the hover preview card */
const ITEM_META: Record<string, { title: string; subtitle: string }> = {
  "About Me": { title: "About Me", subtitle: "Portfolio overview" },
  Knit: { title: "Knit", subtitle: "Design tool" },
  icametoo: { title: "icametoo", subtitle: "Event discovery" },
  "Football booth": { title: "Football Booth", subtitle: "Social networking" },
  "Chain Core": { title: "Chain Core", subtitle: "Web3 dashboard" },
  Keyboard: { title: "Keyboard", subtitle: "3D exploration" },
  "Mobile App": { title: "Mobile App", subtitle: "Concept design" },
};

const PREVIEW_HEIGHT = 178;

interface LeftSidebarProps {
  activePage: string;
  onSelectPage: (page: string) => void;
  onCollapse: () => void;
}

interface HoverPreview {
  name: string;
  top: number;
}

export default function LeftSidebar({ activePage, onSelectPage, onCollapse }: LeftSidebarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<HoverPreview | null>(null);

  const showPreview = (name: string) => (e: React.MouseEvent<HTMLElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rowRect = e.currentTarget.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();
    const top = Math.max(6, Math.min(rowRect.top - wrapRect.top, wrapRect.height - PREVIEW_HEIGHT - 6));
    setPreview({ name, top });
  };
  const hidePreview = () => setPreview(null);

  const meta = preview ? ITEM_META[preview.name] : null;

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      {/* ------------------------------ panel ------------------------------ */}
      <div className="flex h-full w-full flex-col overflow-hidden rounded-panel border border-borderLight bg-white/90 shadow-panel backdrop-blur-sm">
        {/* Title row */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-borderFaint px-3.5">
          <span className="text-[15px] font-medium tracking-tight text-[#626262]">Knit</span>
          <button
            onClick={onCollapse}
            title="Hide sidebars"
            className="rounded p-1 text-iconSoft transition-colors hover:bg-black/[0.05] hover:text-inkSecondary"
          >
            <PanelLeft size={14} strokeWidth={1.6} />
          </button>
        </div>

        {/* File / search row */}
        <div className="flex h-[35px] shrink-0 items-center justify-between border-b border-borderFaint px-3.5">
          <span className="text-[12px] text-inkTertiary">File</span>
          <Search size={13} strokeWidth={1.6} className="text-iconSoft" />
        </div>

        {/* Pages */}
        <div className="border-b border-borderFaint px-2 pb-2 pt-3">
          <div className="flex items-center justify-between px-1.5 pb-1.5">
            <span className="text-[10.5px] font-medium tracking-[0.12em] text-iconSoft">PAGES</span>
            <Plus size={12} strokeWidth={1.6} className="text-iconSoft" />
          </div>
          {PAGES.map((page) => {
            const isActive = page === activePage;
            return (
              <button
                key={page}
                onClick={() => onSelectPage(page)}
                onMouseEnter={showPreview(page)}
                onMouseLeave={hidePreview}
                className={`flex h-[30px] w-full items-center gap-2 rounded-md px-1.5 text-left text-[12.5px] transition-colors ${
                  isActive ? "bg-black/[0.05] text-inkSecondary" : "text-inkTertiary hover:bg-black/[0.03]"
                }`}
              >
                <File size={12.5} strokeWidth={1.5} className={isActive ? "text-inkMuted" : "text-iconMuted"} />
                <span className="truncate">{page}</span>
              </button>
            );
          })}
        </div>

        {/* Projects */}
        <div className="px-2 pt-3">
          <div className="flex items-center justify-between px-1.5 pb-1.5">
            <span className="text-[10.5px] font-medium tracking-[0.12em] text-iconSoft">PROJECTS</span>
            <Plus size={12} strokeWidth={1.6} className="text-iconSoft" />
          </div>
          {PROJECTS.map((project, i) => (
            <div
              key={`${project}-${i}`}
              onMouseEnter={showPreview(project)}
              onMouseLeave={hidePreview}
              className="flex h-[30px] w-full cursor-default items-center gap-2 rounded-md px-1.5 text-[12.5px] text-inkTertiary transition-colors hover:bg-black/[0.03]"
            >
              <Hash size={12.5} strokeWidth={1.5} className="text-iconMuted" />
              <span className="truncate">{project}</span>
            </div>
          ))}
        </div>

        <div className="flex-1" />
      </div>

      {/* ----------------------- hover preview card ----------------------- */}
      <AnimatePresence>
        {preview && meta && (
          <motion.div
            key={preview.name}
            initial={{ opacity: 0, x: -6, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 480, damping: 34 }}
            className="pointer-events-none absolute z-20 w-[176px] rounded-[6px] border border-borderLight bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.05)]"
            style={{ left: "calc(100% + 10px)", top: preview.top }}
          >
            {/* thumbnail placeholder, like the mock */}
            <div className="h-[118px] w-full rounded-[4px] border border-borderFaint bg-[#F6F6F6]" />
            <p className="mt-2 px-0.5 text-[12px] font-semibold leading-tight text-inkStrong">{meta.title}</p>
            <p className="mb-0.5 mt-0.5 px-0.5 text-[10.5px] leading-tight text-inkTertiary">{meta.subtitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
