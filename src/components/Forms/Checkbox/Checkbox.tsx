import React from 'react'
import { CFormControlWrapper } from "@coreui/react-pro"
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type Props = {
  value:boolean
  onChange:(_:boolean)=>void
  label?:string
  error?:string
  required?:boolean
  disabled?:boolean
  tabIndex?:number
}

export const Checkbox = (props:Props) => {
  return (
    <CFormControlWrapper>
      <div className={'form-check ' + (props.error ? 'is-invalid' : '')}>
        <label className="form-check-label">
          <input type="checkbox" className={"form-check-input " + (props.error ? 'is-invalid' : '')}
            checked={props.value}
            onChange={() => props.onChange(!props.value)}
            disabled={props.disabled}
            tabIndex={props.tabIndex}
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
        render={error =>
          <div className='invalid-feedback'>{error}</div>
        }
      />
    </CFormControlWrapper>
  )
}
