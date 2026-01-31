import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { urlFor } from '../../lib/sanity'
import Badge from '../ui/Badge'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800"
        >
            <Link to={`/project/${project.slug?.current}`} className="block relative aspect-[3/4] overflow-hidden">
                {project.featuredImage && (
                    <LazyLoadImage
                        src={urlFor(project.featuredImage).width(600).url()}
                        alt={project.title}
                        effect="blur"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        wrapperClassName="!block h-full w-full"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Badge className="w-fit mb-2">{project.category}</Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <span className="text-primary-400 font-medium text-sm">View Case Study &rarr;</span>
                </div>
            </Link>
        </motion.div>
    )
}

export default ProjectCard
