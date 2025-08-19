import React from 'react'
import { CFormControlWrapper, CFormLabel } from '@coreui/react-pro'
import { DateUtils } from '../../../utils/DateTime'
import { LocalDate } from '@js-joda/core'
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type Props = {
  onChange: (_: LocalDate | null) => void
  value?: LocalDate | null
  disabled?: boolean
  label?: string
  placeholder?: string
  min?: LocalDate | null
  max?: LocalDate | null
  required?: boolean
  error?: string
}

export const DateInput = (props: Props) => {
  // Convert LocalDate to HTML date input format (YYYY-MM-DD)
  const localDateToInputValue = (date: LocalDate | null | undefined): string => {
    if (!date) return ''
    // Convert LocalDate to native Date first, then format as YYYY-MM-DD
    const nativeDate = DateUtils.LocalDate.toDate(date)
    return nativeDate.toISOString().split('T')[0]
  }

  // Convert HTML date input value (YYYY-MM-DD) to LocalDate
  const inputValueToLocalDate = (value: string): LocalDate | null => {
    if (!value) return null
    try {
      // Create a native Date from the input value and convert to LocalDate
      const nativeDate = new Date(value + 'T00:00:00')
      return DateUtils.LocalDate.fromDate(nativeDate)
    } catch {
      return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const localDate = inputValueToLocalDate(value)
    props.onChange(localDate)
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
      <input
        type="date"
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
        value={localDateToInputValue(props.value)}
        onChange={handleInputChange}
        disabled={props.disabled}
        required={props.required}
        min={props.min ? localDateToInputValue(props.min) : undefined}
        max={props.max ? localDateToInputValue(props.max) : undefined}
        placeholder={props.placeholder}
      />
      {props.error && (
        <div className="invalid-feedback d-block">
          {props.error}
        </div>
      )}
    </CFormControlWrapper>
  )
}
