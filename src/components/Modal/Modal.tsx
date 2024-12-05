import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import { composedBooleanValidatedString } from '../../utils/Common/common';
import { Conditional } from '../Conditional/Conditional';

type Props = {
  onClose:()=>void
  header?:()=>React.ReactNode
  content:()=>React.ReactNode
  footer?:()=>React.ReactNode
  size?:'sm'|'lg'|'xl'
  className?:string
}

export const Modal = (props:Props) => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '21px'
    return () => {
      // only re-add if there aren't other open modals
      if (!document.getElementsByClassName('kdg-modal').length) {
        document.body.classList.remove('modal-open')
        document.body.style.overflow = 'unset'
        document.body.style.paddingRight = 'unset'
      }
    }
  },[])

  const composedClasses = () =>
    composedBooleanValidatedString([
      ['modal-dialog', true],
      ['modal-sm', props.size === 'sm'],
      ['modal-lg', props.size === 'lg'],
      ['modal-xl', props.size === 'xl'],
      [`${props.className || ''}`,!!props.className]
    ])

  return (
      createPortal(
        <React.Fragment>
          <div className='modal-backdrop show fade'/>
          <div
            className={'kdg-modal modal fade show'}
            style={{
              display:'initial'
            }}
          >
            <div className={composedClasses()}>
              <div className="modal-content">
                <div className="modal-header">
                  <Conditional
                    condition={!!props.header}
                    onTrue={() => (
                      <div className="modal-title">
                        {props.header!()}
                      </div>
                    )}
                  />
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => props.onClose()}></button>
                </div>
                <div className="modal-body">
                  {props.content()}
                </div>
                <Conditional
                    condition={!!props.footer}
                    onTrue={() => (
                      <div className="modal-footer">
                        {props.footer!()}
                      </div>
                    )}
                  />
              </div>
            </div>
          </div>
          </React.Fragment>, document.body
      )
  )
}