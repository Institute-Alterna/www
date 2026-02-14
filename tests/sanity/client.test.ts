import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Sanity client", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns empty results when env vars are not set", async () => {
    const originalProjectId = process.env.SANITY_PROJECT_ID;
    const originalDataset = process.env.SANITY_DATASET;

    delete process.env.SANITY_PROJECT_ID;
    delete process.env.SANITY_DATASET;

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { getActiveRoles, getRoleBySlug, getAllRoleSlugs } = await import(
      "@/sanity/client"
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(".envs not set")
    );

    expect(await getActiveRoles()).toEqual([]);
    expect(await getRoleBySlug("test")).toBeNull();
    expect(await getAllRoleSlugs()).toEqual([]);

    warnSpy.mockRestore();

    // Restore env vars
    if (originalProjectId) process.env.SANITY_PROJECT_ID = originalProjectId;
    if (originalDataset) process.env.SANITY_DATASET = originalDataset;
  });
});
