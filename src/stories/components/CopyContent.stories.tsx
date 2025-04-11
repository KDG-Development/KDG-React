import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CopyContent } from '../../components'

const meta: Meta<typeof CopyContent> = {
  title: 'Components/CopyContent',
  component: CopyContent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CopyContent>

export const Default: Story = {
  render: () => (
    <CopyContent content="This is the content to be copied" className="custom-class">
      This is the content to be copied
    </CopyContent>
  )
}

export const LongContent: Story = {
  render: () => (
    <CopyContent content="This is a longer piece of content that will be copied when the user clicks the button." className="custom-class">
      This is a longer piece of content that will be copied when the user clicks the button.
    </CopyContent>
  )
}

export const DifferentCopyText: Story = {
  render: () => (
    <CopyContent content="Hidden copy text" className="custom-class">
      This is the visible content, but a different text will be copied
    </CopyContent>
  )
}
export const NoCopyText: Story = {
  render: () => (
    <CopyContent content="Hidden copy text" className="custom-class"/>
  )
}
