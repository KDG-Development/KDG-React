import type { Meta } from '@storybook/react';
import { Ipsum } from '../utils';
import {Alert} from '../../components';
import { Enums } from '../../utils';


export default {
  component: Alert,
  title:'Components/Alert',
  args:{
    title: {
      render:Ipsum.sentence(),
    },
    message: Ipsum.sentence(),
    type: Enums.Color.Primary,
  }
} satisfies Meta<typeof Alert>;

// if we want to display additional stories below docs
export const Component = {}