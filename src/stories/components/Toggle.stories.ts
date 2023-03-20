import type { Meta } from '@storybook/react';
import { Toggle } from '../../components';

export default {
  component: Toggle,
  title:'Components/Forms/Toggle',
  args:{
  }
} satisfies Meta<typeof Toggle>;

// if we want to display additional stories below docs
export const Component = {}