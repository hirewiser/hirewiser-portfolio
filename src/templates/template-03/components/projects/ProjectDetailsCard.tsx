import { Link } from "react-router-dom";
import type {
  Project as PortfolioProject,
  ProjectLink,
} from "@/types/portfolio.types";
import { Separator } from "@/components/ui/separator";
import { ProjectBackButton } from "./ProjectBackButton";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectKPIs } from "./ProjectKPIs";
import { ProjectDescription } from "./ProjectDescription";
import { RelatedProjects } from "./RelatedProjects";

export type ProjectDetailsCardProps = {
  project: PortfolioProject;
  liveProjectLink: ProjectLink | null;
  additionalLinks: ProjectLink[];
  shouldShowAdditionalLinks: boolean;
  relatedProjects?: PortfolioProject[];
};

export function ProjectDetailsCard({
  project,
  liveProjectLink,
  additionalLinks = [],
  shouldShowAdditionalLinks = false,
  relatedProjects = [],
}: ProjectDetailsCardProps) {
  const technologies = project.projectSkillset || [];

  const projectKPIs = project.projectKPI || [];

  return (
    <div className="font-hanken-grotesk">
      <div className="max-w-4xl mx-auto pb-10 space-y-7">
        {/* Back Button */}
        <ProjectBackButton />

        {/* Project Header */}
        <div className="space-y-6">
          {project.previewImageUrl && (
            <div className="rounded-xl overflow-hidden border bg-gray-50">
              <img
                src={project.previewImageUrl}
                alt={project.title}
                className="w-full h-auto object-cover"
                width={800}
                height={450}
              />
            </div>
          )}
          <h1 className="text-4xl font-bold">{project.title}</h1>
        </div>

        {/* Project Meta */}
        {(project.timeline ||
          project.team ||
          project.role ||
          project.status) && (
          <ProjectMeta
            timeline={project.timeline ?? ""}
            team={project.team ?? ""}
            role={project.role ?? ""}
            status={project.status}
          />
        )}

        {/* Links Section */}
        <ProjectLinks
          liveProjectLink={liveProjectLink}
          additionalLinks={additionalLinks}
          shouldShowAdditionalLinks={shouldShowAdditionalLinks}
        />

        {/* Tech Stack */}
        {technologies.length > 0 && (
          <ProjectTechStack technologies={technologies} />
        )}

        {/* KPIs */}
        <ProjectKPIs projectKPIs={projectKPIs} />

        {/* Description */}
        <ProjectDescription description={project.description} />

        {/* Related Projects */}
        <RelatedProjects projects={relatedProjects} />

        {/* Back to Projects CTA */}
        <div className="text-center space-y-4">
          <Separator />
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
