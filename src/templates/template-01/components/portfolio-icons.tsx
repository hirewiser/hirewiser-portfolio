import {
  FaGithub,
  FaLinkedin,
  FaBehance,
  FaDribbble,
  FaPinterest,
  FaTelegramPlane,
  FaYoutube,
  FaGlobe,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

// Icon mapping function for links - returns JSX elements
export const getLinkIcon = (linkTitle?: string | null) => {
  if (!linkTitle) {
    return <FaExternalLinkAlt className="size-3" />;
  }

  const title = linkTitle.toLowerCase();
  if (title.includes("github")) {
    return <FaGithub className="size-3" />;
  }
  if (title.includes("linkedin")) {
    return <FaLinkedin className="size-3" />;
  }
  if (title.includes("instagram")) {
    return <FaInstagram className="size-3" />;
  }
  if (title.includes("twitter") || title.includes("x")) {
    return <FaXTwitter className="size-3" />;
  }
  if (title.includes("behance")) {
    return <FaBehance className="size-3" />;
  }
  if (title.includes("dribbble")) {
    return <FaDribbble className="size-3" />;
  }
  if (title.includes("pinterest")) {
    return <FaPinterest className="size-3" />;
  }
  if (title.includes("telegram")) {
    return <FaTelegramPlane className="size-3" />;
  }
  if (title.includes("youtube")) {
    return <FaYoutube className="size-3" />;
  }
  if (title.includes("website") || title.includes("web")) {
    return <FaGlobe className="size-3" />;
  }

  return <FaExternalLinkAlt className="size-3" />;
};
