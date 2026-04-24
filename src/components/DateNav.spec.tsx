import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import DateNav from "./DateNav";

const date = "2026-04-23";
const noop = () => {};

describe("DateNav", () => {
  it("renders the formatted date", () => {
    render(<DateNav date={date} onPrevDay={noop} onNextDay={noop} />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("calls onPrevDay when the previous day button is clicked", () => {
    const onPrevDay = vitest.fn();
    render(<DateNav date={date} onPrevDay={onPrevDay} onNextDay={noop} />);
    fireEvent.click(screen.getByRole("button", { name: "Previous day" }));
    expect(onPrevDay).toHaveBeenCalledOnce();
  });

  it("calls onNextDay when the next day button is clicked", () => {
    const onNextDay = vitest.fn();
    render(<DateNav date={date} onPrevDay={noop} onNextDay={onNextDay} />);
    fireEvent.click(screen.getByRole("button", { name: "Next day" }));
    expect(onNextDay).toHaveBeenCalledOnce();
  });

  it("disables the next day button when nextDayDisabled is true", () => {
    render(
      <DateNav date={date} onPrevDay={noop} onNextDay={noop} nextDayDisabled={true} />
    );
    expect(screen.getByRole("button", { name: "Next day" })).toBeDisabled();
  });
});
