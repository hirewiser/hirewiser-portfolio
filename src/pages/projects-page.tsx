import { usePortfolio } from "@/context/PortfolioContext";
import ProjectsPage03 from "@/templates/template-03/projects-page";
import ProjectsPage04 from "@/templates/template-04/projects-page";

function ProjectsPage() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  const templateName = portfolioData?.template?.name;

  switch (templateName) {
    case "template-03":
      return <ProjectsPage03 />;
    case "template-04":
      return <ProjectsPage04 />;
    default:
      return (
        <div className="max-w-4xl mx-auto py-20 text-red-500 font-semibold">
          The template you're looking for does not exist.
        </div>
      );
  }
}

export default ProjectsPage;
