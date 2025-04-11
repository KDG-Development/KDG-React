import React from 'react'
import { CCarousel, CCarouselItem } from "@coreui/react-pro"
import { Image } from "../Image/Image"

type ImageCarouselProps = {
  images:string[]
  interval?:number|boolean
  controls?:boolean
  hoverPause?:boolean
  dark?:boolean
  className?:string
  imageClassName?:string
  imageWrapperClassName?:string
}
export const ImageCarousel = (props:ImageCarouselProps) => {
  return (
    <CCarousel
      controls={props.controls}
      interval={props.interval}
      pause={props.hoverPause}
      dark={props.dark}
      className={props.className}
    >
      {props.images.map((x,i) =>
        <CCarouselItem
          className={props.imageWrapperClassName}
          key={i}
        >
        <Image
          key={x+i}
          src={x}
          width={'100%'}
          className={props.imageClassName}
        />
      </CCarouselItem>
      )}
    </CCarousel>
  )
}
