import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Select, MultiSelect } from '../../components';
import { Ipsum, StoryDecorators } from '../utils';

export default {
  component: Select,
  title:'Components/Forms/Select',
  decorators:[StoryDecorators.Padding.bottom()],
  args:{}
} satisfies Meta<typeof Select<any>>;

type TOpt = {
  id:React.Key
  name:string
}

const _options = Array.from(Array(10)).map(():TOpt => ({
  id:Ipsum.uuid(),
  name:Ipsum.person(),
}))

export const Single = () => {

  const [value,setValue] = useState<TOpt|null>(null)

  return (
    <Select
      value={value}
      options={_options}
      parseKey={x=>x.id}
      onChange={setValue}
      parseOptionLabel={x=>x.name}
    />
  )

}

export const Multi = () => {

  const [value,setValue] = useState<TOpt[]>([])

  return (
    <MultiSelect
      value={value}
      options={_options}
      parseKey={x=>x.id}
      onChange={setValue}
      parseOptionLabel={x=>x.name}
    />
  )

}