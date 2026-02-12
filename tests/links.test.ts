import { describe, it, expect } from "vitest";
import {
  centreNavItems,
  rightNavItems,
  programmes,
  socialLinks,
  footerProgrammes,
  footerOrganisation,
} from "@/lib/data/content";
import type { NavItem } from "@/lib/types";
import fs from "fs";
import path from "path";

// Dynamically discover all valid local routes by scanning the src/app directory
function getValidLocalRoutes(): string[] {
  const appDir = path.join(process.cwd(), "src", "app");
  const routes: string[] = [];

  function scanDirectory(dir: string, basePath: string = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip API routes and other special Next.js directories
        if (entry.name === "api" || entry.name.startsWith("_")) {
          continue;
        }

        // Recursively scan subdirectories
        const newBasePath = basePath + "/" + entry.name;
        scanDirectory(fullPath, newBasePath);
      } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
        // Found a page file - convert to route
        const route = basePath || "/";
        routes.push(route);
      }
    }
  }

  scanDirectory(appDir);
  return routes.sort();
}

// Get all valid local routes dynamically
const VALID_LOCAL_ROUTES = getValidLocalRoutes();

// Helper function to extract all links from NavItems (handles nested dropdowns)
function extractLinksFromNavItems(items: NavItem[]): {
  href: string;
  external?: boolean;
  label: string;
}[] {
  const links: { href: string; external?: boolean; label: string }[] = [];

  for (const item of items) {
    if (item.href) {
      links.push({
        href: item.href,
        external: item.external,
        label: item.label,
      });
    }

    if (item.dropdown?.links) {
      for (const link of item.dropdown.links) {
        links.push({
          href: link.href,
          external: link.external,
          label: link.label,
        });
      }
    }
  }

  return links;
}

// Helper function to check if a path is a valid local route
function isValidLocalRoute(href: string): boolean {
  // Remove hash fragments for checking
  const pathWithoutHash = href.split("#")[0];

  // Check if it's an exact match
  if (VALID_LOCAL_ROUTES.includes(pathWithoutHash)) {
    return true;
  }

  // Check if it's a hash-only link (like #programmes)
  if (href.startsWith("#")) {
    return true;
  }

  return false;
}

