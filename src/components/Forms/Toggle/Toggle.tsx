import React from 'react'
import { CFormControlWrapper } from "@coreui/react-pro"
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

export const Toggle = (props:Props) => {
  return (
    <CFormControlWrapper>
      <div className={'form-check form-switch ' + (props.error ? 'is-invalid' : '')}>
        <label className="form-check-label">
        <input type="checkbox" className={"form-check-input " + (props.error ? 'is-invalid' : '')}
          checked={props.value}
          onChange={() => props.onChange(!props.value)}
          disabled={props.disabled}
        />
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
        </label>
        </div>
        <EntityConditional
            entity={props.error}
            render={error => (
            <div className='invalid-feedback'>{error}</div>
            )}
        />
    </CFormControlWrapper>
  )
}