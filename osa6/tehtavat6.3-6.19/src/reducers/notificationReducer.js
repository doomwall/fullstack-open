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
export default notificationSlice.reducer