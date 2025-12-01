import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowLeft } from "lucide-react";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { ProjectDetailsCard } from "./components/projects/ProjectDetailsCard";

function ProjectPage04() {
  const { id } = useParams<{ id: string }>();
  const { getProjectByIdWithTemplate } = usePortfolio();
  const { data: projectData } = getProjectByIdWithTemplate(id || "");

  // Get email and all projects from portfolio context
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData, isLoading } = getAllDetailsWithTemplate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </ThemeProvider>
    );
  }

  if (!portfolioData) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full flex items-center justify-center">
          <p className="text-red-500">Failed to load portfolio data.</p>
        </div>
      </ThemeProvider>
    );
  }

  if (!projectData) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full relative overflow-hidden font-(family-name:--font-geist-sans)">
          <Header portfolioData={portfolioData} />
          <div className="max-w-4xl mx-auto py-20 text-center">
            <p className="text-red-500 font-semibold">Project not found.</p>
            <Link
              to="/projects"
              className="text-(--link) hover:underline mt-4 inline-block"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen w-full bg-background relative overflow-hidden font-(family-name:--font-geist-sans)">
        {/* Vertical separators with balanced padding */}
        <div className="absolute left-6 md:left-16 top-0 bottom-0 border-l border-dotted border-border border-opacity-40 h-full overflow-hidden" />
        <div className="absolute right-6 md:right-16 top-0 bottom-0 border-l border-dotted border-border border-opacity-40 h-full overflow-hidden" />

        <div className="px-4 sm:px-[34px] pt-7">
          <div className="px-4 sm:px-8">
            <Header portfolioData={portfolioData} />
          </div>

          <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center mb-6 px-4 py-2 rounded-lg backdrop-blur-xl hover:bg-white/20 border border-white/10 shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </button>

            <ProjectDetailsCard project={projectData} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ProjectPage04;
