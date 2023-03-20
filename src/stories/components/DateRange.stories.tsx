import React from 'react'
import type { Meta } from '@storybook/react';
import { DateRange,DateTimeRange } from '../../components';
import { StoryDecorators } from '../utils';
import { Instant,LocalDate } from '@js-joda/core';

export default {
  component: DateRange,
  title:'Components/Forms/DateRange',
  decorators:[StoryDecorators.Padding.bottom('450px')],
  args:{
    onEndChange(v) {
        console.log('end change',v)
    },
    onStartChange(v) {
        console.log('onstart change',v)
    },
  }
} satisfies Meta<typeof DateRange>;

// if we want to display additional stories below docs
export const DateRangeComponent = () => {
    const [start,setStart] = React.useState<LocalDate|null>(null)
    const [end,setEnd] = React.useState<LocalDate|null>(null)
    return (
        <DateRange
            start={ start }
            end={ end }
            onStartChange={ (v) => {
                console.log('start time change',v)
                setStart(v)
            } }
            onEndChange={ (v) => {
                console.log('end time change',v)
                setEnd(v)
            } }
        />
    )
}

export const DateTimeRangeComponent = () => {
    const [start,setStart] = React.useState<Instant|null>(null)
    const [end,setEnd] = React.useState<Instant|null>(null)
    return (
        <DateTimeRange
            start={ start }
            end={ end }
            onStartChange={ (v) => {
                console.log('start time change',v)
                setStart(v)
            } }
            onEndChange={ (v) => {
                console.log('end time change',v)
                setEnd(v)
            } }
        />
    )
}