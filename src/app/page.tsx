import { ErrorPortfolio, NoSubdomainPortfolio } from "@/components/portfolio-components";
import { fetchPortfolio, transformUserData, extractUsername } from "@/lib/portfolio-utils";
import { headers } from "next/headers";
import PortfolioContentWrapper from "@/components/portfolio-content-wrapper";

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

  // Use hydration-safe wrapper for smooth client-side transition
  return <PortfolioContentWrapper portfolioData={portfolioData} />;
}
