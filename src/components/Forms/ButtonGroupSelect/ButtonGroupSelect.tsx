import React from 'react'
import { CButtonGroup, CForm, CFormLabel } from "@coreui/react-pro"
import { Enums } from "../../../utils/Enums"
import { composedBooleanValidatedString } from "../../../utils/Common"
import { ActionButton } from "../../Buttons"
import { Conditional, EntityConditional } from '../../Conditional'
import { RequiredAsterisk } from '../_common'

type ButtonGroupValue<T> = {
  value:T
  label:(_:T)=>string
  buttonClassName?:string
  disabled?:boolean
}

type BaseButtonProps<T> = {
  label?:string
  options:ButtonGroupValue<T>[]
  parseKey:(_:T) => React.Key
  className?:string
  buttonClassNames?:{
    default?:string
    active?:string
  }
  buttonColors?:{
    default?:Enums.Color
    active?:Enums.Color
  }
  required?:boolean
  disabled?:boolean
}

type ButtonGroupMultiSelectProps<T> = BaseButtonProps<T> & {
  value:T[]
  onChange:(_:T[])=>void
}

export const ButtonGroupMultiSelect = <T extends {}>(props:ButtonGroupMultiSelectProps<T>) => {
  // TODO: not working properly ?
  const composedButtonClassNames = (value:T) => composedBooleanValidatedString([
    [
      `${props.buttonClassNames?.active || ''}`,
      !!props.value.find(f => props.parseKey(f) === props.parseKey(value))
    ],
    [
      `${props.buttonClassNames?.default || ''}`,
      !props.value.find(f => props.parseKey(f) === props.parseKey(value))
    ],
  ])

  const composedButtonColor = (value:T) =>
    props.value.find(f => props.parseKey(f) === props.parseKey(value))
    ? props.buttonColors?.active || Enums.Color.Primary
    : props.buttonColors?.default || Enums.Color.Light

  const handleClick = (v:T) => {
    props.onChange(
      !!props.value.length
        ? props.value.reduce((agg,vi):T[] => (
            props.parseKey(vi) === props.parseKey(v)
              ? agg.filter(f => props.parseKey(f) !== props.parseKey(v))
              : agg.concat(v)
          ), props.value)
        : [v]
    )
  }

  return (
    <CForm>
      <EntityConditional
        entity={props.label}
        render={label => (
          <CFormLabel>
            {label}
            <Conditional
              condition={!!props.required}
              onTrue={() => <RequiredAsterisk/>}
            />
          </CFormLabel>
        )}
      />
      <div>
        <CButtonGroup className={props.className}>
          {
            props.options.map(v =>
              <ActionButton
                key={props.parseKey(v.value)}
                className={`${composedButtonClassNames(v.value)} ${v.buttonClassName || ''}`}
                onClick={() => handleClick(v.value)}
                disabled={props.disabled || v.disabled}
                color={composedButtonColor(v.value)}
              >{v.label(v.value)}</ActionButton>
            )
          }
        </CButtonGroup>
      </div>
    </CForm>
  )
}


type ButtonGroupSingleSelectProps<T> = BaseButtonProps<T> & {
  onChange:(_:T|null)=>void
  value?:T|null
}

export const ButtonGroupSingleSelect = <T extends {}>(props:ButtonGroupSingleSelectProps<T>) => {

  const handleChange = (v:T[]) => {
    props.onChange(
      !!v.length
        ? props.value
          ? v.find(vi => props.parseKey(vi) !== props.parseKey(props.value!)) || null
          : v[0] // this might be unsafe
        : v[0] || null // this might be unsafe
    )
  }

  return (
    <ButtonGroupMultiSelect
      label={props.label}
      options={props.options}
      value={props.value ? [props.value] : []}
      onChange={ v => handleChange(v)}
      parseKey={props.parseKey}
      className={props.className}
      disabled={props.disabled}
      buttonClassNames={props.buttonClassNames}
      buttonColors={props.buttonColors}
    />
  )
}