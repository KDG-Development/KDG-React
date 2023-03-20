import { CCol, CContainer, CRow } from '@coreui/react-pro'
import React from 'react'

type RowProps = {
  className?:string
  fluid?:boolean
}
const BASE_GUTTER = 3

export const Row = (props:React.PropsWithChildren<RowProps>) => {
  return (
    <CContainer
      fluid={props.fluid}
    >
      <CRow
        xs={{ gutter:BASE_GUTTER }}
        className={`my-1 ${props.className ? props.className : ''}`}

      >
        {props.children}
      </CRow>
    </CContainer>
  )
}

type ColProps = {
  xs?:'auto' | number
  sm?:'auto' | number
  md?:'auto' | number
  lg?:'auto' | number
  xl?:'auto' | number
  className?:string
}
export const Col = (props:React.PropsWithChildren<ColProps>) => {
  return (
    <CCol
      className={`${props.className ? props.className : ''}`}
      xs={props.xs}
      sm={props.sm}
      md={props.md}
      lg={props.lg}
      xl={props.xl}
      
    >{props.children}</CCol>
  )
}
