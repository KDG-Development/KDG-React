import { CFormControlWrapper, CFormLabel, CFormTextarea} from '@coreui/react-pro'
import React from 'react'
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'
type Props = {
  value:string|null
  id?:string
  label?:string
  rows?:number
  helperText?:string
  onChange:(_:string)=>void
  required?:boolean
  error?:string
  disabled?:boolean
  placeholder?:string
}
const Textarea = (props:Props) => {
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
      <CFormTextarea
        id={props.id}
        rows={props.rows || 3}
        text={props.helperText}
        value={props.value || ''}
        onChange={ e => props.onChange(e.target.value)}
        invalid={!!props.error}
        feedback={props.error}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
    </CFormControlWrapper>
  )
}

export default Textarea