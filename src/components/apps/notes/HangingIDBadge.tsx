import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";

/* ----------------------------- editable config ---------------------------- */

export const badgeProfile = {
  name: "Temitope Aiyegbusi",
  title: "Product Designer and AI Design Engineer",
  handle: "@thearchdzim",
  photo: "/images/temitope-aiyegbusi.jpg", // replace with your real photo
  badgeLabel: "PORTFOLIO ID",
  badgeNumber: "USER 001",
};

/* -------------------------------- component -------------------------------- */

export default function HangingIDBadge() {
  const reduceMotion = useReducedMotion();
  const constraintsRef = useRef<HTMLDivElement>(null);

  // raw drag offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // springy version of the offsets used to drive lanyard + rotation
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  // rotate the card based on horizontal pull (-10deg..10deg)
  const rotate = useTransform(sx, [-160, 160], [-10, 10]);

  // lanyard tilt mirrors the card so the strap "follows" the badge
  const strapRotate = useTransform(sx, [-160, 160], [-6, 6]);
  const strapHeight = useTransform(sy, [-40, 180], [54, 120]);

  function handleDragEnd(_: unknown, __: PanInfo) {
    // spring back to rest
    x.set(0);
    y.set(0);
  }

  if (reduceMotion) {
    // static, no swing
    return (
      <div className="flex justify-center pt-2 pb-6" aria-label={`Interactive ID badge for ${badgeProfile.name}`}>
        <div className="flex flex-col items-center">
          <Strap />
          <Clip />
          <BadgeCard />
        </div>
      </div>
    );
  }

  return (
    <div ref={constraintsRef} className="relative flex justify-center pt-1 pb-8 select-none">
      <div className="flex flex-col items-center" style={{ transformOrigin: "top center" }}>
        {/* Anchor + strap (follows the card) */}
        <motion.div style={{ rotate: strapRotate, transformOrigin: "top center" }} className="flex flex-col items-center">
          <motion.div style={{ height: strapHeight }}>
            <Strap />
          </motion.div>
          <Clip />
        </motion.div>

        {/* Draggable card */}
        <motion.div
          drag
          dragConstraints={{ left: -160, right: 160, top: -40, bottom: 180 }}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 240, bounceDamping: 16 }}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.02, cursor: "grabbing" }}
          style={{ x, y, rotate, transformOrigin: "top center", cursor: "grab" }}
          className="-mt-1"
          aria-label={`Interactive ID badge for ${badgeProfile.name}. Drag to play.`}
          role="img"
        >
          <BadgeCard />
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------- pieces --------------------------------- */

function Strap() {
  return (
    <div className="relative h-full w-[26px] overflow-hidden rounded-b-[2px] bg-[#161616]">
      {/* repeated handle text down the strap */}
      <div className="absolute inset-0 flex flex-col items-center justify-around py-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rotate-180 text-[7px] font-bold uppercase tracking-wider text-white/70"
            style={{ writingMode: "vertical-rl" }}
          >
            {badgeProfile.handle}
          </span>
        ))}
      </div>
    </div>
  );
}

function Clip() {
  return (
    <div className="flex flex-col items-center -mt-px">
      {/* metal ring */}
      <div className="h-4 w-4 rounded-full border-[3px] border-[#9a9a9e] bg-transparent shadow-sm" />
      {/* hook */}
      <div className="-mt-1 h-5 w-2.5 rounded-b-full bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] shadow" />
    </div>
  );
}

function BadgeCard() {
  return (
    <div className="relative h-[230px] w-[180px] overflow-hidden rounded-[22px] border border-black/[0.06] bg-gradient-to-b from-white to-[#f1f1f3] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      {/* glossy highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />

      {/* repeated background type */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center opacity-[0.08]">
        {["PRODUCT", "DESIGNER", "PRODUCT", "DESIGNER"].map((w, i) => (
          <span key={i} className="text-center text-[26px] font-extrabold italic leading-[0.95] tracking-tight text-black">
            {w}
          </span>
        ))}
      </div>

      {/* top label */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-black" />
        <span className="text-[8px] font-semibold uppercase tracking-wider text-inkTertiary">{badgeProfile.badgeLabel}</span>
      </div>

      {/* photo */}
      <div className="absolute left-1/2 top-[58px] h-[96px] w-[96px] -translate-x-1/2 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-md">
        <img
          src={badgeProfile.photo}
          alt={badgeProfile.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* sticker badges */}
      <div className="absolute left-2 top-[120px] rotate-[-8deg]">
        <Sticker label="Clarity Driven" />
      </div>
      <div className="absolute right-2 top-[150px] rotate-[8deg]">
        <Sticker label="User First" />
      </div>

      {/* name + role */}
      <div className="absolute inset-x-0 bottom-3 px-3 text-center">
        <p className="text-[12px] font-bold text-inkStrong">{badgeProfile.name}</p>
        <p className="mt-0.5 text-[8.5px] leading-tight text-inkTertiary">{badgeProfile.title}</p>
        <p className="mt-1 text-[8px] font-medium text-inkMuted">{badgeProfile.badgeNumber}</p>
      </div>
    </div>
  );
}

function Sticker({ label }: { label: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <path
          d="M50 2l9 13 15-6 3 16 16 3-6 15 13 9-13 9 6 15-16 3-3 16-15-6-9 13-9-13-15 6-3-16-16-3 6-15-13-9 13-9-6-15 16-3 3-16 15 6z"
          fill="#fff"
          stroke="#7c3aed"
          strokeWidth="2.5"
        />
      </svg>
      <span className="relative text-center text-[7px] font-bold uppercase leading-tight text-[#7c3aed]">{label}</span>
    </div>
  );
}
