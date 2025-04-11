import React from 'react'
import { Conditional } from '../Conditional'

type Stats = {
  [label: string]: {
    render:React.ReactNode
    labelClassName?: string
    hidden?:boolean
  }
}
type Props = {
  stats: Stats
  className?:string
}
export const Stats = (props:Props) => {
  return (
    <div className={`d-flex flex-column ${props.className ? props.className : ''}`}>
      {
        Object.entries(props.stats).map(([key, val]) => (
          <Conditional
            key={key}
            condition={!val.hidden}
            onTrue={() => (
              <span>
                <span className={`text-secondary ${val.labelClassName}`}>
                  {key}:
                </span> {val.render}
              </span>
            )}
          />
        ))
      }
    </div>
  )
}