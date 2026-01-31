import React from 'react'
import { FiArrowUp } from 'react-icons/fi'

const Footer = () => {
    const year = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <footer className="py-8 border-t border-neutral-800 bg-black relative">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-neutral-500 text-sm">
                    Joshua © {year} | Developed with ❤️ by <a href='https://idighekereudo.netlify.app/' className="text-neutral-300 hover:text-primary-400 transition-colors">Idighekere</a>
                </p>

                <button
                    onClick={scrollToTop}
                    className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group"
                >
                    <FiArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </footer>
    )
}

export default Footer
