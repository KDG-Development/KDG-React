import type { Meta } from '@storybook/react';

import { NotificationProvider } from '../../components/Notification';
import React from 'react';
import { Enums, useNotification } from '../../utils';
import { ActionButton } from '../../components';
import { Ipsum } from '../utils';

export default {
  component: NotificationProvider,
  title:'Components/Notification',
  args:{
    notificationClassName:'my-2 shadow-lg',
    style:{}
    },
} satisfies Meta<typeof NotificationProvider>;

// if we want to display additional stories below docs
export const Component = () => {

  const Button = () => {
    const { notify } = useNotification();
    return (
      <ActionButton
        onClick={() => notify({
          key:Ipsum.uuid(),
          message: Ipsum.sentence(7),
          type:Enums.Color.Success,
          // autoDismiss:5000
        })}
      >
        Show Notification
      </ActionButton>
    )

  }
  return (
    <NotificationProvider>
      <Button />
    </NotificationProvider>
  )
}

