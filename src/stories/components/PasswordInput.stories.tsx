import React from 'react'
import type { Meta } from '@storybook/react'
import {PasswordInput} from '../../components';

export default {
  component: PasswordInput,
  title: 'Components/Forms/PasswordInput',
  args: {
  }
} satisfies Meta<typeof PasswordInput>

export const Component = () => {
  const [value, setValue] = React.useState<string>('')
  return (
    <PasswordInput
      label="Password"
      value={value}
      onChange={setValue}
    />
  )
}
