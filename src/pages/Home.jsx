import { useState, useEffect } from "react";
import {
  Header,
  Hero,
  IntroCard,
  TopProjects,
  Contact,
  Tools,
  Footer,
  PageTransition,
  LoadingSpinner,
} from "../components";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <LoadingSpinner />
        </motion.div>
      ) : (
        <PageTransition key="content">
          <div className="bg-black text-white selection:bg-primary-500/30 selection:text-white relative">
            {/* Global Noise Overlay */}
            <div className="noise-overlay"></div>

            <Header />

            <main>
              <Hero />
              <IntroCard />
              <TopProjects />
              <Tools />
              <Contact />
            </main>

            <Footer />
          </div>
        </PageTransition>
      )}
    </AnimatePresence>
  );
};

export default Home;
