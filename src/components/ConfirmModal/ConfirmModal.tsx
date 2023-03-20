import React, { useState } from "react"
import Clickable from "../Clickable/Clickable"
import { Conditional } from "../Conditional/Conditional"
import { Modal } from "../Modal/Modal"

type Props = {
  trigger:React.ReactNode
  content:(cancel:()=>void) => React.ReactNode
  header?:React.ReactNode
}

const ConfirmModal = (props:Props) => {
  const [show, setshow] = useState(false)
  return (
    <>
      <Clickable
        onClick={() => setshow(true)}
      >
        {props.trigger}
      </Clickable>
      <Conditional
        condition={!!show}
        onTrue={ () =>
          <Modal
            onClose={() => setshow(false)}
            header={() => props.header ? props.header :  'Are you sure?'}
            content={() => props.content(() => setshow(false))}
          />
        }
      />
    </>
  )
}

export default ConfirmModal