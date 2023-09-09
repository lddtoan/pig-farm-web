import { initSimulation } from "@/services/api/simulationApi";
import { create } from "zustand";

export interface Simulation {
  id: null | string;
  name: null | string;
  path: null | string;
}

export interface UseSimulation {
  init: boolean;
  simulation: Simulation;
  changeSimulation: (simulation: Simulation) => void;
  initSimulation: () => void;
  reset: () => void;
}

export const initialState = {
  init: false,
  simulation: {
    id: null,
    name: null,
    path: null,
  },
};

export const useSimulation = create<UseSimulation>((set, get) => ({
  ...initialState,
  changeSimulation: (simulation: Simulation) => set(() => ({ simulation })),
  initSimulation: async () => {
    try {
      await initSimulation(get().simulation);
      set(() => ({ init: true }));
    } catch {}
  },
  reset: () => set({ ...initialState }),
}));
