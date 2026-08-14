import { useState, useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/sanity";
import { useProjects } from "../../hooks/useProjects";

const SPEED = 55;

const fallbackCards = [
  { key: "f1", title: "Flyer Design" },
  { key: "f2", title: "Church Design" },
  { key: "f3", title: "Social Media Design" },
  { key: "f4", title: "Event Branding" },
  { key: "f5", title: "Brand Identity" },
  { key: "f6", title: "Poster Series" },
];

const MarqueeCard = ({ src, title, slug, onClick }) => {
  const cardClass =
    "group/card relative w-64 sm:w-80 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0d] transition-transform duration-300 hover:scale-105";

  const content = (
    <>
      {src ? (
        <img
          src={src}
          alt={title || "Design project"}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover/card:scale-110"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-500/25 via-secondary-500/30 to-transparent" />
      )}
      {onClick && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
          <div className="flex flex-col items-center gap-1 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span className="text-xs md:text-sm font-medium">Click to view</span>
          </div>
        </div>
      )}
      {title && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
      )}
    </>
  );

  if (slug) {
    return (
      <Link to={`/project/${slug}`} className={`${cardClass} block`}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={`${cardClass} cursor-pointer`}
      >
        {content}
      </div>
    );
  }

  return <div className={cardClass}>{content}</div>;
};

const MarqueeRow = ({ items, reverse = false }) => {
  const trackRef = useRef(null);
const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    if (!reverse) return;
    if (!trackRef.current) return;
    x.set(-trackRef.current.offsetWidth / 2);
  }, [reverse, x]);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;

    const half = trackRef.current.offsetWidth / 2;
    if (half === 0) return;

    const dir = reverse ? 1 : -1;
    let next = x.get() + dir * (SPEED * (delta / 1000));

    // Both rows live in [-half, 0). A positive translate would expose blank
    // space on the left, so the reverse row also wraps in [-half, 0).
    next = ((next % half) + half) % half;
    next -= half;

    x.set(next);
  });

  // Track = 8x items (4 identical loop-units of 2x each) so the half-track
  // wrap window is always at least as wide as the container — no blank gaps.
  const loopUnit = [...items, ...items];
  const trackItems = [...loopUnit, ...loopUnit, ...loopUnit, ...loopUnit];

  return (
    <div
      className="group/row relative overflow-hidden w-full [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className={`flex w-max gap-5 pr-5 will-change-transform ${
          reverse ? "-ml-32 sm:-ml-40" : ""
        }`}
      >
        {trackItems.map((item, i) => (
          <MarqueeCard key={`${item.key}-${i}`} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeGallery = ({ items }) => {
  const { projects } = useProjects();

  const derived =
    items && items.length > 0
      ? items
      : (projects || [])
          .filter((p) => p.featuredImage)
          .map((p) => ({
            key: p._id || p.slug?.current || p.title,
            title: p.title,
            slug: p.slug?.current,
            src: urlFor(p.featuredImage)
              .width(640)
              .quality(80)
              .auto("format")
              .url(),
          }));

  const source = derived.length > 0 ? derived : fallbackCards;

  return (
    <section className="relative overflow-hidden py-8 [perspective:1000px]">
      <div className="[transform:rotateX(8deg)_rotateZ(-4deg)_scale(1.05)]">
        <MarqueeRow items={source} />
        <div className="h-6" aria-hidden="true" />
        <MarqueeRow items={[...source].reverse()} reverse />
      </div>
    </section>
  );
};

export default MarqueeGallery;