import Image from "next/image";
import { useSimulation } from "@/hooks/use-simulation";
import { Box, Button, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { instance } from "@/services/api/_base";

export interface DisplayProps {
  cycle: number;
  name: string;
}

export const Display = ({ cycle, name }: DisplayProps) => {
  const { simulation } = useSimulation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Image
        src={`/api/gui?file=${simulation.name?.toLowerCase()}/${
          simulation.id
        }-${name}-${cycle}.png`}
        alt={name}
        width={384}
        height={384}
        priority
      />
    </Box>
  );
};

export const GUI = () => {
  const [cycle, setCycle] = useState(-45);
  const { init, simulation, reset } = useSimulation();

  const displays = ["simulator", "cfi", "weight", "cfipig0", "dfipig0"];

  useEffect(() => {
    if (init && Math.floor((cycle + 45) / (24 * 60)) < 55) {
      const interval = setInterval(async () => {
        try {
          await instance.get(
            `/api/gui?file=${simulation.name?.toLowerCase()}/${
              simulation.id
            }-simulator-${cycle + 45}.png`
          );
          setCycle(cycle + 45);
        } catch {}
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [simulation, cycle, init]);

  const handleReset = () => {
    setCycle(-45);
    reset();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {cycle >= 0 && (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Title order={4}>
              Experiment: {simulation.name} - Cycle: {cycle}{" "}
              {`(${Math.floor(cycle / (24 * 60))} days, ${Math.floor(
                (cycle % (24 * 60)) / 60
              )} hours, ${Math.floor((cycle % (24 * 60)) % 60)} minutes)`}
            </Title>
            <Button
              onClick={handleReset}
              disabled={Math.floor((cycle + 45) / (24 * 60)) < 55}
            >
              Reset
            </Button>
          </Box>
          {displays.map((item) => (
            <Display name={item} key={item} cycle={cycle} />
          ))}
        </>
      )}
    </Box>
  );
};
