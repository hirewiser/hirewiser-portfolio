import { usePortfolio } from "@/context/PortfolioContext";
import Hero from "./components/Hero";
import About from "./components/About";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import GitHubContributions from "./components/GitHubContributions";
import DockNavigation from "./components/DockNavigation";

const extractGitHubUsername = (url: string): string | null => {
  if (!url) {
    return null;
  }
  try {
    const urlString = url.startsWith("http") ? url : `https://${url}`;
    const parsedUrl = new URL(urlString);
    return parsedUrl.pathname.split("/").filter(Boolean)[0] || null;
  } catch {
    return null;
  }
};

const extractCalcomLink = (
  links:
    | Array<{
        linkTitle?: string;
        linkUrl?: string;
        integrationsEnabled?: boolean;
      }>
    | undefined
): { calLink: string; isEnabled: boolean } => {
  const link = links?.find(
    (l) =>
      l.integrationsEnabled &&
      (l.linkTitle?.toLowerCase() === "cal.com" ||
        l.linkUrl?.toLowerCase().includes("cal.com"))
  );
  const calLink = link?.linkUrl || "";
  return { calLink, isEnabled: Boolean(calLink) };
};

function RootPage03() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  if (!portfolioData) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <p className="text-gray-500">Loading portfolio data...</p>
      </div>
    );
  }

  const githubUrl =
    portfolioData?.links?.find(
      (l) => l.linkTitle?.toLowerCase() === "github" && l.integrationsEnabled
    )?.linkUrl || "";
  const githubUsername = githubUrl ? extractGitHubUsername(githubUrl) : null;

  const { calLink } = extractCalcomLink(portfolioData?.links);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk">
      {/* DOCK NAVIGATION */}
      <DockNavigation email={portfolioData.email} />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col mb-10">
          <div className="flex-1 pb-7 space-y-2">
            {/* HERO */}
            <div className="bg-white pt-16">
              <div className="max-w-3xl mx-auto px-5">
                <Hero
                  name={`${portfolioData.firstName} ${portfolioData.lastName || ""}`}
                  headerText={portfolioData.headerText ?? ""}
                  email={portfolioData.email}
                  imageSrc={portfolioData.profileImage ?? ""}
                  portfolioData={portfolioData}
                />
              </div>
            </div>

            {/* EXPERIENCE */}
            <ExperienceSection experiences={portfolioData.experience} />

            {/* PROJECTS */}
            <ProjectsSection projects={portfolioData.projects} />

            {/* ABOUT */}
            <div>
              <div className="max-w-3xl mx-auto px-5 pb-15">
                <About
                  name={`${portfolioData.firstName} ${portfolioData.lastName || ""}`}
                  avatar={portfolioData.profileImage ?? ""}
                  about={portfolioData.description ?? ""}
                  skillset={
                    portfolioData.skillset
                      ?.slice() // avoid mutating original array
                      .sort((a, b) => {
                        const aHasUrlIcon = a.icon?.startsWith("https") ? 1 : 0;
                        const bHasUrlIcon = b.icon?.startsWith("https") ? 1 : 0;
                        return bHasUrlIcon - aHasUrlIcon;
                      }) ?? []
                  }
                />
              </div>
            </div>
            {/* GITHUB CONTRIBUTIONS */}
            {portfolioData.integrationsEnabled && githubUsername && (
              <div>
                <div className="max-w-3xl mx-auto px-5 pb-15">
                  <GitHubContributions githubUsername={githubUsername} />
                </div>
              </div>
            )}

            {/* CONTACT */}
            {portfolioData.integrationsEnabled && calLink && (
              <div>
                <div className="max-w-3xl mx-auto px-5 pb-15">
                  <ContactSection
                    profileImage={portfolioData.profileImage ?? ""}
                    name={`${portfolioData.firstName} ${portfolioData.lastName || ""}`}
                    preText="Get in touch to discuss opportunities or collaborations"
                    linkText="Contact Me"
                    calLink={calLink}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pb-25 flex flex-col items-center justify-center">
        <p className="flex gap-1">
          Design & Developed by{" "}
          <a
            href="https://www.hirewiser.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            www.hirewiser.in
          </a>
        </p>
        <p>© 2025. All rights reserved.</p>
      </div>
    </div>
  );
}

export default RootPage03;
