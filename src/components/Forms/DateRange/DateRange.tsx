import React from 'react'
import { CDateRangePicker,CFormControlWrapper,CFormLabel } from "@coreui/react-pro"
import { LocalDate,convert,Instant } from '@js-joda/core'
import { EntityConditional,Conditional } from "../../Conditional"
import { RequiredAsterisk } from "../_common"
import { DateUtils } from '../../../utils/DateTime'

type _Props = {
    className?:string
    disabled?:boolean
    error?:string
    label?:string
    required?:boolean
}

type BaseProps = {
    start:Date|null
    end:Date|null
    onStartChange:(_:Date|null) => void
    onEndChange:(_:Date|null) => void
    timepicker:boolean
} & _Props

const BaseDateRange = (props:BaseProps) => {
    return (
        <CFormControlWrapper>
            <EntityConditional
                entity={props.label}
                render={label => (
                    <CFormLabel>
                        {label}
                        <Conditional
                            condition={!!props.required}
                            onTrue={() => <RequiredAsterisk /> }
                        />
                    </CFormLabel>
                )}
            />
            <CDateRangePicker
                timepicker={ props.timepicker}
                disabled={ props.disabled }
                className={ props.className }
                startDate={ props.start }
                endDate={ props.end }
                onStartDateChange={ props.onStartChange }
                onEndDateChange={ props.onEndChange }
                invalid={ !!props.error }
                feedback={ props.error }
            />
        </CFormControlWrapper>
    )
}

type DateRangeProps = {
    start:LocalDate|null
    end:LocalDate|null
    onStartChange:(_:LocalDate|null) => void
    onEndChange:(_:LocalDate|null) => void
} & _Props

export const DateRange = (props:DateRangeProps) => {
    return (
        <BaseDateRange
            { ...props }
            timepicker={ false }
            start={ props.start ? convert(props.start).toDate() : null }
            end={ props.end ? convert(props.end).toDate() : null }
            onEndChange={ (v) => props.onEndChange(v ? DateUtils.LocalDate.fromDate(v) : null) }
            onStartChange={ (v) => props.onStartChange(v ? DateUtils.LocalDate.fromDate(v) : null) }
        />
    )
}

type DateTimeRangeProps = {
    start:Instant|null
    end:Instant|null
    onStartChange:(_:Instant|null) => void
    onEndChange:(_:Instant|null) => void
} & _Props

export const DateTimeRange = (props:DateTimeRangeProps) => {
    return (
        <BaseDateRange
            { ...props }
            timepicker={ true }
            start={ props.start ? convert(props.start).toDate() : null }
            end={ props.end ? convert(props.end).toDate() : null }
            onEndChange={ (v) => props.onEndChange(v ? DateUtils.Instant.fromDate(v) : null) }
            onStartChange={ (v) => props.onStartChange(v ? DateUtils.Instant.fromDate(v) : null) }
        />
    )
}
