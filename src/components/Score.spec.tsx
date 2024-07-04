import Score from "./Score";
import { describe, expect, it, vitest } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";

describe("Score", () => {
  const dummyText = "a random string";

  it("will render with the expected text", async () => {
    render(<Score text={dummyText} score={1} />);
    const text = screen.getByText(dummyText);

    expect(text).toBeInTheDocument();
  });
});
