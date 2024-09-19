import React from 'react'
import { CFormControlWrapper, CFormInput,CFormLabel,CInputGroup,CInputGroupText } from '@coreui/react-pro'
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

export type TextInputProps = {
  value:string|null
  onChange:(_:string)=>void
  label?:string
  disabled?:boolean
  onFocus?:()=>void
  onBlur?:()=>void
  placeholder?:string
  className?:string
  error?:string|null
  icon?:{
    content:React.ReactNode
    className?:string
  }
  type?:string
  delay?:number
  autofocus?:boolean
  inputRef?:React.RefObject<HTMLInputElement>
  hideDefaultHelperText?:boolean
  helperText?:React.ReactNode
  required?:boolean
}

const TextInput = (props:TextInputProps) => {
  const input =
    <CFormInput
      value={props.value || ''}
      disabled={ props.disabled }
      onChange={ e => props.onChange(e.target.value) }
      onFocus={props.onFocus}
      onBlur={ !!props.onBlur ? (() => props.onBlur!()) : undefined }
      placeholder={ props.placeholder }
      className={props.className}
      invalid={!!props.error}
      feedback={props.error}
      type={props.type}
      delay={props.delay}
      autoFocus={props.autofocus}
      ref={props.inputRef}
      text={!props.hideDefaultHelperText ? props.helperText : undefined}
    />
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
      <EntityConditional
        entity={ props.icon || null }
        render={
          (icon) => (
            <CInputGroup>
              <CInputGroupText
                className={ icon.className }
              >
                { icon.content }
              </CInputGroupText>
              { input }
            </CInputGroup>
          )
        }
        fallback={ () => input }
      />
    </CFormControlWrapper>
  )
}

export default TextInput