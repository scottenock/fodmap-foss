import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import FoodLogBanner from "./FoodLogBanner";

const date = "2026-04-23";
const noop = () => {};

describe("FoodLogBanner", () => {
  it("renders the formatted date", () => {
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={noop}
        count={0}
        onLog={noop}
        onUnlog={noop}
      />
    );
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("calls onPrevDay when the previous day button is clicked", () => {
    const onPrevDay = vitest.fn();
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={onPrevDay}
        onNextDay={noop}
        count={0}
        onLog={noop}
        onUnlog={noop}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous day" }));
    expect(onPrevDay).toHaveBeenCalledOnce();
  });

  it("calls onNextDay when the next day button is clicked", () => {
    const onNextDay = vitest.fn();
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={onNextDay}
        count={0}
        onLog={noop}
        onUnlog={noop}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Next day" }));
    expect(onNextDay).toHaveBeenCalledOnce();
  });

  it("shows the Log food button when count is 0", () => {
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={noop}
        count={0}
        onLog={noop}
        onUnlog={noop}
      />
    );
    expect(screen.getByText("+ Log food")).toBeInTheDocument();
  });

  it("calls onLog when the Log food button is clicked", () => {
    const onLog = vitest.fn();
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={noop}
        count={0}
        onLog={onLog}
        onUnlog={noop}
      />
    );
    fireEvent.click(screen.getByText("+ Log food"));
    expect(onLog).toHaveBeenCalledOnce();
  });

  it("shows the count with increment and decrement controls when count > 0", () => {
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={noop}
        count={3}
        onLog={noop}
        onUnlog={noop}
      />
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add one serving" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove one serving" })).toBeInTheDocument();
  });

  it("calls onLog when the + button is clicked", () => {
    const onLog = vitest.fn();
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={noop}
        count={2}
        onLog={onLog}
        onUnlog={noop}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Add one serving" }));
    expect(onLog).toHaveBeenCalledOnce();
  });

  it("calls onUnlog when the − button is clicked", () => {
    const onUnlog = vitest.fn();
    render(
      <FoodLogBanner
        date={date}
        onPrevDay={noop}
        onNextDay={noop}
        count={2}
        onLog={noop}
        onUnlog={onUnlog}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove one serving" }));
    expect(onUnlog).toHaveBeenCalledOnce();
  });
});
