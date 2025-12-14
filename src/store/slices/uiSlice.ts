import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
     isModalOpen: boolean
     isLoading: boolean
     error: string | null
     notifications: Array<{
          id: string
          message: string
          type: 'success' | 'error' | 'info' | 'warning'
     }>
}

const initialState: UIState = {
     isModalOpen: false,
     isLoading: false,
     error: null,
     notifications: []
}

export const uiSlice = createSlice({
     name: 'ui',
     initialState,
     reducers: {
          setModalOpen: (state, action: PayloadAction<boolean>) => {
               state.isModalOpen = action.payload
          },
          setLoading: (state, action: PayloadAction<boolean>) => {
               state.isLoading = action.payload
          },
          setError: (state, action: PayloadAction<string | null>) => {
               state.error = action.payload
          },
          addNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
               const id = Date.now().toString()
               state.notifications.push({ id, ...action.payload })
          },
          removeNotification: (state, action: PayloadAction<string>) => {
               state.notifications = state.notifications.filter(n => n.id !== action.payload)
          }
     }
})

export const {
     setModalOpen,
     setLoading,
     setError,
     addNotification,
     removeNotification
} = uiSlice.actions

export default uiSlice.reducer
