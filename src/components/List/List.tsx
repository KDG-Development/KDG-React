import { CListGroup, CListGroupItem } from "@coreui/react-pro"
import React from "react"

type Props<T> = {
  options:T[]
  active?:T|null
  parseKey:(_:T) => React.Key
  projection:(_:T) => React.ReactNode
  onClick?:(_:T) => void
  flush?:boolean
}

export const List = <T extends {}>(props:Props<T>) => {
  return (
    <CListGroup
      flush={props.flush}
    >
      {props.options.map(x => (
        <CListGroupItem
          style={{
            cursor: props.onClick ? 'pointer' : 'auto',
          }}
          active={props.active ? props.parseKey(props.active) === props.parseKey(x) : false}
          onClick={() => props.onClick && props.onClick(x)}
          key={props.parseKey(x)}
        >
          {props.projection(x)}
        </CListGroupItem>
      ))}
    </CListGroup>
  )
}