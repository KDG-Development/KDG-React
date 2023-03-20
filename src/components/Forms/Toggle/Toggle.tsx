import React from 'react'
import { CFormControlWrapper, CFormSwitch } from "@coreui/react-pro"
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type Props = {
  label:string
  value:boolean
  onChange:(_:boolean) => void
  required?:boolean
  error?:string
  disabled?:boolean
}

const Toggle = (props:Props) => {
  return (
    <CFormControlWrapper>
      <CFormSwitch
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
        checked={props.value}
        onChange={() => props.onChange(!props.value)}
        invalid={!!props.error}
        disabled={props.disabled}
      />
      <EntityConditional
        entity={props.error}
        render={error => (
          <div className='invalid-feedback'>{error}</div>
        )}
      />
    </CFormControlWrapper>
  )
}

export default Toggle