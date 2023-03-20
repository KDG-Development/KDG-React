import type { Meta } from '@storybook/react';
import { ActionButton } from '../../components';
import { Enums } from '../../utils';


export default {
  component: ActionButton,
  title:'Components/Buttons/Action Button',
  args:{
    color: Enums.Color.Primary,
    disabled: false,
    children: "Button",
  }
} satisfies Meta<typeof ActionButton>;

// if we want to display additional stories below docs
export const Component = {}