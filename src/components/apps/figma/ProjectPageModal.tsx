import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectCaseStudy as ProjectCaseStudyData } from "../../../data/projects";
import ProjectSectionNav from "./ProjectSectionNav";
import ProjectCaseStudy from "./ProjectCaseStudy";

interface ProjectPageModalProps {
  project: ProjectCaseStudyData | null;
  isOpen: boolean;
  onClose: () => void;
  /** element to return focus to when the modal closes */
  returnFocusRef?: React.RefObject<HTMLElement>;
}

export default function ProjectPageModal({ project, isOpen, onClose, returnFocusRef }: ProjectPageModalProps) {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>(project?.sections[0]?.id ?? "");
  const clickScrollLock = useRef(false);

  // Reset to the top + first section whenever a different project is shown.
  useEffect(() => {
    if (!project) return;
    setActiveSectionId(project.sections[0]?.id ?? "");
    // Note: do not clear sectionRefs.current here. Refs attach during the
    // commit phase, before this effect runs, so clearing it here would wipe
    // out the very refs the new sections just registered.
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    });
  }, [project?.id]);

  // Escape to close.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Focus the close button on open; return focus to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      returnFocusRef?.current?.focus();
    }
  }, [isOpen, returnFocusRef]);

  // Intersection Observer drives the active section indicator, scoped to the
  // modal's own scroll container (not the window).
  useEffect(() => {
    if (!isOpen || !project) return;
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScrollLock.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).dataset.sectionId;
          if (id) setActiveSectionId(id);
        }
      },
      { root, rootMargin: "-10% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    // Sections register themselves into sectionRefs as they mount; observe once present.
    const attach = () => {
      Object.entries(sectionRefs.current).forEach(([id, el]) => {
        if (el) {
          el.dataset.sectionId = id;
          observer.observe(el);
        }
      });
    };
    // Run after paint so images/layout have settled (also covers late-loading images).
    const raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [isOpen, project?.id]);

  const handleSelectSection = (id: string) => {
    const target = sectionRefs.current[id];
    const root = scrollRef.current;
    if (!target || !root) return;
    clickScrollLock.current = true;
    setActiveSectionId(id);
    const offset = target.offsetTop - root.offsetTop - 4;
    root.scrollTo({ top: offset, behavior: reduceMotion ? "auto" : "smooth" });
    window.setTimeout(() => {
      clickScrollLock.current = false;
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.windowTitle} project page`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
          transition={reduceMotion ? { duration: 0.18 } : { type: "spring", stiffness: 340, damping: 32 }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8"
        >
          <div
            className="pointer-events-auto flex h-full max-h-[760px] w-full max-w-[940px] flex-col overflow-hidden rounded-[20px] border border-borderSubtle bg-[#FAFAFA] shadow-[0_30px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.10)]"
            style={{ height: "78%" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex h-[44px] shrink-0 items-center border-b border-borderLight bg-white px-4">
              <div className="traffic-lights flex items-center gap-2">
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close project page"
                  className="h-[12px] w-[12px] rounded-full bg-ctlClose transition-opacity hover:opacity-80"
                />
                <span className="h-[12px] w-[12px] rounded-full bg-ctlMin" />
                <span className="h-[12px] w-[12px] rounded-full bg-ctlMax" />
              </div>
              <span className="ml-4 text-[13px] font-medium text-inkStrong">{project.windowTitle}</span>
              <div className="ml-auto flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-[6px] w-[6px] rounded-full bg-[#D5D5D5]" />
                ))}
              </div>
            </div>

            {/* Body: left nav + scrollable content */}
            <div className="flex min-h-0 flex-1">
              <ProjectSectionNav
                sections={project.sections}
                activeId={activeSectionId}
                onSelect={handleSelectSection}
                className="hidden w-[176px] shrink-0 overflow-y-auto border-r border-borderFaint px-3 py-6 sm:block"
              />

              <div ref={scrollRef} className="app-scroll min-h-0 flex-1 overflow-y-auto">
                {/* Compact horizontal nav for narrow widths */}
                <div className="sticky top-0 z-10 -mb-px overflow-x-auto border-b border-borderFaint bg-[#FAFAFA]/95 px-4 py-2 backdrop-blur-sm sm:hidden">
                  <div className="flex gap-4">
                    {project.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSelectSection(section.id)}
                        aria-current={section.id === activeSectionId ? "true" : undefined}
                        className={`shrink-0 whitespace-nowrap text-[12.5px] transition-colors ${
                          section.id === activeSectionId ? "font-medium text-inkStrong" : "text-inkTertiary"
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>

                <ProjectCaseStudy project={project} scrollRef={scrollRef} sectionRefs={sectionRefs} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
