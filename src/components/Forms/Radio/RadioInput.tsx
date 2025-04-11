import React from 'react'
import { CFormCheck, CFormControlWrapper } from "@coreui/react-pro"
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type Props = {
  name:string
  value:boolean
  onChange:(_:boolean)=>void
  label?:string
  error?:string
  required?:boolean
  disabled?:boolean
}

export const Radio = (props:Props) => {
  return (
    <CFormControlWrapper>
      <CFormCheck
        type='radio'
        checked={props.value}
        disabled={props.disabled}
        label={
          <EntityConditional
            entity={props.label}
            render={label => (
              <>
                {label}
                <Conditional
                  condition={!!props.required}
                  onTrue={() => <RequiredAsterisk/>}
                />
              </>
            )}
          />
        }
        // selecting values
        onChange={() => {
          if (!props.value) props.onChange(!props.value)
        }}
        // unselecting values
        onClick={() => {
          if (props.value) props.onChange(!props.value)
        }}
        invalid={!!props.error}
        feedback={props.error}
      />
    </CFormControlWrapper>
  )
}
