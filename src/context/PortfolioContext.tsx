import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { GetUserPortfolioV3Response } from "../types/portfolio.types";
import { getPortfolioData } from "../utils/fetch_portfolio";

type PortfolioContextType = {
  getAllDetailsWithTemplate: () => {
    data?: GetUserPortfolioV3Response;
    isLoading: boolean;
    error: Error | null;
  };
  getAllProjectsWithTemplate: () => {
    data?: GetUserPortfolioV3Response["projects"][number][];
    template?: GetUserPortfolioV3Response["template"];
    isLoading: boolean;
    error: Error | null;
  };
  getAllExperienceWithTemplate: () => {
    data?: GetUserPortfolioV3Response["experience"][number][];
    template?: GetUserPortfolioV3Response["template"];
    isLoading: boolean;
    error: Error | null;
  };
  getAllEventsWithTemplate: () => {
    data?: GetUserPortfolioV3Response["events"];
    template?: GetUserPortfolioV3Response["template"];
    isLoading: boolean;
    error: Error | null;
  };
  getProjectByIdWithTemplate: (id: string) => {
    data?: GetUserPortfolioV3Response["projects"][number];
    template?: GetUserPortfolioV3Response["template"];
    isLoading: boolean;
    error: Error | null;
  };
  getExperienceByIdWithTemplate: (id: string) => {
    data?: GetUserPortfolioV3Response["experience"][number];
    template?: GetUserPortfolioV3Response["template"];
    isLoading: boolean;
    error: Error | null;
  };
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const {
    data: portfolioData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolioData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const getAllDetailsWithTemplate = () => ({
    data: portfolioData,
    isLoading,
    error: error as Error | null,
  });

  const getAllProjectsWithTemplate = () => ({
    data: portfolioData?.projects,
    template: portfolioData?.template,
    isLoading,
    error: error as Error | null,
  });

  const getAllExperienceWithTemplate = () => ({
    data: portfolioData?.experience,
    template: portfolioData?.template,
    isLoading,
    error: error as Error | null,
  });

  const getAllEventsWithTemplate = () => ({
    data: portfolioData?.events,
    template: portfolioData?.template,
    isLoading,
    error: error as Error | null,
  });

  const getProjectByIdWithTemplate = (id: string) => {
    const project = portfolioData?.projects?.find(
      (p: GetUserPortfolioV3Response["projects"][number]) => p.id === id
    );
    return {
      data: project,
      template: portfolioData?.template,
      isLoading,
      error: error as Error | null,
    };
  };

  const getExperienceByIdWithTemplate = (id: string) => {
    const experience = portfolioData?.experience?.find(
      (e: GetUserPortfolioV3Response["experience"][number]) => e.id === id
    );
    return {
      data: experience,
      template: portfolioData?.template,
      isLoading,
      error: error as Error | null,
    };
  };

  const value: PortfolioContextType = {
    getAllDetailsWithTemplate,
    getAllProjectsWithTemplate,
    getAllExperienceWithTemplate,
    getAllEventsWithTemplate,
    getProjectByIdWithTemplate,
    getExperienceByIdWithTemplate,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
