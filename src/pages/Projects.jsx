import React from 'react'
import { Header, Footer, PageTransition, Works } from '../components'
import { motion } from 'framer-motion'

const Projects = () => {
    return (
        <PageTransition>
            <div className="bg-black text-white min-h-screen relative">
                <div className="noise-overlay"></div>
                <Header />
                <div className="pt-20">
                    <Works showFilter={true} />
                </div>
                <Footer />
            </div>
        </PageTransition>
    )
}

export default Projects
