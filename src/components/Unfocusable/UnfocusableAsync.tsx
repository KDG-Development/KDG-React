import React, { ReactNode } from 'react'
import { UnFocusable } from './Unfocusable'
import { composedBooleanValidatedString } from '../../utils/Common'
// import { Icon } from '..'
// import { EntityConditional } from '..'
import { Loader } from '..'
// import { cilCheckCircle } from '@coreui/icons'

type UnFocusableAsyncProps = {
  children: ReactNode
  onFocusOut: () => Promise<void>
  loading: boolean
  wrapperClassName?: string
  overlayClassName?: string
  disabled?: boolean
}

export const UnFocusableAsync = (props: UnFocusableAsyncProps) => {
  
  const handleFocusOut = async () => {
    try {
      await props.onFocusOut()
    } catch (error) {
      console.error('Error in onFocusOut callback:', error)
    }
  }


  return (
    <div className={composedBooleanValidatedString([
      [props.wrapperClassName || '', !!props.wrapperClassName],
    ])}>
      <UnFocusable
        onFocusOut={handleFocusOut}
        disabled={
          props.loading ? {
            overlayContent: <Loader />,
            overlayClassName: 'bg-white'
          } : props.disabled
        }
      >
        {props.children}
      </UnFocusable>
    </div>
  )
}
