import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerCard } from "./speaker-card";

const sessions = [
  { id: "opening-keynote", title: "Opening Keynote", startTime: "09:00" },
  { id: "closing-talk", title: "Closing Talk", startTime: "16:00" },
];

describe("SpeakerCard", () => {
  it("shows the speaker's name as a heading", () => {
    render(<SpeakerCard name="Marta Fernandez" sessions={sessions} />);

    expect(
      screen.getByRole("heading", { name: "Marta Fernandez" }),
    ).toBeInTheDocument();
  });

  it("links each session, with its start time, to its session page", () => {
    render(<SpeakerCard name="Marta Fernandez" sessions={sessions} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/en/sessions/opening-keynote");
    expect(links[0]).toHaveTextContent("09:00Opening Keynote");
    expect(links[1]).toHaveAttribute("href", "/en/sessions/closing-talk");
    expect(links[1]).toHaveTextContent("16:00Closing Talk");
  });
});
