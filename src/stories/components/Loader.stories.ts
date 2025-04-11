import type { Meta } from '@storybook/react';
import {Loader} from '../../components';

export default {
  component: Loader,
  title:'Components/Utilities/Loader',
  args:{
  }
} satisfies Meta<typeof Loader>;

// if we want to display additional stories below docs
export const Component = {}