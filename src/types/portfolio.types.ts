export type SkillCategory = string;

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory | null;
};

export type SkillsetItem = {
  id: string;
  icon: string | null;
  color: string | null;
  isCoreSkill: boolean;
  skill: Skill;
};

export type DegreeType = string;

export type Degree = {
  id: string;
  name: string;
  type: DegreeType;
};

export type Education = {
  id: string;
  eduFrom: string;
  startedAt: string;
  endAt: string | null;
  logoURL: string | null;
  eduFromLink: string | null;
  degree: Degree;
};

export type Certificate = {
  id: string;
  title: string;
  description: string | null;
  link: string | null;
  filePath: string | null;
  startedAt: string;
  endAt: string | null;
  logoURL: string | null;
  location: string | null;
  linkName: string | null;
};

export type UserLink = {
  id: string;
  linkUrl: string;
  linkTitle: string;
  integrationsEnabled: boolean;
};

export type ExperienceSkillset = {
  id: string;
  icon: string | null;
  color: string | null;
  skill: Skill;
};

export type Experience = {
  id: string;
  title: string;
  companyName: string;
  companyWebsite: string | null;
  companyX: string | null;
  companyLinkedin: string | null;
  description: string | null;
  startedAt: string;
  endAt: string | null;
  logoURL: string | null;
  userExperienceSkillsets: ExperienceSkillset[];
};

export type ProjectLink = {
  id: string;
  linkUrl: string;
  linkTitle: string;
};

export type ProjectSkillset = {
  id: string;
  icon: string | null;
  color: string | null;
  skill: Skill;
};

export type ProjectKPIType = string;

export type ProjectKPI = {
  id: string;
  point: string;
  type: ProjectKPIType;
};

export type ProjectStatus = string | null;
export type ProjectTimeline = string | null;

export type Project = {
  id: string;
  title: string;
  description: string | null;
  link: string | null;
  linkName: string | null;
  startedAt: string | null;
  endAt: string | null;
  previewImageUrl: string | null;
  timeline: ProjectTimeline;
  role: string | null;
  team: string | null;
  status: ProjectStatus;
  projectLinks: ProjectLink[];
  projectSkillset: ProjectSkillset[];
  projectKPI: ProjectKPI[];
};

export type Event = {
  id: string;
  name: string;
  link: string;
  type: string;
  badge: string;
};

export type Template = {
  name: string;
};

export type UserPortfolio = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  headerText: string | null;
  headerImage: string | null;
  profileImage: string | null;
  description: string | null;
  templateId: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  template: Template;
  skillset: SkillsetItem[];
  projects: Project[];
  experience: Experience[];
  links: UserLink[];
  certificates: Certificate[];
  education: Education[];
  events: Event[];
  integrationsEnabled: boolean;
};

export type GetUserPortfolioV3Response = UserPortfolio;
