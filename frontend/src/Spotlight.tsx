import { Button, Group } from '@mantine/core';
import { SpotlightProvider, spotlight } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons-react';


export function Spotlight() {
  return (
    <Button onClick={(event) => spotlight.open()}>Open Spotlight</Button>
  )
}
