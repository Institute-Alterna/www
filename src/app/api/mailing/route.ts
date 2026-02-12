import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";
import {
  VALID_SOURCES,
  MAILING_LIST_CONFIG,
  type Source,
  type ListType,
} from "@/lib/data/mailing";

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------------ */
/*  Singleton Loops client (reused across warm invocations)            */
/* ------------------------------------------------------------------ */

let loopsClient: LoopsClient | null = null;

function getLoopsClient(): LoopsClient | null {
  if (!process.env.LOOPS_API_KEY) return null;
  if (!loopsClient) loopsClient = new LoopsClient(process.env.LOOPS_API_KEY);
  return loopsClient;
}

/* ------------------------------------------------------------------ */
/*  Rate limiter (in-memory, per IP, resets on cold start)             */
/* ------------------------------------------------------------------ */

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 5;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Evict stale entries when map grows large
  if (rateMap.size > 10_000) {
    for (const [key, entry] of rateMap) {
      if (now > entry.resetAt) rateMap.delete(key);
    }
  }

  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_MAX_REQUESTS;
}

/* ------------------------------------------------------------------ */
/*  Validators                                                         */
/* ------------------------------------------------------------------ */

function isValidSource(source: unknown): source is Source {
  return (
    typeof source === "string" &&
    VALID_SOURCES.includes(source as Source)
  );
}

function isValidType(type: unknown): type is ListType {
  return (
    typeof type === "string" &&
    type in MAILING_LIST_CONFIG
  );
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originHost = new URL(origin).host;
    const requestHost = request.headers.get("host");
    return originHost === requestHost;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Mailing list resolver                                              */
/* ------------------------------------------------------------------ */

/**
 * Resolves mailing list IDs from env vars based on subscription type.
 * Returns a map of list IDs to subscribe the contact to.
 */
function getMailingLists(type: ListType): Record<string, boolean> {
  const lists: Record<string, boolean> = {};
  const envVarKeys = MAILING_LIST_CONFIG[type];

  for (const key of envVarKeys) {
    const listId = process.env[key];
    if (listId) {
      lists[listId] = true;
    }
  }

  return lists;
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  // CSRF: reject cross-origin requests
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Forbidden." },
      { status: 403 }
    );
  }

  // Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Loops client
  const loops = getLoopsClient();
  if (!loops) {
    console.warn("[mailing] LOOPS_API_KEY is not set — skipping subscription.");
    return NextResponse.json(
      { success: false, error: "Mailing service is not configured." },
      { status: 503 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { email: rawEmail, source, type: rawType } = body as Record<string, unknown>;

  // Trim before validating (#9)
  if (typeof rawEmail !== "string") {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const email = rawEmail.trim().toLowerCase();

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!isValidSource(source)) {
    return NextResponse.json(
      { success: false, error: "Invalid source." },
      { status: 400 }
    );
  }

  const type = isValidType(rawType) ? rawType : "general";
  const mailingLists = getMailingLists(type);

  if (Object.keys(mailingLists).length === 0) {
    console.warn("[mailing] No mailing list IDs configured — skipping subscription.");
    return NextResponse.json(
      { success: false, error: "Mailing service is not configured." },
      { status: 503 }
    );
  }

  const contactParams = {
    email,
    properties: { source },
    mailingLists,
  };

  // Lead with updateContact (upsert) — avoids two calls for returning subscribers (#5)
  try {
    await loops.updateContact(contactParams);
    return NextResponse.json({ success: true });
  } catch {
    // updateContact may fail if contact doesn't exist in some edge cases
  }

  try {
    await loops.createContact(contactParams);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
