import { useState } from "react";
import { SkillBadge } from "./SkillBadge";
import parse from "html-react-parser";

const WHITE_SPACE_REGEX = /\s+/;

type SkillItem = {
  skill: { id: string; name: string };
  icon: string | null;
  color: string | null;
  isCoreSkill: boolean;
};

type AboutProps = {
  about?: string;
  skillset?: SkillItem[];
  avatar?: string;
  name?: string;
};

function stripHtml(html: string | null | undefined): string {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>?/gm, "");
}

export default function About({
  avatar,
  name,
  about = "I'm a Full Stack web developer and Open Source Contributor. I love building products to solve real-world problems. I'm specialized in building MVPs.",
  skillset = [],
}: AboutProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const plainTextAbout = stripHtml(about);

  const truncateText = (text: string, maxWords = 30) => {
    const words = text.split(WHITE_SPACE_REGEX);
    if (words.length <= maxWords) {
      return { text, isTruncated: false };
    }
    return {
      text: `${words.slice(0, maxWords).join(" ")}...`,
      isTruncated: true,
    };
  };

  const { text: truncatedPlainText, isTruncated } =
    truncateText(plainTextAbout);

  const [showAllSkills, setShowAllSkills] = useState(false);
  const visibleSkills = showAllSkills ? skillset : skillset.slice(0, 5);
  const hasMoreSkills = skillset.length > 5;

  return (
    <div id="about">
      <h2 className="text-sm font-semibold text-gray-500 mb-1">About</h2>
      <h3 className="text-2xl font-bold mb-8">Me</h3>

      <div className="grid md:grid-cols-[160px_1fr] gap-8">
        {/* Avatar */}
        <div className="w-full">
          <div className="w-40 h-40 rounded-xl overflow-hidden border shadow-sm bg-gray-100">
            {avatar ? (
              <img
                src={avatar}
                alt={name || "Profile"}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                <span>No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Right content */}
        <div>
          <h2 className="text-xl font-semibold">{name || "Your Name"}</h2>

          {/* About text - Use HTML Parser for full description, plain text for truncated */}
          <div className="text-gray-600 mt-2 leading-relaxed text-[15px] mb-2 typography">
            {showFullDescription ? parse(about) : truncatedPlainText}
          </div>

          {/* Link-style read more */}
          {isTruncated && !showFullDescription && (
            <button
              type="button"
              onClick={() => setShowFullDescription(true)}
              className="text-blue-600 cursor-pointer text-sm underline bg-transparent border-none p-0"
            >
              Read more
            </button>
          )}

          {/* Skills */}
          {skillset.length > 0 && (
            <div className="mt-6">
              <h3 className="text-base font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skillItem, index) => (
                  <div key={`${skillItem.skill.id}-${index}`}>
                    <SkillBadge
                      name={skillItem.skill.name}
                      icon={skillItem.icon}
                      color={skillItem.color}
                    />
                  </div>
                ))}

                {/* +X more */}
                {hasMoreSkills && !showAllSkills && (
                  <button
                    type="button"
                    onClick={() => setShowAllSkills(true)}
                    className="group inline-flex items-center text-sm bg-black/5 border border-dashed border-black/20 py-1 px-2 rounded-md text-black"
                  >
                    +{skillset.length - 5} more
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
