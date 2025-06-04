import React from 'react'
import './select.scss'
import { Loader } from '../../Loader/Loader'
import { DelayedTextInput } from '../Delayed'
import {Badge} from '../../Badge/Badge'
import { Enums } from '../../../utils/Enums'
import { composedBooleanValidatedString } from '../../../utils/Common'
import { Clickable } from '../../Clickable/Clickable'
import { Conditional, EntityConditional } from '../../Conditional/Conditional'
import { CFormLabel } from '@coreui/react-pro'
import { DiscriminatedUnion, Union } from '../../../types/DiscriminatedUnion'
import { DiscriminatedUnionHandler, handleDiscriminatedUnion } from '../../DiscriminatedUnionhandler'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons-pro'
import { RequiredAsterisk } from '../_common'
import { Checkbox } from '../Checkbox/Checkbox'
import { Direction } from '../../../types'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'


enum ESelectConfig {
  Single='Single',
  Multi='Multi',
}

type SingleSelectConfig<T> = {
  value:T|null
  onChange:(_:T|null) =>void
}
type MultiSelectConfig<T> = {
  value:T[]
  onChange:(_:T[]) =>void
}

type SelectConfig<T> = DiscriminatedUnion<[
  Union<ESelectConfig.Single,SingleSelectConfig<T>>,
  Union<ESelectConfig.Multi,MultiSelectConfig<T>>,
]>

type BaseAsyncSelectProps<T> = {
  options:T[]
  onFocus?:()=>void
  onSearch:(_:string|null)=>void
  parseKey:(_:T)=>React.Key
  renderSelectedOption?:(_:T) => React.ReactNode
  parseOptionLabel:(_:T) => string
  hasMore:boolean
  loadMore:()=>void
  loading:boolean
  label?:string
  required?:boolean
  disabled?:boolean
  placeholder?:string
  error?:string
  minSearchLength?:number
  delayMS?:number
  direction?:Direction
  onAddNew?:(_:string) => void
  optionRenderer?:(x:T,i:number) => React.ReactNode
}

