import type { Meta } from '@storybook/react';
import { Ipsum } from '.././utils';
import { Badge } from '../../components';
import { Enums } from '../../utils';


export default {
  component: Badge,
  title:'Components/Badge',
  args:{
    color: Enums.Color.Primary,
    children: Ipsum.sentence(1),
  }
} satisfies Meta<typeof Badge>;

// if we want to display additional stories below docs
export const Component = {}