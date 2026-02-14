export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavDropdown {
  label: string;
  description: string;
  heading: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavDropdown;
  external?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  location: string;
  image?: string;
}

export interface Programme {
  name: string;
  tagline: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Chapter {
  name: string;
  location: string;
  members?: string;
  established: string;
  description: string;
  flagship?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  donateUrl: string;
  hcbUrl: string;
}

export interface VolunteerTeam {
  name: string;
  description: string;
}

export interface MissionPillar {
  number: number;
  title: string;
  description: string;
}

export interface StrategistRole {
  title: string;
  description: string;
}

// Sanity CMS — Volunteer Roles

export interface RoleCommunication {
  asynchronous: boolean;
  collaborationFrequency: string;
  language: string;
  liveCollaboration: boolean;
}

export interface RoleDuration {
  ongoing: boolean;
}

export interface RoleCompensation {
  amount: number;
  benefits: string[];
  salary: boolean;
}

/** Subset of fields used for role listing cards */
export interface RoleCardData {
  _id: string;
  slug: string;
  name: string;
  team: string;
  workMode: string;
  region: string;
  workload: number;
}

/** Full Sanity role document */
export interface SanityRole {
  _id: string;
  _type: "role";
  slug: string;
  name: string;
  team: string;
  workMode: string;
  region: string;
  workload: number;
  overview: PortableTextBlock[];
  responsibilities: string[];
  requirements: string[];
  whatYouWillLearn: string[];
  exceptionalPoints?: string[];
  communication: RoleCommunication;
  duration: RoleDuration;
  compensation: RoleCompensation;
  specialisedCompetencyAssessment?: boolean;
  active: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;
