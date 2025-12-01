type ProjectDescriptionProps = {
  description: string | null | undefined;
};

function stripHtml(html: string | null | undefined): string {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>?/gm, "");
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  if (!description) {
    return null;
  }

  const strippedDescription = stripHtml(description);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">
        About This Project
      </h2>
      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
        {strippedDescription}
      </div>
    </div>
  );
}
