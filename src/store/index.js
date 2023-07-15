import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.reducer'
import roomTypeReducer from './RoomType/roomType.reducer'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    roomType: roomTypeReducer
  },
})
