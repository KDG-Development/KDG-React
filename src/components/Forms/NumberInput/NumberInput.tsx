import React, { useCallback, useEffect, useState } from 'react';
import TextInput, { TextInputProps } from '../TextInput/TextInput'
import { composedBooleanValidatedString } from '../../../utils/Common';

export type DecimalConfig = {
  allowDecimals: true;
  maxDecimals?: number;
} | {
  allowDecimals?: false;
  maxDecimals?:never
};

 
export type NumberInputProps = Omit<TextInputProps,"value"|"onChange"> & {
  value: number|null;
  onChange: (value: number|null) => void;
  min?:number
  max?:number
} & DecimalConfig

const NumberInput: React.FC<NumberInputProps> = (props) => {

  const regex = new RegExp(
    props.allowDecimals
    ? `^\\d+(\\.\\d{0,${props.maxDecimals || 2}})?$`
    : '\\d*'
  );

  const parseValue = (input:string):string|null => {
    return input === ''
    ? input
    : input.match(regex)?.[0] || null
  }

  const parsedNumberValue = useCallback((x:number) => {
    if (props.min !== undefined){
      if (x < props.min) return props.min
    }
    if (props.max !== undefined){
      if (x > props.max) return props.max
    }
    return x
  },[props.min,props.max])

  const toMaybeDecimal = (x:number) => x.toFixed(props.allowDecimals ? props.maxDecimals || 2 : 0)

  const [value,setValue] = useState(
    parseValue(
      props.value
        ? toMaybeDecimal(parsedNumberValue(props.value))
        : ''
    )
  )

  useEffect(() => {
    props.onChange(parsedNumberValue(Number(value) || 0))
  },[value,parsedNumberValue])

  const handleOnChange = (x:string|null) => {
    const numVal = Number(x) || 0
    if (props.min !== undefined){
      if (numVal < props.min) return props.min.toString()
    }
    if (props.max !== undefined){
      if (numVal > props.max) return props.max.toString()
    }
    return x
  }

  return (
    <TextInput
      { ...props }
      value={value}
      onChange={x => setValue(prev => parseValue(x) === null ? prev : handleOnChange(parseValue(x)))}
      helperText={
        props.helperText
        || composedBooleanValidatedString([
          [`Min ${props.min}`,props.min !== undefined],
          [`Max ${props.max}`,props.max !== undefined],
        ], ', ')
      }
    />
  );
};

export default NumberInput;