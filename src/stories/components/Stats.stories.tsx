import type { Meta } from '@storybook/react';
import { Stats } from '../../components';

export default {
  component: Stats,
  title:'Components/Stats',
  args:{
    stats:{
      'Stat A':{
        render:'Some value',
      },
      'Stat B':{
        render: 'Some other value',
      },
      'Extendable':{
        render: 'Try adding a ReactNode'
      }
    }
  }
} satisfies Meta<typeof Stats>;

// if we want to display additional stories below docs
export const Component = {}