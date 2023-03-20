import type { Meta } from '@storybook/react';
import { Clickable } from '../../components';
import { Ipsum } from '.././utils';

export default {
  component: Clickable,
  title:'Components/Utilities/Clickable',
  args:{
    onClick:() => alert('Nice click!'),
    children:Ipsum.paragraph(),
  }
} satisfies Meta<typeof Clickable>;

// if we want to display additional stories below docs
export const Component = {}