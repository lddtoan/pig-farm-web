import { GUI } from "@/components/gui";
import { LeftBar } from "@/components/left-bar";
import { AppShell } from "@mantine/core";

export default function Index() {
  return (
    <AppShell padding="md" navbar={<LeftBar />}>
      <GUI />
    </AppShell>
  );
}
