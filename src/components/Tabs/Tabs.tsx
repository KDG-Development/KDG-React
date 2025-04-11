import React, { useState } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react-pro'
import { Conditional } from '../Conditional'

type Tab = {
  id:React.Key
  label:React.ReactNode
  content:() => React.ReactNode
}

type Props = {
  tabs:Tab[]
  tabContainerClass?:string
  tabClassName?:(isActiveTab:boolean) => string
  innerClass?:string
}

export const Tabs = (props:Props) => {

  const [activeTab, setactiveTab] = useState(!!props.tabs.length ? props.tabs[0].id : null)

  return (
    <>
    <CNav
      variant="tabs"
      role="tablist"
      className={props.tabContainerClass ? props.tabContainerClass : ''}
    >
      {
        props.tabs.map(tab => (
          <CNavItem key={tab.id}>
            <CNavLink
              active={tab.id === activeTab}
              onClick={() => setactiveTab(tab.id)}
              className={props.tabClassName ? props.tabClassName(tab.id === activeTab) : ''}
              style={{
                cursor:'pointer',
              }}
            >
              { tab.label }
            </CNavLink>
          </CNavItem>
        ))
      }
    </CNav>
    {props.tabs.map(tab => (
      <Conditional
        key={tab.id}
        condition={ activeTab === tab.id}
        onTrue={ () => (
          <CTabContent
            className={props.innerClass ? props.innerClass : ''}
          >
            <CTabPane
              role="tabpanel"
              visible
            >
              {tab.content()}
            </CTabPane>
          </CTabContent>
        )}
      />
    ))}
  </>
  )
}