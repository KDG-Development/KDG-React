import React, { ReactNode, useState } from 'react'
import { UnFocusable } from './Unfocusable'
import { composedBooleanValidatedString } from '../../utils/Common'
import { Icon } from '..'
import { EntityConditional } from '..'
import { Loader } from '..'
import { cilCheckCircle } from '@coreui/icons'

type UnFocusableAsyncSuccessConfig = {
  duration?: number
  content?: ReactNode
}

type UnFocusableAsyncProps = {
  children: ReactNode
  onFocusOut: () => Promise<void>
  loading: boolean
  wrapperClassName?: string
  overlayClassName?: string
  successConfig?: UnFocusableAsyncSuccessConfig
}

export const UnFocusableAsync = (props: UnFocusableAsyncProps) => {
  const [showSuccess, setShowSuccess] = useState(false)
  
  const handleFocusOut = async () => {
    try {
      await props.onFocusOut()
      if (props.successConfig) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, props.successConfig.duration || 500)
      }
    } catch (error) {
      console.error('Error in onFocusOut callback:', error)
      setShowSuccess(false)
    }
  }

  const renderOverlay = (content: ReactNode) => (
    <div 
      className={
        composedBooleanValidatedString([
          ['top-0 bg-white d-flex h-100 justify-content-center align-items-center opacity-75 position-absolute w-100', true],
          [props.overlayClassName || '', !!props.overlayClassName]
        ])
      }
    >
      {content}
    </div>
  )

  return (
    <div className={composedBooleanValidatedString([
      [props.wrapperClassName || '', !!props.wrapperClassName],
    ])}>
      <UnFocusable onFocusOut={handleFocusOut}>
        {props.children}
      </UnFocusable>
      
      {props.loading && renderOverlay(<Loader />)}
      {props.successConfig && showSuccess && !props.loading && renderOverlay(
        <span className='text-success font-size-2xl'>
          <EntityConditional
            entity={props.successConfig.content}
            render={x => x}
            fallback={() =>
              <Icon size='5xl' icon={cilCheckCircle}/>
            }
          />
        </span>
      )}
    </div>
  )
}
