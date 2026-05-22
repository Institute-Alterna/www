import { createClient } from "@sanity/client";
import type {
  RoleCardData,
  SanityRole,
  PressRelease,
  PressReleaseCard,
} from "@/lib/types";
import {
  activeRolesQuery,
  roleBySlugQuery,
  allRoleSlugsQuery,
  pressReleasesQuery,
  pressReleaseBySlugQuery,
  allPressReleaseSlugsQuery,
} from "./queries";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

const isSanityConfigured = Boolean(projectId && dataset);

if (!isSanityConfigured) {
  console.warn(
    "[sanity] .envs not set — SANITY_PROJECT_ID and SANITY_DATASET are required. Sanity queries will return empty results."
  );
}

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false, // Pages are cached at the Next.js/CDN layer.
    })
  : null;

export async function getActiveRoles(): Promise<RoleCardData[]> {
  if (!client) return [];
  try {
    return await client.fetch<RoleCardData[]>(activeRolesQuery);
  } catch {
    return [];
  }
}

export async function getRoleBySlug(
  slug: string
): Promise<SanityRole | null> {
  if (!client) return null;
  try {
    return await client.fetch<SanityRole | null>(roleBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function getAllRoleSlugs(): Promise<string[]> {
  if (!client) return [];
  try {
    return await client.fetch<string[]>(allRoleSlugsQuery);
  } catch {
    return [];
  }
}

export async function getPressReleases(): Promise<PressReleaseCard[]> {
  if (!client) return [];
  try {
    return await client.fetch<PressReleaseCard[]>(pressReleasesQuery);
  } catch {
    return [];
  }
}

export async function getPressReleaseBySlug(
  slug: string
): Promise<PressRelease | null> {
  if (!client) return null;
  try {
    return await client.fetch<PressRelease | null>(pressReleaseBySlugQuery, {
      slug,
    });
  } catch {
    return null;
  }
}

export async function getAllPressReleaseSlugs(): Promise<string[]> {
  if (!client) return [];
  try {
    return await client.fetch<string[]>(allPressReleaseSlugsQuery);
  } catch {
    return [];
  }
}
