import React from 'react'
type Props = {
  imageSrc:string
  opacity?:number
  wrapperClassName?:string
  innerClassName?:string
}

export const ImageSection = (props:React.PropsWithChildren<Props>) => {

  return (
    <div
      style={{
        backgroundImage:`url(${props.imageSrc})`,
        backgroundPosition:'center',
      }}
      className={props.wrapperClassName}
      >
      <div
        className={`px-2 py-5 ${props.innerClassName ? props.innerClassName : ''}`}
        style={{
          background: `rgba(0,0,0,0.${props.opacity || 70})`,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
