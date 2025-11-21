import type React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  to?: string;
  className?: string;
  label?: string;
};

const BackButton: React.FC<BackButtonProps> = ({
  to = "/projects",
  className = "",
  label = "Back to Projects",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to === "back") {
      window.history.back();
    } else {
      navigate(to);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center text-[var(--link)] hover:underline ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" /> {label}
    </button>
  );
};

export default BackButton;
