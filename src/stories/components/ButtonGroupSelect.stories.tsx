import React from 'react'
import type { Meta } from '@storybook/react';
import { ButtonGroupMultiSelect, ButtonGroupSingleSelect } from '../../components';

export default {
  component: ButtonGroupMultiSelect,
  title:'Components/Forms/ButtonGroup Select',
  args:{
    label:'Some Label',
    options:[
      {
        label:v => v,
        value: 'A'
      },
      {
        label:v => v,
        value: 'B'
      },
      {
        label:v => v,
        value: 'C'
      },
    ],
    onChange:()=>{},
    parseKey:v => v,
    value: [],
  }
} satisfies Meta<typeof ButtonGroupMultiSelect<string>>;

export const Multiple = () => {

  const [value,setValue] = React.useState<string[]>([])

  return (
    <ButtonGroupMultiSelect
      label='Multi Select'
      options={[
        {
          value: 'A',
          label:v => v,
        },
        {
          value: 'B',
          label:v => v,
        },
        {
          value: 'C',
          label:v => v,
        },
      ]}
      onChange={v => setValue(v)}
      parseKey={v => v}
      value={value}
    />
  )
}
export const Single = () => {

  const [value,setValue] = React.useState<string|null>(null)

  return (
    <ButtonGroupSingleSelect
      label='Single Select'
      options={[
        {
          value: 'A',
          label:v => v,
        },
        {
          value: 'B',
          label:v => v,
        },
        {
          value: 'C',
          label:v => v,
        },
      ]}
      onChange={v => setValue(v)}
      parseKey={v => v}
      value={value}
    />
  )
}