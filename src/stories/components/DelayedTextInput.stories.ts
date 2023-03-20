import type { Meta } from '@storybook/react';
import { DelayedTextInput } from '../../components';

export default {
  component: DelayedTextInput,
  title:'Components/Forms/Delayed Input',
  args:{
    delay:800,
    onDelay:value => alert(`updated value: ${value}`),
    value:'Start typing...'
  }
} satisfies Meta<typeof DelayedTextInput>;

// if we want to display additional stories below docs
export const Component = {}