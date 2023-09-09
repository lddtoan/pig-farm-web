import { useSimulation } from "@/hooks/use-simulation";
import { Button, ButtonProps, Divider, Navbar, Stack } from "@mantine/core";

export interface SimulationButtonProps extends ButtonProps {
  value: {
    name: string;
    path: string;
  };
}

export const SimulationButton = ({
  value,
  ...props
}: SimulationButtonProps) => {
  const { init, simulation, changeSimulation } = useSimulation();

  return (
    <Button
      variant={simulation.name === value.name ? "outline" : "default"}
      disabled={init}
      onClick={() =>
        changeSimulation({
          id: Math.random().toString(36).slice(2, 7),
          ...value,
        })
      }
      {...props}
    />
  );
};

export const LeftBar = () => {
  const buttons = [
    { value: { name: "Normal", path: "/pig-farm/models/simulator-01.gaml" } },
    { value: { name: "CC", path: "/pig-farm/models/simulator-02.gaml" } },
    { value: { name: "DC", path: "/pig-farm/models/simulator-03.gaml" } },
    { value: { name: "CD", path: "/pig-farm/models/simulator-04.gaml" } },
    { value: { name: "DD", path: "/pig-farm/models/simulator-05.gaml" } },
    {
      value: { name: "Transmit", path: "/pig-farm/models/simulator-06.gaml" },
    },
    { value: { name: "Multi", path: "/pig-farm/models/simulator-07.gaml" } },
  ];

  const { initSimulation, init } = useSimulation();

  return (
    <Navbar width={{ base: 300 }} p="md" sx={{ paddingTop: 32 }}>
      <Stack justify="flex-start" h={300}>
        {buttons.map((item) => (
          <SimulationButton value={item.value} key={item.value.name}>
            {item.value.name}
          </SimulationButton>
        ))}
        <Divider my="sm" />
        <Button onClick={initSimulation} disabled={init}>
          Submit
        </Button>
      </Stack>
    </Navbar>
  );
};
