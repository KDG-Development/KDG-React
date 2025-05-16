import React,{ useRef, useEffect, ReactNode, useState } from 'react'

type UnFocusableProps = {
  children: ReactNode
  onFocusOut: () => void
}

export const UnFocusable = (props: UnFocusableProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (containerRef.current && containerRef.current.contains(event.target as Node)) {
        setHasFocus(true)
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      // Only trigger if we currently have focus and are moving to something outside
      if (
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
  }, [hasFocus, props.onFocusOut])

  return (
    <div ref={containerRef}>
      {props.children}
    </div>
  )
}