import { MYMUN_URL } from "@/lib/data/mun";

// AAIMUN 2026 agenda & position paper guidance.
// Static content authored from the Head of Conference's guidelines — structured
// for a future Sanity migration, mirroring the pattern in `content.ts`.

export { MYMUN_URL };

/** Last-updated marker shown in the page header. */
export const AGENDA_UPDATED = "5 July 2026";

/** Priority deadline for the country matrix preference. */
export const PAPER_DEADLINE = "18 July 2026";

/** Reference position paper accepted by AAIMUN 2026. */
export const EXAMPLE_PAPER_URL =
  "https://drive.google.com/file/d/1uHkFfFx-EHUa87RgDuvb_qU2zpCAS1N1/view?pli=1";

export interface CommitteeAgenda {
  /** Committee label as set by the conference. */
  name: string;
  /** Standard expansion for acronym committees. */
  fullName?: string;
  /** The committee's agenda topic. */
  topic: string;
}

export const committeeAgendas: CommitteeAgenda[] = [
  {
    name: "General Assembly",
    topic: "Disarmament and International Security",
  },
  {
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    topic: "Digital Rights and Surveillance",
  },
  {
    name: "ECOSOC",
    fullName: "Economic and Social Council",
    topic: "Sustainable Development and Economic Recovery",
  },
  {
    name: "Security Council",
    topic: "Conflict Prevention and Peacekeeping Operations",
  },
];

/** Plain-language definition of a position paper. */
export const POSITION_PAPER_DEFINITION =
  "A position paper is a formal, persuasive document that sets out an author's or organisation's stance on a specific issue. In Model United Nations, it is a pre-conference document outlining your assigned country's position on the committee's agenda topic. It works as a strategic roadmap for debate — typically a formal introduction, your country's background on the issue, its specific policies, and proposed solutions — setting the scene for the viewpoints and positions you will bring to the floor.";

/** Lead sentence for the general guidelines block. */
export const ORIGINALITY_LEAD =
  "Every position paper must be original writing. Plagiarism means your paper will not be considered for country prioritisation.";

/** What counts as plagiarism. */
export const plagiarismIncludes: string[] = [
  "Copying significant writing from external sources.",
  "Copying from any AAIMUN guides verbatim.",
  "Copying from AI (any score above 30% on an AI detector is treated as plagiarism.)",
];

/** Disclosure requirement when AI is used. */
export const AI_DISCLOSURE_NOTE =
  "AAIMUN celebrates the power of AI in international relations, but using AI to create an entire position paper may compromise your readiness for the conference. If AI is used at all, an AI disclosure statement is required, naming the language model(s) used.";

/** Remaining general rules beyond originality. */
export const generalRules: string[] = [
  "Papers should not exceed five pages (two is the recommended length.)",
  "Images should not be used.",
];

/** Intro to the suggested formatting structure. */
export const FORMATTING_LEAD =
  "Not every position paper will follow this exact format, but the steps marked Required let the secretariat see a well-balanced, nuanced line of argument. Followed in full, this structure produces a judicious, well-balanced paper.";

export interface FormatStep {
  title: string;
  required?: boolean;
  points: string[];
}

export const formattingStructure: FormatStep[] = [
  {
    title: "Introduction",
    points: [
      "Introduce the topic.",
      "Provide background, including previous debates and the UN's position.",
      "State your viewpoint on the issue.",
    ],
  },
  {
    title: "Counter Argument",
    required: true,
    points: [
      "Summarise the counter-arguments.",
      "Give the evidence and reasons some may argue in their favour.",
      "Refute them with evidence and a coherent line of reasoning.",
    ],
  },
  {
    title: "Your Argument",
    required: true,
    points: [
      "Make three claims, each pairing an opinion with supporting evidence.",
    ],
  },
  {
    title: "Conclusion",
    points: ["Restate your point of view.", "Provide a plan of action."],
  },
];

/** Note accompanying the example paper link. */
export const EXAMPLE_PAPER_NOTE =
  "A reference paper accepted by AAIMUN 2026 is available in the following link. It runs longer than required, but it shows the standard of formatting and the precisely chosen content that an excellent position paper achieves.";

/** Whether a paper is compulsory, and how priority selection works. */
export const compulsoryParagraphs: string[] = [
  "Submitting a position paper is recommended, but not mandatory. With a limited number of seats, delegates who submit a well-written paper by 18 July gain a real advantage: priority country selection across every committee.",
  "Priority delegates get the first choice of committee and country from MUNOS once access opens, upload their paper there for review, and are notified if they are selected for priority access. A paper can be a Word or Google Doc it doesn't need to be elaborate, but a well-written one signals genuine interest in AAIMUN, and that is rewarded with priority country selection.",
];
