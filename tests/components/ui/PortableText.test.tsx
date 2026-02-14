import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PortableText from "@/components/ui/PortableText";

describe("PortableText", () => {
  it("renders null for falsy value", () => {
    const { container } = render(<PortableText value={null} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders null for undefined value", () => {
    const { container } = render(<PortableText value={undefined} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a paragraph block", () => {
    const blocks = [
      {
        _type: "block",
        _key: "a",
        style: "normal",
        children: [{ _type: "span", _key: "s1", text: "Hello world" }],
      },
    ];
    render(<PortableText value={blocks} />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders bold text", () => {
    const blocks = [
      {
        _type: "block",
        _key: "a",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Bold text",
            marks: ["strong"],
          },
        ],
        markDefs: [],
      },
    ];
    render(<PortableText value={blocks} />);
    const strong = screen.getByText("Bold text");
    expect(strong.tagName).toBe("STRONG");
  });

  it("renders h2 block", () => {
    const blocks = [
      {
        _type: "block",
        _key: "a",
        style: "h2",
        children: [{ _type: "span", _key: "s1", text: "Section Title" }],
      },
    ];
    render(<PortableText value={blocks} />);
    const heading = screen.getByText("Section Title");
    expect(heading.tagName).toBe("H2");
  });

  it("applies className to wrapper div", () => {
    const blocks = [
      {
        _type: "block",
        _key: "a",
        style: "normal",
        children: [{ _type: "span", _key: "s1", text: "Test" }],
      },
    ];
    const { container } = render(
      <PortableText value={blocks} className="mt-4 space-y-2" />
    );
    expect(container.firstElementChild?.className).toContain("mt-4");
  });
});
