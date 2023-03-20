import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INotification } from '../types/Notifications'

type NotificationsState = INotification[]

const initialState : NotificationsState = []

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action:PayloadAction<INotification>) => {
      return state.concat(action.payload)
    },
    removeNotification: (state, action:PayloadAction<INotification>) => {
      return state.filter(v => v.key !== action.payload.key)
    },
    clearNotifications: () => {
      return []
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  addNotification,
  removeNotification,
  clearNotifications,
} = notificationsSlice.actions

export const notificationReducer = notificationsSlice.reducer
