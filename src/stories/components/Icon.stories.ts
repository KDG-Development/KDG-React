import type { Meta } from '@storybook/react';
import Icon from '../../components/Icon/Icon';
import { cibAirbnb } from '@coreui/icons';


export default {
  component: Icon,
  title:'Components/Icon',
  args:{
    icon:cibAirbnb,
    onClick:() => console.log('asdf'),
    title:'Some title'
  }
} satisfies Meta<typeof Icon>;

// if we want to display additional stories below docs
export const Component = {}