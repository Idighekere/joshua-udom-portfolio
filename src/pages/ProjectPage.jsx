import { useParams, Link } from 'react-router-dom'
import { useProject } from '../hooks/useProjects'
import { PageTransition, Header, Footer, Skeleton, Button, Badge, LoadingSpinner } from '../components'
import CaseStudyContent from '../components/project/CaseStudyContent'
import Lightbox from 'yet-another-react-lightbox'
import { useState } from 'react'
import { urlFor } from '../lib/sanity'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiUser, FiTool } from 'react-icons/fi'

const ProjectPage = () => {
    const { slug } = useParams()
    const { project, loading, error } = useProject(slug)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    if (loading) return <div className="h-screen flex items-center justify-center bg-black text-white"><LoadingSpinner /></div>
    if (error || !project) return <div className="h-screen flex flex-col items-center justify-center bg-black text-white">Project not found <Link to="/" className="text-primary-400 mt-4">Go Home</Link></div>

    const slides = project.gallery?.map(img => ({ src: urlFor(img).url() })) || []

    return (
        <div className="bg-black min-h-screen text-white">
            <Header />
            <PageTransition>
                <div className="pt-24 pb-20">
                    {/* Hero Image */}
                    <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
                        {project.featuredImage && (
                            <img
                                src={urlFor(project.featuredImage).width(1920).url()}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                            <div className="max-w-7xl mx-auto">
                                <Link to="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-6 transition-colors">
                                    <FiArrowLeft className="mr-2" /> Back to Works
                                </Link>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-6xl font-bold mb-4"
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

                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {project.caseStudy ? (
                                <CaseStudyContent value={project.caseStudy} />
                            ) : (
                                <p className="text-neutral-400 text-lg">{project.description}</p>
                            )}

                            {/* Gallery Grid */}
                            {project.gallery && project.gallery.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold">Project Gallery</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {project.gallery.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ scale: 1.02 }}
                                                className="aspect-video relative rounded-xl overflow-hidden cursor-pointer"
                                                onClick={() => {
                                                    setPhotoIndex(idx)
                                                    setLightboxOpen(true)
                                                }}
                                            >
                                                <img
                                                    src={urlFor(img).width(600).height(400).url()}
                                                    alt={`Gallery ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm sticky top-24">
                                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-neutral-800">Project Details</h3>

                                <div className="space-y-6">
                                    {project.client && (
                                        <div className="flex items-start">
                                            <FiUser className="mt-1 text-primary-500 mr-3" />
                                            <div>
                                                <span className="block text-sm text-neutral-500 uppercase tracking-wider">Client</span>
                                                <span className="text-lg font-medium">{project.client}</span>
                                            </div>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div className="flex items-start">
                                            <FiCalendar className="mt-1 text-primary-500 mr-3" />
                                            <div>
                                                <span className="block text-sm text-neutral-500 uppercase tracking-wider">Year</span>
                                                <span className="text-lg font-medium">{project.year}</span>
                                            </div>
                                        </div>
                                    )}

                                    {project.tools && project.tools.length > 0 && (
                                        <div className="flex items-start">
                                            <FiTool className="mt-1 text-primary-500 mr-3" />
                                            <div>
                                                <span className="block text-sm text-neutral-500 uppercase tracking-wider mb-2">Tools Used</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tools.map((tool, i) => (
                                                        <span key={i} className="text-sm bg-white/5 px-2 py-1 rounded text-neutral-300">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-neutral-800">
                                    <div className="text-center">
                                        <p className="text-neutral-500 text-sm mb-4">Interested in a similiar project?</p>
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
