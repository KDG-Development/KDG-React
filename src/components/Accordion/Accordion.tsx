import React from 'react'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from "@coreui/react-pro"

type AccordionType<T> = {
  items:T[]
  parseKey:(_:T) => React.Key
  parseLabel:(_:T) => string
  parseContent:(_:T) => React.ReactNode
}
export const Accordion = <T extends {}>(props:AccordionType<T>) => {
  return (
    <CAccordion
      flush
    >
      {
        props.items.map(x => (
          <CAccordionItem
            key={props.parseKey(x)}
            itemKey={props.parseKey(x).toString()}
          >
            <CAccordionHeader>
              {props.parseLabel(x)}
            </CAccordionHeader>
            <CAccordionBody>
              {props.parseContent(x)}
            </CAccordionBody>
          </CAccordionItem>
        ))
      }
    </CAccordion>
  )
}