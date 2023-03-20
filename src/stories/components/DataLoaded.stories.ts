import type { Meta } from '@storybook/react';
import { DataLoaded } from '../../components';

export default {
  component: DataLoaded,
  title:'Components/Utilities/Data Loaded',
  args:{
    loadData:() => new Promise(resolve => setTimeout(() => resolve('Hello World!'), 5000)),
    onLoaded:(x) => x
  }
} satisfies Meta<typeof DataLoaded<string>>;

// if we want to display additional stories below docs
export const Component = {}