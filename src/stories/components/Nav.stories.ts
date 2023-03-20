import type { Meta } from '@storybook/react';
import { Nav } from '../../components';

export default {
  component: Nav,
  title:'Components/Nav',
  args:{
    items:[
      {
        key:1,
        label: 'Item 1',
        onClick:() => {},
        className:'mx-3',
      },
      {
        key:1,
        label: 'Item 2',
        onClick:() => {},
        className:'mx-3',
      },
      {
        key:1,
        label: 'Item 3',
        onClick:() => {},
        className:'mx-3',
      },
      {
        key:1,
        label: 'Item 4',
        onClick:() => {},
        className:'mx-3',
      },
    ]
  }
} satisfies Meta<typeof Nav>;

// if we want to display additional stories below docs
export const Component = {}