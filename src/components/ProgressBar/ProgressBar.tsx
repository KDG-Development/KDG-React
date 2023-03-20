import React from 'react'
import { CProgress } from "@coreui/react-pro"
import { Enums } from '../../utils'

type Props = {
  value:number
  label?:string
  className?:string
  height?:number
  color?:Enums.Color
  striped?:{
    striped?:boolean
    animated?:boolean
  }
}
const ProgressBar = (props:Props) =>
  <CProgress
    height={props.height}
    color={props.color}
    className={props.className}
    value={props.value}
    variant={props.striped?.striped ? 'striped' : undefined}
    animated={props.striped?.animated}
  >{props.label}</CProgress>

export default ProgressBar