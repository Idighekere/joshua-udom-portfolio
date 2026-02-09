import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="bg-orb w-96 h-96 bg-primary-500/20 top-20 left-10 blur-[100px]"></div>
      <div className="bg-orb w-64 h-64 bg-secondary-500/30 bottom-20 right-10 blur-[80px] animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium"
          >
            Hello there 👋
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white inline-block pb-2">
              Joshua Udom
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl text-neutral-300 font-medium mb-6">
            Graphic Designer
          </h2>

          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            I help brands to{" "}
            <span className="text-white font-medium hover:bg-primary-500/20 px-1 rounded transition-colors cursor-default">
              visually communicate
            </span>{" "}
            products and services with
            <span className="text-white font-medium hover:bg-primary-500/20 px-1 rounded transition-colors cursor-default">
              {" "}
              functional
            </span>{" "}
            designs to help reach their{" "}
            <span className="text-white font-medium hover:bg-primary-500/20 px-1 rounded transition-colors cursor-default">
              target audience.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/projects">
              <Button className="w-full sm:w-auto">View My Work</Button>
            </Link>
            <a href="mailto:joshuaudom550@gmail.com">
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Me
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="p-1 rounded-full bg-gradient-to-tr from-primary-500/50 to-transparent">
            <LazyLoadImage
              src="https://ik.imagekit.io/idighekere/Photoroom-20240414_134760.png?q-80"
              effect="opacity"
              alt="Joshua Udom"
              className="bg-neutral-900 rounded-full size-64 md:size-80 object-cover border-4 border-black relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
