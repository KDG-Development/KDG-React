import React, { useState } from 'react'
import { CCollapse, CContainer, CDropdownItem, CNav, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem } from "@coreui/react-pro"
import { Conditional } from '../Conditional'
import { Dropdown, DropdownEnums } from '../Dropdown'
import { Enums } from '../../utils/Enums'
import { WrappedClickable } from '../Clickable/Clickable'

export namespace NavBarEnums {
  export enum Expand {
    SM="sm",
    MD="md",
    LG="lg",
  }
  export enum Placement {
    Top="fixed-top",
    Bottom="fixed-bottom",
    StickyTop="sticky-top",
  }
}
type BaseNavItem = {
  key:React.Key
  label:React.ReactNode
  className?:string
  hidden?:boolean
}
type NavItem = BaseNavItem & {
  onClick:()=>void
  items?:never
  className?:string
}
type NavDropDown = BaseNavItem & {
  onClick?:never
  items:NavItem[]
}
type NavLink = NavItem | NavDropDown
type NavBarProps = {
  items:NavLink[]
  expand?:NavBarEnums.Expand
  placement?:NavBarEnums.Placement
  color?:Enums.Color
  fluid?:boolean
  brand?:{
    content:React.ReactNode
    link?:string
  }
  navClassName?:string
}

const renderNavItems = (items:NavLink[]) => {

  return (
    items.map(item => (
      <Conditional
        key={item.key}
        condition={ !!item.items }
        onTrue={ () => (
          <Conditional
            condition={!item.hidden}
            onTrue={() => (
              <Dropdown
                label={item.label}
                items={item.items!}
                parseKey={x => x.key}
                variant={DropdownEnums.Variant.NavItem}
                renderItem={x => (
                  <Conditional
                    condition={!x.hidden}
                    onTrue={() => (
                      <WrappedClickable
                        onClick={x.onClick}
                        className={ x.className }
                      >
                        <CDropdownItem>
                          {x.label}
                        </CDropdownItem>
                      </WrappedClickable>
                    )}
                  />
                )}
              />
            )}
          />
        )}
        onFalse={() => (
          <Conditional
            condition={!item.hidden}
            onTrue={() => (
              <WrappedClickable
                onClick={item.onClick}
                className={ item.className }
              >
                <CNavItem>
                  {item.label}
                </CNavItem>
              </WrappedClickable>
            )}
          />
        )}
      />
    ))
  )
}

export const NavBar = (props:NavBarProps) => {

  const [visible, setvisible] = useState(false)

  return (
    <CNavbar
      expand={props.expand || NavBarEnums.Expand.LG}
      color={props.color}
      placement={props.placement}
    >
      <CContainer fluid={props.fluid}>
        <Conditional
          condition={ !!props.brand }
          onTrue={ () => (
            <CNavbarBrand href={props.brand!.link}>
              { props.brand!.content }
            </CNavbarBrand>
          )}
        />
        <CNavbarToggler onClick={() => setvisible(!visible)} />
        <CCollapse
          className={`navbar-collapse ${props.navClassName ? props.navClassName : ''}`}
          visible={visible}
        >
          <CNavbarNav>
            { renderNavItems(props.items) }
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  )
}

type NavProps = {
  items:NavLink[]
  navClassName?:string
}

export const Nav = (props:NavProps) => {
  return (
    <CNav className={props.navClassName}>
      { renderNavItems(props.items) }
    </CNav>
  )
}