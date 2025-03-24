import React from 'react'
import { cilCaretLeft, cilCaretRight } from '@coreui/icons'
import './pagination.scss'

import { TPagination } from "../../utils/Hooks/hooks"
import { Col, Row } from '../../layout'
import { Select } from '../Forms/Select'
import Icon from '../Icon'
import { Conditional } from '../Conditional'
import { DelayedNumberInput } from '../Forms'
import { Direction } from '../../types'

export type TPageOptions = {[ _:string]:number }

export type TPaginationProps = {
  pageOptions:TPageOptions
  pagination:TPagination
  totalRecords:number
  onChange:(_:TPagination)=>void
  optionsDirection?:Direction
}

export const Pagination = (props:TPaginationProps) => {

  const pages = Math.ceil(props.totalRecords / props.pagination.numberOfItemsPerPage)

  const final = props.pagination.page * props.pagination.numberOfItemsPerPage
  const start = props.totalRecords == 0 ? 0 : ((props.pagination.page -1) * props.pagination.numberOfItemsPerPage + 1)
  const pageResults = `Results: ${start} - ${ Math.min(final,props.totalRecords)} of ${props.totalRecords}`

  return (
    <Row fluid className='justify-content-between pagination'>
      <Col sm={2}>
        <Select
          options={ Object.entries(props.pageOptions).map((v) => v[1]) }
          parseKey={(v) => v}
          parseOptionLabel={(v) => v.toString()}
          value={ props.pagination.numberOfItemsPerPage}
          onChange={numberOfItemsPerPage => props.onChange({
            ...props.pagination,
            numberOfItemsPerPage:numberOfItemsPerPage || 20,
          })}
          direction={ props.optionsDirection }
        />
      </Col>
      <Col sm={6} className='d-flex justify-content-end align-items-center'>
        <span className='me-2'>
          {
            pageResults
          }
        </span>
        <div className={ 'page-changer-wrapper' }>
          <Conditional
            condition={props.pagination.page > 1}
            onTrue={() => (
              <Icon
                icon={cilCaretLeft}
                onClick={() => props.onChange({
                  ...props.pagination,
                  page:props.pagination.page - 1
                })}
              />
            )}
          />
          <DelayedNumberInput
            className='form-control-sm'
            onDelay={page => props.onChange({
              ...props.pagination,
              page:page || props.pagination.page
            })}
            delay={800}
            value={props.pagination.page}
            min={1}
            max={pages || 1}
            key={props.pagination.page}
            hideDefaultHelperText
          />
          <span className='mx-2'>of { pages }</span>
          <Conditional
            condition={props.totalRecords / props.pagination.numberOfItemsPerPage > props.pagination.page}
            onTrue={() => (
              <Icon
                icon={cilCaretRight}
                onClick={() => props.onChange({
                  ...props.pagination,
                  page:props.pagination.page + 1
                })}
              />
            )}
          />
        </div>
      </Col>
    </Row>
  )
}