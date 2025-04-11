import React from 'react'
import type { Meta } from '@storybook/react';
import { StoryDecorators } from '.././utils';
import {ElementWithDropdown} from '../../components';

export default {
  component: ElementWithDropdown,
  title:'Components/Element With Dropdown',
  decorators:[StoryDecorators.Padding.bottom()],
  args:{
    triggerComponent:() => React.createElement('span', undefined, 'Click me'),
    content:() => React.createElement('span', undefined, 'Hello World!'),
  }
} satisfies Meta<typeof ElementWithDropdown>;

// if we want to display additional stories below docs
export const Component = {}