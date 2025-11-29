"use client";
import type React from "react";
import type { SkillsetItem } from "@/types/portfolio.types";

type SkillButtonProps = {
  name: string;
  icon: string | null;
};

const SkillButton: React.FC<SkillButtonProps> = ({ name, icon }) => (
  <button
    type="button"
    className={`
        group inline-flex items-center bg-black/5 dark:bg-white/15 
        border border-dashed dark:border-white/30 border-black/20 
        py-1 px-2 rounded-md 
        shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_rgba(255,255,255,0.1)] 
        text-black dark:text-white cursor-pointer transition-all
        hover:scale-[1.03]
      `}
  >
    {icon && (
      <div className="w-5 h-5 flex items-center justify-center">
        <img
          src={icon}
          alt={`${name} icon`}
          width={15}
          height={15}
          className="mb-0.5 object-contain"
        />
      </div>
    )}
    <span className="text-xs font-bold text-black dark:text-white transition-colors">
      {name}
    </span>
  </button>
);

type SkillsProps = {
  skillset: SkillsetItem[];
};

const Skills: React.FC<SkillsProps> = ({ skillset }) => {
  // Separate core skills and other skills
  const coreSkills = skillset?.filter((item) => item.isCoreSkill) || [];
  const otherSkills = skillset?.filter((item) => !item.isCoreSkill) || [];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        skills
      </h1>
      <div className="max-w-2xl">
        {!skillset || skillset.length === 0 ? (
          <div className="text-center py-12 border border-[var(--border)] rounded-lg bg-[var(--muted)]">
            <p className="text-[var(--muted-foreground)]">
              No skills to display
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              Add skills to your portfolio
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Core Skills Section */}
            {coreSkills.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">
                  Core Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {coreSkills.map((item) => (
                    <SkillButton
                      key={item.id}
                      name={item.skill.name}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Skills Section */}
            {otherSkills.length > 0 && (
              <div>
                {coreSkills.length > 0 && (
                  <h2 className="text-sm font-medium text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">
                    Other Skills
                  </h2>
                )}
                <div className="flex flex-wrap gap-3">
                  {otherSkills.map((item) => (
                    <SkillButton
                      key={item.id}
                      name={item.skill.name}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
