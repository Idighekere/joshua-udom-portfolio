import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/sanity";
import Badge from "../ui/Badge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProjectCard = ({ project }) => {
  const slug = project.slug?.current;

  const cardContent = (
    <>
      {project.featuredImage && (
        <LazyLoadImage
          src={urlFor(project.featuredImage).width(400).quality(75).auto("format").url()}
          alt={project.title}
          effect="blur"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          wrapperClassName="!block w-full h-auto"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 0 bg-gradient-to-t from-black/90 via-black/40 to-transparent ">
        <Badge className="mb-2 w-fit capitalize">{project.category}</Badge>
        <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
        <span className="text-sm font-medium text-primary-400">
          View Project &rarr;
        </span>
      </div>
    </>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden border group rounded-none sm:rounded-xl bg-neutral-900 border-neutral-800"
    >
      {slug ? (
        <Link
          to={`/project/${slug}`}
          className="block relative overflow-hidden w-full"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="block relative overflow-hidden w-full">{cardContent}</div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
