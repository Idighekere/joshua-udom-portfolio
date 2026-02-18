import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const IntroCard = () => {
  return (
    <section
      id="about-me"
      className="relative flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="bg-orb w-96 h-96 bg-primary-500/20 top-20 left-10 blur-[100px]"></div>
      <div className="bg-orb w-64 h-64 bg-secondary-500/30 bottom-20 right-10 blur-[80px] animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto w-[90%] max-w-5xl rounded-2xl border border-white/10 bg-[#111111] overflow-hidden"
      >
        <div className="flex flex-col-reverse lg:flex-row lg:items-stretch">
          {/* Text Content */}
          <div className="flex-1 p-4 md:p-10 /lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium w-fit"
            >
              Hello there 👋
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-none font-bold mb-4 leading-tight text-white /whitespace-nowrap">
              I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white  pb-2">
                Joshua Udom
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-neutral-300 font-medium mb-4">
              Graphic Designer
            </h2>

            <p className="text-base md:text-lg text-neutral-400 mb-8 leading-relaxed">
              Having a keen eye for aesthetics, I make sure that every design I
              create is not only visually pleasing but also serves a clear
              strategic purpose.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:joshuaudom550@gmail.com">
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact Me
                </Button>
              </a>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-[45%] w-full aspect-square lg:aspect-auto lg:self-stretch relative"
          >
            <LazyLoadImage
              src="https://ik.imagekit.io/idighekere/Photoroom-20240414_134760.png?q-80"
              effect="blur"
              alt="Joshua Udom"
              className="w-full h-full object-cover absolute inset-0"
              wrapperClassName="!block w-full h-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroCard;
