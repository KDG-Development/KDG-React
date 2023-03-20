import React from 'react'
import { CFormCheck, CFormControlWrapper } from "@coreui/react-pro"
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type Props = {
  value:boolean
  onChange:(_:boolean)=>void
  label?:string
  error?:string
  required?:boolean
  disabled?:boolean
}

const Checkbox = (props:Props) => {
  return (
    <CFormControlWrapper>
      <CFormCheck
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
        onChange={() => props.onChange(!props.value)}
        invalid={!!props.error}
        feedback={props.error}
      />
    </CFormControlWrapper>
  )
}

export default Checkbox