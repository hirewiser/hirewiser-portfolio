import { useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import ProjectsList from "./components/projects/ProjectsList";
import BackButton from "./components/projects/BackButton";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";

function ProjectsPage04() {
  const { getAllProjectsWithTemplate } = usePortfolio();
  const { data: projectsData, error } = getAllProjectsWithTemplate();

  // Get email from portfolio context
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full bg-background relative overflow-hidden font-(family-name:--font-geist-sans)">
          <Header portfolioData={portfolioData} />
          <div className="max-w-4xl mx-auto py-20 text-center">
            <p className="text-muted-foreground">
              An error occurred while fetching projects.
            </p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full bg-background relative overflow-hidden font-(family-name:--font-geist-sans)">
          <Header portfolioData={portfolioData} />
          <div className="max-w-4xl mx-auto py-20 text-center">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen w-full bg-background relative overflow-hidden font-(family-name:--font-geist-sans)">
        {/* Vertical separators with balanced padding */}
        <div className="absolute left-6 md:left-16 top-0 bottom-0 border-l border-dotted border-border border-opacity-40 h-full overflow-hidden" />
        <div className="absolute right-6 md:right-16 top-0 bottom-0 border-l border-dotted border-border border-opacity-40 h-full overflow-hidden" />

        <div className="px-[34px] pt-7">
          <div className="px-8 mr-2">
            <Header portfolioData={portfolioData} />
          </div>

          <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-0">
            <div className="text-center sm:text-left sm:ml-7">
              <div className="text-left">
                <BackButton
                  to="/"
                  className="mb-6 px-4 py-2 rounded-lg hover:bg-white/20 border border-white/10 shadow-lg transition-all duration-300 sm:mx-0 inline-flex items-center"
                  label="Back to Home"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center sm:text-left">
                All Projects
              </h1>
              <p className="text-muted-foreground mb-8 text-center sm:text-left">
                Explore my complete portfolio of projects
              </p>
            </div>

            <ProjectsList projects={projectsData} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProjectsPage04;
