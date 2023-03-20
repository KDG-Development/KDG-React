import type { Meta } from '@storybook/react';
import { PaginatedTable } from '../../components';
import React, { useCallback, useEffect, useState } from 'react';
import { usePagination } from '../../utils/Hooks/hooks';
import { Ipsum } from '../utils';

export default {
  component: PaginatedTable,
  title:'Components/PaginatedTable',
  args:{
  },
} satisfies Meta<typeof PaginatedTable>;


type _Opts = {
  id:React.Key
  name:string
  company:string
}
// if we want to display additional stories below docs
export const Example = () => {
  const [items,setItems] = useState<_Opts[]>([])
  const [loading,setLoading] = useState(false)
  const pagination = usePagination()

  const loadOpts = useCallback(async () => {
    setLoading(true)
    try {
      await new Promise(resolve =>
        setTimeout(() => resolve(
          setItems(Array.from(Array(pagination.pagination.numberOfItemsPerPage)).map((_,id):_Opts => ({
            id,
            name:Ipsum.sentence(2),
            company:Ipsum.sentence(3),
          })))
        ), 1000)
      )
    } finally {
      setLoading(false)
    }
  }, [pagination.pagination.numberOfItemsPerPage,pagination.pagination.page])

  useEffect(() => {
    loadOpts()
  },[loadOpts, pagination.pagination.numberOfItemsPerPage,pagination.pagination.page])

  return (
    <PaginatedTable
      items={loading ? [] : items}
      loading={loading}
      onChangePagination={pagination.setPagination}
      itemKey={x => x.id}
      pagination={pagination.pagination}
      pageOptions={{
        5:5,
        10:10,
        20:20,
      }}
      totalRecords={loading ? 0 : pagination.pagination.numberOfItemsPerPage * 5}
      fields={{
        'Name':{
          valueRender:x => x.name,
        },
        'Company':{
          valueRender:x => x.company,
        },
      }}
    />
  )
}