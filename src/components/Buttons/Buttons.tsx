import React from 'react'
import { Enums } from '../../utils'
import { CButton, CLoadingButton } from '@coreui/react-pro'
import { handleOnClick } from '../../utils/Common/common'
import Clickable from '../Clickable/Clickable'

type ActionButtonProps = {
  onClick:()=>void
  color?:Enums.Color | 'link'
  variant?:"outline" | "ghost"
  disabled?:boolean
  className?:string
}
export const ActionButton = (props:React.PropsWithChildren<ActionButtonProps>) => {
  return (
    <CButton
      disabled={props.disabled}
      className={props.className}
      onClick={(e)=>!props.disabled && handleOnClick(e,()=>props.onClick())}
      color={props.color}
      variant={props.variant}
    >
      { props.children }
    </CButton>
  )
}

type AsyncButtonProps = Omit<ActionButtonProps,"onClick"> & {
  onClick:()=>void
  loading:boolean
}
export const AsyncButton = (props:React.PropsWithChildren<AsyncButtonProps>) => {

  return (
    <Clickable onClick={() => (!props.disabled && !props.loading) && props.onClick()}>
      <CLoadingButton
        disabled={props.disabled||props.loading}
        className={props.className}
        color={props.color}
        variant={props.variant}
        loading={props.loading}
      >
        {props.children}
      </CLoadingButton>
    </Clickable>
  )
}