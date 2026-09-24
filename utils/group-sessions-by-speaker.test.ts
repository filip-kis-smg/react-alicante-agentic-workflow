import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("returns one entry per speaker, sorted by name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "b", speaker: "Pablo Iglesias" }),
      session({ id: "a", speaker: "Diego Castellanos" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Pablo Iglesias",
    ]);
  });

  it("keeps all of a speaker's sessions, sorted by start time", () => {
    const [speaker] = groupSessionsBySpeaker([
      session({ id: "late", speaker: "Naia Etxeberria", startTime: "15:00" }),
      session({ id: "early", speaker: "Naia Etxeberria", startTime: "09:30" }),
    ]);

    expect(speaker.sessions.map((s) => s.id)).toEqual(["early", "late"]);
  });

  it("leaves out the closing panel's full speaker lineup", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "talk", speaker: "Iker Otxoa" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual(["Iker Otxoa"]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
