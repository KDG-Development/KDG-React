import React from "react";

export const handleOnClick = (e:React.MouseEvent<any,MouseEvent>,onClick?:()=>void,bubble?:boolean) => {
  if (!bubble) {
    e.stopPropagation()
  }
  onClick && onClick()
}

export const composedBooleanValidatedString = (
  records:[string,boolean][],
  separator?:string
) => 
  Array.from(new Set(records.reduce((agg,[key,val]) => {
      if (val) agg.push(key)
      return agg
    }, ([] as string[]))))
    .join(separator === undefined ? ' ' : separator)