// Helper function to determine if a link is external
function isExternalLink(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

describe("Link Validation", () => {
  describe("Local Links", () => {
    it("should have valid local routes in centre navigation items", () => {
      const links = extractLinksFromNavItems(centreNavItems);
      const localLinks = links.filter((link) => !link.external);

      for (const link of localLinks) {
        expect(
          isValidLocalRoute(link.href),
          `"${link.label}" points to invalid route: ${link.href}`
        ).toBe(true);
      }
    });

    it("should have valid local routes in right navigation items", () => {
      const links = extractLinksFromNavItems(rightNavItems);
      const localLinks = links.filter((link) => !link.external);

      for (const link of localLinks) {
        expect(
          isValidLocalRoute(link.href),
          `"${link.label}" points to invalid route: ${link.href}`
        ).toBe(true);
      }
    });

    it("should have valid local routes in programmes", () => {
      for (const programme of programmes) {
        if (!isExternalLink(programme.href)) {
          expect(
            isValidLocalRoute(programme.href),
            `Programme "${programme.name}" points to invalid route: ${programme.href}`
          ).toBe(true);
        }
      }
    });

    it("should have valid local routes in footer programmes", () => {
      const links = extractLinksFromNavItems(footerProgrammes);
      const localLinks = links.filter((link) => !link.external);

      for (const link of localLinks) {
        expect(
          isValidLocalRoute(link.href),
          `Footer programme "${link.label}" points to invalid route: ${link.href}`
        ).toBe(true);
      }
    });

    it("should have valid local routes in footer organisation", () => {
      const links = extractLinksFromNavItems(footerOrganisation);
      const localLinks = links.filter((link) => !link.external);

      for (const link of localLinks) {
        expect(
          isValidLocalRoute(link.href),
          `Footer organisation "${link.label}" points to invalid route: ${link.href}`
        ).toBe(true);
      }
    });

    it("should ensure all VALID_LOCAL_ROUTES have corresponding page files", () => {
      const appDir = path.join(process.cwd(), "src", "app");

      for (const route of VALID_LOCAL_ROUTES) {
        if (route === "/") {
          // Root route is at src/app/page.tsx
          const pagePath = path.join(appDir, "page.tsx");
          expect(
            fs.existsSync(pagePath),
            `Root page file does not exist at ${pagePath}`
          ).toBe(true);
        } else {
          // Other routes are at src/app/{route}/page.tsx
          const pagePath = path.join(appDir, route.slice(1), "page.tsx");
          expect(
            fs.existsSync(pagePath),
            `Page file does not exist for route "${route}" at ${pagePath}`
          ).toBe(true);
        }
      }
    });
  });

  describe("External Links - HTTPS Validation", () => {
    it("should use https:// for all external links in centre navigation", () => {
      const links = extractLinksFromNavItems(centreNavItems);
      const externalLinks = links.filter((link) => link.external);

      for (const link of externalLinks) {
        expect(
          link.href.startsWith("https://"),
          `External link "${link.label}" does not use HTTPS: ${link.href}`
        ).toBe(true);
      }
    });

    it("should use https:// for all external links in right navigation", () => {
      const links = extractLinksFromNavItems(rightNavItems);
      const externalLinks = links.filter((link) => link.external);

      for (const link of externalLinks) {
        expect(
          link.href.startsWith("https://"),
          `External link "${link.label}" does not use HTTPS: ${link.href}`
        ).toBe(true);
      }
    });

    it("should use https:// for all social links", () => {
      for (const link of socialLinks) {
        expect(
          link.href.startsWith("https://"),
          `Social link "${link.platform}" does not use HTTPS: ${link.href}`
        ).toBe(true);
      }
    });

    it("should use https:// for all external links in footer organisation", () => {
      const links = extractLinksFromNavItems(footerOrganisation);
      const externalLinks = links.filter((link) => link.external);

      for (const link of externalLinks) {
        expect(
          link.href.startsWith("https://"),
          `Footer external link "${link.label}" does not use HTTPS: ${link.href}`
        ).toBe(true);
      }
    });

    it("should use https:// for all external programmes", () => {
      for (const programme of programmes) {
        if (isExternalLink(programme.href)) {
          expect(
            programme.href.startsWith("https://"),
            `Programme "${programme.name}" does not use HTTPS: ${programme.href}`
          ).toBe(true);
        }
      }
    });

    it("should not use http:// (insecure) for any external link", () => {
      // Combine all external links
      const allExternalLinks = [
        ...extractLinksFromNavItems(centreNavItems).filter(
          (link) => link.external
        ),
        ...extractLinksFromNavItems(rightNavItems).filter(
          (link) => link.external
        ),
        ...extractLinksFromNavItems(footerOrganisation).filter(
          (link) => link.external
        ),
        ...socialLinks.map((link) => ({
          href: link.href,
          external: true,
          label: link.platform,
        })),
        ...programmes
          .filter((p) => isExternalLink(p.href))
          .map((p) => ({ href: p.href, external: true, label: p.name })),
      ];

      const insecureLinks = allExternalLinks.filter((link) =>
        link.href.startsWith("http://")
      );

      expect(
        insecureLinks,
        `Found ${insecureLinks.length} insecure HTTP links: ${insecureLinks
          .map((l) => `"${l.label}": ${l.href}`)
          .join(", ")}`
      ).toHaveLength(0);
    });
  });

  describe("Link Consistency", () => {
    it("should mark external links with external flag when they use https://", () => {
      const allNavLinks = [
        ...extractLinksFromNavItems(centreNavItems),
        ...extractLinksFromNavItems(rightNavItems),
        ...extractLinksFromNavItems(footerProgrammes),
        ...extractLinksFromNavItems(footerOrganisation),
      ];

      for (const link of allNavLinks) {
        const isExternal = isExternalLink(link.href);

        if (isExternal) {
          expect(
            link.external,
            `Link "${link.label}" (${link.href}) appears to be external but is not marked with external: true`
          ).toBe(true);
        }
      }
    });

    it("should not mark local links with external flag", () => {
      const allNavLinks = [
        ...extractLinksFromNavItems(centreNavItems),
        ...extractLinksFromNavItems(rightNavItems),
        ...extractLinksFromNavItems(footerProgrammes),
        ...extractLinksFromNavItems(footerOrganisation),
      ];

      for (const link of allNavLinks) {
        const isExternal = isExternalLink(link.href);

        if (!isExternal) {
          expect(
            link.external,
            `Link "${link.label}" (${link.href}) is local but marked as external`
          ).toBeFalsy();
        }
      }
    });
  });
});
