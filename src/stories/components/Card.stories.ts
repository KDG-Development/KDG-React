import type { Meta } from '@storybook/react';
import { Card } from '../../components';
import { Ipsum } from '.././utils';
import logo from '.././assets/kdg-logo.png'

export default {
  component: Card,
  title:'Components/Card',
  args:{
    title:Ipsum.sentence(),
    image:logo,
    header: {
      content:Ipsum.sentence(),
      className:'bg-dark'
    },
    body: {
      content:Ipsum.sentence(),
      className:'test'
    }
  }
} satisfies Meta<typeof Card>;

// if we want to display additional stories below docs
export const Component = {}