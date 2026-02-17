import  { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Briefcase02Icon } from "@hugeicons/core-free-icons";
import { Header, Footer, PageTransition, TabButton } from "../components";
import ProjectsGrid from "../components/project/ProjectsGrid";
import { useProjects } from "../hooks/useProjects";

const categories = [
  { name: "All", category: "all" },
  { name: "Flyer Designs", category: "flyer" },
  { name: "Church Designs", category: "church" },
  { name: "Social Media", category: "social" },
  { name: "Branding", category: "branding" },
];

const Projects = () => {
  const { projects, loading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedCategory === "all") return projects;
    return projects.filter(
      (p) =>
        p.category === selectedCategory ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [projects, selectedCategory]);

  return (
    <PageTransition>
      <div className="bg-black text-white min-h-screen relative">
        <div className="noise-overlay"></div>
        <Header />
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center mb-16 px-6 sm:px-0">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <HugeiconsIcon
                  icon={Briefcase02Icon}
                  size={28}
                  color="currentColor"
                  className="text-primary-400"
                />
              </div>
              <h2 className="text-3xl font-bold mb-4">All Projects</h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                Browse through my full collection of design projects
              </p>
              <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mt-6"></div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 px-6 sm:px-0">
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

            <ProjectsGrid projects={filteredProjects} loading={loading} />
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Projects;
