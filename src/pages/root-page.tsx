import { usePortfolio } from "@/context/PortfolioContext";
import RootPage03 from "@/templates/template-03/root-page";
import RootPage04 from "@/templates/template-04/root-page";

function RootPage() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  const templateName = portfolioData?.template?.name;

  switch (templateName) {
    case "template-03":
      return <RootPage03 />;
    case "template-04":
      return <RootPage04 />;

    default:
      return (
        <div className="flex items-center justify-center py-20 text-red-500 font-semibold">
          The template you're looking for does not exist.
        </div>
      );
  }
}

export default RootPage;
