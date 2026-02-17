import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-neutral-800 bg-black relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-500 text-sm">
          Joshua © {year} | Developed with ❤️ by{" "}
          <a
            href="https://idighekere.dev/"
            className="text-neutral-300 hover:text-primary-400 transition-colors"
          >
            Idighekere
          </a>
        </p>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group"
        >
          <HugeiconsIcon icon={ArrowUp01Icon} size={20} color="currentColor" className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
