import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/* ----------------------------- editable config ---------------------------- */

export const badgeProfile = {
  name: "Temitope Aiyegbusi",
  title: "Product Designer & AI Design Engineer",
  photo: "/images/temitope-aiyegbusi.jpg", // replace with your real photo
};

/* ------------------------------------------------------------------ */
/* A pendulum badge: a fixed pin at the very top of the Notes content, */
/* a rope straight down, and a card that swings from it.              */
/* ------------------------------------------------------------------ */

const ROPE_LENGTH = 120;

export default function HangingIDBadge() {
  const reduceMotion = useReducedMotion();
  const [angle, setAngle] = useState(0); // current rope angle (deg)
  const dragging = useRef(false);
  const velocity = useRef(0);
  const lastAngle = useRef(0);
  const raf = useRef<number>();
  const pivotRef = useRef<HTMLDivElement>(null);

  /* ----- pendulum physics loop (runs only when not dragging) ----- */
  useEffect(() => {
    if (reduceMotion) return;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (!dragging.current) {
        setAngle((a) => {
          // spring toward 0 + damping (pendulum)
          const stiffness = 50;
          const damping = 4.5;
          const accel = -stiffness * (a * (Math.PI / 180)) - damping * velocity.current;
          velocity.current += accel * dt;
          const next = a + velocity.current * dt * (180 / Math.PI);
          if (Math.abs(next) < 0.05 && Math.abs(velocity.current) < 0.05) {
            velocity.current = 0;
            return 0;
          }
          return next;
        });
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduceMotion]);

  /* ----- pointer drag: compute angle from pivot to pointer ----- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    dragging.current = true;
    lastAngle.current = angle;
    velocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !pivotRef.current) return;
    const pivot = pivotRef.current.getBoundingClientRect();
    const dx = e.clientX - (pivot.left + pivot.width / 2);
    const dy = e.clientY - (pivot.top + pivot.height / 2);
    // angle of the rope from vertical
    let deg = Math.atan2(dx, Math.max(dy, 10)) * (180 / Math.PI);
    deg = Math.max(-60, Math.min(60, deg)); // clamp swing
    velocity.current = (deg - lastAngle.current) * 0.5;
    lastAngle.current = deg;
    setAngle(deg);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative -mt-6 mb-2 flex w-full justify-center" style={{ height: ROPE_LENGTH + 250 }}>
      {/* Pivot pinned to the very top of the content area */}
      <div ref={pivotRef} className="absolute top-0 left-1/2 -translate-x-1/2">
        {/* anchor knot */}
        <div className="relative z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#161616] shadow" />

        {/* the swinging assembly rotates around the pivot */}
        <div
          className="absolute left-0 top-1.5 origin-top"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: dragging.current ? "none" : "transform 0.05s linear",
          }}
        >
          {/* rope */}
          <div className="mx-auto h-[120px] w-[22px] -translate-x-1/2 overflow-hidden bg-[#161616]">
            <div className="flex h-full flex-col items-center justify-around py-2">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="text-[7px] font-bold uppercase tracking-wider text-white/60"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {badgeProfile.name}
                </span>
              ))}
            </div>
          </div>

          {/* clip */}
          <div className="mx-auto -mt-px flex w-max -translate-x-1/2 flex-col items-center">
            <div className="h-4 w-4 rounded-full border-[3px] border-[#9a9a9e]" />
            <div className="-mt-1.5 h-4 w-2.5 rounded-b-full bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d]" />
          </div>

          {/* card */}
          <div
            className="mx-auto -mt-0.5 -translate-x-1/2 cursor-grab touch-none active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            role="img"
            aria-label={`Interactive ID badge for ${badgeProfile.name}. Drag to swing it.`}
          >
            <BadgeCard />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- card ----------------------------------- */

function BadgeCard() {
  return (
    <div className="relative h-[230px] w-[176px] overflow-hidden rounded-[24px] border border-black/[0.06] bg-gradient-to-b from-white to-[#f1f1f3] shadow-[0_18px_44px_rgba(0,0,0,0.20)]">
      {/* glossy highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />

      {/* photo */}
      <div className="absolute left-1/2 top-9 h-[104px] w-[104px] -translate-x-1/2 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
        <img
          src={badgeProfile.photo}
          alt={badgeProfile.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
          }}
        />
      </div>

      {/* name + role */}
      <div className="absolute inset-x-0 bottom-7 px-4 text-center">
        <p className="text-[14px] font-bold text-inkStrong">{badgeProfile.name}</p>
        <p className="mt-1 text-[10px] leading-tight text-inkTertiary">{badgeProfile.title}</p>
      </div>
    </div>
  );
}
