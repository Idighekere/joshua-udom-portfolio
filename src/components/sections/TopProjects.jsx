import { HugeiconsIcon } from "@hugeicons/react";
import { StarCircleIcon } from "@hugeicons/core-free-icons";
import ProjectsGrid from "../project/ProjectsGrid";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { GlowSection } from "../ui/GlowCard";

const TopProjects = ({ limit = 6 }) => {
  const { projects, loading } = useProjects();

  const topProjects =
    projects && projects.length > 0
      ? projects.filter((p) => p.featured).slice(0, limit)
      : [];

  return (
    <section id="works" className="py-16 md:py-24 relative">
      <GlowSection className="container mx-auto px-4 sm:px-6 pt-10 md:pt-14">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 px-6 sm:px-0 space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 border border-primary-500/20">
            <HugeiconsIcon
              icon={StarCircleIcon}
              size={28}
              color="currentColor"
              className="text-primary-400"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Top Projects</h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto">
            A glimpse into some of my top projects 
          </p>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
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
      </GlowSection>
    </section>
  );
};

export default TopProjects;
