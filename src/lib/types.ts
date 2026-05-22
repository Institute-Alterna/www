import type { PortableTextBlock } from "@portabletext/react";

interface NavLink {
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

interface RoleCommunication {
  asynchronous: boolean;
  collaborationFrequency: string;
  language: string;
  liveCollaboration: boolean;
}

interface RoleDuration {
  ongoing: boolean;
}

interface RoleCompensation {
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
  responsibilities: string[] | PortableTextBlock[];
  requirements: string[];
  whatYouWillLearn: string[];
  exceptionalPoints?: string[];
  communication: RoleCommunication;
  duration: RoleDuration;
  compensation: RoleCompensation;
  specialisedCompetencyAssessment?: boolean;
  active: boolean;
}

export interface ShowcaseSlide {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

// ─── Newsroom / Press Releases ───

/** A Sanity image field, optionally with editorial alt/caption/credit metadata */
export interface SanityImage {
  _type?: "image";
  asset: { _ref: string; _type?: "reference" };
  alt?: string;
  caption?: string;
  credit?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface MediaContact {
  name: string;
  title?: string;
  email: string;
}

export interface PressReleaseSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

/** Subset of fields used for newsroom listing cards */
export interface PressReleaseCard {
  _id: string;
  slug: string;
  eyebrow: string;
  headline: string;
  deck: string;
  publishedAt: string;
  location?: string;
  featured: boolean;
  heroImage: SanityImage;
}

/** Full Sanity press release document */
export interface PressRelease {
  _id: string;
  slug: string;
  eyebrow: string;
  headline: string;
  deck: string;
  publishedAt: string;
  location: string;
  author?: string;
  heroImage: SanityImage;
  body: PortableTextBlock[];
  boilerplate: PortableTextBlock[];
  mediaContacts: MediaContact[];
  seo?: PressReleaseSeo;
  featured: boolean;
  relatedReleases?: PressReleaseCard[];
}

export type { PortableTextBlock };
