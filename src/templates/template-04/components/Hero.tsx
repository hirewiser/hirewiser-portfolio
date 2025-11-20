import React, { useState } from "react";
import { ExternalLink, Github, Twitter, Linkedin, Mail } from "lucide-react";
import type { GetUserPortfolioV3Response } from "@/types/portfolio.types";

interface LinkWithTooltipProps {
  text: string;
  description: React.ReactNode;
  href?: string;
  imageUrl?: string;
}

const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  text,
  description,
  href,
  imageUrl,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {href ? (
        <a
          href={href}
          className="text-[var(--link)] hover:underline cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <span className="text-[var(--link)] hover:underline cursor-pointer">
          {text}
        </span>
      )}

      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 left-0 top-8 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {imageUrl && (
            <div className="w-full h-40 overflow-hidden rounded mb-2">
              <img
                src={imageUrl}
                alt="tooltip illustration"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-1">{description}</div>
          <span className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></span>
        </div>
      )}
    </span>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  // Determine which icon to use based on URL
  const getIcon = (url: string) => {
    if (url.includes("github")) return <Github className="w-4 h-4 mr-1" />;
    if (url.includes("twitter") || url.includes("x.com"))
      return <Twitter className="w-4 h-4 mr-1" />;
    if (url.includes("linkedin")) return <Linkedin className="w-4 h-4 mr-1" />;
    if (url.includes("mailto:") || url.includes("mail"))
      return <Mail className="w-4 h-4 mr-1" />;
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

interface SongLinkProps {
  title: string;
  artist: string;
  href: string;
}

const SongLink: React.FC<SongLinkProps> = ({ title, artist, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="inline-flex items-center mr-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mr-1">
        <img
          src="/cd.png"
          alt="CD icon"
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isHovered ? "rotate-[360deg]" : ""
          }`}
        />
      </div>
      <a
        href={href}
        className="text-[var(--link)] text-sm hover:underline mr-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
      <span className="text-[var(--muted-foreground)] text-xs">by</span>
      <span className="font-medium text-xs ml-1">{artist}</span>
    </div>
  );
};

interface HeroProps {
  portfolioData: GetUserPortfolioV3Response;
}

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
                  const result = [];

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

        <div className="mb-8">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">
            find me around
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {portfolioData.links?.map((link) => (
              <SocialLink
                key={link.id}
                href={link.linkUrl || "#"}
                label={link.linkTitle?.toLowerCase() || ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
