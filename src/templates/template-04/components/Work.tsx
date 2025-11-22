"use client";
import type React from "react";
import { useState } from "react";
import type { Experience } from "@/types/portfolio.types";

type CompanyLogoProps = {
  src: string | null;
  alt: string;
  href: string | null;
  zIndex: number;
};

// Company logo component with website link and hover effect
const CompanyLogo: React.FC<CompanyLogoProps> = ({
  src,
  alt,
  href,
  zIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const companyName = alt.replace(" logo", "");

  const commonClasses = `relative w-12 h-12 rounded-full border-2 border-[var(--background)] overflow-hidden ${
    zIndex < 40 ? "-ml-4" : ""
  } transition-all duration-200 ${
    isHovered ? "scale-110 z-50" : `z-${zIndex}`
  }`;

  const content = (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] font-bold text-sm">
          {companyName.charAt(0).toUpperCase()}
        </div>
      )}
      {isHovered && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap px-2 py-1 text-xs bg-[var(--tooltip)] text-[var(--tooltip-foreground)] rounded shadow-lg">
          {companyName}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--tooltip)] transform rotate-45" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${commonClasses} hover:z-50 cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : zIndex }}
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={href || "#"}
      className={commonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : zIndex }}
      aria-label={`Visit ${alt} website`}
      {...(href ? {} : { "aria-hidden": "true", tabIndex: -1 })}
    >
      {content}
    </a>
  );
};

type WorkItemProps = {
  id: string;
  companyName: string;
  companyWebsite: string | null;
  logoURL: string | null;
  title: string;
  description: string | null;
  startedAt: string;
  endAt: string | null;
};

const formatDate = (dateString: string) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const WorkItem: React.FC<WorkItemProps> = ({
  companyName,
  companyWebsite,
  logoURL,
  title,
  description,
  startedAt,
  endAt,
}) => {
  const timeline = `${formatDate(startedAt)} - ${
    endAt ? formatDate(endAt) : "Present"
  }`;

  const renderLogo = () => {
    const logoContent = logoURL ? (
      <img
        src={logoURL}
        alt={`${companyName} logo`}
        width={48}
        height={48}
        className="w-full h-full rounded-full object-cover border border-[var(--border)]"
      />
    ) : (
      <div className="w-full h-full rounded-full border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] font-bold">
        {companyName.charAt(0).toUpperCase()}
      </div>
    );

    if (companyWebsite) {
      return (
        <a
          href={companyWebsite}
          className="block w-12 h-12 rounded-full overflow-hidden"
        >
          {logoContent}
        </a>
      );
    }

    return logoContent;
  };

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-12 h-12 flex-shrink-0 mr-4">{renderLogo()}</div>

        <div>
          <h3 className="text-base font-medium text-[var(--foreground)]">
            {companyWebsite ? (
              <a
                href={companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer transition-colors hover:text-[var(--primary)]"
              >
                {companyName}
              </a>
            ) : (
              companyName
            )}
          </h3>
          <div className="text-sm text-[var(--muted-foreground)] mb-4">
            {title}
            <span className="inline-flex gap-2">
              <span className="opacity-50 ml-3 -mr-1 pb-1">•</span>
              <span>{timeline}</span>
            </span>
          </div>
          <ul className="text-sm text-[var(--foreground)] list-disc pl-4 marker:text-[var(--muted-foreground)]">
            {description ? (
              <li className="mb-2">{description}</li>
            ) : (
              <li className="mb-2 italic text-[var(--muted-foreground)]">
                No description added
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

type WorkProps = {
  experiences: Experience[];
};

const Work: React.FC<WorkProps> = ({ experiences }) => {
  const mainExperiences = experiences?.slice(0, 2) || [];
  const otherExperiences = experiences?.slice(2) || [];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">work</h1>
      <div className="max-w-2xl">
        {!experiences || experiences.length === 0 ? (
          <div className="text-center py-12 border border-[var(--border)] rounded-lg bg-[var(--muted)]">
            <p className="text-[var(--muted-foreground)]">
              No work experience to display
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              Check if experience data exists in portfolio
            </p>
          </div>
        ) : (
          <>
            {mainExperiences.map((experience) => (
              <WorkItem
                key={experience.id}
                id={experience.id}
                companyName={experience.companyName}
                companyWebsite={experience.companyWebsite}
                logoURL={experience.logoURL}
                title={experience.title}
                description={experience.description}
                startedAt={experience.startedAt}
                endAt={experience.endAt}
              />
            ))}

            {otherExperiences.length > 0 && (
              <div className="mb-8">
                <p className="text-xs text-[var(--muted-foreground)] mb-3">
                  also worked with folks at
                </p>
                <div className="flex items-center">
                  <div className="relative flex">
                    {otherExperiences.map((experience, index) => (
                      <CompanyLogo
                        key={experience.id}
                        src={experience.logoURL}
                        alt={`${experience.companyName} logo`}
                        href={experience.companyWebsite}
                        zIndex={40 - index * 10}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Work;
