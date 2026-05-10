import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        emptyNotification(state, action) {
            return null
        }
    }
})

export const { setNotification, emptyNotification } = notificationSlice.actions

let notificationTimer = null

export const alertNotification = (message, time) => {
  return async (dispatch) => {
    if (notificationTimer) clearTimeout(notificationTimer)
    dispatch(setNotification(message))
    notificationTimer = setTimeout(() => {
        dispatch(emptyNotification())
        notificationTimer = null
    }, time*1000 || 5000)
  }
}


export default notificationSlice.reducer