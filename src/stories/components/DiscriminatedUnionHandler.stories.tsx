import React from 'react'
import type { Meta } from '@storybook/react';
import { DiscriminatedUnion, Union } from '../../types';
import { Ipsum } from '../utils';
import { DiscriminatedUnionHandler, handleDiscriminatedUnion } from '../../components';
import { ActionButton } from '../../components';

export default {
  component: DiscriminatedUnionHandler,
  title:'Components/DiscriminatedUnionHandler',
  args:{
  }
} satisfies Meta<typeof DiscriminatedUnionHandler>;

export const Handler = () => {

  const [value,setValue] = React.useState<DiscriminatedUnion<[
    Union<'Loading', 'Loading...'>,
    Union<'Loaded', string[]>
  ]>>({
    case:'Loading',
    value:'Loading...',
  })

  const handleValueChange = () =>
    handleDiscriminatedUnion({
      value,
      config:{
        'Loaded': () => setValue({
          case:'Loading',
          value:'Loading...',
        }),
        'Loading': () => setValue({
          case:'Loaded',
          value:Array.from(Array(10)).map(() => Ipsum.sentence(3))
        })
      }
    })

  return (
    <div>
      <ActionButton onClick={handleValueChange}>
        <DiscriminatedUnionHandler
          value={value}
          config={{
            'Loading': () => 'Set Loaded',
            'Loaded': () => 'Set Loading',
          }}
        />
      </ActionButton>
      <div>
        <DiscriminatedUnionHandler
          value={value}
          config={{
            'Loading': x => x.value,
            'Loaded': x => (
              <ul>
                {x.value.map((v,i) => <li key={i}>{v}</li>)}
              </ul>
            )
          }}
        />
      </div>
    </div>
  )
}