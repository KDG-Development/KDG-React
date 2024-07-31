import React from 'react'

import { cilSpeedometer } from '@coreui/icons-pro'
import CIcon from '@coreui/icons-react'
import type { Meta } from '@storybook/react'
import { NumberInput } from '../../components'

const icon = <CIcon icon={cilSpeedometer} />

export default {
  component: NumberInput,
  title:'Components/Forms/NumberInput',
  args:{
  }
} satisfies Meta<typeof NumberInput>;

// if we want to display additional stories below docs

export const WithoutIcon = () => {
  const [value,setValue] = React.useState<number|null>(null)
  return (
    <NumberInput value={ value } onChange={ (v) => { setValue(v) } } />
  )
}

export const WithIcon = () => {
  const [value,setValue] = React.useState<number|null>(null)
  return (
    <NumberInput
      value={ value }
      onChange={ (v) => { setValue(v) } }
      icon={ { content:icon,className:'test' } }
    />
  )
}


export const DecimalInput = () => {
  const [value,setValue] = React.useState<number|null>(null)
  return (
    <NumberInput
      value={ value }
      onChange={ setValue }
      allowDecimals
      maxDecimals={2}
    />
  )
}

export const WithMinAndMaxValue = () => {
  const [value,setValue] = React.useState<number|null>(null)
  return (
    <NumberInput
      value={ value }
      onChange={ setValue }
      allowDecimals
      min={0}
      max={100}
    />
  )
}
