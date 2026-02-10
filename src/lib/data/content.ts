import type {
  NavItem,
  TeamMember,
  Programme,
  CoreValue,
  FAQItem,
  Stat,
  Chapter,
  SocialLink,
  SiteConfig,
  VolunteerTeam,
  MissionPillar,
  StrategistRole,
} from "@/lib/types";

// ─── Site Configuration ───

export const siteConfig: SiteConfig = {
  name: "Institute Alterna",
  tagline: "Redefining learning, one programme at a time.",
  description:
    "Institute Alterna is a fiscally sponsored 501(c)(3) nonprofit developing computer science resources for people of all ages.",
  donateUrl: "https://hcb.hackclub.com/donations/start/alterna",
  hcbUrl: "https://hcb.hackclub.com/alterna",
};

// ─── Navigation ───

export const centreNavItems: NavItem[] = [
  {
    label: "AAIMUN",
    dropdown: {
      label: "AAIMUN",
      heading: "ARTIFICIAL INTELLIGENCE MODEL UNITED NATIONS",
      description:
        "The world's first competitive Model United Nations centred in artificial intelligence legislation and policy.",
      links: [
        {
          label: "AAIMUN 2026",
          href: "https://forms.alterna.dev/mun/26/interest?sauce=websiteHeader",
          external: true,
        },
        { label: "About AAIMUN", href: "/mun" },
      ],
    },
  },
  {
    label: "CHS",
    dropdown: {
      label: "CHS",
      heading: "COMPUTING HONOUR SOCIETY",
      description:
        "Hyper-local tech education delivered through student-led chapters at schools worldwide.",
      links: [
        { label: "Computing Honour Society", href: "/chs" },
        {
          label: "Chapter Directory",
          href: "https://chs.alterna.dev/chapters",
          external: true,
        },
        {
          label: "Start a Chapter",
          href: "https://chs.alterna.dev/start",
          external: true,
        },
      ],
    },
  },
  {
    label: "Learning",
    href: "/learning",
  },
];

export const rightNavItems: NavItem[] = [
  {
    label: "About",
    dropdown: {
      label: "About",
      heading: "INSTITUTE ALTERNA",
      description:
        "A fiscally sponsored 501(c)(3) nonprofit building the future of computer science education.",
      links: [
        { label: "Mission", href: "/about" },
        {
          label: "Donate",
          href: "https://hcb.hackclub.com/donations/start/alterna",
          external: true,
        },
        {
          label: "Finances",
          href: "https://hcb.hackclub.com/alterna",
          external: true,
        },
        { label: "Team", href: "/about#team" },
        { label: "Contact", href: "/contact" },
        { label: "(Alterna)tive", href: "/alternative" },
      ],
    },
  },
];

// ─── Programmes ───

export const programmes: Programme[] = [
  {
    name: "AAIMUN",
    tagline: "AI meets global policy",
    description:
      "The world's first competitive Model United Nations centred in artificial intelligence legislation, in collaboration with the Future Summit Alliance under the UNx Conference league.",
    href: "/mun",
  },
  {
    name: "Computing Honour Society",
    tagline: "Hyper-local tech education",
    description:
      "Student-led chapters delivering computer science education at schools worldwide. Currently active across Florida, United States with plans for global expansion.",
    href: "/chs",
  },
  {
    name: "Learning Platform",
    tagline: "Resources for everyone",
    description:
      "A comprehensive library of computer science resources designed for learners of all ages and skill levels. From introductory concepts to advanced topics.",
    href: "/learning",
  },
  {
    name: "Workshops",
    tagline: "Hands-on learning experiences",
    description:
      "Interactive sessions and events designed to bridge the gap between theory and practice, bringing technology education directly to communities.",
    href: "/about#workshops",
  },
];

// ─── Impact Stats ───

export const impactStats: Stat[] = [
  { value: "100+", label: "AAIMUN delegates" },
  { value: "25+", label: "CHS members" },
  { value: "2", label: "Active chapters" },
  { value: "4", label: "Countries in team" },
];

// ─── Mission Pillars ───

export const missionPillars: MissionPillar[] = [
  {
    number: 1,
    title: "Create resources",
    description:
      "Develop high-quality, accessible computer science resources that serve learners of all ages, backgrounds, and skill levels.",
  },
  {
    number: 2,
    title: "Impact learning journeys",
    description:
      "Transform how people experience technology education by making it engaging, relevant, and deeply personal.",
  },
  {
    number: 3,
    title: "Advocate for change",
    description:
      "Champion equitable access to technology education and advocate for policies that expand opportunity for all.",
  },
];

// ─── Core Values ───

export const coreValues: CoreValue[] = [
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in everything we create and deliver.",
  },
  {
    title: "Impact",
    description:
      "Every programme, every resource, and every decision is measured by the difference it makes.",
  },
  {
    title: "Inclusion",
    description:
      "Technology education belongs to everyone, regardless of background, location, or circumstance.",
  },
  {
    title: "Leadership",
    description:
      "We empower students to lead, innovate, and take ownership of their communities.",
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency, honesty, and accountability in all that we do.",
  },
  {
    title: "Innovation",
    description:
      "We embrace new ideas, challenge conventions, and continuously seek better ways to serve.",
  },
  {
    title: "Collaboration",
    description:
      "Our strength lies in working together - across teams, chapters, and borders.",
  },
  {
    title: "Resilience",
    description:
      "We persist through challenges, learn from setbacks, and emerge stronger.",
  },
];

