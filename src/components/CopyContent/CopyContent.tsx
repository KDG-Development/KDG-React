import React, { useState } from 'react'
import Clickable from '../Clickable'
import { Conditional } from '../Conditional'
import Icon from '../Icon'

type TCopyContentProps = {
  content:string
  className?: string
}

export const CopyContent = (props:React.PropsWithChildren<TCopyContentProps>) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(props.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {props.children}
      <Conditional
        condition={copied}
        onTrue={() => <Icon icon={x => x.cilCheck} />}
        onFalse={() =>
          <Clickable onClick={handleCopy} className={props.className}>
            <Icon icon={x => x.cilCopy} />
          </Clickable>
        }
      />
    </>
  )
}
