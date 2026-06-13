import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/* ----------------------------- editable config ---------------------------- */

export const badgeProfile = {
  name: "Temitope Aiyegbusi",
  title: "Product Designer & AI Design Engineer",
  photo: "/images/temitope-aiyegbusi.jpg", // replace with your real photo
};

const ROPE_LENGTH = 110;
const MAX_SWING = 55; // degrees

export default function HangingIDBadge() {
  const reduceMotion = useReducedMotion();
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const velRef = useRef(0);
  const dragging = useRef(false);
  const pivotRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>();

  useEffect(() => {
    angleRef.current = angle;
  }, [angle]);

  /* ----- pendulum spring loop (only settles when not dragging) ----- */
  useEffect(() => {
    if (reduceMotion) return;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.04);
      prev = now;

      if (!dragging.current) {
        const a = angleRef.current;
        const stiffness = 60;
        const damping = 5;
        const accel = -stiffness * a - damping * velRef.current;
        velRef.current += accel * dt;
        let next = a + velRef.current * dt;
        if (Math.abs(next) < 0.02 && Math.abs(velRef.current) < 0.02) {
          next = 0;
          velRef.current = 0;
        }
        angleRef.current = next;
        setAngle(next);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduceMotion]);

  /* ----- drag: rope points toward the pointer ----- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    dragging.current = true;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !pivotRef.current) return;
    const p = pivotRef.current.getBoundingClientRect();
    const dx = e.clientX - p.left;
    const dy = Math.max(e.clientY - p.top, 12);
    // angle of rope from vertical; positive CSS-rotate swings the card LEFT,
    // so negate atan2 to make the card follow the pointer correctly.
    let deg = (Math.atan2(dx, dy) * 180) / Math.PI;
    deg = Math.max(-MAX_SWING, Math.min(MAX_SWING, deg));
    const prevA = angleRef.current;
    velRef.current = (deg - prevA) * 8;
    angleRef.current = deg;
    setAngle(deg);
  };

  const endDrag = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative -mt-6 mb-4 w-full" style={{ height: ROPE_LENGTH + 270 }}>
      {/* Pivot: a zero-width reference point at top-center of the content */}
      <div ref={pivotRef} className="absolute left-1/2 top-0">
        {/* fixed anchor dot, centered on the pivot */}
        <div className="absolute left-0 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#161616] shadow" />

        {/* centering wrapper (handles horizontal centering only) */}
        <div className="absolute left-0 top-0 -translate-x-1/2">
          {/* rotation wrapper (handles ONLY rotation, origin at pivot) */}
          <div
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "top center",
              transition: dragging.current ? "none" : undefined,
            }}
          >
            <div className="flex flex-col items-center">
              {/* rope */}
              <div className="flex h-[110px] w-[22px] flex-col items-center justify-around overflow-hidden bg-[#161616] py-2">
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="text-[7px] font-bold uppercase tracking-wider text-white/55"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {badgeProfile.name}
                  </span>
                ))}
              </div>

              {/* clip */}
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 rounded-full border-[3px] border-[#9a9a9e]" />
                <div className="-mt-1.5 h-4 w-2.5 rounded-b-full bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d]" />
              </div>

              {/* card */}
              <div
                className="-mt-0.5 cursor-grab touch-none active:cursor-grabbing"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                role="img"
                aria-label={`Interactive ID badge for ${badgeProfile.name}. Drag to swing it.`}
              >
                <BadgeCard />
              </div>
            </div>
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />

      <div className="absolute left-1/2 top-9 h-[104px] w-[104px] -translate-x-1/2 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
        <img
          src={badgeProfile.photo}
          alt={badgeProfile.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-7 px-4 text-center">
        <p className="text-[14px] font-bold text-inkStrong">{badgeProfile.name}</p>
        <p className="mt-1 text-[10px] leading-tight text-inkTertiary">{badgeProfile.title}</p>
      </div>
    </div>
  );
}
