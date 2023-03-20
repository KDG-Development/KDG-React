import type { Meta } from '@storybook/react';
import { ImageCarousel } from '../../components';
import logo from '.././assets/kdg-logo.png'

export default {
  component: ImageCarousel,
  title:'Components/ImageCarousel',
  args:{
    images:[
      logo,
      logo,
      logo
    ],
    interval:2000,
  }
} satisfies Meta<typeof ImageCarousel>;


// if we want to display additional stories below docs
export const Component = {}