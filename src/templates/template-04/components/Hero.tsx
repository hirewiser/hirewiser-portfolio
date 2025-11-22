import type React from "react";

import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import type { GetUserPortfolioV3Response } from "@/types/portfolio.types";

type SocialLinkProps = {
  href: string;
  label: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  // Determine which icon to use based on URL
  const getIcon = (url: string) => {
    if (url.includes("github")) {
      return <Github className="w-4 h-4 mr-1" />;
    }
    if (url.includes("twitter") || url.includes("x.com")) {
      return <Twitter className="w-4 h-4 mr-1" />;
    }
    if (url.includes("linkedin")) {
      return <Linkedin className="w-4 h-4 mr-1" />;
    }
    if (url.includes("mailto:") || url.includes("mail")) {
      return <Mail className="w-4 h-4 mr-1" />;
    }
    return <ExternalLink className="w-4 h-4 mr-1" />;
  };

  return (
    <a
      href={href}
      className="text-[var(--link)] text-sm hover:underline flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {getIcon(href)}
      {label}
    </a>
  );
};

type HeroProps = {
  portfolioData: GetUserPortfolioV3Response;
};

const Hero: React.FC<HeroProps> = ({ portfolioData }) => {
  return (
    <div className=" px-4 py-7">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        hi, i&apos;m {portfolioData.firstName?.toLowerCase() || ""}.
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          {portfolioData.headerText || "i build things on the internet."}
        </p>

        <p className="mb-4 text-base text-[var(--foreground)] whitespace-pre-line">
          {portfolioData.description
            ? (() => {
                // Function to split text after every 2 periods
                const formatDescription = (text: string) => {
                  const parts = text.split(". ");
                  const result: string[] = [];

                  for (let i = 0; i < parts.length; i += 2) {
                    const chunk = parts
                      .slice(i, i + 2)
                      .join(". ")
                      .trim();
                    if (chunk) {
                      result.push(chunk);
                    }
                  }

                  return result.join("\n\n");
                };

                return formatDescription(portfolioData.description);
              })()
            : ""}
        </p>

        {portfolioData.links?.some((link) => link.linkUrl) && (
          <div className="mb-8">
            <p className="text-sm text-[var(--muted-foreground)] mb-2">
              find me around
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {portfolioData.links
                .filter((link) => link.linkUrl) // Only show links that have a URL
                .map((link) => (
                  <SocialLink
                    key={link.id}
                    href={link.linkUrl} // Removed the non-null assertion operator
                    label={
                      link.linkTitle?.toLowerCase() ||
                      link.linkUrl?.split("/").pop()?.toLowerCase() ||
                      "link"
                    }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
