import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ----------------------------- editable config ---------------------------- */

export const badgeProfile = {
  name: "Temitope Aiyegbusi",
  role: "Product Designer & AI Design Engineer",
  photo: "/images/temitope-aiyegbusi.jpg", // replace with your real photo
};

/* --------------------------------- config --------------------------------- */

const CARD_W = 230;
const CARD_H = 300;
const ROPE_REST = 92; // resting vertical distance anchor -> clip
const CLIP_TO_CARD = 14; // gap from clip bottom to card top
const STAGE_H = ROPE_REST + CLIP_TO_CARD + CARD_H + 110;

// physics constants — tuned for fluid, lasting elasticity
const STIFFNESS = 0.085;
const DAMPING = 0.9;
const ANG_STIFFNESS = 0.08;
const ANG_DAMPING = 0.88;

// drag bounds
const MAX_X = 180;
const MIN_Y = -30;
const MAX_Y = 220;

export default function HangingIDBadge() {
  const reduceMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropePathRef = useRef<SVGPathElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  const phys = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rot: 0,
    avel: 0,
    dragging: false,
    pointerX: 0,
    pointerY: 0,
  });

  const raf = useRef<number>();

  useEffect(() => {
    if (reduceMotion) {
      drawRope(0, 0, 0);
      if (cardRef.current) cardRef.current.style.transform = "translate(0px, 0px)";
      return;
    }

    const tick = () => {
      const s = phys.current;

      if (s.dragging) {
        const targetX = clamp(s.pointerX, -MAX_X, MAX_X);
        const targetY = clamp(s.pointerY, MIN_Y, MAX_Y);
        const nx = s.x + (targetX - s.x) * 0.4;
        const ny = s.y + (targetY - s.y) * 0.4;
        s.vx = nx - s.x;
        s.vy = ny - s.y;
        s.x = nx;
        s.y = ny;
      } else {
        // spring back — gravity only applies horizontally-neutral downward bias
        const forceX = (0 - s.x) * STIFFNESS;
        const forceY = (0 - s.y) * STIFFNESS;
        s.vx = (s.vx + forceX) * DAMPING;
        s.vy = (s.vy + forceY) * DAMPING;
        s.x += s.vx;
        s.y += s.vy;
        // gentle settle ONLY when truly at rest (very small threshold so motion stays fluid)
        if (
          Math.abs(s.x) < 0.01 &&
          Math.abs(s.y) < 0.01 &&
          Math.abs(s.vx) < 0.01 &&
          Math.abs(s.vy) < 0.01
        ) {
          s.x = 0;
          s.y = 0;
          s.vx = 0;
          s.vy = 0;
        }
      }

      // rotation from horizontal offset + velocity
      const targetRot = clamp(s.x * 0.06 + s.vx * 0.5, -14, 14);
      const angForce = (targetRot - s.rot) * ANG_STIFFNESS;
      s.avel = (s.avel + angForce) * ANG_DAMPING;
      s.rot += s.avel;

      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg)`;
      }
      drawRope(s.x, s.y, s.rot);

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  /* ----- reactive lanyard curve ----- */
  function drawRope(x: number, y: number, rot: number) {
    const path = ropePathRef.current;
    const clip = clipRef.current;
    if (!path) return;

    const ax = (stageRef.current?.clientWidth ?? 600) / 2;
    const ay = 4;

    // clip sits at end of rope, following the card
    const cx = ax + x;
    const cy = ay + ROPE_REST + y;

    // natural curve: control points lag the card for a soft S-curve
    const sag = phys.current.dragging ? 4 : 10;
    const c1x = ax + x * 0.1;
    const c1y = ay + (cy - ay) * 0.4 + sag;
    const c2x = ax + x * 0.55;
    const c2y = ay + (cy - ay) * 0.75;

    path.setAttribute("d", `M ${ax} ${ay} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${cx} ${cy}`);

    if (clip) {
      clip.style.transform = `translate(${cx}px, ${cy}px) rotate(${rot * 0.5}deg)`;
    }
  }

  /* ----- pointer handlers ----- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    const s = phys.current;
    s.dragging = true;
    const ax = stage.left + stage.width / 2;
    const ay = stage.top + 4 + ROPE_REST;
    s.pointerX = e.clientX - ax;
    s.pointerY = e.clientY - ay;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = phys.current;
    if (!s.dragging) return;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    const ax = stage.left + stage.width / 2;
    const ay = stage.top + 4 + ROPE_REST;
    s.pointerX = e.clientX - ax;
    s.pointerY = e.clientY - ay;
  };

  const endDrag = (e: React.PointerEvent) => {
    const s = phys.current;
    s.dragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    document.body.style.userSelect = "";
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      const s = phys.current;
      s.x = s.y = s.vx = s.vy = s.rot = s.avel = 0;
    }
  };

  return (
    <div ref={stageRef} className="relative -mt-6 mb-2 w-full" style={{ height: STAGE_H }}>
      {/* anchor dot */}
      <div className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-[#161616] shadow" />

      {/* reactive lanyard */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="rope-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0d0d0d" />
            <stop offset="0.5" stopColor="#2a2a2a" />
            <stop offset="1" stopColor="#0d0d0d" />
          </linearGradient>
        </defs>
        <path ref={ropePathRef} d="" fill="none" stroke="url(#rope-grad)" strokeWidth="18" strokeLinecap="round" />
      </svg>

      {/* clip + ring, positioned at rope end by JS */}
      <div
        ref={clipRef}
        className="absolute left-0 top-0 z-10"
        style={{ transform: `translate(50%, ${4 + ROPE_REST}px)` }}
      >
        <div className="flex -translate-x-1/2 flex-col items-center">
          <div className="h-5 w-5 rounded-full border-[3.5px] border-[#a0a0a4] shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
          <div className="-mt-2 h-4 w-2.5 rounded-b-full bg-gradient-to-b from-[#3a3a3a] to-[#0d0d0d] shadow" />
        </div>
      </div>

      {/* draggable card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 z-[8] cursor-grab touch-none active:cursor-grabbing"
        style={{
          top: 4 + ROPE_REST + CLIP_TO_CARD,
          marginLeft: -CARD_W / 2,
          width: CARD_W,
          willChange: "transform",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="img"
        aria-label={`Interactive ID badge for ${badgeProfile.name}. Drag to pull and swing it.`}
      >
        <BadgeCard />
      </div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* --------------------------------- card ----------------------------------- */

function BadgeCard() {
  return (
    <div
      className="relative flex flex-col items-center overflow-hidden rounded-[26px] border border-black/[0.06] bg-gradient-to-b from-white to-[#eef0f2] shadow-[0_22px_50px_rgba(0,0,0,0.22)]"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* slot hole */}
      <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/15" />

      {/* glossy highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />

      {/* photo */}
      <div className="mt-[52px] h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
        <img
          src={badgeProfile.photo}
          alt={badgeProfile.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* name + designation */}
      <div className="mt-6 px-5 text-center">
        <p className="text-[16px] font-bold text-inkStrong">{badgeProfile.name}</p>
        <p className="mt-1.5 text-[11px] leading-snug text-inkTertiary">{badgeProfile.role}</p>
      </div>
    </div>
  );
}
