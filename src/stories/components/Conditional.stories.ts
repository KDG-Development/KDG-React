import type { Meta } from '@storybook/react';
import {Conditional} from '../../components';

export default {
  component: Conditional,
  title:'Components/Utilities/Conditional',
  args:{
    condition:true,
    onTrue:() => 'Condition is true',
    onFalse:() => 'Condition is false'
  }
} satisfies Meta<typeof Conditional>;

// if we want to display additional stories below docs
export const Component = {}