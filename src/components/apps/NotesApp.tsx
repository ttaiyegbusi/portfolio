import { useState } from "react";
import { PenSquare, Search } from "lucide-react";

const NOTES = [
  {
    id: "about",
    title: "About Me",
    date: "Today, 9:41 AM",
    preview: "Hi, I'm Temitope — a product designer based in Lagos…",
    body: (
      <>
        <h1 className="text-[17px] font-semibold text-inkStrong">About Me</h1>
        <p className="mt-3 text-[13px] leading-6 text-inkSecondary">
          Hi, I'm <span className="font-medium text-inkStrong">Temitope Aiyegbusi</span> — a product designer based in
          Lagos, Nigeria. I'm passionate about transforming ideas into clean, functional, and visually captivating
          products.
        </p>
        <p className="mt-3 text-[13px] leading-6 text-inkSecondary">
          I care about the small details: spacing that breathes, type that reads, and interactions that feel inevitable
          rather than decorative. This portfolio — a little macOS desktop — is proof of that.
        </p>
        <p className="mt-3 text-[13px] leading-6 text-inkSecondary">
          Reach me anytime at <span className="text-inkStrong">aiyegbusitope@gmail.com</span>.
        </p>
      </>
    ),
  },
  {
    id: "skills",
    title: "Skills & Tools",
    date: "Yesterday",
    preview: "Product design, design systems, prototyping…",
    body: (
      <>
        <h1 className="text-[17px] font-semibold text-inkStrong">Skills &amp; Tools</h1>
        <div className="mt-4 space-y-4 text-[13px] leading-6 text-inkSecondary">
          <div>
            <p className="font-medium text-inkStrong">Design</p>
            <p>Product design · Design systems · Interaction design · Prototyping · Visual identity</p>
          </div>
          <div>
            <p className="font-medium text-inkStrong">Tools</p>
            <p>Figma · FigJam · Framer · Notion · After Effects</p>
          </div>
          <div>
            <p className="font-medium text-inkStrong">Handoff &amp; collaboration</p>
            <p>Tokens, specs and redlines · Component documentation · Working closely with engineers</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "principles",
    title: "Design Principles",
    date: "Monday",
    preview: "Quiet, airy, minimal, soft, premium…",
    body: (
      <>
        <h1 className="text-[17px] font-semibold text-inkStrong">Design Principles</h1>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[13px] leading-6 text-inkSecondary">
          <li>Intentionality first — every element earns its place.</li>
          <li>Low contrast, high clarity. Hierarchy through weight and space, not noise.</li>
          <li>Motion should explain, never perform.</li>
          <li>Borders over shadows; depth from translucency and blur.</li>
          <li>Ship the details. Polish is a feature.</li>
        </ol>
      </>
    ),
  },
];

export default function NotesApp() {
  const [activeId, setActiveId] = useState("about");
  const active = NOTES.find((n) => n.id === activeId) ?? NOTES[0];

  return (
    <div className="flex h-full bg-white">
      {/* Note list */}
      <aside className="flex w-[200px] shrink-0 flex-col border-r border-borderLight bg-[#FAFAF8]">
        <div className="flex items-center justify-between px-3 pb-2 pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-inkTertiary">Notes</span>
          <div className="flex items-center gap-2 text-inkTertiary">
            <Search size={13} strokeWidth={1.8} />
            <PenSquare size={13} strokeWidth={1.8} />
          </div>
        </div>
        <div className="app-scroll flex-1 overflow-y-auto px-2 pb-2">
          {NOTES.map((note) => {
            const isActive = note.id === activeId;
            return (
              <button
                key={note.id}
                onClick={() => setActiveId(note.id)}
                className={`mb-1 w-full rounded-md px-2.5 py-2 text-left transition-colors ${
                  isActive ? "bg-[#FFE067]/45" : "hover:bg-black/[0.04]"
                }`}
              >
                <p className="truncate text-[12px] font-semibold text-inkStrong">{note.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-inkTertiary">
                  <span className="mr-1.5 text-inkMuted">{note.date}</span>
                  {note.preview}
                </p>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Note body */}
      <section className="app-scroll flex-1 overflow-y-auto px-7 py-6">
        <p className="mb-4 text-center text-[10px] text-inkFaint">{active.date}</p>
        {active.body}
      </section>
    </div>
  );
}
