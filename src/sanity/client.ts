import { createClient } from "next-sanity";
import type { RoleCardData, SanityRole } from "@/lib/types";
import {
  activeRolesQuery,
  roleBySlugQuery,
  allRoleSlugsQuery,
} from "./queries";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

const isSanityConfigured = Boolean(projectId && dataset);

if (!isSanityConfigured) {
  console.warn(
    "[sanity] .envs not set — SANITY_PROJECT_ID and SANITY_DATASET are required. Sanity queries will return empty results."
  );
}

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
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
