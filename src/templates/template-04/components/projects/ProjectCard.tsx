import type React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProjectSkillset, Project } from "@/types/portfolio.types";

type ProjectCardProps = {
  project: Project;
};

function stripHtml(html: string | null | undefined): string {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>?/gm, "");
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const projectImage = project.previewImageUrl || "";
  const skills = project.projectSkillset || [];
  const projectStatus = project.status || "In Progress";

  // Get status styling based on project status
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          container: "border-green-300 bg-green-500/10",
          dot: "bg-green-500",
          text: "text-green-700 dark:text-green-400",
        };
      case "In Progress":
        return {
          container: "border-yellow-300 bg-yellow-500/10",
          dot: "bg-yellow-500",
          text: "text-yellow-700 dark:text-yellow-400",
        };
      case "Planning":
        return {
          container: "border-blue-300 bg-blue-500/10",
          dot: "bg-blue-500",
          text: "text-blue-700 dark:text-blue-400",
        };
      case "On Hold":
        return {
          container: "border-red-300 bg-red-500/10",
          dot: "bg-red-500",
          text: "text-red-700 dark:text-red-400",
        };
      default:
        return {
          container: "border-gray-300 bg-gray-500/10",
          dot: "bg-gray-500",
          text: "text-gray-700 dark:text-gray-400",
        };
    }
  };

  const statusStyles = getStatusStyles(projectStatus);

  // Get valid links
  const validLinks = (project.projectLinks || []).filter(
    (link: { linkUrl: string }) => link?.linkUrl && link.linkUrl.trim() !== ""
  );

  const liveLink =
    validLinks.find((link: { linkTitle: string }) =>
      ["website", "live", "demo"].some((w) =>
        link.linkTitle?.toLowerCase().includes(w)
      )
    ) || validLinks[0];

  const githubLink = validLinks.find((link: { linkTitle: string }) =>
    link.linkTitle?.toLowerCase().includes("github")
  );

  const strippedDescription = stripHtml(project.description);

  const truncatedDesc =
    strippedDescription && strippedDescription.length > 75
      ? `${strippedDescription.slice(0, 75)}...`
      : strippedDescription || "No description available.";

  return (
    <div className="group overflow-hidden transition-all border border-border rounded-lg shadow-sm hover:shadow-md">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {/* Gradient fallback */}
        {(() => {
          const gradients = [
            "bg-gradient-to-br from-blue-400 to-cyan-300",
            "bg-gradient-to-br from-purple-400 to-pink-300",
            "bg-gradient-to-br from-green-400 to-teal-300",
            "bg-gradient-to-br from-yellow-400 to-orange-300",
            "bg-gradient-to-br from-indigo-400 to-purple-300",
            "bg-gradient-to-br from-red-400 to-pink-300",
            "bg-gradient-to-br from-emerald-400 to-cyan-300",
            "bg-gradient-to-br from-amber-400 to-yellow-300",
            "bg-gradient-to-br from-violet-400 to-blue-300",
            "bg-gradient-to-br from-rose-400 to-pink-300",
          ];

          const randomIndex =
            project.title
              .split("")
              .reduce(
                (acc: number, char: string) => acc + char.charCodeAt(0),
                0
              ) % gradients.length;

          return (
            <div className={`absolute inset-0 ${gradients[randomIndex]}`} />
          );
        })()}

        {projectImage && (
          <img
            className="h-full w-full object-cover relative z-10"
            src={projectImage}
            alt={project.title}
            width={344}
            height={193}
          />
        )}
      </div>

      {/* Content Section */}
      <div className="px-6 py-4">
        <div className="space-y-3">
          {/* Title + icons */}
          <div className="flex items-start justify-between gap-4">
            <Link to={`/projects/${project.id}`}>
              <h3 className="text-lg font-semibold leading-tight hover:text-(--link) cursor-pointer transition-colors text-foreground">
                {project.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              {liveLink && (
                <a
                  href={liveLink.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-(--link) transition-colors"
                  aria-label="View live project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {githubLink && (
                <a
                  href={githubLink.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-(--link) transition-colors"
                  aria-label="View GitHub repository"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-1">
            {truncatedDesc}
          </p>

          {/* Skills/Technologies */}
          {skills.length > 0 ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 2).map((skillset: ProjectSkillset) => (
                  <span
                    key={skillset.id}
                    className="inline-flex items-center text-xs bg-muted border border-border py-1 px-2 rounded-md text-foreground"
                  >
                    {skillset.skill.name}
                  </span>
                ))}
                {skills.length > 2 && (
                  <button
                    type="button"
                    className="group inline-flex items-center text-xs bg-muted border border-dashed border-border py-1 px-2 rounded-md text-foreground"
                  >
                    +{skills.length - 2} more
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs py-2 text-muted-foreground italic">
              No skills listed
            </div>
          )}

          {/* View Details Button - Always visible */}
          <div className="pt-2">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1 text-xs text-(--link) hover:underline font-medium"
            >
              View Details
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-3  flex items-center justify-between ">
        {/* Status */}
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded-full border ${statusStyles.container}`}
        >
          <div className={`w-2 h-2 rounded-full ${statusStyles.dot}`} />
          <span className={`text-xs font-medium ${statusStyles.text}`}>
            {projectStatus}
          </span>
        </div>

        {/* Date */}
        {project.startedAt && (
          <span className="text-xs text-muted-foreground">
            {new Date(project.startedAt).getFullYear()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
