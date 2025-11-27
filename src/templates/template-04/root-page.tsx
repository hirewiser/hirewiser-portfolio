import { usePortfolio } from "@/context/PortfolioContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ThemeProvider } from "./components/theme-provider";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Skills from "./components/Skills";
import ContactSection from "./components/ContactSection";
import Card from "./components/Card";
import GitHubContributions from "./components/GitHubContributions";
import Footer from "./components/Footer";

function RootPage04() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData, isLoading, error } = getAllDetailsWithTemplate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading portfolio data...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading portfolio data</p>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div
        className="min-h-screen flex flex-col p-0 overflow-x-hidden"
        style={{ fontFamily: "var(--font-sans, Arial, Helvetica, sans-serif)" }}
      >
        {/* Main content area */}
        <div className="relative">
          {/* Side separators - full height */}
          <div className="fixed left-0 top-0 bottom-0 w-[60px] border-r border-dotted border-[var(--border)] border-opacity-40 h-screen pointer-events-none" />

          <div className="fixed right-0 top-0 bottom-0 w-[60px] border-l border-dotted border-[var(--border)] border-opacity-40 h-screen pointer-events-none" />

          <div className="px-[60px]">
            {/* Header - Full Width */}
            <header className="relative pt-8 pr-2">
              <Header portfolioData={portfolioData} />
            </header>

            <div className="relative flex">
              {/* Left Column - Scrollable Content */}
              <div className="w-full lg:w-1/2 lg:pr-12 lg:border-r border-dashed border-[var(--border)] border-opacity-40 min-h-screen pb-20">
                {/* Hero section */}
                <div className="hero-section relative mb-12" id="hero">
                  <Hero portfolioData={portfolioData} />
                </div>

                {/* Full width separator */}
                <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-8 -mt-10" />

                {/* Projects section */}
                <div
                  className="relative min-h-[50vh] w-full mb-12"
                  id="projects"
                >
                  <Projects projects={portfolioData.projects} />
                </div>

                {/* Full width separator */}
                <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-8 -mt-10" />

                {/* Work section */}
                <div id="work">
                  <Work experiences={portfolioData.experience} />
                </div>

                {/* Full width separator */}
                <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-8 -mt-7" />

                {/* Skills section */}
                <div id="skills" className="mb-12">
                  <Skills skillset={portfolioData.skillset} />
                </div>
              </div>

              {/* Right Column - Sticky Card and GitHub Contributions */}
              <div className="hidden lg:flex w-1/2 flex-col relative">
                <div className="sticky top-0 h-screen w-full pointer-events-none">
                  <div className="w-full max-w-md mx-auto px-4  space-y-8 pointer-events-auto">
                    <Card portfolioData={portfolioData} />
                  </div>
                </div>

                {portfolioData.userName && (
                  <div className="w-full px-4 pb-20 mt-auto relative z-10 mb-12">
                    <GitHubContributions
                      githubUsername={
                        portfolioData.links?.find(
                          (l) => l.linkTitle?.toLowerCase() === "github"
                        )?.linkUrl || portfolioData.userName
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Full width separator with vertical line */}
            <div className="relative w-screen -ml-[60px] my-8 -mt-1">
              <div className="border-t border-[var(--border)]" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2" />
            </div>

            {/* Contact section */}
            <div id="contact" className="flex justify-center w-full -mt-2 ">
              <div className="w-full max-w-3xl">
                <ContactSection
                  profileImage={portfolioData.profileImage || undefined}
                  name={`${portfolioData.firstName} ${portfolioData.lastName || ""
                    }`}
                  initials={
                    portfolioData.firstName[0] +
                    (portfolioData.lastName?.[0] || "")
                  }
                  calLink={(() => {
                    const calLinkObj = portfolioData.links?.find((link) =>
                      link.linkUrl.includes("cal.com")
                    );
                    if (calLinkObj) {
                      // Extract the path after cal.com/
                      const match = calLinkObj.linkUrl.match(/cal\.com\/(.+)/);
                      return match ? match[1] : portfolioData.userName;
                    }
                    return portfolioData.userName;
                  })()}
                  integrationsEnabled={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default RootPage04;
