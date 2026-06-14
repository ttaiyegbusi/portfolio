interface LoadingProgressBarProps {
  progress: number; // 0..100
}

/**
 * Thin macOS-style progress bar. Soft gray track, refined fill.
 * Width is driven by `progress` with a smooth CSS transition so the bar
 * eases rather than jumps. Carries full progressbar a11y semantics.
 */
export default function LoadingProgressBar({ progress }: LoadingProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-label="Loading portfolio"
      className="h-[9px] w-full overflow-hidden rounded-full bg-[#E3E3E5] shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.06)]"
    >
      <div
        className="h-full rounded-full bg-gradient-to-b from-[#9A9CA1] to-[#76787D] transition-[width] duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
