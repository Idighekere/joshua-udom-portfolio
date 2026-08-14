export const glowCardClass =
  "relative overflow-hidden rounded-3xl bg-[#0c0c0d]";

export const TopGlow = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 rounded-3xl border-t border-white/30 [-webkit-mask-image:linear-gradient(to_bottom,black,black_4px,transparent)] [mask-image:linear-gradient(to_bottom,black,black_4px,transparent)] ${className}`}
  />
);

export const GlowSection = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden rounded-3xl ${className}`}>
    <TopGlow />
    {children}
  </div>
);
