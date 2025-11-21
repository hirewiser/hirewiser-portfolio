import React from "react";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectMeta } from "./ProjectMeta";

type ProjectLink = {
  id: string;
  linkTitle: string;
  linkUrl: string;
};

type ProjectSkill = {
  id: string;
  skill: {
    id: string;
    name: string;
  };
};

type Project = {
  id: string;
  title: string;
  description?: string;
  previewImageUrl?: string;
  status?: string;
  startedAt?: string;
  timeline?: string;
  role?: string;
  team?: string;
  projectLinks?: ProjectLink[];
  projectSkillset?: ProjectSkill[];
};

type ProjectDetailsCardProps = {
  project: Project;
  relatedProjects?: Project[];
};

// Error boundary component to catch errors in the component tree
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error in ProjectDetailsCard:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300">
          <p>Something went wrong while loading the project details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ProjectDetailsCard({
  project,
  relatedProjects = [],
}: ProjectDetailsCardProps) {
  // Ensure project is defined
  if (!project) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-lg">
        Project data is not available.
      </div>
    );
  }

  const technologies = project?.projectSkillset || [];
  const projectLinks = project?.projectLinks || [];

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        {/* Project Header */}
        <div className="space-y-4">
          {project.previewImageUrl && (
            <div className="rounded-xl overflow-hidden border border-[var(--border)]">
              <img
                src={project.previewImageUrl}
                alt={project.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--foreground)]">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-[var(--muted-foreground)]">
              {project.status && (
                <span className="font-medium">{project.status}</span>
              )}
              {project.startedAt && (
                <span>{new Date(project.startedAt).getFullYear()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Project Meta */}
        <ProjectMeta
          timeline={project.timeline}
          role={project.role}
          team={project.team}
          status={project.status}
        />

        {/* Description */}
        <ProjectDescription description={project.description} />

        {/* Links Section */}
        <ProjectLinks projectLinks={projectLinks} />

        {/* Tech Stack */}
        <ProjectTechStack technologies={technologies} />

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <RelatedProjects projects={relatedProjects} />
        )}
      </div>
    </ErrorBoundary>
  );
}
