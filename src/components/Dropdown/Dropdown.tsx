import React from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react-pro"
import { Enums } from '../../utils'

export namespace DropdownEnums {
  export enum Variant {
    NavItem="nav-item",
    ButtonGroup="btn-group",
    DropDown="dropdown",
    InputGroup="input-group",
  }
}

type DropDownProps<T> = {
  label:React.ReactNode
  items:T[]
  parseKey:(_:T)=>React.Key
  onClick?:(_:T)=>void
  renderItem:(_:T)=>React.ReactNode
  variant?:DropdownEnums.Variant
  color?:Enums.Color
  className?:string
}

export const Dropdown = <T extends {}>(props:DropDownProps<T>) => {
  return (
    <CDropdown
      variant={props.variant}
      className={props.className}
    >
      <CDropdownToggle color={props.color}>
        {props.label}
      </CDropdownToggle>
      <CDropdownMenu>
        {props.items.map(item =>
          <CDropdownItem
            key={props.parseKey(item)}
            style={{
              cursor:props.onClick ? 'pointer' : 'auto',
            }}
            onClick={() => props.onClick ? props.onClick(item) : undefined}
          >
            {props.renderItem(item)}
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}
