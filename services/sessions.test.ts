import { beforeEach, describe, expect, it, vi } from "vitest";

import type { SessionRow } from "@/types/session";

import { fetchSessions } from "./sessions";

const { select, order } = vi.hoisted(() => ({
  select: vi.fn(),
  order: vi.fn(),
}));

// Supabase is the external system here; the query chain is all this service
// touches. `cacheLife` only works inside Next's runtime.
vi.mock("./supabase", () => ({
  createSupabaseClient: () => ({ from: () => ({ select }) }),
}));
vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));

const row: Omit<SessionRow, "created_at"> = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  start_time: "09:00:00",
  duration_minutes: 45,
  description: "",
};

describe("fetchSessions", () => {
  beforeEach(() => {
    select.mockReturnValue({ order });
    order.mockResolvedValue({ data: [row], error: null });
  });

  it("selects the level column", async () => {
    await fetchSessions();

    const columns = select.mock.calls[0][0].split(", ");
    expect(columns).toContain("level");
  });

  it("returns each session's level and an HH:MM start time", async () => {
    const [session] = await fetchSessions();

    expect(session.level).toBe("beginner");
    expect(session.startTime).toBe("09:00");
  });
});
