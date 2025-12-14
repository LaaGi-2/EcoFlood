import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AdminState {
     isAuthenticated: boolean
     token: string | null
}

const initialState: AdminState = {
     isAuthenticated: false,
     token: null
}

export const adminSlice = createSlice({
     name: 'admin',
     initialState,
     reducers: {
          setAuthenticated: (state, action: PayloadAction<boolean>) => {
               state.isAuthenticated = action.payload
          },
          setToken: (state, action: PayloadAction<string | null>) => {
               state.token = action.payload
               if (typeof window !== 'undefined') {
                    if (action.payload) {
                         localStorage.setItem('adminToken', action.payload)
                    } else {
                         localStorage.removeItem('adminToken')
                    }
               }
          },
          logout: (state) => {
               state.isAuthenticated = false
               state.token = null
               if (typeof window !== 'undefined') {
                    localStorage.removeItem('adminToken')
               }
          },
          checkAuth: (state) => {
               if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('adminToken')
                    if (token) {
                         state.token = token
                         state.isAuthenticated = true
                    }
               }
          }
     }
})

export const { setAuthenticated, setToken, logout, checkAuth } = adminSlice.actions

export default adminSlice.reducer
