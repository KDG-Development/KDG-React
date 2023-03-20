import type { Meta } from '@storybook/react';
import { Tabs } from '../../components';
import { Ipsum } from '.././utils';

export default {
  component: Tabs,
  title:'Components/Tabs',
  args:{
    tabs:[
      {
        id:1,
        label: Ipsum.sentence(2),
        content: () => Ipsum.paragraph(),
      },
      {
        id:2,
        label: Ipsum.sentence(2),
        content: () => Ipsum.paragraph(),
      },
      {
        id:3,
        label: Ipsum.sentence(2),
        content: () => Ipsum.paragraph(),
      },
    ]
  }
} satisfies Meta<typeof Tabs>;

// if we want to display additional stories below docs
export const Component = {}