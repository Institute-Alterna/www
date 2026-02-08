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
