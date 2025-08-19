import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateInput } from '../../components'
import { StoryDecorators } from '../utils'
import { LocalDate } from '@js-joda/core'
import { useState } from 'react'

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'Components/Forms/DateInput',
  decorators: [StoryDecorators.Padding.bottom('100px')],
  args: {}
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<LocalDate | null>(null)
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Select Date"
        placeholder="Choose a date"
      />
    )
  }
}

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState<LocalDate | null>(LocalDate.now())
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Date with Initial Value"
      />
    )
  }
}

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<LocalDate | null>(null)
    const today = LocalDate.now()
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Date with Min/Max"
        min={today}
        max={today.plusDays(30)}
      />
    )
  }
}

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<LocalDate | null>(null)
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Required Date"
        required
      />
    )
  }
}

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<LocalDate | null>(null)
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Date with Error"
        error="Please select a valid date"
      />
    )
  }
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<LocalDate | null>(LocalDate.now())
    return (
      <DateInput
        value={value}
        onChange={setValue}
        label="Disabled Date"
        disabled
      />
    )
  }
}