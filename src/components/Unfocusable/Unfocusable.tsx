import React,{ useRef, useEffect, ReactNode, useState } from 'react'
import { composedBooleanValidatedString } from '../../utils/Common'
import { EntityConditional } from '../Conditional'

type UnFocusableProps = {
  children: ReactNode
  onFocusOut: () => void
  disabled?: boolean | {
    overlayClassName?: string
    overlayContent: ReactNode
  }
}

export const UnFocusable = (props: UnFocusableProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = useState(false)

  const renderOverlay = (content?: ReactNode, overlayClassName?: string) => (
    <div
      style={{
        zIndex: 101,
        cursor: 'not-allowed'
      }}
      className={
        composedBooleanValidatedString([
          ['kdg-unfocusable-overlay top-0 bg-light d-flex h-100 justify-content-center align-items-center opacity-50 position-absolute w-100', true],
          [overlayClassName || '', !!overlayClassName]
        ])
      }
    >
      {content}
    </div>
  )

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (
        !props.disabled &&
        containerRef.current && 
        containerRef.current.contains(event.target as Node)
      ) {
        setHasFocus(true)
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      // Only trigger if we currently have focus and are moving to something outside
      if (
        !props.disabled &&
        hasFocus && 
        containerRef.current && 
        !containerRef.current.contains(event.relatedTarget as Node)
      ) {
        setHasFocus(false)
        props.onFocusOut()
      }
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [hasFocus, props.onFocusOut, props.disabled])

  return (
    <div ref={containerRef} className='position-relative'>
      <EntityConditional
        entity={props.disabled}
        render={x => renderOverlay(
          typeof x === 'object' ? x.overlayContent : undefined,
          typeof x === 'object' ? x.overlayClassName : undefined
        )}
      />
      {props.children}
    </div>
  )
}