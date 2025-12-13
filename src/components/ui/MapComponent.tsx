import React from 'react'
import { MapContainer, TileLayer, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FloodPredictionResponse } from '@/interface'


interface MapComponentProps {
     location: [number, number]
     data?: FloodPredictionResponse
     onMarkerClick?: (data: FloodPredictionResponse) => void
     isActive?: boolean
}



const MapComponent: React.FC<MapComponentProps> = ({ location }) => {


     return (
          <MapContainer
               center={location}
               attributionControl={false}
               scrollWheelZoom={true}
               zoom={8}
               zoomControl={false}
               className='h-full w-full rounded-lg shadow-2xl'
          >
               <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
               />
          </MapContainer>
     )
}

export default MapComponent
