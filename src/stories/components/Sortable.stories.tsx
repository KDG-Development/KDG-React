import React from 'react'
import type { Meta } from '@storybook/react';
import { SortThreshold, Sortable } from '../../components';
import { Ipsum } from '.././utils';

export default {
  component: Sortable,
  title:'Components/Utilities/Sortable',
  args:{
    type:'test',
    parseKey:x => x.id,
    renderItem:{
      render: x => x.value,
      className: 'm-2 p-2 border border-primary',
    }
  }
} satisfies Meta<typeof Sortable<{id:number,value:string},string>>;

const _items : {id:number,value:string}[] = [
  {
    id:1,
    value:Ipsum.sentence(1),
  },
  {
    id:2,
    value:Ipsum.sentence(1),
  },
  {
    id:3,
    value:Ipsum.sentence(1),
  },
]

export const Vertical = () => {

  const [items,setItems] = React.useState(_items)

  return (
    <Sortable
      type='Vertical'
      items={items}
      parseKey={x => x.id}
      renderItem={{
        render: x => x.value,
        className: 'm-2 p-2 border border-primary',
      }}
      onResort={setItems}
      sort={SortThreshold.Vertical}
    />
  )
}
export const Horizontal = () => {

  const [items,setItems] = React.useState(_items)

  return (
    <div className='d-flex'>
      <Sortable
        type='Horizontal'
        items={items}
        parseKey={x => x.id}
        renderItem={{
          render: x => x.value,
          className: 'm-2 p-2 border border-primary',
        }}
        onResort={setItems}
        sort={SortThreshold.Horizontal}
      />
    </div>
  )
}