import parse from "html-react-parser";

type ProjectDescriptionProps = {
  description: string | null;
};

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">About This Project</h2>
      <div className="text-foreground typography leading-relaxed">
        {parse(description)}
      </div>
    </div>
  );
}
