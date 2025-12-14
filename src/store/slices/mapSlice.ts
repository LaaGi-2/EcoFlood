import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type L from 'leaflet'

interface MapState {
     selectedIsland: string
     selectedYear: number
     mapCenter: { lat: number; lng: number } | null
     mapInstance: L.Map | null
     layers: {
          deforestation: boolean
          floodHistory: boolean
          fireHotspots: boolean
          biodiversity: boolean
          userReports: boolean
     }
}

const initialState: MapState = {
     selectedIsland: 'all',
     selectedYear: 2024,
     mapCenter: null,
     mapInstance: null,
     layers: {
          deforestation: true,
          floodHistory: true,
          fireHotspots: false,
          biodiversity: false,
          userReports: true
     }
}

export const mapSlice = createSlice({
     name: 'map',
     initialState,
     reducers: {
          setSelectedIsland: (state, action: PayloadAction<string>) => {
               state.selectedIsland = action.payload
          },
          setSelectedYear: (state, action: PayloadAction<number>) => {
               state.selectedYear = action.payload
          },
          setMapCenter: (state, action: PayloadAction<{ lat: number; lng: number } | null>) => {
               state.mapCenter = action.payload
          },
          setMapInstance: (state, action: PayloadAction<L.Map | null>) => {
               state.mapInstance = action.payload
          },
          toggleLayer: (state, action: PayloadAction<keyof MapState['layers']>) => {
               state.layers[action.payload] = !state.layers[action.payload]
          },
          setLayers: (state, action: PayloadAction<Partial<MapState['layers']>>) => {
               state.layers = { ...state.layers, ...action.payload }
          }
     }
})

export const {
     setSelectedIsland,
     setSelectedYear,
     setMapCenter,
     setMapInstance,
     toggleLayer,
     setLayers
} = mapSlice.actions

export default mapSlice.reducer
