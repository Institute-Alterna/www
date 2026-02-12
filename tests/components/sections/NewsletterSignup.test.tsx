import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterSignup from "@/components/sections/NewsletterSignup";

vi.mock("framer-motion", () => {
  function passthrough({
    children,
    className,
    ...rest
  }: React.PropsWithChildren<{ className?: string } & Record<string, unknown>>) {
    const htmlProps: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(rest)) {
      if (
        ![
          "initial",
          "animate",
          "exit",
          "transition",
          "whileInView",
          "viewport",
          "variants",
        ].includes(key)
      ) {
        htmlProps[key] = val;
      }
    }
    return (
      <div className={className} {...htmlProps}>
        {children}
      </div>
    );
  }

  function FormPassthrough({
    children,
    className,
    onSubmit,
    noValidate,
  }: React.PropsWithChildren<{
    className?: string;
    onSubmit?: React.FormEventHandler;
    noValidate?: boolean;
  }>) {
    return (
      <form className={className} onSubmit={onSubmit} noValidate={noValidate}>
        {children}
      </form>
    );
  }

  function ButtonPassthrough({
    children,
    className,
    ...rest
  }: React.PropsWithChildren<{ className?: string } & Record<string, unknown>>) {
    const htmlProps: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(rest)) {
      if (
        ![
          "initial",
          "animate",
          "exit",
          "transition",
          "whileInView",
          "viewport",
          "variants",
        ].includes(key)
      ) {
        htmlProps[key] = val;
      }
    }
    return (
      <button className={className} {...htmlProps}>
        {children}
      </button>
    );
  }

  return {
    motion: {
      div: passthrough,
      form: FormPassthrough,
      button: ButtonPassthrough,
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => (
      <>{children}</>
    ),
  };
});

afterEach(cleanup);

beforeEach(() => {
  vi.restoreAllMocks();
});

function mockFetchSuccess() {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}

function mockFetchError(error: string) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ success: false, error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  );
}

function mockFetchReject() {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));
}

describe("NewsletterSignup", () => {
  it("renders heading, description, and email input", () => {
    render(<NewsletterSignup source="web/landing" />);
    expect(
      screen.getByRole("heading", { name: "Stay in the loop" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Get updates on our programmes/)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("you@example.com")
    ).toBeInTheDocument();
  });

  it("subscribe button hidden when input is empty", () => {
    render(<NewsletterSignup source="web/landing" />);
    expect(
      screen.queryByRole("button", { name: "Subscribe" })
    ).not.toBeInTheDocument();
  });

  it("subscribe button appears after typing", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "a");

    expect(
      screen.getByRole("button", { name: "Subscribe" })
    ).toBeInTheDocument();
  });

  it("subscribe button persists when input has value but is blurred", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.tab();

    expect(
      screen.getByRole("button", { name: "Subscribe" })
    ).toBeInTheDocument();
  });

  it("client-side validation rejects invalid emails without fetch", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "not-an-email");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("submits correct payload to /api/mailing", async () => {
    mockFetchSuccess();
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/aaimun" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/mailing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", source: "web/aaimun", type: "general" }),
    });
  });

  it("shows success message on successful response", async () => {
    mockFetchSuccess();
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      expect(
        screen.getByText(/subscribed/)
      ).toBeInTheDocument();
    });
  });

  it("shows server error message on error response", async () => {
    mockFetchError("Email already exists.");
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      expect(screen.getByText("Email already exists.")).toBeInTheDocument();
    });
  });

  it("shows network error on fetch rejection", async () => {
    mockFetchReject();
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("button is disabled during loading", async () => {
    let resolvePromise!: (value: Response) => void;
    vi.spyOn(globalThis, "fetch").mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      const btn = screen.getByRole("button", { name: /Subscribing/ });
      expect(btn).toBeDisabled();
    });

    resolvePromise(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("error clears on keystroke", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "bad");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();

    await user.type(input, "x");
    expect(
      screen.queryByText("Please enter a valid email address.")
    ).not.toBeInTheDocument();
  });

  it("sets aria-invalid and aria-describedby on error", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/landing" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "bad");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby");

    const errorId = input.getAttribute("aria-describedby");
    const errorEl = document.getElementById(errorId!);
    expect(errorEl).toHaveTextContent("Please enter a valid email address.");
    expect(errorEl).toHaveAttribute("role", "alert");
  });

  it("renders talent copy when type is talent", () => {
    render(<NewsletterSignup source="web/volunteer" type="talent" />);
    expect(
      screen.getByRole("heading", { name: "Join our talent network" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Get notified when new volunteer roles open/)
    ).toBeInTheDocument();
  });

  it("sends type in payload for talent signup", async () => {
    mockFetchSuccess();
    const user = userEvent.setup();
    render(<NewsletterSignup source="web/volunteer" type="talent" />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/mailing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", source: "web/volunteer", type: "talent" }),
    });
  });
});
