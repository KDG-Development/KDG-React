import React from 'react'
import CIcon from '@coreui/icons-react'
// import type * as icons from '@coreui/icons'
import { CIconProps } from '@coreui/icons-react/dist/CIcon'
import { WrappedClickable } from '../Clickable/Clickable'

// type TIcon = string[]

type Props = {
  // icon:(_:T)=>TIcon
  /**
   * @param icon - see https://coreui.io/react/docs/components/icon
   */
  icon:React.ComponentProps<typeof CIcon>['icon']
  onClick?:()=>void
} & Pick<
  CIconProps,
  | "size"
  | "className"
  | "title"
  // add more props as needed
>
const Icon = (props:Props) => (
  <WrappedClickable onClick={props.onClick}>
    <CIcon
      { ...props}
      icon={props.icon}
      onClick={undefined} // override this because i really like the spread above...
      // icon={props.icon(icons)}
    />
  </WrappedClickable>
)

export default Icon