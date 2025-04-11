import React from 'react'
import { cilSpeedometer } from '@coreui/icons-pro'
import CIcon from '@coreui/icons-react'
import type { Meta } from '@storybook/react';
import logo from '.././assets/kdg-logo.png'
import {NavBar, Image} from '../../components';

const icon = <CIcon height={ 25 } customClassName="nav-icon" icon={cilSpeedometer} />

export default {
  component: NavBar,
  title:'Components/NavBar',
  args:{
    brand:{
      content:(
        <Image
          src={logo}
        />
      )
    },
    items:[
      {
        key:1,
        label: 'Item 1',
        onClick:() => {},
        className:'mx-3',
      },
      {
        key:1,
        label: 'Item 2',
        onClick:() => {},
        className:'mx-3',
      },
      {
        key:1,
        label: 'Item 3',
        onClick:() => { alert('Item 3')},
        className:'mx-3',
      },
      {
        key:1,
        label: icon,
        className:'mx-3',
        items:[{ key:1,label: 'Option 1',onClick:() => { alert('Option 1')},className:'mx-3' }]
      },
    ]
  }
} satisfies Meta<typeof NavBar>;

// if we want to display additional stories below docs
export const Component = {}