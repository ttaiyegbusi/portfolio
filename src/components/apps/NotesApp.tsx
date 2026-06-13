import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PenSquare, Search } from "lucide-react";
import { mediumArticles } from "../../data/mediumArticles";

/* ----------------------------- personal notes ---------------------------- */

interface Note {
  id: string;
  title: string;
  date: string;
  preview: string;
  body: ReactNode;
}

const NOTES: Note[] = [
  {
    id: "about-me",
    title: "About Me",
    date: "Today, 9:41 AM",
    preview: "Hi, I'm Te...",
    body: (
      <div className="space-y-5 text-[15px] leading-[1.7] text-inkSecondary">
        <p>
          Hi, I'm <span className="font-semibold text-inkStrong">Temitope Aiyegbusi</span> — a product designer based in
          Lagos, Nigeria. I'm passionate about transforming ideas into clean, functional, and visually captivating
          products.
        </p>
        <p>
          I care about the small details: spacing that breathes, type that reads, and interactions that feel inevitable
          rather than decorative. This portfolio — a little macOS desktop — is proof of that.
        </p>
        <p>
          Reach me anytime at <span className="font-medium text-inkStrong">aiyegbusitope@gmail.com</span>.
        </p>
      </div>
    ),
  },
  {
    id: "skills-tools",
    title: "Skills & Tools",
    date: "Yesterday",
    preview: "Product design, ...",
    body: (
      <div className="space-y-5 text-[15px] leading-[1.7] text-inkSecondary">
        <p>
          Product design, UX, and interaction design sit at the core of what I do. I move comfortably between research,
          wireframing, and high-fidelity execution.
        </p>
        <p>
          Tools I reach for daily: <span className="font-medium text-inkStrong">Figma</span> for design and
          prototyping, <span className="font-medium text-inkStrong">React</span> and{" "}
          <span className="font-medium text-inkStrong">Tailwind</span> when I want to build the real thing, and a
          rotating set of AI tools that speed up the parts that should be fast.
        </p>
        <p>I believe a designer who can build ships better products. So I keep one foot in each world.</p>
      </div>
    ),
  },
  {
    id: "design-principles",
    title: "Design Principles",
    date: "Monday",
    preview: "Quiet, airy, minim...",
    body: (
      <div className="space-y-5 text-[15px] leading-[1.7] text-inkSecondary">
        <p>Quiet, airy, minimal. I'd rather remove than add.</p>
        <p>
          A few things I hold to: clarity beats cleverness, motion should explain rather than entertain, and every
          element on screen should earn its place.
        </p>
        <p>
          Good design feels obvious in hindsight. The work is making it obvious.
        </p>
      </div>
    ),
  },
];

/* ------------------------------ article body ----------------------------- */

function ArticleBody({ articleId }: { articleId: string }) {
  const reduceMotion = useReducedMotion();
  const article = mediumArticles.find((a) => a.id === articleId)!;

  return (
    <motion.div
      key={article.id}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="mx-auto max-w-[640px]"
    >
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-inkMuted">
        <span className="font-semibold uppercase tracking-wide text-inkTertiary">{article.source}</span>
        <span>·</span>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>

      {/* Title + subtitle */}
      <h1 className="text-[30px] font-bold leading-tight tracking-tight text-inkStrong">{article.title}</h1>
      <p className="mt-2 text-[17px] leading-relaxed text-inkSecondary">{article.subtitle}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[11px] font-medium text-inkSecondary">
            {tag}
          </span>
        ))}
      </div>

      {/* Excerpt with fade overlay */}
      <div className="relative mt-6">
        <div className="max-h-[340px] overflow-hidden">
          <p className="text-[16px] leading-[1.8] text-inkSecondary">{article.excerpt}</p>
          {article.bodyPreview?.map((para, i) => (
            <p key={i} className="mt-4 text-[16px] leading-[1.8] text-inkSecondary">
              {para}
            </p>
          ))}
        </div>
        {/* soft fade — matches the reading area background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      {/* CTA */}
      <motion.a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduceMotion ? {} : { y: -2 }}
        whileTap={reduceMotion ? {} : { scale: 0.98 }}
        aria-label={`Continue reading "${article.title}" on Medium (opens in a new tab)`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-inkStrong px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inkStrong/40"
      >
        Continue reading on Medium
      </motion.a>
    </motion.div>
  );
}

/* -------------------------------- the app -------------------------------- */

export default function NotesApp() {
  const [activeId, setActiveId] = useState<string>(NOTES[0].id);

  const activeNote = NOTES.find((n) => n.id === activeId);
  const isArticle = !activeNote;

  return (
    <div className="flex h-full bg-white/50 p-4">
      {/* Floating sidebar */}
      <aside className="flex w-[230px] shrink-0 flex-col rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-white/40 p-3">
        <div className="flex items-center justify-between px-2 pb-3 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-inkTertiary">Notes</span>
          <div className="flex items-center gap-2 text-inkTertiary">
            <Search size={13} strokeWidth={1.8} />
            <PenSquare size={13} strokeWidth={1.8} />
          </div>
        </div>

        <div className="app-scroll flex-1 overflow-y-auto px-1 pb-2">
          {/* Personal notes */}
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

          {/* Divider */}
          <div className="my-2 px-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-inkMuted">Writing</p>
          </div>

          {/* Articles */}
          {mediumArticles.map((article) => {
            const isActive = article.id === activeId;
            return (
              <button
                key={article.id}
                onClick={() => setActiveId(article.id)}
                className={`mb-1 w-full rounded-md px-2.5 py-2 text-left transition-colors ${
                  isActive ? "bg-[#FFE067]/45" : "hover:bg-black/[0.04]"
                }`}
              >
                <p className="truncate text-[12px] font-semibold text-inkStrong">{article.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-inkTertiary">{article.subtitle}</p>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Reading area */}
      <section className="app-scroll flex-1 overflow-y-auto rounded-lg bg-white px-7 py-6">
        <AnimatePresence mode="wait">
          {isArticle ? (
            <ArticleBody key={activeId} articleId={activeId} />
          ) : (
            <motion.div
              key={activeNote!.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-4 text-center text-[10px] text-inkFaint">{activeNote!.date}</p>
              <h1 className="mb-5 text-[22px] font-bold text-inkStrong">{activeNote!.title}</h1>
              {activeNote!.body}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
