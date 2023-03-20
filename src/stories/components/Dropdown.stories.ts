import type { Meta } from '@storybook/react';
import { Dropdown, DropdownEnums } from '../../components';
import { Ipsum, StoryDecorators } from '.././utils';

export default {
  component: Dropdown,
  title:'Components/Dropdown',
  decorators:[StoryDecorators.Padding.bottom()],
  args:{
    label: 'Label',
    items:[
      {
        id:1,
        value:Ipsum.sentence(2),
      },
      {
        id:2,
        value:Ipsum.sentence(2),
      },
      {
        id:3,
        value:Ipsum.sentence(2),
      },
    ],
    parseKey:x => x.id,
    renderItem: x => x.value,
    variant:DropdownEnums.Variant.InputGroup,
  }
} satisfies Meta<typeof Dropdown<{id:number,value:string}>>;

// if we want to display additional stories below docs
export const Component = {}