import parse from "html-react-parser";

type ProjectDescriptionProps = {
  description: string | null | undefined;
};

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="typography whitespace-pre-line leading-relaxed">
        {parse(description)}
      </div>
    </div>
  );
}
