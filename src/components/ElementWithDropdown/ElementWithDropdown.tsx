import React from 'react'
import { useEffect, useRef, useState } from "react";
import { Conditional } from "../Conditional";

type Props = {
  triggerComponent:()=>React.ReactElement
  content:()=>React.ReactElement
}

const ElementWithDropdown = (props:Props) => {

  const [expanded, setExpanded] = useState(false)

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = (e:any) => {
      if (!container.current?.contains(e.target)){
        setExpanded(false)
      }
    }
    window.addEventListener('click', fn)
    return () => {
      window?.removeEventListener("click", fn)
    }
  }, [])
  

  return (
    <div className="dropdown" ref={container}>
      <span onClick={() => setExpanded(true)}>
        { props.triggerComponent() }
      </span>
      <Conditional
        condition={ expanded }
        onTrue={ () => (
          <div className="dropdown-menu show">
            { props.content() }
          </div>
        )}
      />
    </div>
  )
}

export default ElementWithDropdown