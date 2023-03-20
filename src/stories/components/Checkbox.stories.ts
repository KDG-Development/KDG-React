import type { Meta } from '@storybook/react';
import { Checkbox } from '../../components';

export default {
  component: Checkbox,
  title:'Components/Forms/Checkbox',
  args:{
    label:'Some label'
  }
} satisfies Meta<typeof Checkbox>;

// if we want to display additional stories below docs
export const Component = {}