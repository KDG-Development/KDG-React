import type { Meta, StoryObj } from '@storybook/react';
import logo from '.././assets/kdg-logo.png'
import { Ipsum } from '.././utils';
import { Image } from '../../components';

export default {
  component: Image,
  title:'Components/Image',
  args:{
    src:logo,
  }
} satisfies Meta<typeof Image>;


export const Caption: StoryObj<typeof Image> = {
  args:{
    caption:{
      render:() => Ipsum.sentence(),
      inset: false,
    }
  }
}

export const CaptionOverlay: StoryObj<typeof Image> = {
  args:{
    caption:{
      render:() => Ipsum.sentence(),
      inset: true,
    }
  }
}