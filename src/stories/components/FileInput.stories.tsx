import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import { FileInput } from '../../components'

export default {
  component: FileInput,
  title:'Components/Forms/FileInput',
  args:{}
} satisfies Meta<typeof FileInput>;

// if we want to display additional stories below docs
export const Single = () => {

  const [file,setFile] = useState<File|null>(null)

  return (
    <FileInput
      label='Single Input'
      error={!file ? 'Select file' : undefined}
      config={{
        case:'Single',
        value:{
          value:file,
          onChange:setFile,
        }
      }}
    />
  )
}
export const Multiple = () => {

  const [files,setFiles] = useState<File[]>([])

  return (
    <FileInput
      label='Multiple Input'
      error={!files.length ? 'Select file' : undefined}
      config={{
        case:'Multiple',
        value:{
          value:files,
          onChange:setFiles
        }
      }}
    />
  )
}