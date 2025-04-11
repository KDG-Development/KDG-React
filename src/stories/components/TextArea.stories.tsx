import React from 'react'
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from '../../components';

export default {
  component: Textarea,
  title:'Components/Forms/Textarea',
  args:{}
} satisfies Meta<typeof Textarea>;

// if we want to display additional stories below docs
export const Component = () => {
    const [value,setValue] = useState<string|null>(null)
    return (
        <Textarea
            onChange={ setValue }
            value={ value }
            placeholder={ 'Enter your text here... '}
        />
    )
}