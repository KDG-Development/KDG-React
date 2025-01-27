import React from 'react'

import { cilSpeedometer } from '@coreui/icons-pro'
import CIcon from '@coreui/icons-react'
import type { Meta } from '@storybook/react'
import TextInput from '../../components/Forms/TextInput'

const icon = <CIcon icon={cilSpeedometer} />

export default {
  component: TextInput,
  title:'Components/Forms/TextInput',
  args:{
  }
} satisfies Meta<typeof TextInput>;

// if we want to display additional stories below docs

export const WithoutIcon = () => {
  const [value,setValue] = React.useState<string>('')
  return (
    <TextInput
      label={'Without Icon'}
      value={value}
      onChange={setValue}
    />
  )
}

export const WithIcon = () => {
  const [value,setValue] = React.useState<string>('')
  return (
    <TextInput
      label='With Icon'
      value={ value }
      onChange={ (v) => { setValue(v) } }
      icon={ { content:icon,className:'test' } }
    />
  )
}