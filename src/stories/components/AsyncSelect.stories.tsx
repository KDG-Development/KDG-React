import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { AsyncSingleSelect, AsyncMultiSelect } from '../../components';
import { Ipsum, StoryDecorators } from '../utils';

export default {
  component: AsyncMultiSelect,
  title:'Components/Forms/AsyncMultiSelect',
  decorators:[StoryDecorators.Padding.bottom()],
  args:{}
} satisfies Meta<typeof AsyncMultiSelect<any>>;

type _Opt = {
  id:React.Key
  value:string
}

export const SingleSelect = () => {

  const _options = () => Array.from(Array(10)).map(():_Opt => ({
    id:Ipsum.uuid(),
    value:Ipsum.person(),
  }))

  const [options,setOptions] = useState<_Opt[]>(_options())
  const [value,setValue] = useState<_Opt|null>(null)
  const [loading,setLoading] = useState(false)


  const loadMoreOptions = async () => {
    setLoading(true)
    await new Promise(resolve =>
      setTimeout(() => resolve(
        setOptions(prev => prev.concat(_options()))
      ),800)
    )
    setLoading(false)
  }

  const searchOptions = async (_search:string|null) => {
    setLoading(true)
    setOptions([])
    await new Promise(resolve =>
      setTimeout(() =>resolve(
        setOptions(
          Array.from(Array(10)).map(():_Opt => ({
            id:Ipsum.uuid(),
            value:Ipsum.person(),
          }))
          )
        ),800)
      )
    setLoading(false)
  }

  return (
    <AsyncSingleSelect
      label={'Person Select'}
      error={!value ? 'Value required' : undefined}
      options={options}
      value={value || null}
      loadMore={loadMoreOptions}
      onSearch={searchOptions}
      loading={loading}
      hasMore={options.length < 50}
      onChange={setValue}
      parseKey={x=>x.id}
      parseOptionLabel={x=>x.value}
    />
  )
}

export const MultiSelect = () => {
  
  const _options = () => Array.from(Array(10)).map(():_Opt => ({
    id:Ipsum.uuid(),
    value:Ipsum.person(),
  }))

  const [options,setOptions] = useState<_Opt[]>(_options())
  const [value,setValue] = useState<_Opt[]>([])
  const [loading,setLoading] = useState(false)


  const loadMoreOptions = async () => {
    setLoading(true)
    await new Promise(resolve =>
      setTimeout(() => resolve(
        setOptions(prev => prev.concat(_options()))
      ),800)
    )
    setLoading(false)
  }

  const searchOptions = async (_search:string|null) => {
    setLoading(true)
    setOptions([])
    await new Promise(resolve =>
      setTimeout(() =>resolve(
        setOptions(
          Array.from(Array(10)).map(():_Opt => ({
            id:Ipsum.uuid(),
            value:Ipsum.person(),
          }))
          )
        ),800)
      )
    setLoading(false)
  }

  return (
    <AsyncMultiSelect
      label={'Person Select'}
      error={!value.length ? 'Value required' : undefined}
      options={options}
      value={value}
      loadMore={loadMoreOptions}
      onSearch={searchOptions}
      loading={loading}
      hasMore={options.length < 50}
      onChange={setValue}
      parseKey={x=>x.id}
      parseOptionLabel={x=>x.value}
      direction="top"
    />
  )
}