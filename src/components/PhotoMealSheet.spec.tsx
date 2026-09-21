import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import fodmap from "../data/fodmap";
import { RecognitionProgress, RecognitionResult } from "../recognition/types";

const recogniseFoods = vi.fn<[Blob, ((p: RecognitionProgress) => void)?], Promise<RecognitionResult>>();
const preloadRecogniser = vi.fn();

vi.mock("../recognition/client", () => ({
  isRecognitionSupported: () => true,
  preloadRecogniser: () => preloadRecogniser(),
  recogniseFoods: (blob: Blob, onProgress?: (p: RecognitionProgress) => void) => recogniseFoods(blob, onProgress),
}));

import PhotoMealSheet from "./PhotoMealSheet";

const id = (name: string) => fodmap.find((f) => f.id !== undefined && f.name === name)!.id;

const result: RecognitionResult = {
  dishes: [{ id: "pizza", name: "Pizza", confidence: 0.9 }],
  candidates: [
    { foodId: id("Pizza base, wheat"), confidence: 0.9, source: "seen", selected: true, quantity: 3 },
    { foodId: id("Mozzarella cheese"), confidence: 0.9, source: "dish", dish: "Pizza", role: "core", selected: true, quantity: 3 },
    { foodId: id("Garlic"), confidence: 0.9, source: "dish", dish: "Pizza", role: "common", selected: false, quantity: 2 },
    { foodId: id("Tomatoes"), confidence: 0.5, source: "seen", selected: true, quantity: 3 },
  ],
};

const upload = (testId: string) => {
  const file = new File(["x"], "meal.jpg", { type: "image/jpeg" });
  fireEvent.change(screen.getByTestId(testId), { target: { files: [file] } });
};

describe("PhotoMealSheet", () => {
  beforeEach(() => {
    recogniseFoods.mockReset();
    preloadRecogniser.mockReset();
    URL.createObjectURL = vi.fn(() => "blob:preview");
    URL.revokeObjectURL = vi.fn();
  });

  it("preloads the recogniser and offers camera and gallery", () => {
    render(<PhotoMealSheet meal="Lunch" onAdd={() => {}} onClose={() => {}} />);
    expect(preloadRecogniser).toHaveBeenCalled();
    expect(screen.getByText("Take a photo")).toBeInTheDocument();
    expect(screen.getByText("Choose from gallery")).toBeInTheDocument();
    expect(screen.getByTestId("camera-input")).toHaveAttribute("capture", "environment");
  });

  it("shows progress while analysing", async () => {
    let report: ((p: RecognitionProgress) => void) | undefined;
    recogniseFoods.mockImplementation((_blob, onProgress) => {
      report = onProgress;
      return new Promise(() => {});
    });
    render(<PhotoMealSheet meal="Lunch" onAdd={() => {}} onClose={() => {}} />);
    upload("gallery-input");
    await waitFor(() => expect(screen.getByRole("progressbar")).toBeInTheDocument());
    act(() => report?.({ stage: "embedding", done: 3, total: 8 }));
    expect(screen.getByText("Looking at the plate… 3/8")).toBeInTheDocument();
  });

  it("reviews results, filters already logged foods, and adds the selected ones", async () => {
    recogniseFoods.mockResolvedValue(result);
    const onAdd = vi.fn();
    render(<PhotoMealSheet meal="Lunch" existingFoodIds={[id("Tomatoes")]} onAdd={onAdd} onClose={() => {}} />);
    upload("camera-input");
    await waitFor(() => expect(screen.getByText("Looks like Pizza")).toBeInTheDocument());
    expect(screen.queryByText("Tomatoes")).not.toBeInTheDocument();
    expect(screen.getByText("Usually in Pizza")).toBeInTheDocument();
    expect(screen.getByText("Often in Pizza")).toBeInTheDocument();
    expect(screen.getByText("Strong match")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Include Garlic"));
    fireEvent.click(within(screen.getByRole("radiogroup", { name: "Garlic portion" })).getByRole("radio", { name: "Loads" }));
    fireEvent.click(screen.getByLabelText("Include Mozzarella cheese"));

    fireEvent.click(screen.getByText("Add 2 to Lunch"));
    expect(onAdd).toHaveBeenCalledWith([
      { foodId: id("Pizza base, wheat"), quantity: 3 },
      { foodId: id("Garlic"), quantity: 5 },
    ]);
  });

  it("lets the user add a missed food by search", async () => {
    recogniseFoods.mockResolvedValue({ dishes: [], candidates: [] });
    const onAdd = vi.fn();
    render(<PhotoMealSheet meal="Dinner" onAdd={onAdd} onClose={() => {}} />);
    upload("gallery-input");
    await waitFor(() => expect(screen.getByText("Nothing recognised")).toBeInTheDocument());
    fireEvent.click(screen.getByText("+ Add something we missed"));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "broccoli" } });
    fireEvent.click(screen.getByText("Broccoli"));
    fireEvent.click(screen.getByText("Add to Dinner"));
    await waitFor(() => expect(screen.getByText("Add 1 to Dinner")).toBeInTheDocument());
    fireEvent.click(screen.getByText("Add 1 to Dinner"));
    expect(onAdd).toHaveBeenCalledWith([{ foodId: id("Broccoli"), quantity: 3 }]);
  });

  it("shows an error and a manual fallback when recognition fails", async () => {
    recogniseFoods.mockRejectedValue(new Error("model exploded"));
    const onClose = vi.fn();
    render(<PhotoMealSheet meal="Lunch" onAdd={() => {}} onClose={onClose} />);
    upload("gallery-input");
    await waitFor(() => expect(screen.getByText("That didn't work")).toBeInTheDocument());
    expect(screen.getByText("model exploded")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Pick foods manually instead"));
    expect(onClose).toHaveBeenCalled();
  });
});
