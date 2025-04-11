import React from 'react';
import type { Meta } from '@storybook/react';
import { Ipsum } from '../utils';
import { Enums } from '../../utils';
import { SortOrder } from '../../components';
import {Table} from '../../components';
import { ActionButton } from '../../components';
import { Badge } from '../../components';
import { DataLoaded } from '../../components';

export default {
  component: Table,
  title:'Components/Table',
  args:{
    headerClassName:'table-light',
    items:[
      {
        id:1,
        value:Ipsum.sentence(),
      },
      {
        id:2,
        value:Ipsum.sentence(),
      },
      {
        id:3,
        value:Ipsum.sentence(),
      },
    ],
    fields:{
      'ID':{
        valueRender: v => v.id,
        sort:{
          order:SortOrder.ASC,
          sort: (a,b) => a.id - b.id,
        },
      },
      'Value':{
        valueRender: v => v.value,
        sort:{
          order:SortOrder.ASC,
          sort: (a,b) => a.value.localeCompare(b.value),
        },
      },
      'Extendable':{
        valueRender:() => 'Put any React Node here!'
      }
    },
    itemKey:v => v.id,
  }
} satisfies Meta<typeof Table<{id:number,value:string}>>;

// if we want to display additional stories below docs
export const Component = () => {

  const [expanded,setExpanded] = React.useState<React.Key[]>([])

  return (
    <>
      <Table
        onClick={(v) =>
          setExpanded(prev =>
            prev.includes(v.id)
              ? prev.filter(x => x !== v.id)
              : prev.concat(v.id)
          )
        }
        items={[
          {
            id:1,
            value:Ipsum.sentence(),
          },
          {
            id:2,
            value:Ipsum.sentence(),
          },
          {
            id:3,
            value:Ipsum.sentence(),
          },
        ]}
        itemKey={v => v.id}
        fields={{
          'ID':{
            valueRender: v => v.id,
            sort:{
              order:SortOrder.ASC,
              sort: (a,b) => a.id - b.id,
            },
          },
          'Value':{
            valueRender: v => v.value,
            sort:{
              order:SortOrder.ASC,
              sort: (a,b) => a.value.localeCompare(b.value),
            },
            header:{
              render:() => <Badge color={Enums.Color.Danger}>Use A Custom Header Node</Badge>
            }
          },
          'Action':{
            header:{
              wrapperClassName:'d-flex justify-content-end',
            },
            valueRender:v =>
              <div className='d-flex justify-content-end'>
                <ActionButton
                  onClick={() =>
                    setExpanded(prev =>
                      prev.includes(v.id)
                        ? prev.filter(x => x !== v.id)
                        : prev.concat(v.id)
                    )}
                >
                  Expand
                </ActionButton>
              </div>
          },
        }}
        expand={{
          expandedRecords:expanded,
          onExpandedRecordsChange:setExpanded,
          expandedClassName:'bg-light',
          expandedValueRender:(x) => (
            <DataLoaded
              loadData={() => new Promise<number>(resolve => {
                setTimeout(() => resolve(1), 1000)
              })}
              onLoaded={() =>
                <div>
                  <h3>Expanded details for {x.value}</h3>
                  <p>{Ipsum.paragraph()}</p>
                </div>
              }
            />
          )
        }}
      />
    </>
  )
}