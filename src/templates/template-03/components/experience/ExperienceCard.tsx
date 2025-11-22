import { AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Experience as ExperienceType } from "@/types/portfolio.types";
import { SkillBadge } from "../SkillBadge";
// 👇 IMPORT HTML PARSER
import parse from "html-react-parser";

const formatDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateString;
  }
};

export default function ExperienceCard({
  experience,
}: {
  experience: ExperienceType;
}) {
  const skillsWithIcons = experience.userExperienceSkillsets || [];
  const isCurrent = !experience.endAt;

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Card Content */}
      <div className="flex flex-col gap-2">
        {/* HEADER (Accordion Trigger) */}
        <AccordionTrigger className="p-0 hover:no-underline">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between w-full">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
              {experience.logoURL ? (
                <img
                  src={experience.logoURL}
                  alt={experience.companyName}
                  className="size-12 rounded-md"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="size-12 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {experience.companyName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">
                    {experience.companyName}
                  </h3>

                  {/* Website */}
                  {experience.companyWebsite && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={experience.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="size-4 text-neutral-500"
                        >
                          <FaGlobe />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Visit Website</TooltipContent>
                    </Tooltip>
                  )}

                  {/* X */}
                  {experience.companyX && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={experience.companyX}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="size-4 text-neutral-500"
                        >
                          <FaXTwitter />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Follow on X</TooltipContent>
                    </Tooltip>
                  )}

                  {/* LinkedIn */}
                  {experience.companyLinkedin && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={experience.companyLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="size-4 text-neutral-500"
                        >
                          <FaLinkedin />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Connect on LinkedIn</TooltipContent>
                    </Tooltip>
                  )}

                  {/* Working Badge */}
                  {isCurrent && (
                    <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                      <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                      Working
                    </div>
                  )}
                </div>

                <p className="text-sm">{experience.title}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="text-secondary flex flex-col md:text-right">
              <p>
                {formatDate(experience.startedAt)} –{" "}
                {isCurrent ? "Present" : formatDate(experience.endAt || "")}
              </p>
            </div>
          </div>
        </AccordionTrigger>

        {/* COLLAPSIBLE CONTENT */}
        <AccordionContent className="mt-3">
          {/* SKILLS (Always Rendered With Fallback) */}
          <div>
            <h4 className="text-md mb-2 font-semibold">Skills Used</h4>

            {skillsWithIcons.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skillsWithIcons.map((skillset, i) => (
                  <SkillBadge
                    key={`${skillset.skill.id}-${i}`}
                    name={skillset.skill.name}
                    icon={skillset.icon}
                    color={skillset.color}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No skills listed.</p>
            )}
          </div>

          {/* DESCRIPTION (Using HTML Parser) */}
          <div className="mt-3">
            <h4 className="text-md mb-2 font-semibold">Description</h4>

            {experience.description ? (
              <div className="text-secondary typography">
                {/* Use the parse function to safely render the HTML content */}
                {parse(experience.description)}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No description provided.
              </p>
            )}
          </div>
        </AccordionContent>
      </div>
    </div>
  );
}
