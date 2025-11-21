import { ExternalLink, Github } from "lucide-react";

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
        <div className="w-1 h-6 bg-[var(--link)] rounded-full" />
        <h3 className="text-xl font-bold text-[var(--foreground)]">
          Project Links
        </h3>
      </div>

      <div className="space-y-2">
        {liveLink && (
          <a
            href={liveLink.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-[var(--muted)] to-transparent border border-[var(--border)] rounded-xl hover:border-[var(--link)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--link)]/10 rounded-lg group-hover:bg-[var(--link)]/20 transition-colors">
              <ExternalLink className="w-5 h-5 text-[var(--link)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[var(--foreground)] group-hover:text-[var(--link)] transition-colors">
                {liveLink.linkTitle}
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">
                Live Demo
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--muted)] group-hover:bg-[var(--link)]/10 transition-colors">
              <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--link)] transition-colors" />
            </div>
          </a>
        )}

        {githubLink && (
          <a
            href={githubLink.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-[var(--muted)] to-transparent border border-[var(--border)] rounded-xl hover:border-[var(--link)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--link)]/10 rounded-lg group-hover:bg-[var(--link)]/20 transition-colors">
              <Github className="w-5 h-5 text-[var(--link)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[var(--foreground)] group-hover:text-[var(--link)] transition-colors">
                {githubLink.linkTitle}
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">
                Source Code
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--muted)] group-hover:bg-[var(--link)]/10 transition-colors">
              <Github className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--link)] transition-colors" />
            </div>
          </a>
        )}

        {otherLinks.map((link) => (
          <a
            key={link.id}
            href={link.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-gradient-to-r from-[var(--muted)] to-transparent border border-[var(--border)] rounded-xl hover:border-[var(--link)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--link)]/10 rounded-lg group-hover:bg-[var(--link)]/20 transition-colors">
              <ExternalLink className="w-5 h-5 text-[var(--link)]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[var(--foreground)] group-hover:text-[var(--link)] transition-colors">
                {link.linkTitle}
              </div>
              <div className="text-sm text-[var(--muted-foreground)] truncate">
                {link.linkUrl}
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--muted)] group-hover:bg-[var(--link)]/10 transition-colors">
              <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--link)] transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