const BaseSelect = <T extends {}>(
  props:BaseAsyncSelectProps<T> & {
    config:SelectConfig<T>
  }
) => {

  const container = useRef<HTMLDivElement>(null)
  const inputWrapper = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const singleSelectedRef = useRef<HTMLSpanElement>(null)
  const loadRef = useRef<HTMLDivElement>(null)
  const [showInput,setShowInput] = useState(false)
  const prevValue = useRef(props.config.value.value)

  const ADD_NEW_OPTION_KEY = (value:string) => 'add-new' + value

  // load more observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !props.loading) {
          props.loadMore();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) {
        observer.unobserve(loadRef.current);
      }
    };
  }, [loadRef, props, showInput]);


  useEffect(() => {

    const handleFocusIn = (event: FocusEvent) => {
      // Check if the focused element is either inside the inputRef or the containerRef
      if (inputRef.current?.contains(event.target as Node)
          || container.current?.contains(event.target as Node)) {
        setShowInput(true);
      }
    };
    

    const handleFocusOut = () => {
      // this settimout is because the previously focused element is still focused when the focusout event fires
      setTimeout(() => {
        if (container.current && !container.current.contains(document.activeElement)) {
          setShowInput(false)
        }
      }, 0)
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [inputRef, container])

  const handleSelect = (x:T) => {
    handleDiscriminatedUnion({
      value: props.config,
      config: {
        [ESelectConfig.Single]: config => {
          config.value.onChange(x)
          if (container.current) {
            container.current.focus()
          }
          setShowInput(false)
        },
        [ESelectConfig.Multi]: config => {
          config.value.onChange(
            config.value.value.find(v => props.parseKey(v) === props.parseKey(x))
              ? config.value.value.filter(v => props.parseKey(v) !== props.parseKey(x))
              : config.value.value.concat(x)
          )
        },
      }
    })
  }

  const [tentativeOptionIndex,setTentativeOptionIndex] = useState(-1)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      const up = 'ArrowUp'
      const down = 'ArrowDown'
      const enter = 'Enter'
      const tab = 'Tab'

      const lookupOption = props.options[
        tentativeOptionIndex + (
          props.onAddNew && !!inputRef.current?.value
            ? -1
            : 0
        )
      ]

      if (optionsRef.current && optionsRef.current.offsetParent !== null) {
        if ([up, down].includes(event.code)) {
          event.preventDefault()
          setTentativeOptionIndex(prev => {
            const newIndex = (prev + (event.code === up ? -1 : 1))
            return Math.max(-1, Math.min(newIndex, props.options.length))
          })
        } else if ([enter,tab].includes(event.code) && tentativeOptionIndex >= -1) {
          if (tentativeOptionIndex === -1 && props.onAddNew && inputRef.current?.value) {
            props.onAddNew(inputRef.current.value)
            return
          } else {
            lookupOption && handleSelect(lookupOption)
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [optionsRef, props.options.length, tentativeOptionIndex, handleSelect])

  useEffect(() => {
    if (optionsRef.current && tentativeOptionIndex >= 0) {
      const optionElements = optionsRef.current.children
      if (optionElements[tentativeOptionIndex]) {
        optionElements[tentativeOptionIndex].scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        })
      }
    }
  }, [tentativeOptionIndex])


  // cleanup when showinput is set to false
  useEffect(() => {
    if (!showInput) {
      setTentativeOptionIndex(-1)
    }
  },[showInput])

  // reset the tentative option index when the options change
  useEffect(() => {
    setTentativeOptionIndex(-1)
  }, [props.options])

  // focus the input ref when the prop value changes from a value to null
  useEffect(() => {
    handleDiscriminatedUnion({
      value: props.config,
      config: {
        [ESelectConfig.Single]: config => {
          if (config.value.value === null && prevValue.current != null && inputRef.current) {
            inputRef.current.focus()
            setShowInput(true)
          }
        },
        [ESelectConfig.Multi]: () => {} // No action needed for multi-select
      }
    })
  }, [inputRef, props.config, setShowInput])

  // if the singleSelectedRef is focused and the user presses any alphanumeric key, enter, backspace, or delete, perform a console log
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (singleSelectedRef.current === document.activeElement) {
        if (
          event.key === 'Backspace' ||
          event.key === 'Delete'
        ) {
          event.preventDefault()
          handleDiscriminatedUnion({
            value:props.config,
            config:{
              Multi:() => {}, // shouldnt ever get here
              Single:x => x.value.onChange(null),
            }
          })
        }
      }
    }

    singleSelectedRef.current?.addEventListener('keydown', handleKeyDown)

    return () => {
      singleSelectedRef.current?.removeEventListener('keydown', handleKeyDown)
    }
  }, [props.config,singleSelectedRef])

  const handleRemove = (x:T) => {
    handleDiscriminatedUnion({
      value:props.config,
      config:{
        [ESelectConfig.Single]:config => {
          config.value.onChange(null)
        },
        [ESelectConfig.Multi]:config => {
          config.value.onChange(
            config.value.value.filter(v =>
              props.parseKey(v) !== props.parseKey(x)
            )
          )
        },
      }
    })
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const renderSelectedOption = (x:T) =>
    <EntityConditional
      key={props.parseKey(x)}
      entity={ props.renderSelectedOption }
      render={ (v) => (
        <span
          className='m-1 selected-overflow-wrapper'
          tabIndex={0}
          ref={singleSelectedRef}
        >
          {v(x)}
        </span>
      ) }
      fallback={
        () => (
          <Clickable onClick={() => !props.disabled && handleRemove(x)}>
            <Badge
              className='m-1 d-flex align-items-center'
              color={Enums.Color.Primary}
            >
              {props.parseOptionLabel(x)}
              <Conditional
                condition={!props.disabled}
                onTrue={() => (
                  <span className='remove-option'>
                    <CIcon icon={cilX}/>
                  </span>
                )}
              />
            </Badge>
          </Clickable>
        )
      }
    />

  const renderedActionLabel = (
    parsedKey:React.Key,
    parsedOptionLabel:string,
    index:number
  ) => (
    <div className={
      handleDiscriminatedUnion({
        value:props.config,
        config:{
          [ESelectConfig.Single]:v => (
            composedBooleanValidatedString([
              ['result d-flex',true],
              ['bg-light', index == tentativeOptionIndex],
              [
                'text-primary',
                v.value.value
                  ? props.parseKey(v.value.value) === parsedKey
                  : false
              ],
            ])
          ),
          [ESelectConfig.Multi]:() =>
            composedBooleanValidatedString([
              ['result d-flex',true],
              ['bg-light', index == tentativeOptionIndex]
            ]),
        }
      })
    }>
      <DiscriminatedUnionHandler
        value={props.config}
        config={{
          [ESelectConfig.Single]:() => null,
          [ESelectConfig.Multi]:() => (
            <Checkbox
              onChange={() => {}}
              value={
                handleDiscriminatedUnion({
                  value:props.config,
                  config:{
                    [ESelectConfig.Single]:c =>
                      c.value.value
                        ? props.parseKey(c.value.value) == parsedKey
                        : false,
                    [ESelectConfig.Multi]:c =>
                      !!c.value.value.find(v => props.parseKey(v) === parsedKey),
                  }
                })
              }
              tabIndex={-1}
            />
          )
        }}
      />
      {parsedOptionLabel}
    </div>
  )

  return (
    <div className={`kdg-select-${props.config.case.toLowerCase()}`}>
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
      <div
        className="custom-input-w-loader"
        ref={container}
        tabIndex={-1}
      >
        <div
          className={composedBooleanValidatedString([
            ['input-wrapper form-control d-flex justify-content-end',true],
            ['bg-light',!!props.disabled],
            ['is-invalid',!!props.error]
          ])}
          ref={inputWrapper}
        >
          <DiscriminatedUnionHandler
            value={props.config}
            config={{
              [ESelectConfig.Single]:config => (
                <EntityConditional
                  entity={config.value.value}
                  render={x => (
                    <div className='d-flex align-items-center justify-content-between w-100'>
                      {renderSelectedOption(x)}
                      <Conditional
                        condition={!props.disabled}
                        onTrue={() => (
                          <Clickable onClick={() => handleRemove(x)}>
                            <span className='remove-option'>
                              <CIcon icon={cilX}/>
                            </span>
                          </Clickable>
                        )}
                      />
                    </div>
                  )}
                  fallback={() => (
                    <div className="typeable-area">
                      <DelayedTextInput
                        delay={props.delayMS || 300}
                        minSearchLength={props.minSearchLength}
                        onDelay={props.onSearch}
                        placeholder={props.placeholder || 'Begin typing...'}
                        inputRef={inputRef}
                        resetOnblur
                      />
                    </div>
                  )}
                />
              ),
              [ESelectConfig.Multi]:config => (
                <>
                  {config.value.value.map(renderSelectedOption)}
                  <div className="typeable-area">
                    <DelayedTextInput
                      delay={props.delayMS || 300}
                      minSearchLength={props.minSearchLength}
                      onDelay={props.onSearch}
                      placeholder={props.placeholder || 'Begin typing...'}
                      inputRef={inputRef}
                      resetOnblur
                    />
                  </div>
                </>
              ),
            }}
            />
        </div>
        <Conditional
          condition={showInput}
          onTrue={() => (
            <div
              className={`results-wrapper form-control ${!!props.direction ? props.direction : ''}`}
              tabIndex={-1}
              ref={optionsRef}
            >
              <EntityConditional
                entity={props.onAddNew}
                render={onAddNew => (
                  <EntityConditional
                    entity={inputRef.current?.value}
                    render={value => (
                      <Clickable
                        onClick={() => onAddNew(value)}
                        className='text-muted'
                      >
                        {renderedActionLabel(
                          ADD_NEW_OPTION_KEY(value),
                          `+ ${value}`,
                          0
                        )}
                      </Clickable>  
                    )}
                  />
                )}
              />
              {props.options
                .map((x,i) => (
                  <Clickable
                    key={props.parseKey(x)}
                    onClick={() => handleSelect(x)}
                  >
                    <EntityConditional 
                      entity={props.optionRenderer}
                      render={renderer => renderer(x,i)}
                      fallback={() => 
                        renderedActionLabel(
                          props.parseKey(x),
                          props.parseOptionLabel(x),
                          props.onAddNew && !!inputRef.current?.value ? i+1 : i
                        )
                      }

                    />
                  </Clickable>
                ))
              }
              <div className='result-loader'>
                <Conditional
                  condition={!!props.options.length}
                  onTrue={() => (
                    <Conditional
                      condition={props.hasMore}
                      onTrue={() => (
                        <div ref={loadRef}>
                          <Loader/> Loading more results...
                        </div>
                      )}
                      onFalse={() => 'Showing all results'}
                    />
                  )}
                  onFalse={() => 'No results found'}
                />
              </div>
            </div>
          )}
        />
        <EntityConditional
          entity={props.error}
          render={error => (
            <div className='invalid-feedback'>{error}</div>
          )}
        />
      </div>
    </div>
  )
}

