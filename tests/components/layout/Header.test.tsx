import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

afterEach(cleanup);

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);
    expect(screen.getByAltText("Institute Alterna")).toBeInTheDocument();
  });

  it("renders the volunteer CTA", () => {
    render(<Header />);
    const volunteerLinks = screen.getAllByText("Volunteer");
    expect(volunteerLinks.length).toBeGreaterThan(0);
  });

  it("renders nav items", () => {
    render(<Header />);
    expect(screen.getAllByText("AAIMUN").length).toBeGreaterThan(0);
    expect(screen.getAllByText("CHS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Learning").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
  });
});
