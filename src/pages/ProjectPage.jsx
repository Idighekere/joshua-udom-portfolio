import { useParams, Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { useProject } from '../hooks/useProjects'
import { PageTransition, Header, Footer, Skeleton, Button, Badge, LoadingSpinner } from '../components'
import CaseStudyContent from '../components/project/CaseStudyContent'
import Lightbox from 'yet-another-react-lightbox'
import "yet-another-react-lightbox/styles.css"
import { useState } from 'react'
import { urlFor } from '../lib/sanity'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiUser, FiTool } from 'react-icons/fi'

const ProjectPage = () => {
    const { slug } = useParams()
    const { project, loading, error } = useProject(slug)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    if (loading) return <div className="flex items-center justify-center h-screen text-white bg-black"><LoadingSpinner /></div>
    if (error || !project) return <div className="flex flex-col items-center justify-center h-screen text-white bg-black">Project not found <Link to="/" className="mt-4 text-primary-400">Go Home</Link></div>

    const slides = project.gallery?.map(img => ({ src: urlFor(img).url() })) || []

    return (
        <div className="min-h-screen text-white bg-black">
            <Header />
            <PageTransition>
                <div className="pt-24 pb-20">
                    {/* Hero Image */}
                    {/* Hero Image */}
                    <div className="relative w-full">
                        {project.featuredImage && (
                            <img
                                src={urlFor(project.featuredImage).width(1920).url()}
                                alt={project.title}
                                className="w-full h-auto block"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                            <div className="mx-auto max-w-7xl">
                                <Link to="/" className="inline-flex items-center mb-6 transition-colors text-neutral-400 hover:text-white">
                                    <FiArrowLeft className="mr-2" /> Back to Works
                                </Link>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 text-4xl font-bold md:text-6xl"
                                >
                                    {project.title}
                                </motion.h1>
                                <div className="flex flex-wrap gap-3">
                                    {project.category && <Badge>{project.category}</Badge>}
                                    {project.year && <Badge className="bg-neutral-800 border-neutral-700 text-neutral-300">{project.year}</Badge>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12 px-6 mx-auto mt-12 max-w-7xl md:px-12 lg:px-20 lg:grid-cols-3">

                        {/* Main Content */}
                        <div className="space-y-12 lg:col-span-2">
                            {project.caseStudy ? (
                                <CaseStudyContent value={project.caseStudy} />
                            ) : (
                                <p className="text-lg text-neutral-400">{project.description}</p>
                            )}

                            {/* Gallery Grid */}
                            {project.gallery && project.gallery.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold">Project Gallery</h3>
                                    <Masonry
                                        breakpointCols={{ default: 2, 640: 1 }}
                                        className="flex w-auto -ml-4"
                                        columnClassName="pl-4 bg-clip-padding"
                                    >
                                        {project.gallery.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ scale: 1.02 }}
                                                className="mb-4 relative rounded-xl overflow-hidden cursor-pointer"
                                                onClick={() => {
                                                    setPhotoIndex(idx)
                                                    setLightboxOpen(true)
                                                }}
                                            >
                                                <img
                                                    src={urlFor(img).width(800).url()}
                                                    alt={`Gallery ${idx + 1}`}
                                                    className="w-full h-auto block"
                                                />
                                            </motion.div>
                                        ))}
                                    </Masonry>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="sticky p-6 border bg-neutral-900/50 border-neutral-800 rounded-2xl backdrop-blur-sm top-24">
                                <h3 className="pb-4 mb-6 text-xl font-bold border-b border-neutral-800">Project Details</h3>

                                <div className="space-y-6">
                                    {project.client && (
                                        <div className="flex items-start">
                                            <FiUser className="mt-1 mr-3 text-primary-500" />
                                            <div>
                                                <span className="block text-sm tracking-wider uppercase text-neutral-500">Client</span>
                                                <span className="text-lg font-medium">{project.client}</span>
                                            </div>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div className="flex items-start">
                                            <FiCalendar className="mt-1 mr-3 text-primary-500" />
                                            <div>
                                                <span className="block text-sm tracking-wider uppercase text-neutral-500">Year</span>
                                                <span className="text-lg font-medium">{project.year}</span>
                                            </div>
                                        </div>
                                    )}

                                    {project.tools && project.tools.length > 0 && (
                                        <div className="flex items-start">
                                            <FiTool className="mt-1 mr-3 text-primary-500" />
                                            <div>
                                                <span className="block mb-2 text-sm tracking-wider uppercase text-neutral-500">Tools Used</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tools.map((tool, i) => (
                                                        <span key={i} className="px-2 py-1 text-sm rounded bg-white/5 text-neutral-300">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 mt-8 border-t border-neutral-800">
                                    <div className="text-center">
                                        <p className="mb-4 text-sm text-neutral-500">Interested in a similiar project?</p>
                                        <Link to="/#contact">
                                            <Button className="w-full">Start a Project</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>
            <Footer />

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={photoIndex}
                slides={slides}
            />
        </div>
    )
}

export default ProjectPage
