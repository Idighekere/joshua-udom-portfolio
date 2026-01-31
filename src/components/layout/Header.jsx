import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Links = [
    { name: "Works", href: "/#works" },
    { name: "All Projects", href: "/projects" },
    { name: "About Me", href: "/#about-me" },
    { name: "Contact Me", href: "/#contact-me" },
]

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`w-full max-w-5xl flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-black/50 border border-primary-500/30 shadow-[0_0_20px_rgba(0,149,199,0.15)]' : 'bg-transparent border border-transparent'
                    }`}
            >
                <Link to="/" className="text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Joshua Udom✨
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {Links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-5 py-2 rounded-full text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
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
                    <div className="space-y-1.5">
                        <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="block w-6 h-0.5 bg-white"></motion.span>
                        <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-white"></motion.span>
                        <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="block w-6 h-0.5 bg-white"></motion.span>
                    </div>
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
                                        onClick={() => setIsOpen(false)}
                                        className="p-4 text-center text-lg font-medium text-white hover:bg-white/5 rounded-xl transition-colors"
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
    )
}

export default Header
