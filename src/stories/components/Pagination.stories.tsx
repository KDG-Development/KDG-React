import React, { useState } from 'react'
import type { Meta } from '@storybook/react';
import { Pagination } from '../../components/Pagination/Pagination';
import { StoryDecorators } from '../utils';
import { TPagination } from '../../utils';

const pageOptions = {5:5, 10:10, 20:20, 40:40, 80:80, 100:100}

export default {
  component: Pagination,
  decorators:[StoryDecorators.Padding.bottom()],
  title:'Components/Pagination',
  args:{
    pagination:{
      numberOfItemsPerPage:20,
      page:1,
    },
    pageOptions: pageOptions,
    onChange:()=> {},
    totalRecords:60,
  },
} satisfies Meta<typeof Pagination>;

// if we want to display additional stories below docs
export const Component = () => {
  const [pagination,setPagination] = useState<TPagination>({numberOfItemsPerPage:20,page:1 })
  return <Pagination
      pageOptions={pageOptions}
      pagination={pagination}
      totalRecords={100}
      onChange={setPagination}
    />
}