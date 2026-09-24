import { describe, expect, it } from "vitest";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { render, screen } from "@/tests/utils/render";
import type { Level, Session } from "@/types/session";
import { Constants } from "@/types/supabase.types";

import { SessionBlock } from "./session-block";

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "",
};

describe("SessionBlock", () => {
  it("shows the title, the start time and the speaker", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    // Also in the title, since narrow blocks cut the line off.
    expect(
      screen.getByText("09:00 · Beginner · Marta Fernandez"),
    ).toHaveAttribute("title", "09:00 · Beginner · Marta Fernandez");
  });

  it("links to the session page", () => {
    render(<SessionBlock session={session} top={0} height={72} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });
});

// Messages aren't typed, so a new `session_level` value without a label would
// only show up as a raw key on the page.
describe("SessionLevel labels", () => {
  const levels: readonly Level[] = Constants.public.Enums.session_level;

  it.each(levels)("has an English and a Spanish label for %s", (level) => {
    expect(en.SessionLevel[level]).toBeTruthy();
    expect(es.SessionLevel[level]).toBeTruthy();
  });
});
