import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ----------------------------- editable config ---------------------------- */

export const badgeProfile = {
  name: "Temitope Aiyegbusi",
  role: "Product Designer and AI Design Engineer",
  handle: "@thearchdzim",
  photo: "/images/temitope-aiyegbusi.jpg", // replace with your real photo
  badgeLabel: "PORTFOLIO ID",
  badgeNumber: "USER 001",
  traits: ["Clarity Driven", "User First"],
};

/* --------------------------------- config --------------------------------- */

const CARD_W = 248;
const CARD_H = 348;
const ROPE_REST = 96; // resting vertical distance anchor -> clip
const STAGE_H = ROPE_REST + CARD_H + 120;

// physics constants
const STIFFNESS = 0.11;
const DAMPING = 0.86;
const ANG_STIFFNESS = 0.09;
const ANG_DAMPING = 0.84;
const GRAVITY = 0.4;

// drag bounds
const MAX_X = 180;
const MIN_Y = -30;
const MAX_Y = 220;

export default function HangingIDBadge() {
  const reduceMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropePathRef = useRef<SVGPathElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  // physics state (refs - no react re-render per frame)
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
    lastPointerX: 0,
    scale: 1,
  });

  const raf = useRef<number>();

  useEffect(() => {
    if (reduceMotion) {
      // static render: straight rope, no animation
      drawRope(0, 0);
      return;
    }

    const tick = () => {
      const s = phys.current;

      if (s.dragging) {
        // smoothing toward pointer (weighted lag)
        const targetX = clamp(s.pointerX, -MAX_X, MAX_X);
        const targetY = clamp(s.pointerY, MIN_Y, MAX_Y);
        const nx = s.x + (targetX - s.x) * 0.35;
        const ny = s.y + (targetY - s.y) * 0.35;
        s.vx = nx - s.x;
        s.vy = ny - s.y;
        s.x = nx;
        s.y = ny;
      } else {
        // spring back to rest with gravity
        const forceX = (0 - s.x) * STIFFNESS;
        const forceY = (0 - s.y) * STIFFNESS + GRAVITY;
        s.vx = (s.vx + forceX) * DAMPING;
        s.vy = (s.vy + forceY) * DAMPING;
        s.x += s.vx;
        s.y += s.vy;

        if (
          Math.abs(s.x) < 0.05 &&
          Math.abs(s.y) < 0.05 &&
          Math.abs(s.vx) < 0.05 &&
          Math.abs(s.vy) < 0.05
        ) {
          s.x = 0;
          s.y = 0;
          s.vx = 0;
          s.vy = 0;
        }
      }

      // rotation from horizontal offset + velocity
      const targetRot = clamp(s.x * 0.05 + s.vx * 0.4, -16, 16);
      const angForce = (targetRot - s.rot) * ANG_STIFFNESS;
      s.avel = (s.avel + angForce) * ANG_DAMPING;
      s.rot += s.avel;

      // tension-based scale
      const dist = Math.hypot(s.x, s.y);
      const tension = Math.min(dist / 220, 1);
      const scaleX = 1 + (Math.abs(s.x) / MAX_X) * 0.015 + tension * 0.02;
      const scaleY = 1 + (Math.max(s.y, 0) / MAX_Y) * 0.025 + tension * 0.02;

      // apply transforms
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg) scale(${scaleX}, ${scaleY})`;
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

  /* ----- draw the reactive lanyard curve ----- */
  function drawRope(x: number, y: number, rot = 0) {
    const path = ropePathRef.current;
    const clip = clipRef.current;
    if (!path) return;

    // anchor at top-center of stage (local svg coords)
    const ax = (stageRef.current?.clientWidth ?? 600) / 2;
    const ay = 6;

    // clip point = where the card top-center connector sits
    const cx = ax + x;
    const cy = ay + ROPE_REST + y;

    // control points create a natural curve / sag
    const midX = ax + x * 0.5;
    const sag = phys.current.dragging ? 6 : 14; // less sag when taut
    const c1x = ax + x * 0.15;
    const c1y = ay + (cy - ay) * 0.35 + sag;
    const c2x = midX + x * 0.2;
    const c2y = ay + (cy - ay) * 0.7;

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
    const ay = stage.top + 6 + ROPE_REST;
    s.pointerX = e.clientX - ax;
    s.pointerY = e.clientY - ay;
    s.lastPointerX = s.pointerX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.userSelect = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = phys.current;
    if (!s.dragging) return;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    const ax = stage.left + stage.width / 2;
    const ay = stage.top + 6 + ROPE_REST;
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
      s.x = 0;
      s.y = 0;
      s.vx = 0;
      s.vy = 0;
      s.rot = 0;
      s.avel = 0;
    }
  };

  return (
    <div
      ref={stageRef}
      className="relative -mt-6 mb-2 w-full"
      style={{ height: STAGE_H }}
    >
      {/* anchor dot */}
      <div
        ref={anchorRef}
        className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-[#161616] shadow"
      />

      {/* reactive lanyard (SVG) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id="rope-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0d0d0d" />
            <stop offset="0.5" stopColor="#222" />
            <stop offset="1" stopColor="#0d0d0d" />
          </linearGradient>
        </defs>
        <path
          ref={ropePathRef}
          d=""
          fill="none"
          stroke="url(#rope-grad)"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>

      {/* clip + ring (positioned by JS at the rope end) */}
      <div
        ref={clipRef}
        className="absolute left-0 top-0 z-10 -translate-x-1/2"
        style={{ transform: `translate(50%, ${6 + ROPE_REST}px)` }}
      >
        <div className="flex flex-col items-center">
          {/* metal ring */}
          <div className="h-5 w-5 rounded-full border-[3.5px] border-[#a0a0a4] bg-transparent shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
          {/* hook */}
          <div className="-mt-2 h-5 w-3 rounded-b-full bg-gradient-to-b from-[#3a3a3a] to-[#0d0d0d] shadow" />
        </div>
      </div>

      {/* draggable card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 z-[8] cursor-grab touch-none active:cursor-grabbing"
        style={{
          top: 6 + ROPE_REST + 18,
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

/* --------------------------------- helpers -------------------------------- */

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* --------------------------------- card ----------------------------------- */

function BadgeCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[26px] border border-black/[0.06] bg-gradient-to-b from-white to-[#eef0f2] shadow-[0_22px_50px_rgba(0,0,0,0.22)]"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* slot hole at top */}
      <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/15" />

      {/* glossy highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />

      {/* background typography */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center opacity-[0.07]">
        {["PRODUCT", "DESIGNER", "AI DESIGN", "ENGINEER"].map((w, i) => (
          <span
            key={i}
            className="text-center text-[30px] font-extrabold italic leading-[0.92] tracking-tight text-black"
          >
            {w}
          </span>
        ))}
      </div>

      {/* top label */}
      <div className="absolute left-4 top-7 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-black" />
        <span className="text-[8px] font-semibold uppercase tracking-wider text-inkTertiary">
          {badgeProfile.badgeLabel}
        </span>
      </div>

      {/* photo */}
      <div className="absolute left-1/2 top-[78px] h-[120px] w-[120px] -translate-x-1/2 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
        <img
          src={badgeProfile.photo}
          alt={badgeProfile.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
          }}
        />
      </div>

      {/* trait stickers */}
      <div className="absolute left-3 top-[150px] rotate-[-8deg]">
        <Sticker label={badgeProfile.traits[0]} />
      </div>
      <div className="absolute right-3 top-[190px] rotate-[8deg]">
        <Sticker label={badgeProfile.traits[1]} />
      </div>

      {/* name + role */}
      <div className="absolute inset-x-0 bottom-6 px-4 text-center">
        <p className="text-[16px] font-bold text-inkStrong">{badgeProfile.name}</p>
        <p className="mt-1 text-[10.5px] leading-tight text-inkTertiary">{badgeProfile.role}</p>
        <p className="mt-1.5 text-[8.5px] font-medium tracking-wide text-inkMuted">
          {badgeProfile.handle} · {badgeProfile.badgeNumber}
        </p>
      </div>
    </div>
  );
}

function Sticker({ label }: { label: string }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <path
          d="M50 2l9 13 15-6 3 16 16 3-6 15 13 9-13 9 6 15-16 3-3 16-15-6-9 13-9-13-15 6-3-16-16-3 6-15-13-9 13-9-6-15 16-3 3-16 15 6z"
          fill="#fff"
          stroke="#7c3aed"
          strokeWidth="2.5"
        />
      </svg>
      <span className="relative px-1 text-center text-[7px] font-bold uppercase leading-tight text-[#7c3aed]">
        {label}
      </span>
    </div>
  );
}
