import { usePortfolio } from "@/context/PortfolioContext";
import ExperiencesPage03 from "@/templates/template-03/experiences-page";

function ExperiencesPage() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  const templateName = portfolioData?.template?.name;

  switch (templateName) {
    case "template-03":
      return <ExperiencesPage03 />;
    case "template-04":
      return null;
    default:
      return (
        <div className="max-w-4xl mx-auto py-20 text-red-500 font-semibold">
          The template you're looking for does not exist.
        </div>
      );
  }
}

export default ExperiencesPage;
