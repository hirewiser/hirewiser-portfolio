import { usePortfolio } from "@/context/PortfolioContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ThemeProvider } from "./components/theme-provider";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Skills from "./components/Skills";
import ContactSection from "./components/ContactSection";
import Card from "./components/Card";

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
        className="min-h-screen p-0 overflow-x-hidden"
        style={{ fontFamily: "var(--font-sans, Arial, Helvetica, sans-serif)" }}
      >
        {/* Main content area */}
        <div className="relative">
          {/* Vertical separators like itsmehi */}
          <div className="absolute left-[60px] -top-20 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden pointer-events-none"></div>

          <div className="absolute right-[60px] -top-20 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden pointer-events-none"></div>

          <div className="px-[60px]">
            {/* Header - Full Width */}
            <header className="relative pt-8">
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
                <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-12" />

                {/* Projects section */}
                <div
                  className="relative min-h-[50vh] w-full mb-12"
                  id="projects"
                >
                  <Projects projects={portfolioData.projects} />
                </div>

                {/* Full width separator */}
                <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-12" />

                {/* Work section */}
                <div id="work">
                  <Work experiences={portfolioData.experience} />
                </div>

                {/* Full width separator */}
                <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-12" />

                {/* Skills section */}
                <div id="skills">
                  <Skills skillset={portfolioData.skillset} />
                </div>
              </div>

              {/* Right Column - Sticky Card */}
              <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
                <div className="w-full h-full flex items-center justify-center pl-4">
                  <div className="w-full max-w-md">
                    <Card portfolioData={portfolioData} />
                  </div>
                </div>
              </div>
            </div>

            {/* Full width separator */}
            <div className="w-screen -ml-[60px] border-t border-[var(--border)] my-12" />

            {/* Contact section */}
            <div id="contact" className="flex justify-center w-full">
              <div className="w-full max-w-3xl">
                <ContactSection
                  profileImage={portfolioData.profileImage || undefined}
                  name={`${portfolioData.firstName} ${
                    portfolioData.lastName || ""
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
                  isCalcomEnabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default RootPage04;
