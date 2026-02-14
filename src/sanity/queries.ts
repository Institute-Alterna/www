import { groq } from "next-sanity";

/** Card-level fields for the volunteer listing page */
export const activeRolesQuery = groq`
  *[_type == "role" && active == true] | order(name asc) {
    _id,
    "slug": slug.current,
    name,
    team,
    workMode,
    region,
    workload
  }
`;

/** Full role document by slug */
export const roleBySlugQuery = groq`
  *[_type == "role" && slug.current == $slug && active == true][0] {
    _id,
    _type,
    "slug": slug.current,
    name,
    team,
    workMode,
    region,
    workload,
    overview,
    responsibilities,
    requirements,
    whatYouWillLearn,
    exceptionalPoints,
    communication,
    duration,
    compensation,
    specialisedCompetencyAssessment,
    active
  }
`;

/** All active slugs for generateStaticParams */
export const allRoleSlugsQuery = groq`
  *[_type == "role" && active == true].slug.current
`;
