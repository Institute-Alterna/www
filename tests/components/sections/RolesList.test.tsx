import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import RolesList from "@/components/sections/RolesList";
import type { RoleCardData } from "@/lib/types";

afterEach(cleanup);

const mockRoles: RoleCardData[] = [
  {
    _id: "role-1",
    slug: "software-engineer",
    name: "Software Engineer",
    team: "Engineering",
    workMode: "Remote",
    region: "Global",
    workload: 5,
  },
  {
    _id: "role-2",
    slug: "content-writer",
    name: "Content Writer",
    team: "Marketing",
    workMode: "Remote",
    region: "Americas",
    workload: 3,
  },
];

describe("RolesList", () => {
  it("renders empty state when no roles", () => {
    render(<RolesList roles={[]} />);
    expect(screen.getByText(/we are not recruiting/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Join Talent Network" })).toHaveAttribute(
      "href",
      "#talent-network"
    );
  });

  it("renders role cards when roles exist", () => {
    render(<RolesList roles={mockRoles} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Content Writer")).toBeInTheDocument();
  });

  it("displays team, work mode, region, and workload", () => {
    render(<RolesList roles={mockRoles} />);
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(screen.getAllByText("Remote")).toHaveLength(2);
    expect(screen.getByText("Global")).toBeInTheDocument();
    expect(screen.getByText("5 hrs/week")).toBeInTheDocument();
  });

  it("links role cards to detail pages", () => {
    render(<RolesList roles={mockRoles} />);
    const engineeringLink = screen.getByRole("link", {
      name: /Software Engineer/,
    });
    const marketingLink = screen.getByRole("link", {
      name: /Content Writer/,
    });
    expect(engineeringLink).toHaveAttribute(
      "href",
      "/volunteer/software-engineer"
    );
    expect(marketingLink).toHaveAttribute("href", "/volunteer/content-writer");
  });
});
