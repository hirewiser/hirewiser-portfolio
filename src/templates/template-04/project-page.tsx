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
  const { data: portfolioData } = getAllDetailsWithTemplate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!projectData) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
        <div className="min-h-screen w-full bg-[var(--background)] relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
          <Header portfolioData={portfolioData} />
          <div className="max-w-4xl mx-auto py-20 text-center">
            <p className="text-red-500 font-semibold">Project not found.</p>
            <Link
              to="/projects"
              className="text-[var(--link)] hover:underline mt-4 inline-block"
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
      <div className="min-h-screen w-full bg-[var(--background)] relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
        {/* Vertical separators like itsmehi */}
        <div className="absolute left-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden" />
        <div className="absolute right-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden" />

        <div className="px-[34px]">
          <Header portfolioData={portfolioData} />

          <div className="max-w-4xl mx-auto px-5 py-20">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center text-[var(--link)] hover:underline mb-6"
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