type AsyncSelectProps<T> = Omit<
  BaseAsyncSelectProps<T> & SingleSelectConfig<T>,
  | "renderSelectedOption"
>
export const AsyncSingleSelect = <T extends {}>(props:AsyncSelectProps<T>) =>
  <BaseSelect
    {...props}
    renderSelectedOption={props.parseOptionLabel}
    config={{
      case:ESelectConfig.Single,
      value:{
        value:props.value || null,
        onChange:props.onChange,
      },
    }}
  />

  type AsyncMultiSelectProps<T> = Omit<
  BaseAsyncSelectProps<T> & MultiSelectConfig<T>,
  | "renderSelectedOption"
>
  export const AsyncMultiSelect = <T extends {}>(props:AsyncMultiSelectProps<T>) =>
    <BaseSelect
      {...props}
      config={{
        case:ESelectConfig.Multi,
        value:{
          value:props.value,
          onChange:props.onChange,
        },
      }}
    />

  // non async select
  type NonAsyncSelectProps<T> =
    Omit<
      BaseAsyncSelectProps<T>,
      | "onSearch"
      | "hasMore"
      | "loadMore"
      | "loading"
      | "minSearchLength"
      | "delayMS"
      | "renderSelectedOption"
    >

  type SelectProps<T> = NonAsyncSelectProps<T> & SingleSelectConfig<T>
  export const Select = <T extends {}>(props:SelectProps<T>) => {
    const [search,setSearch] = useState<string|null>(null)

    return (
      <AsyncSingleSelect
        {...props}
        hasMore={false}
        loadMore={()=>{}} // no-op
        loading={false}
        onSearch={setSearch}
        delayMS={0}
        minSearchLength={0}
        options={
          props.options.filter(x =>
            props
              .parseOptionLabel(x)
              .toLowerCase()
              .includes((search||'').toLowerCase())
          )
        }
      />
    )
  }

  type MultiSelectProps<T> = NonAsyncSelectProps<T> & MultiSelectConfig<T>
  export const MultiSelect = <T extends {}>(props:MultiSelectProps<T>) => {
    const [search,setSearch] = useState<string|null>(null)

    return (
      <AsyncMultiSelect
        {...props}
        hasMore={false}
        loadMore={()=>{}} // no-op
        loading={false}
        onSearch={setSearch}
        delayMS={0}
        minSearchLength={0}
        options={
          props.options.filter(x =>
            props
              .parseOptionLabel(x)
              .toLowerCase()
              .includes((search||'').toLowerCase())
          )
        }
      />
    )
  }