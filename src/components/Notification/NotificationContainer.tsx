import React from "react"
import { INotification } from "../../types/Notifications"
import { useEffect,useCallback } from 'react'
import store, { useAppDispatch, useAppSelector } from "../../store/store"
import { clearNotifications, removeNotification } from "../../store/notifications"
import {Alert} from "../Alert/Alert"
import { Provider } from "react-redux"
import { Conditional } from "../Conditional/Conditional"
import { ActionButton } from "../Buttons/Buttons"

type NotificationProps = {
  notification:INotification
  className?:string
  onDismiss:() => void
}
type NotificationContainerProps = {
  style?:React.CSSProperties
  notificationClassName?:string
  containerClassName?:string
}

const Notification = (props:NotificationProps) => {

  const { onDismiss, notification } = props
  const { autoDismiss } = notification

  const handleDismiss = useCallback(() => {
    onDismiss()
  }, [onDismiss])

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, autoDismiss)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [handleDismiss, autoDismiss])
  

  return (
    <Alert
      type={props.notification.type}
      message={props.notification.message}
      title={props.notification.title ? {
        render:props.notification.title
      } : undefined}
      className={`${props.className || ''}`}
      onDismiss={() => props.onDismiss()}
    />
  )
}

const NotificationContainer = (props:NotificationContainerProps) => {
  const notifications = useAppSelector(state => state.notifications)
  const dispatch = useAppDispatch()
  return (
    <div
      className={`
        m-4
        position-fixed
        d-flex
        flex-column
        justify-content-end
        align-items-end
        ${props.containerClassName || ''}
      `}
      style={{
        bottom:0,
        right:0,
        maxWidth:400,
        zIndex:1051,
        ...props.style
      }}  
    >
      <>
        {notifications.map(x => (
          <Notification
            key={x.key}
            notification={x}
            className={props.notificationClassName}
            onDismiss={() =>
              dispatch(removeNotification(x))
            }
          />
        ))}
        
        <Conditional
          condition={notifications.length > 1}
          onTrue={() => (
            <ActionButton
              onClick={() => dispatch(clearNotifications())}
            >
              Dismiss Notifications
            </ActionButton>
          )}
        />
      </>
    </div>
  )
}

export const NotificationProvider = (props:React.PropsWithChildren<NotificationContainerProps>) => {
  return (
    <Provider store={store}>
      {props.children}
      <NotificationContainer 
        containerClassName={props.containerClassName} 
        notificationClassName={props.notificationClassName} 
        style={props.style} 
      />
    </Provider>
  )
}
