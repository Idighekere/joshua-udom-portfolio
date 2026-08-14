import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu11Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

const Links = [
  { name: "Projects", href: "/projects" },
  { name: "About Me", href: "/#about-me" },
  { name: "Contact Me", href: "/#contact-me" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname !== "/") return;

      // Track which home section is currently in view
      const ids = ["about-me", "contact-me"];
      const marker = window.innerHeight * 0.35;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= marker && rect.bottom > marker) current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // After navigation, scroll to the hash target if present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setActiveSection(id);
      // Small delay to let the page render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setActiveSection(null);
    }
  }, [location]);

  const isActive = (link) => {
    if (!link.href.includes("#")) {
      return location.pathname === link.href;
    }
    const hash = link.href.split("#")[1];
    return activeSection === hash;
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = useCallback(
    (e, link) => {
      // Only handle hash links (e.g. /#about-me)
      if (!link.href.includes("#")) return;

      e.preventDefault();
      setIsOpen(false);

      const hash = link.href.split("#")[1];

      if (location.pathname === "/") {
        // Already on home — just scroll
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home with hash — useEffect above handles the scroll
        navigate("/#" + hash);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <header className="sticky mb-10 top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`w-full flex items-center justify-between px-6 rounded-full transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? "max-w-5xl bg-black/50 border border-primary-500/20 py-4"
            : "max-w-4xl bg-transparent border border-transparent py-2.5"
        }`}
      >
        <a href="/" className="text-base md:text-lg font-medium text-white">
          Joshua Udom
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {Links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                isActive(link)
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-neutral-300 hover:text-primary-400 hover:bg-primary-500/10"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white z-50 relative"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={24} color="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <HugeiconsIcon icon={Menu11Icon} size={24} color="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {Links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`p-4 text-center text-base md:text-lg font-medium rounded-xl transition-colors ${
                      isActive(link)
                        ? "bg-primary-500/20 text-primary-400"
                        : "text-white hover:text-primary-400 hover:bg-primary-500/10"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Header;
