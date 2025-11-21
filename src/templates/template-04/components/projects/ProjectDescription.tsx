type ProjectDescriptionProps = {
  description: string | null | undefined;
};

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-[var(--foreground)]">
        About This Project
      </h2>
      <div className="text-[var(--muted-foreground)] whitespace-pre-line leading-relaxed">
        {description}
      </div>
    </div>
  );
}
