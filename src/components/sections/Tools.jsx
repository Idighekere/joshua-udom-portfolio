import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wrench01Icon,
  ColorsIcon,
  AdobePhotoshopIcon,
  AdobeIllustratorIcon,
  FigmaIcon,
} from "@hugeicons/core-free-icons";
import { glowCardClass, GlowSection } from "../ui/GlowCard";

const tools = [
  { name: "Figma", icon: FigmaIcon },
  { name: "CorelDraw", icon: ColorsIcon },
  { name: "Photoshop", icon: AdobePhotoshopIcon },
  { name: "Illustrator", icon: AdobeIllustratorIcon },
];

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Projects Completed" },
];

const Tools = () => {
  return (
    <section id="tools" className="py-16 md:py-24 bg-neutral-900/30">
      <GlowSection className="container mx-auto px-6 pt-10 md:pt-14">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 border border-primary-500/20">
            <HugeiconsIcon
              icon={Wrench01Icon}
              size={28}
              color="currentColor"
              className="text-primary-400"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Tools & Skills</h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto">
            The design tools I use daily to bring ideas to life.
          </p>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-16">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`flex flex-col items-center gap-3 p-6 ${glowCardClass} border border-white/10 hover:border-primary-500/40 transition-colors`}
            >
              <div className="p-3 rounded-xl bg-primary-500/10">
                <HugeiconsIcon
                  icon={tool.icon}
                  size={28}
                  color="currentColor"
                  className="text-primary-400"
                />
              </div>
              <span className="font-medium text-neutral-300 text-xs md:text-sm">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`text-center p-6 ${glowCardClass} border border-white/10 hover:border-primary-500/40 transition-colors`}
            >
              <span className="block text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                {stat.value}
              </span>
              <span className="text-neutral-500 text-xs md:text-sm uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
</GlowSection>
    </section>
  );
};

export default Tools;
