import type React from "react";
import ProjectCard from "./ProjectCard";

type ProjectsListProps = {
  projects: any[];
};

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted-foreground)]">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
