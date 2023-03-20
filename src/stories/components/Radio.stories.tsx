import React, { useState } from 'react'
import type { Meta } from '@storybook/react';
import { Radio } from '../../components';
import { Ipsum } from '../utils';

export default {
  component: Radio,
  title:'Components/Forms/Radio',
  args:{}
} satisfies Meta<typeof Radio>;

// if we want to display additional stories below docs
const options = Array.from(Array(5)).map(() => Ipsum.person())
export const Component = () => {
  const [value,setValue] = useState('')
  return (
    <div>
      {
        options.map(p => (
          <Radio
            name='person'
            onChange={x => x ? setValue(p) : setValue('')}
            value={p === value}
            label={p}
          />
        ))
      }
    </div>

  )
}