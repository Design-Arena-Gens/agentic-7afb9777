import { act } from "@testing-library/react";
import { useUIStore } from "./ui-store";

describe("UI Store", () => {
  beforeEach(() => {
    useUIStore.setState({ demoMode: false, ambientEnabled: false });
  });

  it("toggles demo mode", () => {
    act(() => {
      useUIStore.getState().toggleDemoMode();
    });
    expect(useUIStore.getState().demoMode).toBe(true);
  });

  it("toggles ambient", () => {
    act(() => {
      useUIStore.getState().toggleAmbient();
    });
    expect(useUIStore.getState().ambientEnabled).toBe(true);
  });
});
