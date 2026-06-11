import { Eye, Heart } from "lucide-react";
import { DribbbleIcon } from "../icons/AppIcons";

const SHOTS = [
  { title: "Knit — Design Tool Landing", likes: 312, views: "9.4k", bg: "linear-gradient(135deg, #c0ebd0 0%, #8ed8ce 55%, #b6dfeb 100%)", fg: "#0A0D14" },
  { title: "icametoo — Event App", likes: 248, views: "7.1k", bg: "linear-gradient(135deg, #0a0d14 0%, #2a2f3a 60%, #4a5160 100%)", fg: "#FFFFFF" },
  { title: "Football Booth — Match Hub", likes: 197, views: "5.8k", bg: "linear-gradient(135deg, #9bd5a3 0%, #5ec550 70%, #2f8f3f 100%)", fg: "#FFFFFF" },
  { title: "Chain Core — Web3 Dashboard", likes: 286, views: "8.2k", bg: "linear-gradient(135deg, #dcf0fb 0%, #b6dfeb 45%, #3099de 100%)", fg: "#0A0D14" },
  { title: "Keyboard — 3D Exploration", likes: 354, views: "11k", bg: "linear-gradient(135deg, #dec872 0%, #f3bf52 55%, #bbd190 100%)", fg: "#0A0D14" },
  { title: "Mobile Banking Concept", likes: 221, views: "6.3k", bg: "linear-gradient(135deg, #f6f6f6 0%, #e6e6e6 50%, #c1c1c1 100%)", fg: "#0A0D14" },
];

export default function DribbbleApp() {
  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between border-b border-borderLight px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6">
            <DribbbleIcon />
          </div>
          <div>
            <p className="text-[13px] font-semibold leading-tight text-inkStrong">Recent Shots</p>
            <p className="text-[10px] leading-tight text-inkTertiary">dribbble.com/temitope</p>
          </div>
        </div>
        <span className="rounded-full border border-borderSubtle bg-[#F7F7F7] px-2.5 py-1 text-[10px] font-medium text-inkMuted">
          Product Design
        </span>
      </header>

      <div className="app-scroll grid flex-1 grid-cols-2 gap-4 overflow-y-auto p-5 xl:grid-cols-3">
        {SHOTS.map((shot) => (
          <article key={shot.title} className="group cursor-pointer">
            <div
              className="relative flex aspect-[4/3] items-end overflow-hidden rounded-card border border-borderFaint shadow-card transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{ background: shot.bg }}
            >
              <span
                className="px-4 pb-3 text-[15px] font-semibold leading-snug tracking-tight opacity-90"
                style={{ color: shot.fg }}
              >
                {shot.title.split("—")[0]}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="truncate text-[12px] font-medium text-inkSecondary">{shot.title}</p>
              <div className="ml-2 flex shrink-0 items-center gap-2.5 text-inkTertiary">
                <span className="flex items-center gap-1 text-[10px]">
                  <Heart size={11} strokeWidth={1.8} /> {shot.likes}
                </span>
                <span className="flex items-center gap-1 text-[10px]">
                  <Eye size={11} strokeWidth={1.8} /> {shot.views}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
