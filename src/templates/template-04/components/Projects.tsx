"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/types/portfolio.types";

interface ProjectsProps {
  projects: Project[];
}

interface ProjectProps {
  title: string;
  link: string;
  logo: string;
  description: string;
  preview?: string;
  id: string;
}

const ProjectItem: React.FC<ProjectProps> = ({
  title,
  link,
  logo,
  description,
  preview = "/default.png",
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 flex-shrink-0">
          {logo && logo !== "/default.png" ? (
            <img
              src={logo}
              alt={`${title} logo`}
              className="w-full h-full rounded-full object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-full h-full rounded-full border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] font-bold text-sm">
              {title.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <span className="relative inline-block">
            <button
              onClick={() => navigate(`/projects/${id}`)}
              className="text-base text-[var(--foreground)] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group flex items-center bg-transparent border-0 p-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {title}
              <svg
                className="w-4 h-4 ml-0.5 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>

            {isHovered && (
              <div className="absolute z-10 left-full ml-4 top-0 w-72 p-2 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
                <div className="w-full h-40 overflow-hidden rounded mb-2">
                  {preview.endsWith(".mp4") ||
                  preview.endsWith(".webm") ||
                  preview.endsWith(".mov") ? (
                    <video
                      src={preview}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt={`${title} preview`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p className="text-xs">{description}</p>
                <div className="absolute top-3 -left-2 w-4 h-4 bg-[var(--tooltip)] border-l border-b border-[var(--tooltip-border)] transform rotate-45"></div>
              </div>
            )}
          </span>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            {description.length > 85
              ? `${description.substring(0, 85)}...`
              : description}
          </p>
        </div>
      </div>
    </div>
  );
};

const preloadMedia = (preview: string) => {
  const img = new Image();
  img.src = preview;

  if (
    preview.endsWith(".mp4") ||
    preview.endsWith(".webm") ||
    preview.endsWith(".mov")
  ) {
    const video = document.createElement("video");
    video.src = preview;
  }
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const navigate = useNavigate();

  useEffect(() => {
    projects?.forEach((project) => {
      if (project.previewImageUrl) {
        preloadMedia(project.previewImageUrl);
      }
    });
  }, [projects]);

  // Show only first 3 projects on main page
  const displayedProjects = projects?.slice(0, 3) || [];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        projects
      </h1>
      <div className="max-w-2xl">
        {displayedProjects.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            link={project.link || "#"}
            logo={project.previewImageUrl || "/default.png"}
            description={project.description || ""}
            preview={project.previewImageUrl || "/default.png"}
            id={project.id}
          />
        ))}

        {projects && projects.length > 3 && (
          <button
            onClick={() => navigate("/projects")}
            className="mt-6 text-[var(--link)] hover:underline text-sm font-medium flex items-center"
          >
            view all projects
            <svg
              className="w-3 h-3 ml-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Projects;
