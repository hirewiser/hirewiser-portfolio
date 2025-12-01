import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type ProjectLink = {
  id: string;
  linkTitle: string;
  linkUrl: string;
};

type ProjectLinksProps = {
  projectLinks: ProjectLink[];
};

export function ProjectLinks({ projectLinks }: ProjectLinksProps) {
  if (!projectLinks || projectLinks.length === 0) {
    return null;
  }

  const liveLink = projectLinks.find(
    (link) =>
      link.linkTitle?.toLowerCase().includes("live") ||
      link.linkTitle?.toLowerCase().includes("demo") ||
      link.linkTitle?.toLowerCase().includes("website")
  );

  const githubLink = projectLinks.find(
    (link) =>
      link.linkTitle?.toLowerCase().includes("github") ||
      link.linkTitle?.toLowerCase().includes("repo")
  );

  const otherLinks = projectLinks.filter(
    (link) => link !== liveLink && link !== githubLink
  );

  return (
    <div className="space-y-6 max-w-fit">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-(--link) rounded-full" />
        <h3 className="text-xl font-bold text-foreground">Project Links</h3>
      </div>

      <div className="space-y-2">
        {liveLink && (
          <a
            href={liveLink.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-linear-to-r from-muted to-transparent border border-border rounded-xl hover:border-(--link) hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-(--link)/10 rounded-lg group-hover:bg-(--link)/20 transition-colors">
              <ExternalLink className="w-5 h-5 text-(--link)" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground group-hover:text-(--link) transition-colors truncate">
                {liveLink.linkTitle}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {liveLink.linkUrl}
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted group-hover:bg-(--link)/10 transition-colors">
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-(--link) transition-colors" />
            </div>
          </a>
        )}

        {githubLink && (
          <a
            href={githubLink.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-linear-to-r from-muted to-transparent border border-border rounded-xl hover:border-(--link) hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-(--link)/10 rounded-lg group-hover:bg-(--link)/20 transition-colors">
              <FaGithub className="w-5 h-5 text-(--link)" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground group-hover:text-(--link) transition-colors truncate">
                {githubLink.linkTitle}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {githubLink.linkUrl}
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted group-hover:bg-(--link)/10 transition-colors">
              <FaGithub className="w-4 h-4 text-muted-foreground group-hover:text-(--link) transition-colors" />
            </div>
          </a>
        )}

        {otherLinks.map((link) => (
          <a
            key={link.id}
            href={link.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-linear-to-r from-muted to-transparent border border-border rounded-xl hover:border-(--link) hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-(--link)/10 rounded-lg group-hover:bg-(--link)/20 transition-colors">
              <ExternalLink className="w-5 h-5 text-(--link)" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground group-hover:text-(--link) transition-colors truncate">
                {link.linkTitle}
              </div>
              <div className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-none">
                {link.linkUrl}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
