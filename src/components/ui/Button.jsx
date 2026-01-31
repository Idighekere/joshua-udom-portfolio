import { motion } from 'framer-motion'

const Button = ({ children, onClick, className = "", variant = "primary", ...props }) => {
    const variants = {
        primary: "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/20",
        outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10",
        ghost: "text-neutral-500 hover:text-white"
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button
