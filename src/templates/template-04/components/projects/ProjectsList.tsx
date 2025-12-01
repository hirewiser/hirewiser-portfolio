import type React from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/portfolio.types";

type ProjectsListProps = {
  projects: Project[];
};

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-full max-w-[300px] sm:max-w-none"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
