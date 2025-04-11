import type { Meta } from '@storybook/react';
import {EntityConditional} from '../../components';
export default {
  component: EntityConditional,
  title:'Components/Utilities/Entity Conditional',
  args:{
    entity:{
      id:1,
      name:'Kyle Davis',
    },
    render: x => `User ${x.name} is loaded!`,
  }
} satisfies Meta<typeof EntityConditional<{id:number,name:string}>>;

// if we want to display additional stories below docs
export const Component = {}