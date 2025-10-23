import { create } from "zustand";

type UIState = {
  demoMode: boolean;
  ambientEnabled: boolean;
  toggleDemoMode: () => void;
  setDemoMode: (value: boolean) => void;
  toggleAmbient: () => void;
  setAmbient: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  demoMode: false,
  ambientEnabled: false,
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
  setDemoMode: (value) => set({ demoMode: value }),
  toggleAmbient: () => set((state) => ({ ambientEnabled: !state.ambientEnabled })),
  setAmbient: (value) => set({ ambientEnabled: value })
}));
