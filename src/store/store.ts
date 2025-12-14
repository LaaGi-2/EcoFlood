import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice'
import uiReducer from './slices/uiSlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
     reducer: {
          map: mapReducer,
          ui: uiReducer,
          admin: adminReducer,
     },
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    // Ignore these paths in the state for serializability
                    ignoredActions: ['map/setMapInstance'],
                    ignoredPaths: ['map.mapInstance'],
               },
          }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
