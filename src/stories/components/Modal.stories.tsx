import React, { useState } from 'react'
import type { Meta } from '@storybook/react';
import { Ipsum } from '.././utils';
import { Modal } from '../../components';
import { Conditional } from '../../components';
import { ActionButton } from '../../components';

export default {
  component: Modal,
  title:'Components/Modal',
  args:{
    header:() => Ipsum.sentence(5),
    content:() => Ipsum.paragraph(),
    footer:() => Ipsum.sentence(4),
  }
} satisfies Meta<typeof Modal>;

// if we want to display additional stories below docs
export const Component = () => {
  const [show,setShow] = useState(false)
  return (
    <React.Fragment>
      <Conditional
        condition={show}
        onTrue={() =>
          <Modal
            onClose={() => setShow(false)}
            header={() => Ipsum.sentence(5)}
            content={() => Ipsum.paragraph()}
            footer={() => Ipsum.sentence(4)}
          />
        }
      />
      <ActionButton
        onClick={() => setShow(true)}
      >
        Show Modal
      </ActionButton>
    </React.Fragment>
  )
}