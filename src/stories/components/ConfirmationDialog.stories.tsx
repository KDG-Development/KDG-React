import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { ConfirmationDialog } from '../../components';
import { Ipsum } from '../utils';

export default {
  component: ConfirmationDialog,
  title: 'Components/Utilities/Confirmation Dialogue',
  args: {
    trigger: <button>Click me</button>,
    header: 'Confirm Action',
    message: Ipsum.paragraph(),
    onConfirm: () => console.log('Confirmed'),
    disabled: true,
  }
} satisfies Meta<typeof ConfirmationDialog>;

export const Component = () => {
  const [action, setAction] = useState<string>('');

  return (
    <div className="p-4">
      <h4>Confirmation Dialog: Action Tracking</h4>      
      <div className="mb-3">
        <p>Last action: {action || 'None'}</p>
      </div>

      <ConfirmationDialog
        trigger={
          <button className='btn btn-primary'>Click me</button>
        }
        header='Confirm Action'
        message={Ipsum.paragraph()}
        onConfirm={() => setAction('Confirmed')}
        onCancel={() => setAction('Cancelled')}
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
      />
    </div>
  );
};