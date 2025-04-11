import React from 'react'
import { CCard, CCardBody, CCardImage, CCardTitle,CCardHeader } from "@coreui/react-pro"
import { Conditional,EntityConditional } from "../Conditional/Conditional"

type CardProps = {
  image?:string
  title?:string
  className?:string
  header?: {
    className?:string
    content:React.ReactNode
  }
  body: {
    className?:string
    content:React.ReactNode
  }
}
export const Card = (props:CardProps) => {
  return (
    <CCard className={ props.className }>
      <EntityConditional
        entity={props.header || null }
        render={(header) => (
          <CCardHeader className={ header.className }>{ header.content }</CCardHeader>
        )}
      />
      <Conditional
        condition={!!props.image}
        onTrue={() => (
          <CCardImage orientation="top" src={props.image!} />
        )}
      />
      <CCardBody className={ props.body.className }>
        <Conditional
          condition={!!props.title}
          onTrue={() => (
            <CCardTitle>{props.title}</CCardTitle>
          )}
        />
        <div className="card-text">
          {props.body.content}
        </div>
      </CCardBody>
    </CCard>
  )
}