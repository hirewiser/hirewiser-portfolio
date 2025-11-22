import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SkillBadge } from "../SkillBadge";
import type { Project as PortfolioProject } from "@/types/portfolio.types";

type RelatedProjectsProps = {
  projects: PortfolioProject[];
};

function stripHtml(html: string | null | undefined): string {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>?/gm, "");
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects?.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Separator />
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Related Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const strippedDescription = stripHtml(project.description);

            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary">
                      {project.title}
                    </h3>
                    {project.status &&
                      (() => {
                        const getStatusStyles = (statusName: string) => {
                          switch (statusName) {
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
                        const statusStyles = getStatusStyles(project.status);
                        return (
                          <div
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border ${statusStyles.container}`}
                          >
                            <div
                              className={`size-2 rounded-full ${statusStyles.dot} animate-pulse`}
                            />
                            <span className={statusStyles.text}>
                              {project.status}
                            </span>
                          </div>
                        );
                      })()}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {/* 👇 RENDER THE STRIPPED DESCRIPTION */}
                    {strippedDescription}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.projectSkillset?.slice(0, 3).map((skillset) => (
                      <SkillBadge
                        key={skillset.id}
                        name={skillset.skill.name}
                        icon={skillset.icon}
                        color={skillset.color}
                      />
                    ))}
                    {project.projectSkillset &&
                      project.projectSkillset.length > 3 && (
                        <span className="rounded bg-muted px-2 py-1 text-xs">
                          +{project.projectSkillset.length - 3}
                        </span>
                      )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
