import React, { PropsWithChildren } from 'react'

import { CSidebar,CSidebarNav,CSidebarBrand,CNavItem,CSidebarToggler,CNavGroup } from '@coreui/react-pro'

import NavTitle from './NavTitle'

export namespace SidebarEnums {
  export enum SidebarSize {
    SM='sm',
    LG='lg',
    XL='xl',
  }
  export enum SidebarLinkKind {
    DROPDOWN='dropdown',
    SECTION='section',
  }
}

type SidebarItem = {
  label:React.ReactNode
  onClick:() => void
  icon:React.ReactNode
  key:string
}

type SidebarSection = {
  name?:never
  options?:never

  title?:{ subTitle?:React.ReactNode, title:React.ReactNode }
  items:SidebarItem[]
}

type SidebarDropDown =
{
  title?:never
  items?:never

  name:string
  icon:React.ReactNode
  options:SidebarItem[]
}

type EnumSidebarSection = SidebarSection & { kind:SidebarEnums.SidebarLinkKind.SECTION }
type EnumSidebarDropDown = SidebarDropDown & { kind:SidebarEnums.SidebarLinkKind.DROPDOWN }

type _SidebarLink = EnumSidebarSection | EnumSidebarDropDown

type SidebarLink = SidebarSection | SidebarDropDown

const map = (link: SidebarLink) : _SidebarLink => {
  return !!link.options ?
      {
        kind:SidebarEnums.SidebarLinkKind.DROPDOWN,
        name:link.name,
        options:link.options,
        icon:link.icon,
      }
    :
      {
        kind:SidebarEnums.SidebarLinkKind.SECTION,
        title:link.title,
        items:link.items,
      }
}

export const generateSection = (section:Omit<SidebarSection,"kind"> ) : SidebarSection => ({ ...section })

type SidebarProps = {
  active:(url:string) => string
  size?:SidebarEnums.SidebarSize
  sections:SidebarLink[]
  brand?:React.ReactNode
}

const Icon = (props:PropsWithChildren<{}>) => {
  return (
    <div className={ 'nav-icon h-auto w-auto' }>{ props.children }</div>
  )
}

const RenderItem = (props: { active:string,item:SidebarItem }) => (
  <CNavItem href="#" onClick={ props.item.onClick } active={ props.active == props.item.key }>
    <Icon>{ props.item.icon }</Icon> { props.item.label }
  </CNavItem>

)

const RenderSection = (props:{ active:string, section:SidebarSection }) => (
  <React.Fragment>
    {
      props.section.title ?
        <NavTitle subTitle={ props.section.title.subTitle } >{ props.section.title.title }</NavTitle>
      :
        null
    }
    {
      props.section.items.map((v,i) => (
        <RenderItem active={ props.active } key={ `sidebar-index[${i}]` } item={ v } />
      ))
    }
  </React.Fragment>
)

export const Sidebar = (props:SidebarProps) => {
  const [foldable,setFoldable] = React.useState(true)
  let active = props.active(window.location.pathname)
  return (
    <CSidebar
      size={ props.size }
      unfoldable={ foldable }
      position={ 'fixed' }
    >
      <CSidebarNav>
        {
          props.brand ?
            <CSidebarBrand>{ props.brand }</CSidebarBrand>
          :
            null
        }
        {
          props.sections.map((section, sectionIndex) => {
            const mapped = map(section)
            switch (mapped.kind) {
              case SidebarEnums.SidebarLinkKind.SECTION:
                return <RenderSection key={ `section[${sectionIndex}]` } section={ mapped } active={ active } />
              case SidebarEnums.SidebarLinkKind.DROPDOWN:
                return (
                  <CNavGroup key={ `section[${sectionIndex}]` } toggler={ <React.Fragment><Icon>{ mapped.icon }</Icon> { mapped.name } </React.Fragment> }>
                    {
                      mapped.options.map((item,i) => (<RenderItem active={ active } key={ `dropdown${mapped.name}[${i}]` } item={ item } />))
                    }
                  </CNavGroup>
                )
            }
          })
        }
      </CSidebarNav>
      <CSidebarToggler
        onClick={ () => { setFoldable(!foldable) } }
      />
    </CSidebar>
  )
}