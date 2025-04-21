import React, { useEffect, useState } from "react"
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react-pro"
import { Conditional, EntityConditional } from "../Conditional/Conditional"
import {Clickable} from "../Clickable/Clickable"
import { TPagination } from "../../utils/Hooks/hooks"
import { Pagination, TPageOptions } from "../Pagination"
import { Loader } from "../Loader/Loader"
import { Icon } from "../Icon/Icon"
import { composedBooleanValidatedString, handleOnClick } from "../../utils/Common/common"
import { cilMinus } from "@coreui/icons"
import { cilPlus } from "@coreui/icons"

export enum SortOrder {
  ASC='ASC',
  DESC='DESC',
}
type Sort<T> = {
  sort:(a:T,b:T) => number
  order:SortOrder
}
type Fields<T> = {
  [header:string]:{
    valueRender:(_:T) => React.ReactNode
    getCellClassName?:(val:T,index:number)=>string
    hideHeader?:true
    sort?:Sort<T>
    header?:{
      wrapperClassName?:string
      render?:() => React.ReactNode
    }
  }
}
type SortState<T> = {
  field:keyof Fields<T>
  sort:Sort<T>
}
type TableProps<T> = {
  items:T[]
  defaultSort?:SortState<T> // todo: this isn't being compiler enforced as expected
  onSort?:(_:SortState<T>)=>void
  itemKey:(_:T) => React.Key
  expand?:{
    expandedRecords:React.Key[]
    onExpandedRecordsChange:(_:React.Key[])=>void
    expandedValueRender:(_:T)=>React.ReactNode
    expandedClassName?:string
    expandedRowClassName?:string
  }
  fields:Fields<T>
  bordered?:boolean
  small?:boolean
  className?:string
  headerClassName?:string
  extractRowClassname?:(_:T) => string
  striped?:boolean
  onClick?:(_:T)=>void
}

export const Table = <T extends {}>(props:TableProps<T>) => {

  const [sort, setsort] = useState<SortState<T>|null>(props.defaultSort || null)

  const sortedItems = () => {
    if (sort) {
      switch (sort.sort.order){
        case SortOrder.ASC:
          return [...props.items.sort(sort.sort.sort)]
          case SortOrder.DESC:
          return [...props.items.sort(sort.sort.sort).reverse()]
      }
    } else {
      return props.items
    }
  }

  useEffect(() => {
    if (props.onSort && sort) props.onSort(sort)
  },[sort])

  return (
    <CTable
      bordered={ props.bordered }
      small={ props.small }
      className={ props.className }
      striped={ props.striped }
      hover={ !!props.onClick }
    >
      <CTableHead className={ props.headerClassName }>
        <CTableRow>
          {/* display empty column for expand toggle if we have a record that's expandable */}
          <Conditional
            condition={!!props.expand}
            onTrue={() => (
              <CTableHeaderCell key={'expand'}>
                {/* Leave it empty for now */}
                {/* We may way to add functionality to expand all records at some point */}
              </CTableHeaderCell>
            )}
          />
        {
          Object.entries(props.fields).map(([header,val]) => (
            <CTableHeaderCell key={header} className={val.header?.wrapperClassName}>
              <Conditional
                condition={!val.hideHeader}
                onTrue={() => (
                  <EntityConditional
                    entity={val.header}
                    render={x =>
                      <EntityConditional
                        entity={x.render}
                        render={render => render()}
                        fallback={() => header}
                      />
                    }
                    fallback={() => header}
                  />
                )}
                onFalse={() => ''}
              />
              <Conditional
                condition={!!val.sort}
                onTrue={ () => (
                  <span className="mx-1">
                    <Clickable
                      onClick={() => setsort({
                        field:header,
                        sort:val.sort!,
                      })}
                    >
                      <Conditional
                        condition={sort?.field === header}
                        onFalse={ () => <>&harr;</>}
                        onTrue={() => (
                          <Clickable onClick={() => setsort(prev => ({
                            ...prev!,
                            sort:{
                              ...prev!.sort,
                              order:prev!.sort.order === SortOrder.ASC
                                ? SortOrder.DESC
                                : SortOrder.ASC,
                            }
                          }))}>
                            <Conditional
                              condition={sort!.sort.order === SortOrder.ASC}
                              onTrue={() => <>&uarr;</>}
                              onFalse={() => <>&darr;</>}
                            />
                          </Clickable>
                        )}
                      />
                    </Clickable>

                  </span>
                )}
              />
            </CTableHeaderCell> 
          ))
        }
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {
          sortedItems().map(item => (
            <React.Fragment key={props.itemKey(item)}>
                <CTableRow
                  className={
                    composedBooleanValidatedString([
                      [
                        props.extractRowClassname
                        ? props.extractRowClassname(item)
                        : '', !!props.extractRowClassname
                      ],
                    ])
                  }
                  style={{
                    cursor:props.onClick ? 'pointer' : 'auto',
                  }}
                  onClick={(e) =>
                    props.onClick
                      ? handleOnClick(e, () => props.onClick!(item))
                      : undefined
                  }
                >
                  <EntityConditional
                    entity={props.expand}
                    render={exp => (
                      <CTableDataCell
                        key={`${props.itemKey(item)}-expand`}
                        className="table-max-width"
                      >
                        <Clickable
                          onClick={() => exp.onExpandedRecordsChange(
                            exp.expandedRecords.includes(props.itemKey(item))
                            ? exp.expandedRecords.filter(v => v !== props.itemKey(item))
                            : exp.expandedRecords.concat(props.itemKey(item))
                          )}
                        >
                          <Conditional
                            condition={exp.expandedRecords.includes(props.itemKey(item))}
                            onTrue={() => (
                              <Icon icon={cilMinus} />
                            )}
                            onFalse={() => (
                              <Icon icon={cilPlus} />
                            )}
                          />
                        </Clickable>
                      </CTableDataCell>
                    )}
                  />
                  {
                    Object.values(props.fields).map((field,i) =>
                      <CTableDataCell
                        key={`${props.itemKey(item)}-${i}`}
                        className={'table-max-width ' + (
                          field.getCellClassName ? field.getCellClassName(item,i) : ''
                        )}
                      >
                        { field.valueRender(item) }
                      </CTableDataCell>
                    )
                  }
                </CTableRow>
              <EntityConditional
                entity={props.expand}
                render={exp => (
                  <Conditional
                    condition={exp.expandedRecords.includes(props.itemKey(item))}
                    onTrue={() => (
                      <CTableRow className={exp.expandedRowClassName}>
                        <CTableDataCell
                          colSpan={ Object.values(props.fields).length + 1}
                          className={`table-max-width ${exp.expandedClassName || ''}`}
                        >
                          {exp.expandedValueRender(item)}
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  />
                  )}
              />
            </React.Fragment>
          ))
        }
      </CTableBody>
    </CTable>
  )
}

type PaginatedTableProps<T> = TableProps<T> & {
  loading:boolean
  totalRecords:number
  pagination:TPagination
  pageOptions:TPageOptions
  onChangePagination:(_:TPagination)=>void
}
export const PaginatedTable = <T extends {}>(props:PaginatedTableProps<T>) => {

  return (
    <>
      <Conditional
        condition={props.loading}
        onTrue={() => <Loader/>}
        onFalse={() => (
          <Table {...props} />
        )}
      />
      <Pagination
        onChange={props.onChangePagination}
        pagination={props.pagination}
        totalRecords={props.totalRecords}
        pageOptions={props.pageOptions}
      />
    </>
  )
}