"use client";

import { useEffect, useState } from "react";
import { PortfolioData } from "./portfolio-data-provider";

interface TemplateRendererProps {
  portfolioData: PortfolioData;
  templateComponent: React.ComponentType<{ portfolioData: PortfolioData }>;
}

function PortfolioLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading portfolio...</p>
      </div>
    </div>
  );
}

/**
 * Client-side template renderer that waits for hydration before rendering
 * This prevents the flash of unstyled content and double animation issues
 */
export function TemplateRenderer({ portfolioData, templateComponent: TemplateComponent }: TemplateRendererProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the next tick to ensure hydration is complete
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <PortfolioLoading />;
  }

  return <TemplateComponent portfolioData={portfolioData} />;
}
