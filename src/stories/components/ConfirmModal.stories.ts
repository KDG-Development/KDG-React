import type { Meta } from '@storybook/react';
import {ConfirmModal} from '../../components';
import { Ipsum } from '.././utils';

export default {
  component: ConfirmModal,
  title:'Components/Utilities/Confirm Modal',
  args:{
    trigger: 'Click me',
    content:() => Ipsum.paragraph()
  }
} satisfies Meta<typeof ConfirmModal>;

// if we want to display additional stories below docs
export const Component = {}