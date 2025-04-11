import type { Meta } from '@storybook/react';
import {DelayedNumberInput} from '../../components';

export default {
  component: DelayedNumberInput,
  title:'Components/Forms/Delayed Number',
  args:{
    delay:800,
    onDelay:value => alert(`updated value: ${value}`),
    value:null
  }
} satisfies Meta<typeof DelayedNumberInput>;

// if we want to display additional stories below docs
export const Component = {}