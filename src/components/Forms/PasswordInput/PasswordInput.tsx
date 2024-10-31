import React, { useState } from "react"
import TextInput from "../TextInput"
import Icon from "../../Icon"
import { TextInputProps } from "../TextInput/TextInput"

export const PasswordInput = (props:TextInputProps) => {

  const [show,setShow] = useState(false)

  return (
    <TextInput
      {...props}
      icon={{
        content:
          <Icon icon={x => show ? x.cilLockUnlocked : x.cilLockLocked} onClick={() => setShow(prev => !prev)} />
      }}
      type={!show ? 'password' : undefined}
    />
  )
}