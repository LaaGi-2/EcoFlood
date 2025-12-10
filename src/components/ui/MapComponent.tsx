/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { floodPrediction } from '@/interface'

// Custom water drop icon for flood prediction
const floodIcon = new L.Icon({
     iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
               <defs>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                         <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                         <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
                    </linearGradient>
               </defs>
               <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" 
                     fill="url(#waterGradient)" 
                     stroke="#1e3a8a" 
                     stroke-width="1.5"/>
               <ellipse cx="12" cy="15" rx="3" ry="2" fill="#60a5fa" opacity="0.6"/>
          </svg>
     `),
     iconSize: [40, 40],
     iconAnchor: [20, 40],
     popupAnchor: [0, -40],
})

interface MapComponentProps {
     location: [number, number]
     data?: floodPrediction
}

const MapComponent: React.FC<MapComponentProps> = ({ location, data }) => {
     // Determine status color based on flood prediction
     const getStatusColor = (status: string) => {
          if (status.toLowerCase().includes('tinggi') || status.toLowerCase().includes('bahaya')) {
               return '#ef4444' // red
          } else if (status.toLowerCase().includes('sedang') || status.toLowerCase().includes('waspada')) {
               return '#f59e0b' // orange
          } else {
               return '#10b981' // green
          }
     }

     const statusColor = data ? getStatusColor(data.floodPrediction.hasil_prediksi_potensi_banjir) : '#3b82f6'

     return (
          <MapContainer
               center={location}
               zoom={13}
               scrollWheelZoom={true}
               className='h-4/5 w-4/5 rounded-lg shadow-2xl border-4 border-blue-900'
               style={{ background: '#0c4a6e' }}
          >
               {/* Dark Water Theme - CartoDB Dark Matter with blue tint */}
               <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
               />

               {/* OpenStreetMap Humanitarian (Good for disaster relief contexts) */}
               {/* <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
               /> */}

               {/* Alternative: Stadia Alidade Smooth Dark */}
               {/* <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
               /> */}

               {data && (
                    <Marker position={[data.lat, data.lng]} icon={floodIcon}>
                         <Popup
                              className='flood-popup'
                              maxWidth={300}
                         >
                              <div className='p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg'>
                                   <h3 className='font-bold text-xl mb-3 text-blue-900 border-b-2 border-blue-300 pb-2'>
                                        🌊 EcoFlood Prediction
                                   </h3>

                                   <div className='space-y-2 text-sm'>
                                        <div className='bg-white p-2 rounded shadow-sm'>
                                             <p className='text-gray-600 text-xs'>Koordinat</p>
                                             <p className='font-mono text-xs'>📍 {data.lat.toFixed(6)}, {data.lng.toFixed(6)}</p>
                                        </div>

                                        <div className='bg-white p-3 rounded shadow-md border-l-4' style={{ borderColor: statusColor }}>
                                             <p className='text-gray-600 text-xs mb-1'>Status Prediksi</p>
                                             <p className='font-bold text-base' style={{ color: statusColor }}>
                                                  {data.floodPrediction.hasil_prediksi_potensi_banjir}
                                             </p>
                                        </div>

                                        <div className='bg-blue-50 p-2 rounded'>
                                             <p className='text-xs text-gray-600'>💧 Curah Hujan</p>
                                             <p className='font-semibold text-blue-900'>{data.floodPrediction.hasil.analisis_hujan}</p>
                                        </div>

                                        <div className='bg-blue-50 p-2 rounded'>
                                             <p className='text-xs text-gray-600'>🏞️ Kondisi Tanah</p>
                                             <p className='font-semibold text-blue-900'>{data.floodPrediction.hasil.kondisi_tanah}</p>
                                        </div>

                                        <div className='bg-blue-50 p-2 rounded'>
                                             <p className='text-xs text-gray-600'>🌊 Status Sungai</p>
                                             <p className='font-semibold text-blue-900'>{data.floodPrediction.hasil.status_sungai}</p>
                                        </div>

                                        <div className='bg-blue-50 p-2 rounded'>
                                             <p className='text-xs text-gray-600'>💦 Drainase</p>
                                             <p className='font-semibold text-blue-900'>{data.floodPrediction.hasil.drainase_alami}</p>
                                        </div>
                                   </div>

                                   <div className='mt-3 pt-2 border-t border-blue-200'>
                                        <p className='text-xs text-gray-500 text-center'>
                                             Data pada pukul {data.floodPrediction.jam_saat_ini}:00
                                        </p>
                                   </div>
                              </div>
                         </Popup>
                    </Marker>
               )}
          </MapContainer>
     )
}

export default MapComponent
