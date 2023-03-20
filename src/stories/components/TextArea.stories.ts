import type { Meta } from '@storybook/react';
import { Textarea } from '../../components';

export default {
  component: Textarea,
  title:'Components/Forms/TextArea',
  args:{
  }
} satisfies Meta<typeof Textarea>;

// if we want to display additional stories below docs
export const Component = {}