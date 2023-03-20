import React, { useEffect, useRef, useState } from 'react'
import './select.scss'
import Loader from '../../Loader'
import { DelayedTextInput } from '../Delayed'
import Badge from '../../Badge'
import { Enums } from '../../../utils/Enums'
import { composedBooleanValidatedString } from '../../../utils/Common'
import Clickable from '../../Clickable'
import { Conditional, EntityConditional } from '../../Conditional'
import { CFormLabel } from '@coreui/react-pro'
import { DiscriminatedUnion, Union } from '../../../types/DiscriminatedUnion'
import { DiscriminatedUnionHandler, handleDiscriminatedUnion } from '../../DiscriminatedUnionhandler'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons-pro'
import { RequiredAsterisk } from '../_common'
import Checkbox from '../Checkbox'
import { Direction } from '../../../types'

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
}

const BaseSelect = <T extends {}>(
  props:BaseAsyncSelectProps<T> & {
    config:SelectConfig<T>
  }
) => {

  const container = useRef<HTMLDivElement>(null)
  const inputWrapper = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const loadRef = useRef<HTMLDivElement>(null)
  const [showInput,setShowInput] = useState(false)

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


  // focus the input wrapper when clicking inside the input wrapper
  useEffect(() => {
    const handleClick = () => {
      if (!props.disabled) {
        setShowInput(true)
        if (inputWrapper.current){
          inputWrapper.current.classList.add('focus')
        }
      }
    };

    if (inputWrapper.current) {
      inputWrapper.current.addEventListener('click', handleClick);
    }

    return () => {
      if (inputWrapper.current) {
        inputWrapper.current.removeEventListener('click', handleClick);
      }
    };
  }, [inputWrapper,props.disabled]);

  // hide the results wrapper when the user clicks outside the select
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (container.current && !container.current.contains(event.target as Node)) {
        // if there are no options available, reset the search to repopulate the options
        if (showInput && !props.loading) {
          props.onSearch(null)
        }
        setShowInput(false)
        if (inputWrapper.current){
          inputWrapper.current.classList.remove('focus')
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [container,props.options,props.loading]);

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

  const handleSelect = (x:T) => {
    handleDiscriminatedUnion({
      value:props.config,
      config:{
        [ESelectConfig.Single]:config => {
          config.value.onChange(x)
          setShowInput(false)
        },
        [ESelectConfig.Multi]:config => {
          config.value.onChange(
            config.value.value.find(v => props.parseKey(v) === props.parseKey(x))
            ? config.value.value.filter(v => props.parseKey(v) !== props.parseKey(x))
            : config.value.value.concat(x)
          )
          if (inputRef.current) {
            inputRef.current.focus()
          }
        },
      }
    })
  }

  const renderSelectedOption = (x:T) =>
    <EntityConditional
      key={props.parseKey(x)}
      entity={ props.renderSelectedOption }
      render={ (v) => (
        <span className='m-1 selected-overflow-wrapper'>
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

  const inputTrigger =
    <span
      className={
        composedBooleanValidatedString([
          ['form-control text-muted',true],
          ['bg-light',!!props.disabled]
        ])
      }
      style={{whiteSpace:'nowrap'}}
    >
      {props.placeholder || 'Begin typing...'}
    </span>


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
                      <Conditional
                        condition={showInput}
                        onTrue={() => (
                          <DelayedTextInput
                            delay={props.delayMS || 300}
                            minSearchLength={props.minSearchLength}
                            onDelay={props.onSearch}
                            placeholder={props.placeholder || 'Begin typing...'}
                            autoFocus
                            inputRef={inputRef}
                            disabled={props.disabled}
                          />
                        )}
                        onFalse={() => inputTrigger}
                      />
                    </div>
                  )}
                />
              ),
              [ESelectConfig.Multi]:config => (
                <>
                {config.value.value.map(renderSelectedOption)}
                  <div className="typeable-area">
                    <Conditional
                      condition={showInput}
                      onTrue={() => (
                        <DelayedTextInput
                          delay={props.delayMS || 300}
                          minSearchLength={props.minSearchLength}
                          onDelay={props.onSearch}
                          placeholder={props.placeholder || 'Begin typing...'}
                          autoFocus
                          inputRef={inputRef}
                        />
                      )}
                      onFalse={() => inputTrigger}
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
            <div className={`results-wrapper form-control ${!!props.direction ? props.direction : ''}`}>
              {props.options
                .map(x => (
                  <Clickable
                    key={props.parseKey(x)}
                    onClick={() => handleSelect(x)}
                  >
                    <div className={
                      handleDiscriminatedUnion({
                        value:props.config,
                        config:{
                          [ESelectConfig.Single]:v => (
                            composedBooleanValidatedString([
                              ['result d-flex',true],
                              ['bg-light',v.value.value
                                ? props.parseKey(v.value.value) === props.parseKey(x)
                                : false
                              ]
                            ])
                          ),
                          [ESelectConfig.Multi]:() => 'result d-flex',
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
                                        ? props.parseKey(c.value.value) == props.parseKey(x)
                                        : false,
                                    [ESelectConfig.Multi]:c =>
                                      !!c.value.value.find(v => props.parseKey(v) === props.parseKey(x)),
                                  }
                                })
                              }
                            />
                          )
                        }}
                      />
                      {props.parseOptionLabel(x)}
                    </div>
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