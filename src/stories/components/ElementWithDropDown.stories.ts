import React from 'react'
import type { Meta } from '@storybook/react';
import { ElementWithDropdown } from '../../components';
import { StoryDecorators } from '.././utils';

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