import React, { useState } from "react"
import TextInput from "../TextInput"
import Icon from "../../Icon"
import { TextInputProps } from "../TextInput/TextInput"
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons'


export const PasswordInput = (props:TextInputProps) => {

  const [show,setShow] = useState(false)

  return (
    <TextInput
      {...props}
      icon={{
        content:
          <Icon icon={show ? cilLockUnlocked : cilLockLocked} onClick={() => setShow(prev => !prev)} />
      }}
      type={!show ? 'password' : undefined}
    />
  )
}