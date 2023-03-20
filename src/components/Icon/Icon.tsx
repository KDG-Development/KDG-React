import React from 'react'
import CIcon from '@coreui/icons-react'
import * as icons from '@coreui/icons'
import { CIconProps } from '@coreui/icons-react/dist/CIcon'
import { WrappedClickable } from '../Clickable/Clickable'

type TIcon = string[]

type Props<T> = {
  icon:(_:T)=>TIcon
  onClick?:()=>void
} & Pick<
  CIconProps,
  | "size"
  | "className"
  | "title"
  // add more props as needed
>
const Icon = (props:Props<typeof icons>) => (
  <WrappedClickable onClick={props.onClick}>
    <CIcon
      { ...props}
      onClick={undefined} // override this because i really like the spread above...
      icon={props.icon(icons)}
    />
  </WrappedClickable>
)

export default Icon