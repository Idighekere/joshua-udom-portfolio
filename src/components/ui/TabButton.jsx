import React from 'react'
import { motion } from 'framer-motion'

const TabButton = ({ selectedCategory, handleCategory, name, category }) => {
    const isSelected = selectedCategory === category

    return (
        <button
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${isSelected ? "text-white" : "text-neutral-400 hover:text-white"}`}
            onClick={() => handleCategory(category)}
        >
            {isSelected && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10">{name}</span>
        </button>
    )
}

export default TabButton
