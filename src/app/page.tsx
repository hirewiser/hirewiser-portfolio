import { ErrorPortfolio, NoSubdomainPortfolio } from "@/components/portfolio-components";
import { fetchPortfolio, transformUserData, extractUsername } from "@/lib/portfolio-utils";
import { headers } from "next/headers";
import { getTemplate } from "@/templates";
import { PortfolioDataProvider } from "@/components/portfolio-data-provider";
import { TemplateRenderer } from "@/components/template-renderer";

export default async function Page() {
  const headersList = await headers();
  const { username, hasValidSubdomain } = extractUsername(headersList);

  // Show no subdomain page if subdomain validation fails
  if (!hasValidSubdomain) {
    return <NoSubdomainPortfolio />;
  }

  // Fetch portfolio data on server-side
  let portfolioData = null;
  let error = null;

  try {
    const response = await fetchPortfolio(username);
    if (response.success && response.data) {
      portfolioData = transformUserData(response.data);
    } else {
      error = response.message || "Portfolio not found";
    }
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    error = "Failed to load portfolio";
  }

  // Handle error state
  if (error || !portfolioData) {
    return <ErrorPortfolio username={username} />;
  }

  // Get the template based on the templateId from API
  const template = getTemplate(portfolioData.templateId);
  
  // If template not found, show error
  if (!template) {
    console.error(`Template "${portfolioData.templateId}" not found`);
    return <ErrorPortfolio username={username} />;
  }

  // Render the selected template with client-side hydration handling
  return (
    <PortfolioDataProvider portfolioData={portfolioData} isLoading={false} error={null}>
      <TemplateRenderer 
        portfolioData={portfolioData} 
        templateComponent={template.component}
      />
    </PortfolioDataProvider>
  );
}
