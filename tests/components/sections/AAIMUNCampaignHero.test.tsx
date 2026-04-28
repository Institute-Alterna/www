import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import AAIMUNCampaignHero from "@/components/sections/AAIMUNCampaignHero";

vi.mock("framer-motion", () => {
  function Passthrough({
    children,
    className,
    style,
    ...rest
  }: React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
  } & Record<string, unknown>>) {
    const safe: Record<string, unknown> = {};
    const skip = new Set([
      "initial", "animate", "exit", "transition",
      "whileInView", "viewport", "variants",
    ]);
    for (const [k, v] of Object.entries(rest)) {
      if (!skip.has(k)) safe[k] = v;
    }
    return (
      <div className={className} style={style} {...safe}>
        {children}
      </div>
    );
  }

  return {
    motion: {
      div: Passthrough,
      h1: ({
        children,
        className,
      }: React.PropsWithChildren<{ className?: string }>) => (
        <h1 className={className}>{children}</h1>
      ),
      p: ({
        children,
        className,
      }: React.PropsWithChildren<{ className?: string }>) => (
        <p className={className}>{children}</p>
      ),
      ol: ({
        children,
        className,
        "aria-label": ariaLabel,
      }: React.PropsWithChildren<{
        className?: string;
        "aria-label"?: string;
      }>) => (
        <ol className={className} aria-label={ariaLabel}>
          {children}
        </ol>
      ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
    useReducedMotion: () => false,
  };
});

vi.mock("next/image", () => ({
  default: ({
    alt,
    className,
  }: {
    alt: string;
    className?: string;
    src?: string;
    width?: number;
    height?: number;
    priority?: boolean;
  // eslint-disable-next-line @next/next/no-img-element
  }) => <img alt={alt} className={className} />,
}));

vi.mock("@/components/sections/AaimunWordmark", () => ({
  default: ({ className }: { className?: string }) => (
    <div className={className} data-testid="aaimun-wordmark" />
  ),
}));

afterEach(cleanup);

describe("AAIMUNCampaignHero", () => {
  it("renders the FSA badge with accessible alt text", () => {
    render(<AAIMUNCampaignHero />);
    expect(
      screen.getByAltText("Futures Summit Alliance")
    ).toBeInTheDocument();
  });

  it("renders the headline", () => {
    render(<AAIMUNCampaignHero />);
    expect(
      screen.getByText(/the world needs you again, delegate/i)
    ).toBeInTheDocument();
  });

  it("renders the Register CTA linking to MyMUN", () => {
    render(<AAIMUNCampaignHero />);
    const links = screen.getAllByText(/register on mymun/i);
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders the footer meta labels", () => {
    render(<AAIMUNCampaignHero />);
    expect(screen.getByText("Open to All")).toBeInTheDocument();
    expect(screen.getByText("Late July 2026")).toBeInTheDocument();
  });

  it("renders status lines", () => {
    render(<AAIMUNCampaignHero />);
    expect(screen.getByText("ALL-ONLINE CONFERENCE")).toBeInTheDocument();
    expect(screen.getByText("UNx SEASON 2 OPENING")).toBeInTheDocument();
    expect(
      screen.getAllByLabelText("unreleased feature information redacted")
    ).toHaveLength(2);
  });

  it("shows Learn more link in home variant", () => {
    render(<AAIMUNCampaignHero variant="home" />);
    expect(screen.getByText(/learn more/i)).toBeInTheDocument();
  });

  it("shows Explore link in page variant", () => {
    render(<AAIMUNCampaignHero variant="page" />);
    expect(screen.getByText(/explore the announcement/i)).toBeInTheDocument();
  });

  it("renders AAIMUN wordmark", () => {
    render(<AAIMUNCampaignHero />);
    expect(screen.getByTestId("aaimun-wordmark")).toBeInTheDocument();
  });
});
