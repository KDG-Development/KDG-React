import React from 'react'
import { cilSpeedometer } from '@coreui/icons-pro'
import CIcon from '@coreui/icons-react'
import type { Meta } from '@storybook/react'
import { Sidebar,SidebarEnums } from '../../components'


const Nav = () => (<div>Nav 2</div>)

const icon = <CIcon icon={cilSpeedometer} />

export default {
  component: Sidebar,
  title:'Components/Sidebar',
  args: {
    size:SidebarEnums.SidebarSize.LG,
    active:(_) => 'link1',
    sections:[
      { items:[{ key:'link1', label:'Nav 1', onClick:() => alert('Clicked Nav 1'),icon:icon }] },
      { items:[{ key:'link2', label:<Nav />, onClick:() => alert('Clicked Nav 2'),icon:icon }] },
      { title:{ title:'test title' },items:[{ label:<div>Nav 3</div>, onClick:() => alert('Clicked Nav 3'),icon:icon,key:'link3' }] },
      { title:{ subTitle:'MGMT',title:'Management' },items:[{ label:<div>Nav 3</div>, onClick:() => alert('Clicked Nav 3'),icon:icon,key:'link3' }] },
      { icon:icon,name:'Dropdown 1',options:[{ label:"Option 1",onClick:() => alert('Click dropdown option1'),icon:icon,key:'link5' },{ label:"Option 2",onClick:() => alert('Click dropdown option2') ,icon:icon,key:'link6'}]},
      { icon:icon,name:'Dropdown 2',options:[{ label:"Option 10",onClick:() => alert('Click dropdown option10'),icon:icon,key:'link7' }]},
    ]
  }
} satisfies Meta<typeof Sidebar>

// if we want to display additional stories below docs
export const Component = {}