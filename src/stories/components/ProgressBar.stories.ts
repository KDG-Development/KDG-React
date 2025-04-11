import type { Meta } from '@storybook/react';
import {ProgressBar} from '../../components';
import { Enums } from '../../utils';


export default {
  component: ProgressBar,
  title:'Components/ProgressBar',
  args:{
    color:Enums.Color.Info,
    label:'Label',
    value:56,
    striped:{
      striped:true,
      animated:true,
    },
  }
} satisfies Meta<typeof ProgressBar>;

// if we want to display additional stories below docs
export const Component = {}