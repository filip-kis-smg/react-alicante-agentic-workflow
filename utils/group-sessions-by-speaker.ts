import type { Session } from "@/types/session";

export interface SpeakerSessions {
  name: string;
  sessions: Session[];
}

/**
 * `speaker` values that stand for a group rather than one person — the closing
 * panel is listed as "Full speaker lineup".
 */
const NON_SPEAKERS = ["Full speaker lineup"];

/**
 * Groups sessions by speaker, sorted by name. Each speaker's sessions are
 * sorted by start time.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (NON_SPEAKERS.includes(session.speaker)) continue;
    bySpeaker.set(session.speaker, [
      ...(bySpeaker.get(session.speaker) ?? []),
      session,
    ]);
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions.toSorted((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
