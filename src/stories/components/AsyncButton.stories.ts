import type { Meta } from '@storybook/react';
import { Enums } from '../../utils';
import { AsyncButton } from '../../components';


export default {
  component: AsyncButton,
  title:'Components/Buttons/Async Button',
  args:{
    color: Enums.Color.Primary,
    loading: true,
    disabled: false,
    children: "Button",
  }
} satisfies Meta<typeof AsyncButton>;

// if we want to display additional stories below docs
export const Component = {}