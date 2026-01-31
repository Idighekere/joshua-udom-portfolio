import React, { useState, useMemo } from 'react'
import Masonry from 'react-masonry-css'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../project/ProjectCard'
import TabButton from '../ui/TabButton'
import LoadingSpinner from '../ui/LoadingSpinner'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

const categories = [
    { name: "All Work", category: "all" },
    { name: "Flyer Designs", category: "flyer" },
    { name: "Church Designs", category: "church" },
    { name: "Social Media", category: "social" },
]

const Works = ({ limit, showFilter = true }) => {
    const { projects, loading } = useProjects()
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredProjects = useMemo(() => {
        if (!projects) return []
        let filtered = projects

        if (selectedCategory !== "all") {
            filtered = projects.filter(p => p.category === selectedCategory || p.category?.toLowerCase() === selectedCategory.toLowerCase())
        }

        if (limit && filtered.length > limit) {
            return filtered.slice(0, limit)
        }
        return filtered
    }, [projects, selectedCategory, limit])

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    }

    return (
        <section id="works" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 inline-block bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                        {limit ? "Selected Works" : "All Projects"}
                    </h2>
                    <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
                </div>

                {/* Filter Tabs */}
                {showFilter && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <TabButton
                                key={cat.category}
                                name={cat.name}
                                category={cat.category}
                                selectedCategory={selectedCategory}
                                handleCategory={setSelectedCategory}
                            />
                        ))}
                    </div>
                )}

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-6"
                        columnClassName="pl-6 bg-clip-padding"
                    >
                        {filteredProjects.map((project) => (
                            <div className="mb-6" key={project._id || project.slug?.current}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </Masonry>

                )}

                {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-neutral-500">
                        No projects found in this category.
                    </div>
                )}

                {/* See All Button */}
                {limit && projects && projects.length > limit && (
                    <div className="flex justify-center mt-12">
                        <Link to="/projects">
                            <Button variant="outline" className="px-8">See All Works</Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Works
