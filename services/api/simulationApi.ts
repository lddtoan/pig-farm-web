import { Simulation } from "@/hooks/use-simulation";
import { instance } from "./_base";

export const initSimulation = async (simulation: Simulation) => {
  const response = await instance.get("/init", { params: simulation });
  return response.data;
};
