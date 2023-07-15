import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listRoomType: null,
}

export const roomTypeSlice = createSlice({
    name: 'roomType',
    initialState,
    reducers: {
        setListRoomType: (state, action)=>
        {
            state.listRoomType = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setListRoomType } = roomTypeSlice.actions

export default roomTypeSlice.reducer