import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Orbs */}
      <div className="bg-orb w-96 h-96 bg-primary-500/20 top-20 left-10 blur-[100px]"></div>
      <div className="bg-orb w-64 h-64 bg-secondary-500/30 bottom-20 right-10 blur-[80px] animation-delay-2000"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
        >
          <span className="relative flex shrink-0 h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Available for work
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl  font-bold leading-tight text-white max-w-4xl mx-auto"
        >
          Partnering with brands to create{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">
            strategic designs
          </span>{" "}
          that work.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-20"
        >
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-primary-500 to-primary-400 shadow-[0_0_20px_rgba(0,149,199,0.3)] hover:shadow-[0_0_35px_rgba(0,149,199,0.5)] transition-shadow duration-300 overflow-hidden"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative">View My Projects</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
