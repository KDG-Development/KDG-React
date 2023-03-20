import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { addNotification } from '../../store/notifications'
import { INotification } from '../../types/Notifications'
import { Enums } from '../Enums'

export const useAbortControllerSignal = () => {
  const [controller] = useState<AbortController>(new AbortController())
  
  useEffect(() => () => controller.abort(),[controller])

  return controller.signal
}

export const useAppNavigation = () => useNavigate()


export type TPagination = {
  page:number
  numberOfItemsPerPage:number
}

export const usePagination = (initialState?:TPagination) => {
  const [pagination,setPagination] = useState<TPagination>(initialState || {
    page:1,
    numberOfItemsPerPage:20,
  })

  const previous = () => setPagination(prev => ({ ...prev, page:prev.page - 1}))
  const next = () => setPagination(prev => ({ ...prev, page:prev.page + 1}))
  const setPage = (page:number) => setPagination(prev => ({ ...prev, page }))
  const setPerPage = (numberOfItemsPerPage:number) =>
    setPagination(prev => ({ ...prev, numberOfItemsPerPage }))

  return { pagination, setPagination, previous, next, setPage, setPerPage }

}

type NotificationArgs = Omit<INotification, "type">
export const useNotification = () => {
  const dispatch = useAppDispatch();

  /**
   * @deprecated since 1.19.8, use specific notification exports instead
   */
  const notify = (INotification:INotification) => dispatch(addNotification(INotification))

  const info = (args:NotificationArgs) => dispatch(
    addNotification({
      ...args,
      type:Enums.Color.Info,
    })
  )
  const warn = (args:NotificationArgs) => dispatch(
    addNotification({
      ...args,
      type:Enums.Color.Warning,
    })
  )
  const error = (args:NotificationArgs) => dispatch(
    addNotification({
      ...args,
      type:Enums.Color.Danger,
    })
  )
  const success = (args:NotificationArgs) => dispatch(
    addNotification({
      ...args,
      type:Enums.Color.Success,
    })
  )

  return {
    notify,
    info,
    warn,
    error,
    success,
  }
}