import React from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProjectsGrid = ({ projects, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-500">
        No projects found in this category.
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id || project.slug?.current}
            project={project}
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ProjectsGrid;
