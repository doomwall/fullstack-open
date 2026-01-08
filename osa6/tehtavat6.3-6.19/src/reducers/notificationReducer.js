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

export const alertNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
        dispatch(emptyNotification())
    }, time*100)
  }
}


export default notificationSlice.reducer