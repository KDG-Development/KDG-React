import React from 'react'
import { CFormControlWrapper, CFormLabel } from '@coreui/react-pro'
import { LocalDate, Instant } from '@js-joda/core'
import { EntityConditional, Conditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'
import { DateUtils } from '../../../utils/DateTime'

type _Props = {
  className?: string
  disabled?: boolean
  error?: string
  label?: string
  required?: boolean
}

type DateRangeProps = {
  start: LocalDate | null
  end: LocalDate | null
  onStartChange: (_: LocalDate | null) => void
  onEndChange: (_: LocalDate | null) => void
  startLabel?: string
  endLabel?: string
} & _Props

export const DateRange = (props: DateRangeProps) => {
  // Convert LocalDate to HTML date input format (YYYY-MM-DD)
  const localDateToInputValue = (date: LocalDate | null | undefined): string => {
    if (!date) return ''
    const nativeDate = DateUtils.LocalDate.toDate(date)
    return nativeDate.toISOString().split('T')[0]
  }

  // Convert HTML date input value (YYYY-MM-DD) to LocalDate
  const inputValueToLocalDate = (value: string): LocalDate | null => {
    if (!value) return null
    try {
      const nativeDate = new Date(value + 'T00:00:00')
      return DateUtils.LocalDate.fromDate(nativeDate)
    } catch {
      return null
    }
  }

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const localDate = inputValueToLocalDate(value)
    props.onStartChange(localDate)
  }

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const localDate = inputValueToLocalDate(value)
    props.onEndChange(localDate)
  }

  return (
    <CFormControlWrapper>
      <EntityConditional
        entity={props.label}
        render={label => (
          <CFormLabel>
            {label}
            <Conditional
              condition={!!props.required}
              onTrue={() => <RequiredAsterisk />}
            />
          </CFormLabel>
        )}
      />
      <div className={`date-range-container ${props.className || ''}`}>
        <div className="row g-2">
          <div className="col">
            <label className="form-label small text-muted">
              {props.startLabel || 'Start Date'}
            </label>
            <input
              type="date"
              className={`form-control ${props.error ? 'is-invalid' : ''}`}
              value={localDateToInputValue(props.start)}
              onChange={handleStartChange}
              disabled={props.disabled}
              required={props.required}
              max={props.end ? localDateToInputValue(props.end) : undefined}
            />
          </div>
          <div className="col">
            <label className="form-label small text-muted">
              {props.endLabel || 'End Date'}
            </label>
            <input
              type="date"
              className={`form-control ${props.error ? 'is-invalid' : ''}`}
              value={localDateToInputValue(props.end)}
              onChange={handleEndChange}
              disabled={props.disabled}
              required={props.required}
              min={props.start ? localDateToInputValue(props.start) : undefined}
            />
          </div>
        </div>
        {props.error && (
          <div className="invalid-feedback d-block">
            {props.error}
          </div>
        )}
      </div>
    </CFormControlWrapper>
  )
}

type DateTimeRangeProps = {
  start: Instant | null
  end: Instant | null
  onStartChange: (_: Instant | null) => void
  onEndChange: (_: Instant | null) => void
  startLabel?: string
  endLabel?: string
} & _Props

export const DateTimeRange = (props: DateTimeRangeProps) => {
  // Convert Instant to HTML datetime-local input format (YYYY-MM-DDTHH:mm)
  const instantToInputValue = (instant: Instant | null | undefined): string => {
    if (!instant) return ''
    const nativeDate = DateUtils.Instant.toLocalDate(instant)
    const jsDate = DateUtils.LocalDate.toDate(nativeDate)
    return jsDate.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm
  }

  // Convert HTML datetime-local input value to Instant
  const inputValueToInstant = (value: string): Instant | null => {
    if (!value) return null
    try {
      const nativeDate = new Date(value)
      return DateUtils.Instant.fromDate(nativeDate)
    } catch {
      return null
    }
  }

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const instant = inputValueToInstant(value)
    props.onStartChange(instant)
  }

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const instant = inputValueToInstant(value)
    props.onEndChange(instant)
  }

  return (
    <CFormControlWrapper>
      <EntityConditional
        entity={props.label}
        render={label => (
          <CFormLabel>
            {label}
            <Conditional
              condition={!!props.required}
              onTrue={() => <RequiredAsterisk />}
            />
          </CFormLabel>
        )}
      />
      <div className={`date-range-container ${props.className || ''}`}>
        <div className="row g-2">
          <div className="col">
            <label className="form-label small text-muted">
              {props.startLabel || 'Start Date & Time'}
            </label>
            <input
              type="datetime-local"
              className={`form-control ${props.error ? 'is-invalid' : ''}`}
              value={instantToInputValue(props.start)}
              onChange={handleStartChange}
              disabled={props.disabled}
              required={props.required}
              max={props.end ? instantToInputValue(props.end) : undefined}
            />
          </div>
          <div className="col">
            <label className="form-label small text-muted">
              {props.endLabel || 'End Date & Time'}
            </label>
            <input
              type="datetime-local"
              className={`form-control ${props.error ? 'is-invalid' : ''}`}
              value={instantToInputValue(props.end)}
              onChange={handleEndChange}
              disabled={props.disabled}
              required={props.required}
              min={props.start ? instantToInputValue(props.start) : undefined}
            />
          </div>
        </div>
        {props.error && (
          <div className="invalid-feedback d-block">
            {props.error}
          </div>
        )}
      </div>
    </CFormControlWrapper>
  )
}
