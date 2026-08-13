import { motion } from 'framer-motion'

const ArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
)

const ArrowUpRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
  </svg>
)

const Button = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  const base = "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300"

  if (variant === "primary") {
    return (
      <motion.button
        onClick={onClick}
        {...props}
        style={{ backgroundImage: "linear-gradient(to bottom, #236553, #123C32)" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} text-white shadow-[0_10px_24px_-8px_rgba(35,101,83,0.7)] ${className}`}
      >
        {/* Inset top highlight for glass-edge depth */}
        <span aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <span className="relative">{children}</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </motion.button>
    )
  }

  if (variant === "outline") {
    return (
      <motion.button
        onClick={onClick}
        {...props}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} text-white ring-1 ring-white/10 bg-white/5 backdrop-blur-sm ${className}`}
      >
        {/* Moving border beam */}
        <span aria-hidden="true"
          className="beam-mask pointer-events-none absolute inset-0 rounded-full p-px opacity-70 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute inset-[-150%] animate-[beam-spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#00bce9_20deg,transparent_55deg)] group-hover:[animation-duration:2s]" />
        </span>
        <span className="relative">{children}</span>
        {/* Subtle icon indicator revealed on hover */}
        <ArrowUpRight className="relative h-4 w-4 -ml-1 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
      </motion.button>
    )
  }

  // ghost
  return (
    <motion.button
      onClick={onClick}
      {...props}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} text-neutral-500 hover:text-white ${className}`}
    >
      <span className="relative">{children}</span>
    </motion.button>
  )
}

export default Button
