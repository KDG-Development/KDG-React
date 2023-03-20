import { CBadge } from '@coreui/react-pro'
import React from 'react'
import { Enums } from '../../utils'

type Props = {
  color?:Enums.Color
  className?:string
}
const Badge = (props:React.PropsWithChildren<Props>) => {
  return (
    <CBadge
      color={props.color || 'primary'}
      className={props.className}
    >
      {props.children}
    </CBadge>
  )
}

export default Badge