import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "@/components/ui/Accordion";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({
    children,
  }: React.PropsWithChildren<{ initial?: boolean }>) => <>{children}</>,
}));

afterEach(cleanup);

const items = [
  { question: "What is Alterna?", answer: "A nonprofit organisation." },
  { question: "How do I volunteer?", answer: "Visit the volunteer page." },
];

describe("Accordion", () => {
  it("renders all questions", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("What is Alterna?")).toBeInTheDocument();
    expect(screen.getByText("How do I volunteer?")).toBeInTheDocument();
  });

  it("does not show answers by default", () => {
    render(<Accordion items={items} />);
    expect(
      screen.queryByText("A nonprofit organisation.")
    ).not.toBeInTheDocument();
  });

  it("expands an item when clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    expect(
      screen.getByText("A nonprofit organisation.")
    ).toBeInTheDocument();
  });

  it("sets aria-expanded correctly", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
  });
});
