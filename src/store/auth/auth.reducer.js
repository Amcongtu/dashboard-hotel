import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    access_token: null,
    isAuthor: localStorage.getItem('user')? true : false, 
    isLogin: localStorage.getItem('access_token')? true : false, 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        setUser: (state, action) => {
            state.position = action.payload
        },

        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setIsLogin } = authSlice.actions

export default authSlice.reducer