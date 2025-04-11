import React, { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

import './nav-bar.scss'
import { EntityConditional } from '../Conditional'

export interface NavTitleProps extends HTMLAttributes<HTMLLIElement> {
  className?: string
  subTitle:React.ReactNode
}

export const NavTitle = forwardRef<HTMLLIElement, NavTitleProps>(
    ({ children, className, subTitle, ...rest }, ref) => {
      return (
        <li className={classNames(className)} {...rest} ref={ref}>
            <EntityConditional
                entity={ subTitle }
                render={
                    (v) => <div className={ 'custom-nav-title'} >{ v }</div>
                }
                fallback={
                    () => (
                        <div className={ 'custom-nav-title-hr' }>
                            <div className={ 'd-flex align-items-center custom-nav-hr' }>
                                <hr />
                            </div>
                        </div>
                    )
                }
            />
            <div className={ 'nav-title' }>{children}</div>
        </li>
      )
    },
  )
