import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Score from "./Score";

describe("Score", () => {
  const dummyText = "a random string";

  it("will render with the expected text", async () => {
    render(<Score text={dummyText} score={1} />);
    const text = screen.getByText(dummyText);

    expect(text).toBeInTheDocument();
  });
});
