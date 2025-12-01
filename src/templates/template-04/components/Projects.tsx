import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/types/portfolio.types";

function stripHtml(html: string | null | undefined): string {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]*>?/gm, "");
}

type ProjectsProps = {
  projects: Project[];
};

type ProjectProps = {
  title: string;
  link: string;
  logo: string;
  description: string;
  preview?: string;
  id: string;
};

const ProjectItem: React.FC<ProjectProps> = ({
  title,
  logo,
  description,
  preview = "/default.png",
  id,
}) => {
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const strippedDescription = stripHtml(description);

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 shrink-0">
          {logo && logo !== "/default.png" ? (
            <img
              src={logo}
              alt={title ? `${title} logo` : "Project logo"}
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-full h-full rounded-full border border-border bg-muted flex items-center justify-center text-foreground font-bold text-sm">
              {title.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <span className="relative inline-block">
            <button
              type="button"
              onClick={() => navigate(`/projects/${id}`)}
              className="text-base text-foreground decoration-1 underline underline-offset-3 decoration-muted-foreground cursor-pointer group flex items-center bg-transparent border-0 p-0"
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
                role="img"
                aria-label="External link"
              >
                <title>External link</title>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>

            {isHovered && (
              <div className="absolute z-10 left-full ml-4 top-0 w-72 p-4 shadow-lg bg-gray-900 border border-gray-700 rounded text-sm text-white">
                {preview && preview !== "/default.png" && (
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
                      <div
                        ref={imageRef}
                        className={imageError ? "hidden" : "block"}
                      >
                        <img
                          src={preview}
                          alt={`${title} preview`}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                          aria-hidden={imageError}
                        />
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-200">{strippedDescription}</p>
                <div className="absolute top-3 -left-2 w-4 h-4 bg-gray-900 border-l border-b border-gray-700 transform rotate-45" />
              </div>
            )}
          </span>
          <p className="text-sm text-muted-foreground mt-1">
            {strippedDescription.length > 85
              ? `${strippedDescription.substring(0, 85)}...`
              : strippedDescription}
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
    if (projects) {
      for (const project of projects) {
        if (project.previewImageUrl) {
          preloadMedia(project.previewImageUrl);
        }
      }
    }
  }, [projects]);

  // Show only first 3 projects on main page
  const displayedProjects = projects?.slice(0, 3) || [];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">projects</h1>
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
            type="button"
            onClick={() => navigate("/projects")}
            className="mt-6 text-(--link) hover:underline text-sm font-medium flex items-center"
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
              aria-hidden="true"
            >
              <title>View all projects</title>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Projects;
