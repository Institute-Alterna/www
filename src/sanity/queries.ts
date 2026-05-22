/** Card-level fields for the volunteer listing page */
export const activeRolesQuery = `
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
export const roleBySlugQuery = `
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
export const allRoleSlugsQuery = `
  *[_type == "role" && active == true].slug.current
`;

/** Card-level fields for the newsroom listing, newest first */
export const pressReleasesQuery = `
  *[_type == "pressRelease" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    eyebrow,
    headline,
    deck,
    publishedAt,
    location,
    featured,
    heroImage
  }
`;

/** Full press release document by slug, with internal link refs resolved */
export const pressReleaseBySlugQuery = `
  *[_type == "pressRelease" && slug.current == $slug][0] {
    _id,
    eyebrow,
    headline,
    "slug": slug.current,
    deck,
    publishedAt,
    location,
    author,
    heroImage,
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "link" => {
          ...,
          internalRef->{ _type, "slug": slug.current }
        }
      }
    },
    boilerplate,
    mediaContacts,
    seo,
    featured,
    relatedReleases[]->{
      _id,
      "slug": slug.current,
      eyebrow,
      headline,
      deck,
      publishedAt,
      location,
      featured,
      heroImage
    }
  }
`;

/** All press release slugs for generateStaticParams */
export const allPressReleaseSlugsQuery = `
  *[_type == "pressRelease" && defined(slug.current)].slug.current
`;
