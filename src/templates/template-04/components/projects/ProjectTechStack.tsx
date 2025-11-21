type ProjectSkill = {
  id: string;
  skill: {
    id: string;
    name: string;
  };
};

type ProjectTechStackProps = {
  technologies: ProjectSkill[];
};

export function ProjectTechStack({ technologies }: ProjectTechStackProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">
        Technologies Used
      </h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech.id}
            className="inline-flex items-center px-3 py-1 bg-[var(--muted)] border border-[var(--border)] rounded-md text-sm text-[var(--foreground)]"
          >
            {tech.skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
