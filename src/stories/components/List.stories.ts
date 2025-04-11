import type { Meta } from '@storybook/react';
import { Ipsum } from '../utils';
import {List} from '../../components';


export default {
  component: List,
  title:'Components/List',
  args:{
    options:[
      {
        key:1,
        label:Ipsum.sentence(),
        content: Ipsum.paragraph(),
      },
      {
        key:2,
        label:Ipsum.sentence(),
        content: Ipsum.paragraph(),
      },
      {
        key:3,
        label:Ipsum.sentence(),
        content: Ipsum.paragraph(),
      },
    ],
    parseKey:x => x.key,
    projection:x => x.content,
  }
} satisfies Meta<typeof List<{key:number,label:string,content:string}>>;

// if we want to display additional stories below docs
export const Component = {}