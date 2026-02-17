import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarCircleIcon } from "@hugeicons/core-free-icons";
import ProjectsGrid from "../project/ProjectsGrid";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

const TopProjects = ({ limit = 6 }) => {
  const { projects, loading } = useProjects();

  const topProjects =
    projects && projects.length > limit
      ? projects.slice(0, limit)
      : projects || [];

  return (
    <section id="works" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 px-6 sm:px-0">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <HugeiconsIcon
              icon={StarCircleIcon}
              size={28}
              color="currentColor"
              className="text-primary-400"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Top Projects</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A glimpse into some of my top projects 
          </p>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mt-6"></div>
        </div>

        <ProjectsGrid projects={topProjects} loading={loading} />

        {/* View All Projects */}
        <div className="flex justify-center mt-12">
          <Link to="/projects">
            <Button variant="outline" className="px-8">
              View All Projects &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProjects;
