import React from 'react'
import CIcon from '@coreui/icons-react'
import { CIconProps } from '@coreui/icons-react/dist/CIcon'
import { WrappedClickable } from '../Clickable/Clickable'


type Props = {
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
export const Icon = (props:Props) => (
  <WrappedClickable onClick={props.onClick}>
    <CIcon
      { ...props}
      icon={props.icon}
      onClick={undefined}
    />
  </WrappedClickable>
)
