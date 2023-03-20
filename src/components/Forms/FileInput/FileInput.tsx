import React from 'react'
import { CFormControlWrapper, CFormInput, CFormLabel } from "@coreui/react-pro"
import { DiscriminatedUnion, Union } from '../../../types'
import { handleDiscriminatedUnion } from '../../DiscriminatedUnionhandler'
import { MimeType } from 'file-type';
import { Conditional, EntityConditional } from '../../Conditional';
import { RequiredAsterisk } from '../_common';

type MultipleConfig = {
  value:File[]
  onChange:(_:File[])=>void

}
type SingleConfig = {
  value?:File|null
  onChange:(_:File|null)=>void
}

type FileConfig = DiscriminatedUnion<[
  Union<'Multiple',MultipleConfig>,
  Union<'Single',SingleConfig>,
]>

type Props = {
  config:FileConfig
  label?:string
  disabled?:boolean
  error?:string
  accept?:MimeType[]
  required?:boolean
}

export const FileInput = (props:Props) => {

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    handleDiscriminatedUnion({
      value:props.config,
      config:{
        'Single': config => config.value.onChange(e.target.files?.[0] || null),
        'Multiple': config => config.value.onChange(Array.from(e.target.files || [])),
      }
    })
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
              onTrue={() => <RequiredAsterisk/>}
            />
          </CFormLabel>
        )}
      />
      <CFormInput
        type="file"
        multiple={handleDiscriminatedUnion({
          value:props.config,
          config:{
            'Multiple':()=>true,
            'Single':()=>false,
          }
        })}
        disabled={props.disabled}
        onChange={handleChange}
        invalid={!!props.error}
        feedback={props.error}
        accept={props.accept?.join(',')}
      />
    </CFormControlWrapper>
  )
}