"use client";
import React from "react";
import type { SkillsetItem } from "@/types/portfolio.types";

interface SkillButtonProps {
  name: string;
  icon: string | null;
}

const SkillButton: React.FC<SkillButtonProps> = ({ name, icon }) => {
  return (
    <button
      className={`
        group relative px-4 py-2.5 rounded-lg border 
        border-[var(--border)] bg-[var(--muted)]
        hover:border-[var(--primary)] hover:bg-[var(--primary)]/20
        transition-all duration-300 ease-in-out
        flex items-center gap-2.5
        hover:scale-105 hover:shadow-lg
      `}
    >
      {icon && (
        <div className="w-5 h-5 flex items-center justify-center">
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
      <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
        {name}
      </span>
    </button>
  );
};

interface SkillsProps {
  skillset: SkillsetItem[];
}

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
