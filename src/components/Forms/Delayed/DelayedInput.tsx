import React, { useEffect, useState, useCallback, useRef} from 'react'
import { TextInput } from "../TextInput/TextInput"
import { NumberInput } from '../NumberInput/NumberInput'
import { DecimalConfig, NumberInputProps } from '../NumberInput/NumberInput'

type SharedProps = {
  delay:number
  disabled?:boolean
  inputRef?:React.RefObject<HTMLInputElement>
  placeholder?:string
  label?: string;
  className?: string;
  error?: string;
  autoFocus?:boolean
  onFocus?:()=>void
  onBlur?:()=>void
  resetOnblur?:true
  required?:boolean
}

type TextProps = SharedProps & {
  value?:string|null
  onDelay:(_:string|null) => void
  /**
   * @description minimum string length to trigger a search - defaults to 0
   */
  minSearchLength?:number
}

export const DelayedTextInput = (props:TextProps) => {

  const [value, setvalue] = useState<string|null>(props.value || null)
  const [debounceTimer, setdebounceTimer] = useState<NodeJS.Timeout|void>(undefined)

  const usePrevious = (value:string|null) => {
    const ref = useRef<string|null>();
    useEffect(() => {
      ref.current = value;
    });
    return (ref.current || null);
  };
  const prevValue = usePrevious(value)

  const clearDebounce = useCallback(() => {
    debounceTimer && clearInterval(debounceTimer)
  },[debounceTimer])

  const setDebounce = useCallback(() => {
    props.delay >= 0
      ? setdebounceTimer(setTimeout(() => props.onDelay(value),props.delay))
      // fire right away if delay is less than or equal to zero
      : props.onDelay(value)
  },[setdebounceTimer,props.delay,value])

  useEffect(() => {
    const minSearchLength =
      props.minSearchLength === undefined
        ? 0
        : props.minSearchLength >= 0 // handle negative
          ? props.minSearchLength
          : 0
    if (
      ((value||'').length >= (minSearchLength))
      && (prevValue || '') !== (value || '')
    ){
      clearDebounce()
      setDebounce()
      return () => {
        clearDebounce()
      }
    }
    return () => {
      clearDebounce()
    }
  }, [value,prevValue,setDebounce,clearDebounce,props.minSearchLength])
  
  const handleInput= (value:string) => {
    setvalue(value)
  }

  const handleBlur = () => {
    props.onBlur && props.onBlur()
    if (props.resetOnblur) setvalue(null)
  }

  return (
    <TextInput
      value={value}
      label={props.label}
      onChange={x => handleInput(x)}
      disabled={props.disabled}
      placeholder={props.placeholder}
      className={props.className}
      error={props.error}
      autofocus={props.autoFocus}
      inputRef={props.inputRef}
      required={props.required}
      onBlur={handleBlur}
      onFocus={props.onFocus}
    />
  )
}

type NumberProps =
  // TODO: find a way to prevent this pick and the decimal config export
  Pick<
    NumberInputProps,
    | "min"
    | "max"
    | "helperText"
    | "hideDefaultHelperText"
    | "icon"
  >
  & DecimalConfig
  & SharedProps
  & {
  value?:number|null
  onDelay:(_:number|null) => void
}

export const DelayedNumberInput = (props:NumberProps) => {

  const [value, setvalue] = useState<number|null>(props.value || null)
  const [debounceTimer, setdebounceTimer] = useState<NodeJS.Timeout|void>(undefined)

  const usePrevious = (value:number|null) => {
    const ref = useRef<number|null>();
    useEffect(() => {
      ref.current = value;
    });
    return (ref.current || null);
  };
  const prevValue = usePrevious(value)

  const clearDebounce = useCallback(() => {
    debounceTimer && clearInterval(debounceTimer)
  },[debounceTimer])

  const setDebounce = useCallback(() => {
    props.delay >= 0
      ? setdebounceTimer(setTimeout(() => props.onDelay(value),props.delay))
      // fire right away if delay is less than or equal to zero
      : props.onDelay(value)
  },[setdebounceTimer,props.delay,value])

  useEffect(() => {
    if ((prevValue || '') !== (value || '')){
      clearDebounce()
      setDebounce()
      return () => {
        clearDebounce()
      }
    }
    return () => {
      clearDebounce()
    }
  }, [value,prevValue,setDebounce,clearDebounce])
  
  const handleInput= (value:number|null) => {
    setvalue(value)
  }

  const handleBlur = () => {
    props.onBlur && props.onBlur()
    if (props.resetOnblur) setvalue(null)
  }

  return (
    <NumberInput
      {...{
        allowDecimals:props.allowDecimals,
        maxDecimals:props.maxDecimals
      } as DecimalConfig}
      value={value}
      label={props.label}
      onChange={x => handleInput(x)}
      disabled={props.disabled}
      placeholder={props.placeholder}
      className={props.className}
      error={props.error}
      autofocus={props.autoFocus}
      inputRef={props.inputRef}
      required={props.required}
      min={props.min}
      max={props.max}
      helperText={props.helperText}
      hideDefaultHelperText={props.hideDefaultHelperText}
      onBlur={handleBlur}
      onFocus={props.onFocus}
    />
  )
}