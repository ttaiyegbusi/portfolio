import { File, Hash, PanelLeft, Plus, Search } from "lucide-react";

const PAGES = ["About Me", "Knit", "icametoo", "Football booth", "Chain Core"];
const PROJECTS = ["Keyboard", "Mobile App", "Mobile App"];

interface LeftSidebarProps {
  activePage: string;
  onSelectPage: (page: string) => void;
  onCollapse: () => void;
}

export default function LeftSidebar({ activePage, onSelectPage, onCollapse }: LeftSidebarProps) {
  return (
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
            className="flex h-[30px] w-full cursor-default items-center gap-2 rounded-md px-1.5 text-[12.5px] text-inkTertiary transition-colors hover:bg-black/[0.03]"
          >
            <Hash size={12.5} strokeWidth={1.5} className="text-iconMuted" />
            <span className="truncate">{project}</span>
          </div>
        ))}
      </div>

      <div className="flex-1" />
    </div>
  );
}
