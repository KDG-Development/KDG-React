import React from 'react'
import { CImage } from "@coreui/react-pro"
import { Conditional } from '../Conditional/Conditional'

type BaseImageProps = {
  src:string
  width?:number|string
  height?:number|string
  className?:string
  thumbnail?:boolean
}
const ImageBase = (props:BaseImageProps) => {
  return (
    <CImage
      src={props.src}
      className={props.className}
      thumbnail={props.thumbnail}
      width={props.width}
      height={props.height}
    />
  )
}

type ImageContentProps = BaseImageProps & {
  wrapperClassName?:string
  imageWrapperClassName?:string
  caption?:{
    render:()=>React.ReactNode
    inset?:boolean
  }
}
export const Image = (props:ImageContentProps) => {

  // TODO: normalize this pattern if we ever use it again!!
  const wrapperClasses = () =>
    Object.values([
      {
        condition:!!props.caption?.inset,
        classNames:[
          'position-relative',
        ].concat(props.imageWrapperClassName || '')
      }
    ] satisfies {condition:boolean,classNames:string[]}[])
    .reduce((agg,x) => !!x.condition ? agg.concat(x.classNames) : agg, ([] as string[]))
    .join(' ')
  // TODO: normalize this pattern if we ever use it again!!
  const overlayClasses = () =>
    Object.values([
      {
        condition:!!props.caption?.inset,
        classNames:[
          'bg-black',
          'd-block',
          'h-100',
          'opacity-50',
          'position-absolute',
          'top-0',
          'w-100',
        ]
      }
    ] satisfies {condition:boolean,classNames:string[]}[])
    .reduce((agg,x) => !!x.condition ? agg.concat(x.classNames) : agg, ([] as string[]))
    .join(' ')

  const captionClasses = () =>
    Object.values([
      {
        condition:!!props.caption?.inset,
        classNames:[
          'position-absolute',
          'bottom-0',
          'p-2',
          'text-white',
        ]
      }
    ] satisfies {condition:boolean,classNames:string[]}[])
    .reduce((agg,x) => !!x.condition ? agg.concat(x.classNames) : agg, ([] as string[]))
    .join(' ')

  const Image = (
    <ImageBase
      src={props.src}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  )

  const Caption = props.caption

  return (
    <div className={props.wrapperClassName}>
      <div
        className={wrapperClasses()}
      >
        {Image}
        <Conditional
          condition={ !!Caption }
          onTrue={ () => (
            <>
              <span className={overlayClasses()}></span>
              <div
                className={captionClasses()}
              >
                {Caption!.render()}
              </div>
            </>
          )}
        />
      </div>
    </div>
  )
}