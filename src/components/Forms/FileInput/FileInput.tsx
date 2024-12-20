import React, { useEffect, useState } from 'react'
import { CFormControlWrapper, CFormInput, CFormLabel } from "@coreui/react-pro"
import { DiscriminatedUnion, Union } from '../../../types'
import { handleDiscriminatedUnion } from '../../DiscriminatedUnionhandler'
import { MimeType } from 'file-type'
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'
import { Clickable } from '../../..'

type MultipleConfig = {
  value: File[]
  onChange: (_:File[]) => void
}

type SingleConfig = {
  value?: File|null
  onChange: (_:File|null) => void
}

type FileConfig = DiscriminatedUnion<[
  Union<'Multiple',MultipleConfig>,
  Union<'Single',SingleConfig>,
]>

type Props = {
  config: FileConfig
  label?: string
  disabled?: boolean
  error?: string
  accept?: MimeType[]
  required?: boolean
}

export const FileInput = (props:Props) => {
  const [previews, setPreviews] = useState<{[key:string]:string}>({})

  const generatePreviews = (files: File[]) => {
    // Clean up existing previews
    Object.values(previews).forEach(preview => URL.revokeObjectURL(preview))

    // Early return if no image files
    if (!files.some(file => file.type.startsWith('image/'))) {
      setPreviews({})
      return
    }

    const newPreviews = files.reduce((acc, file, index) => {
      if (file.type.startsWith('image/')) {
        acc[file.name + index] = URL.createObjectURL(file)
      }
      return acc
    }, {} as {[key:string]:string})

    setPreviews(newPreviews)
  }

  useEffect(() => {
    handleDiscriminatedUnion({
      value: props.config,
      config: {
        'Single': config => {
          if (config.value.value) {
            generatePreviews([config.value.value])
          } else {
            setPreviews({})
          }
        },
        'Multiple': config => {
          generatePreviews(config.value.value)
        }
      }
    })

    return () => {
      Object.values(previews).forEach(preview => URL.revokeObjectURL(preview))
    }
  }, [props.config])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    handleDiscriminatedUnion({
      value:props.config,
      config:{
        'Single': config => config.value.onChange(e.target.files?.[0] || null),
        'Multiple': config => config.value.onChange(Array.from(e.target.files || [])),
      }
    })
  }

  const handleRemoveFile = (index: number) => {
    handleDiscriminatedUnion({
      value: props.config,
      config: {
        'Single': config => config.value.onChange(null),
        'Multiple': config => {
          const newFiles = [...config.value.value]
          newFiles.splice(index, 1)
          config.value.onChange(newFiles)
        }
      }
    })
  }

  const getFiles = ():File[] => 
    handleDiscriminatedUnion({
      value: props.config,
      config: {
        'Single': config => config.value.value ? [config.value.value] : [],
        'Multiple': config => config.value.value
      }
    })

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
      <div className='my-1 text-muted'>
        {getFiles().map((file, index) => (
          <Clickable
            key={index}
            className='d-flex align-items-center'
            onClick={() => handleRemoveFile(index)}
          >
            <Conditional
              condition={file.type.startsWith('image/')}
              onTrue={() => <img width={100} src={previews[file.name + index]} />}
              onFalse={() => <div>{file.name}</div>}
            />
          </Clickable>
        ))}
      </div>
    </CFormControlWrapper>
  )
}