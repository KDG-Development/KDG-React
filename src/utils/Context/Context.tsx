import React from 'react'

export const contextBuilder = <T extends {}>(context:T) => React.createContext<T>(context)

/** @deprecated - this function is redundant over manually creating context */
export const contextDispatchBuilder = <T extends {}>() =>
  React.createContext<React.Dispatch<T>>(() => {})

type ContextProviderType<T> = {
  context:React.Context<T>
  contextDispatcher:React.Context<React.Dispatch<T>>
  defaultContext:T
}

export const ContextProvider = <T extends {}>(props:React.PropsWithChildren<ContextProviderType<T>>) => {

  const defaultContextReducer = (prevCTX:T, nextCTX:T): T => ({
    ...prevCTX,
    ...nextCTX
  })
  
  const [context, dispatcher] = React.useReducer(defaultContextReducer, props.defaultContext);

  return (
    <props.context.Provider value={context}>
      {/* TODO: context state and dispatcher should be passed to a single provider */}
      <props.contextDispatcher.Provider value={dispatcher}>
        {props.children}
      </props.contextDispatcher.Provider>
    </props.context.Provider>
  )
}