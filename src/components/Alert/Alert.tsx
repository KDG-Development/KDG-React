import React from 'react'
import { CAlert, CAlertHeading } from "@coreui/react-pro"
import { Enums } from "../../utils"
import { Conditional } from "../Conditional/Conditional"

type AlertProps = {
  title?:{
    render:string|React.ReactNode
    className?:string
  }
  message:string|React.ReactNode
  type?:Enums.Color
  className?:string
  onDismiss?:() => void
}

const Alert = (props:AlertProps) => {
  return (
    <CAlert
      className={props.className}
      color={props.type || 'primary'}
      dismissible={!!props.onDismiss}
      onClose={() => props.onDismiss}
    >
      <Conditional
        condition={!!props.title}
        onTrue={ () => (
          <CAlertHeading
            className={props.title!.className}
          >
            {props.title!.render}
          </CAlertHeading>
        )}
      />
      {props.message}
    </CAlert>
  )
}

export default Alert