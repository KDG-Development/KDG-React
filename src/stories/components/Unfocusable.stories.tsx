import React, { useState } from 'react'
import { Ipsum } from '../utils'
import { ActionButton } from '../../components'
import { UnFocusable } from '../../components/Unfocusable'
import { Meta } from '@storybook/react'

export default {
  component: UnFocusable,
  title: 'Components/Unfocusable',
  args: {}
} satisfies Meta<typeof UnFocusable>;

export const Component = () => {
  const [focusCount, setFocusCount] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  const handleFocusOut = () => {
    setFocusCount(prev => prev + 1)
    setMessage('Focused out! Click anywhere outside the box.')
    
    // Clear message after 2 seconds
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  return (
    <div className="p-4">
      <h4>Focus and then click outside the box</h4>
      <p>Focus out count: {focusCount}</p>
      
      {message && (
        <div className="alert alert-info my-3">{message}</div>
      )}
      
      <div className="my-4">
        <UnFocusable onFocusOut={handleFocusOut}>
          <div className="border border-primary p-4" tabIndex={0}>
            <h5>This is a focusable container</h5>
            <p>{Ipsum.paragraph()}</p>
            <ActionButton onClick={() => console.log('Button clicked')}>
              Click me
            </ActionButton>
          </div>
        </UnFocusable>
      </div>
    </div>
  )
} 