// ─── Team ───

export const teamMembers: TeamMember[] = [
  {
    name: "Sebastián Camargo Marín",
    role: "Founder & Director",
    location: "United States",
  },
  {
    name: "Jil Shah",
    role: "Impact Specialist",
    location: "United Kingdom",
  },
  {
    name: "Zacharie Morin",
    role: "Safety Specialist",
    location: "United States",
  },
  {
    name: "Benson Lončar",
    role: "CHS Programme Specialist",
    location: "United States",
  },
  {
    name: "Aleksander Meyer",
    role: "CHS Programme Coordinator",
    location: "United States",
  },
];

// ─── CHS Chapters ───

export const chapters: Chapter[] = [
  {
    name: "CHS Robinson",
    location: "Tampa, FL",
    members: "25+",
    established: "2025",
    description:
      "The flagship chapter of the Computing Honour Society, pioneering hyper-local tech education at Robinson High School.",
    flagship: true,
  },
  {
    name: "CHS Lakes",
    location: "Tampa, FL",
    established: "2026",
    description:
      "The newest chapter bringing computing education to the Academy at the Lakes and the surrounding community.",
  },
];

// ─── CHS Strategist Roles ───

export const strategistRoles: StrategistRole[] = [
  {
    title: "Principal Strategist",
    description:
      "Oversees chapter operations, sets strategic direction, and serves as the primary liaison with school administration and Institute Alterna.",
  },
  {
    title: "Academic Strategist",
    description:
      "Designs and delivers the chapter's educational curriculum, workshops, and learning resources.",
  },
  {
    title: "Community Strategist",
    description:
      "Builds partnerships, organises outreach events, and grows the chapter's presence within the school and local community.",
  },
  {
    title: "Competition Strategist",
    description:
      "Prepares members for computing competitions, coordinates team entries, and tracks competitive achievements.",
  },
];

// ─── Volunteer ───

export const volunteerTeams: VolunteerTeam[] = [
  {
    name: "AAIMUN",
    description:
      "Help organise and run the world's first AI-centred Model United Nations conference.",
  },
  {
    name: "CHS",
    description:
      "Support chapters with curriculum development, mentorship, and operational guidance.",
  },
  {
    name: "Operations",
    description:
      "Keep the organisation running smoothly - logistics, planning, and process improvement.",
  },
  {
    name: "Content",
    description:
      "Create educational resources, articles, and learning materials for our platforms.",
  },
  {
    name: "Marketing",
    description:
      "Spread the word through social media, design, and communications.",
  },
  {
    name: "Trust & Safety",
    description:
      "Ensure our programmes and platforms remain safe, inclusive, and welcoming for all.",
  },
];

export const volunteerBenefits = [
  "Flexible time off - volunteer on your own schedule",
  "Fully remote - contribute from anywhere in the world",
  "Mentorship from experienced leaders",
  "Letters of recommendation for outstanding volunteers",
  "Real-world skill development in your area of interest",
];

export const volunteerFAQs: FAQItem[] = [
  {
    question: "How much time do I need to commit?",
    answer:
      "We ask for a minimum of 3–5 hours per week, but this is flexible. We understand that volunteers have other commitments and work around your schedule.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "Not at all. We welcome volunteers of all skill levels and backgrounds. What matters most is your enthusiasm and willingness to learn.",
  },
  {
    question: "Can I volunteer from outside the United States?",
    answer:
      "Absolutely. Institute Alterna operates globally, and many of our team members are based internationally. All volunteer work is remote.",
  },
  {
    question: "Is there an age requirement?",
    answer:
      "We welcome volunteers aged 14 and above. Volunteers under 18 may need parental or guardian consent depending on the role.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "Our team will review your application and reach out within 1–2 weeks. You'll have a brief conversation with a team lead to find the best fit for your skills and interests.",
  },
];

// ─── Social Links ───

export const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    href: "https://instagram.com/institutealterna",
    label: "Follow us on Instagram",
  },
  {
    platform: "X",
    href: "https://x.com/alternaedu",
    label: "Follow us on X",
  },
  {
    platform: "YouTube",
    href: "https://youtube.com/@institutealterna",
    label: "Subscribe on YouTube",
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com/company/institutealterna",
    label: "Connect on LinkedIn",
  },
  {
    platform: "GitHub",
    href: "https://github.com/institute-alterna",
    label: "View our code on GitHub",
  },
  {
    platform: "Bluesky",
    href: "https://bsky.app/profile/alterna.dev",
    label: "Follow us on Bluesky",
  },
];

// ─── Footer Navigation ───

export const footerProgrammes: NavItem[] = [
  { label: "AAIMUN", href: "/mun" },
  { label: "Computing Honour Society", href: "/chs" },
  { label: "Learning Platform", href: "/learning" },
];

export const footerOrganisation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Volunteer", href: "/volunteer" },
  {
    label: "Donate",
    href: "https://hcb.hackclub.com/donations/start/alterna",
    external: true,
  },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Security", href: "/security" },
];
