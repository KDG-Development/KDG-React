import type { Meta } from '@storybook/react';
import Accordion from '../../components/Accordion/Accordion';
import { Ipsum } from '../utils';


export default {
  component: Accordion,
  title:'Components/Accordion',
  args:{
    items:[
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
    parseContent:x => x.content,
    parseKey:x => x.key,
    parseLabel:x => x.label,
  }
} satisfies Meta<typeof Accordion<{key:number,label:string,content:string}>>;

// if we want to display additional stories below docs
export const Component = {}