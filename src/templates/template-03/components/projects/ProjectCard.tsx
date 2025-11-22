import { FaGlobe, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SkillBadge } from "../SkillBadge";
import type { Project as ProjectType } from "@/types/portfolio.types";

type ProjectCardProps = {
  project: ProjectType;
};

function stripHtml(html: string | null) {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>?/gm, "");
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectId = project.id;
  const projectImage = project.previewImageUrl || "";
  const skills = project.projectSkillset || [];
  const projectStatus = project.status || "In Progress";

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

  const validLinks = (project.projectLinks || []).filter(
    (link) => link?.linkUrl && link.linkUrl.trim() !== ""
  );

  const liveLink =
    validLinks.find((link) =>
      ["website", "live", "demo"].some((w) =>
        link.linkTitle?.toLowerCase().includes(w)
      )
    ) || validLinks[0];

  const githubLink = validLinks.find((link) =>
    link.linkTitle?.toLowerCase().includes("github")
  );

  const strippedDescription = stripHtml(project.description);

  const MAX_LENGTH = 75;

  const truncatedDesc =
    strippedDescription.length > MAX_LENGTH
      ? `${strippedDescription.slice(0, MAX_LENGTH)}...`
      : strippedDescription || "No description available.";

  return (
    <div className="group overflow-hidden transition-all border border-gray-100 rounded-lg shadow-sm hover:shadow-md dark:border-gray-800">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
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
              .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
            gradients.length;

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
            <Link to={`/projects/${projectId}`}>
              <h3 className="text-lg font-semibold leading-tight hover:text-primary cursor-pointer transition-colors">
                {project.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              {liveLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={liveLink.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label="View live project"
                    >
                      <FaGlobe className="size-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Website</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {githubLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={githubLink.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label="View GitHub repository"
                    >
                      <FaGithub className="size-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View GitHub</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-1">{truncatedDesc}</p>

          {/* Skills/Technologies */}
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 2).map((skillset) => (
                <SkillBadge
                  key={skillset.id}
                  name={skillset.skill.name}
                  icon={skillset.icon}
                  color={skillset.color}
                />
              ))}
              {skills.length > 2 && (
                <button
                  type="button"
                  className="group inline-flex items-center text-sm bg-black/5 border border-dashed border-black/20 py-1 px-2 rounded-md text-black dark:bg-white/5 dark:border-white/20 dark:text-white"
                >
                  +{skills.length - 2} more
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs py-2 text-gray-500 italic">
              No skills listed
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-950">
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs border ${statusStyles.container}`}
        >
          <div
            className={`size-2 rounded-full ${statusStyles.dot} animate-pulse`}
          />
          <span className={statusStyles.text}>{projectStatus}</span>
        </div>

        <Link
          to={`/projects/${projectId}`}
          className="text-sm text-primary hover:underline font-medium transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
