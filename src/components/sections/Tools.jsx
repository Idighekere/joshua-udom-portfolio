import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wrench01Icon,
  ColorsIcon,
  AdobePhotoshopIcon,
  AdobeIllustratorIcon,
  FigmaIcon,
} from "@hugeicons/core-free-icons";

const tools = [
  { name: "CorelDraw", icon: ColorsIcon },
  { name: "Photoshop", icon: AdobePhotoshopIcon },
  { name: "Illustrator", icon: AdobeIllustratorIcon },
  { name: "Figma", icon: FigmaIcon },
];

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "30+", label: "Projects Completed" },
];

const Tools = () => {
  return (
    <section id="tools" className="py-24 bg-neutral-900/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <HugeiconsIcon
              icon={Wrench01Icon}
              size={28}
              color="currentColor"
              className="text-primary-400"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Tools & Skills</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            The design tools I use daily to bring ideas to life.
          </p>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mt-6"></div>
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
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-primary-500/30 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary-500/10">
                <HugeiconsIcon
                  icon={tool.icon}
                  size={28}
                  color="currentColor"
                  className="text-primary-400"
                />
              </div>
              <span className="font-medium text-neutral-300 text-sm">
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
              className="text-center p-6 rounded-xl bg-neutral-900 border border-neutral-800"
            >
              <span className="block text-4xl font-bold text-primary-500 mb-2">
                {stat.value}
              </span>
              <span className="text-neutral-500 text-sm uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
