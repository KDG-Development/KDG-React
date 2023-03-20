import React from 'react'
import { CDatePicker, CFormControlWrapper, CFormLabel } from '@coreui/react-pro'
import { DateUtils } from '../../../utils/DateTime'
import { LocalDate } from '@js-joda/core'
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type Props = {
  onChange:(_:LocalDate|null) => void
  value?:LocalDate|null
  disabled?:boolean
  label?:string
  placeholder?:string
  min?:LocalDate|null
  max?:LocalDate|null
  required?:boolean
  error?:string
}

const DateInput = (props:Props) => {
  return (
    <CFormControlWrapper>
      <EntityConditional
        entity={props.label}
        render={label => (
          <CFormLabel>
            {label}
            <Conditional
              condition={!!props.required}
              onTrue={() => <RequiredAsterisk/>}
            />
          </CFormLabel>
        )}
      />
      <CDatePicker
        disabled={ props.disabled }
        date={ props.value ? DateUtils.LocalDate.toDate(props.value) : null }
        onDateChange={ e => props.onChange(
          e ? DateUtils.LocalDate.fromDate(e) : null
        )}
        placeholder={ props.placeholder }
        minDate={props.min ? DateUtils.LocalDate.toDate(props.min) : null}
        maxDate={props.max ? DateUtils.LocalDate.toDate(props.max) : null}
        invalid={!!props.error}
        feedback={props.error}
      />
    </CFormControlWrapper>
  )
}

export default DateInput