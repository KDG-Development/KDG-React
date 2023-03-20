import type { Meta } from '@storybook/react';
import { DateInput } from '../../components';
import { StoryDecorators } from '.././utils';

export default {
  component: DateInput,
  title:'Components/Forms/Date',
  decorators:[StoryDecorators.Padding.bottom('450px')],
  args:{}
} satisfies Meta<typeof DateInput>;

// if we want to display additional stories below docs
export const Component = {}