import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import type { GetUserPortfolioV3Response } from "@/types/portfolio.types";

type HeaderProps = {
  portfolioData?: GetUserPortfolioV3Response;
};

function Header({ portfolioData }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add effect to handle theme transition
  useEffect(() => {
    // Add transition class to body when component mounts
    document.documentElement.classList.add("theme-transition");

    // Remove transition after changes are complete to prevent unwanted transitions
    const handleTransitionEnd = () => {
      document.documentElement.classList.remove("theme-transition");
    };

    document.documentElement.addEventListener(
      "transitionend",
      handleTransitionEnd
    );

    return () => {
      document.documentElement.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, []);

  // Add transition class before theme change and remove it after
  const handleThemeChange = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the viewport height
      const viewportHeight = window.innerHeight;
      // Get the element's position relative to the viewport
      const elementRect = element.getBoundingClientRect();
      // Calculate the scroll position to center the element
      const scrollPosition =
        window.scrollY +
        elementRect.top -
        viewportHeight / 2 +
        elementRect.height / 2;

      // Special handling for first and last sections
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (sectionId === "newsletter") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center -mt-2bg-background w-full z-20 h-7">
        <div className="flex items-center">
          <Link
            to="/"
            className="mb-6 ml-2 text-base text-primary hover:underline"
          >
            {portfolioData
              ? `${portfolioData.firstName} ${portfolioData.lastName || ""}`.trim()
              : "Portfolio"}
          </Link>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Desktop Navigation */}
          <ul className="mb-6 hidden sm:flex items-center gap-4 social-link ">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                about
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                projects
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                work
              </button>
            </li>
          </ul>

          {/* Mobile Controls */}
          <div className="flex items-center sm:hidden gap-1">
            {/* Theme Toggle - Mobile */}
            <button
              type="button"
              onClick={handleThemeChange}
              className="p-2 rounded-md hover:bg-accent transition-colors mb-6"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-[18px] w-[18px] text-muted-foreground" />
              ) : (
                <Sun className="h-[18px] w-[18px] text-muted-foreground" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-accent transition-colors mb-6"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-[18px] w-[18px] text-muted-foreground" />
              ) : (
                <Menu className="h-[18px] w-[18px] text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Desktop Theme Toggle */}
          <button
            type="button"
            onClick={handleThemeChange}
            className="hidden sm:block p-2 rounded-md hover:bg-accent transition-colors mb-5"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-[18px] w-[18px] text-muted-foreground" />
            ) : (
              <Sun className="h-[18px] w-[18px] text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-[57px] bg-background z-50">
          <ul className="flex flex-col items-center gap-6 pt-8">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                about
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                projects
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                work
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Full width divider that breaks out of container */}
      <hr className="border-t border-border relative w-screen left-[50%] right-[50%] -translate-x-[50%]" />
    </div>
  );
}

export default Header;
