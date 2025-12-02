import GitHubCalendar from "react-github-calendar";
import { useTheme } from "./theme-provider";

type GitHubContributionsProps = {
  githubUsername: string | null;
  isIntegrationEnabled?: boolean;
  isGitHubEnabled?: boolean;
};

function cleanAndValidateUsername(githubUsername: string | null): {
  cleanUsername: string;
  isValidUsername: boolean;
} {
  let cleanedName = githubUsername ? githubUsername.trim() : "";
  let isValid = Boolean(cleanedName);

  if (isValid) {
    try {
      if (cleanedName.includes(".") || cleanedName.includes("/")) {
        const url = cleanedName.startsWith("http")
          ? cleanedName
          : `https://${cleanedName}`;

        const parsed = new URL(url);

        const pathSegments = parsed.pathname.split("/").filter(Boolean);

        cleanedName =
          pathSegments[0] ||
          parsed.hostname.replace("www.", "").replace("github.com", "");
      }
    } catch (_e) {
      isValid = false;
      cleanedName = "";
    }
  }

  isValid = isValid && Boolean(cleanedName);

  return { cleanUsername: cleanedName, isValidUsername: isValid };
}

export default function GitHubContributions({
  githubUsername,
  isIntegrationEnabled = true,
  isGitHubEnabled = true,
}: GitHubContributionsProps) {
  const { theme } = useTheme();
  const { cleanUsername, isValidUsername } =
    cleanAndValidateUsername(githubUsername);
  const isEnabled = isIntegrationEnabled && isGitHubEnabled && isValidUsername;

  if (!isEnabled) {
    return null;
  }

  const colorScheme = theme === "dark" ? "dark" : "light";

  return (
    <div className="mb-38">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            GitHub Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Recent contributions by{" "}
            <b className="text-primary">{cleanUsername}</b>
          </p>
        </div>

        <a
          href={`https://github.com/${cleanUsername}`}
          className="text-sm text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
      </div>

      {/* Card UI */}
      <div className="relative overflow-hidden mt-2">
        <div className="relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6 flex justify-center">
          <div className="w-full flex justify-center">
            <div className="w-full">
              {/* Added a check here to ensure cleanUsername is not empty before rendering */}
              <div className={theme === "dark" ? "dark" : ""}>
                <GitHubCalendar
                  username={cleanUsername}
                  colorScheme={colorScheme}
                  blockSize={9}
                  blockMargin={3}
                  fontSize={12}
                  showWeekdayLabels={true}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  theme={{
                    light: [
                      "#ebedf0",
                      "#9be9a8",
                      "#40c463",
                      "#30a14e",
                      "#216e39",
                    ],
                    dark: [
                      "#1a1a1a",
                      "#0e4429",
                      "#006d32",
                      "#26a641",
                      "#39d353",
                    ],
                  }}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
