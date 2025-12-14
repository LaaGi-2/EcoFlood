"use client"

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

interface DeforestationData {
     lat: number
     lng: number
     region: string
     island: string
     intensity: number
     area_hectares: number
}

interface FloodData {
     id: string
     year: number
     island: string
     lat: number
     lng: number
     location: string
     severity: 'low' | 'medium' | 'high' | 'critical'
     casualties: number
     affected: number
     description: string
}

interface FireData {
     id: string
     year: number
     island: string
     lat: number
     lng: number
     location: string
     confidence: string
     brightness: number
     frp: number
     type: string
}

interface BiodiversityData {
     id: string
     island: string
     lat: number
     lng: number
     location: string
     type: string
     species: string[]
     area_km2: number
}

interface UserReport {
     id: string
     lat: number
     lng: number
     location: string
     type: 'flood' | 'deforestation' | 'fire' | 'other'
     description: string
     date: string
     status: 'pending' | 'verified' | 'rejected'
}

interface MapLayersProps {
     map: L.Map | null
     layers: {
          deforestation: boolean
          floodHistory: boolean
          fireHotspots: boolean
          biodiversity: boolean
          userReports: boolean
     }
     selectedIsland: string
     selectedYear: number
     deforestationData: DeforestationData[]
     floodData: FloodData[]
     fireData: FireData[]
     biodiversityData: BiodiversityData[]
     userReports: UserReport[]
}

const MapLayers: React.FC<MapLayersProps> = ({
     map,
     layers,
     deforestationData,
     floodData,
     fireData,
     biodiversityData,
     userReports
}) => {
     // Store references to layer groups for proper cleanup
     const layerGroupsRef = useRef<{
          deforestation: L.LayerGroup | null
          floodHistory: L.LayerGroup | null
          fireHotspots: L.LayerGroup | null
          biodiversity: L.LayerGroup | null
          userReports: L.LayerGroup | null
     }>({
          deforestation: null,
          floodHistory: null,
          fireHotspots: null,
          biodiversity: null,
          userReports: null
     })

     useEffect(() => {
          if (!map) return

          // Store current layer groups in local variable for cleanup
          const currentLayerGroups = layerGroupsRef.current

          // Initialize layer groups if they don't exist
          if (!currentLayerGroups.deforestation) {
               currentLayerGroups.deforestation = L.layerGroup()
               currentLayerGroups.floodHistory = L.layerGroup()
               currentLayerGroups.fireHotspots = L.layerGroup()
               currentLayerGroups.biodiversity = L.layerGroup()
               currentLayerGroups.userReports = L.layerGroup()
          }

          // Clear all layer groups
          Object.values(currentLayerGroups).forEach(group => {
               if (group) {
                    group.clearLayers()
                    map.removeLayer(group)
               }
          })

          // Deforestation Layer with severity levels
          if (layers.deforestation && deforestationData.length > 0 && layerGroupsRef.current.deforestation) {
               deforestationData.forEach(point => {
                    // Determine severity based on intensity
                    let severityLabel = 'Rendah'
                    let color = '#fbbf24' // yellow
                    let fillColor = '#fde047'

                    if (point.intensity >= 80) {
                         severityLabel = 'Kritis'
                         color = '#991b1b'
                         fillColor = '#dc2626'
                    } else if (point.intensity >= 60) {
                         severityLabel = 'Tinggi'
                         color = '#dc2626'
                         fillColor = '#ef4444'
                    } else if (point.intensity >= 40) {
                         severityLabel = 'Sedang'
                         color = '#f97316'
                         fillColor = '#fb923c'
                    }

                    const circle = L.circleMarker([point.lat, point.lng], {
                         radius: 8,
                         color: color,
                         fillColor: fillColor,
                         fillOpacity: 0.7,
                         weight: 2
                    })

                    circle.bindPopup(`
                         <div class="p-3 min-w-62.5">
                              <h3 class="font-bold text-lg text-red-600 mb-2">🌳 Deforestasi</h3>
                              <div class="mb-2 px-2 py-1 rounded text-xs font-semibold inline-block" style="background: ${fillColor}; color: white;">
                                   ${severityLabel}
                              </div>
                              <p class="text-sm"><strong>Lokasi:</strong> ${point.region}</p>
                              <p class="text-sm"><strong>Luas:</strong> ${point.area_hectares.toLocaleString()} ha</p>
                              <p class="text-sm"><strong>Intensitas:</strong> ${point.intensity}%</p>
                         </div>
                    `)

                    layerGroupsRef.current.deforestation?.addLayer(circle)
               })
               map.addLayer(layerGroupsRef.current.deforestation)
          }

          // Flood History Layer
          if (layers.floodHistory && floodData.length > 0 && layerGroupsRef.current.floodHistory) {
               floodData.forEach(flood => {
                    const severityConfig = {
                         low: { color: '#60a5fa', fill: '#93c5fd', label: 'Rendah' },
                         medium: { color: '#3b82f6', fill: '#60a5fa', label: 'Sedang' },
                         high: { color: '#1e40af', fill: '#3b82f6', label: 'Tinggi' },
                         critical: { color: '#1e3a8a', fill: '#1e40af', label: 'Kritis' }
                    }

                    const config = severityConfig[flood.severity]

                    const marker = L.circleMarker([flood.lat, flood.lng], {
                         radius: 8,
                         fillColor: config.fill,
                         color: config.color,
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.8
                    })

                    marker.bindPopup(`
                         <div class="p-3 min-w-65">
                              <h3 class="font-bold text-lg text-blue-600 mb-2">💧 Banjir ${flood.year}</h3>
                              <div class="mb-2 px-2 py-1 rounded text-xs font-semibold inline-block" style="background: ${config.color}; color: white;">
                                   ${config.label}
                              </div>
                              <p class="text-sm"><strong>Lokasi:</strong> ${flood.location}</p>
                              <p class="text-sm"><strong>Korban:</strong> ${flood.casualties} orang</p>
                              <p class="text-sm"><strong>Terdampak:</strong> ${flood.affected.toLocaleString()} orang</p>
                              <p class="text-sm mt-1 text-gray-600">${flood.description}</p>
                         </div>
                    `)

                    layerGroupsRef.current.floodHistory?.addLayer(marker)
               })
               map.addLayer(layerGroupsRef.current.floodHistory)
          }

          // Fire Hotspots Layer
          if (layers.fireHotspots && fireData.length > 0 && layerGroupsRef.current.fireHotspots) {
               fireData.forEach(fire => {
                    // Color based on confidence level
                    const confidenceColors: Record<string, { color: string, shadow: string }> = {
                         high: { color: '#dc2626', shadow: 'rgba(220, 38, 38, 0.8)' },
                         medium: { color: '#f97316', shadow: 'rgba(249, 115, 22, 0.8)' },
                         low: { color: '#fbbf24', shadow: 'rgba(251, 191, 36, 0.8)' }
                    }

                    const config = confidenceColors[fire.confidence] || confidenceColors.medium

                    const marker = L.circleMarker([fire.lat, fire.lng], {
                         radius: 8,
                         fillColor: config.color,
                         color: '#fff',
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.8
                    })

                    marker.bindPopup(`
                         <div class="p-3 min-w-62.5">
                              <h3 class="font-bold text-lg text-orange-600 mb-2">🔥 Titik Api</h3>
                              <div class="mb-2 px-2 py-1 rounded text-xs font-semibold inline-block" style="background: ${config.color}; color: white;">
                                   ${fire.confidence.toUpperCase()}
                              </div>
                              <p class="text-sm"><strong>Lokasi:</strong> ${fire.location}</p>
                              <p class="text-sm"><strong>Brightness:</strong> ${fire.brightness}K</p>
                              <p class="text-sm"><strong>FRP:</strong> ${fire.frp} MW</p>
                              <p class="text-sm"><strong>Tipe:</strong> <span class="capitalize">${fire.type}</span></p>
                         </div>
                    `)

                    layerGroupsRef.current.fireHotspots?.addLayer(marker)
               })
               map.addLayer(layerGroupsRef.current.fireHotspots)
          }

          // Biodiversity Layer
          if (layers.biodiversity && biodiversityData.length > 0 && layerGroupsRef.current.biodiversity) {
               biodiversityData.forEach(area => {
                    // Color based on protection type
                    const typeColors: Record<string, { color: string, fill: string }> = {
                         UNESCO: { color: '#059669', fill: '#10b981' },
                         Critical: { color: '#dc2626', fill: '#ef4444' },
                         Protected: { color: '#0891b2', fill: '#06b6d4' }
                    }

                    const config = typeColors[area.type] || { color: '#10b981', fill: '#34d399' }

                    const marker = L.circleMarker([area.lat, area.lng], {
                         radius: 8,
                         fillColor: config.fill,
                         color: config.color,
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.7
                    })

                    marker.bindPopup(`
                         <div class="p-3 min-w-70">
                              <h3 class="font-bold text-lg text-green-600 mb-2">🦜 Kawasan Lindung</h3>
                              <div class="mb-2 px-2 py-1 rounded text-xs font-semibold inline-block" style="background: ${config.color}; color: white;">
                                   ${area.type}
                              </div>
                              <p class="text-sm"><strong>Nama:</strong> ${area.location}</p>
                              <p class="text-sm"><strong>Luas:</strong> ${area.area_km2.toLocaleString()} km²</p>
                              <p class="text-sm"><strong>Spesies Dilindungi:</strong></p>
                              <p class="text-xs text-gray-600 mt-1">${area.species.join(', ')}</p>
                         </div>
                    `)

                    layerGroupsRef.current.biodiversity?.addLayer(marker)
               })
               map.addLayer(layerGroupsRef.current.biodiversity)
          }

          // User Reports Layer (NEW)
          if (layers.userReports && userReports.length > 0 && layerGroupsRef.current.userReports) {
               userReports.forEach(report => {
                    // Icon and color based on report type
                    const reportConfig: Record<string, { icon: string, color: string, label: string }> = {
                         flood: { icon: '💧', color: '#3b82f6', label: 'Banjir' },
                         deforestation: { icon: '🌳', color: '#ef4444', label: 'Deforestasi' },
                         fire: { icon: '🔥', color: '#f97316', label: 'Kebakaran' },
                         other: { icon: '⚠️', color: '#8b5cf6', label: 'Lainnya' }
                    }

                    const config = reportConfig[report.type] || reportConfig.other

                    // Status badge color
                    const statusColors: Record<string, string> = {
                         pending: '#fbbf24',
                         verified: '#10b981',
                         rejected: '#ef4444'
                    }

                    const marker = L.circleMarker([report.lat, report.lng], {
                         radius: 8,
                         fillColor: config.color,
                         color: '#fff',
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.7
                    })

                    marker.bindPopup(`
                         <div class="p-3 min-w-70">
                              <h3 class="font-bold text-lg mb-2" style="color: ${config.color};">${config.icon} Laporan Warga</h3>
                              <div class="flex gap-2 mb-2">
                                   <div class="px-2 py-1 rounded text-xs font-semibold" style="background: ${config.color}; color: white;">
                                        ${config.label}
                                   </div>
                                   <div class="px-2 py-1 rounded text-xs font-semibold capitalize" style="background: ${statusColors[report.status]}; color: white;">
                                        ${report.status === 'pending' ? 'Menunggu' : report.status === 'verified' ? 'Terverifikasi' : 'Ditolak'}
                                   </div>
                              </div>
                              <p class="text-sm"><strong>Lokasi:</strong> ${report.location}</p>
                              <p class="text-sm"><strong>Tanggal:</strong> ${new Date(report.date).toLocaleDateString('id-ID')}</p>
                              <p class="text-sm mt-2 text-gray-600">${report.description}</p>
                         </div>
                    `)

                    layerGroupsRef.current.userReports?.addLayer(marker)
               })
               map.addLayer(layerGroupsRef.current.userReports)
          }

          // Cleanup function
          return () => {
               Object.values(currentLayerGroups).forEach(group => {
                    if (group) {
                         group.clearLayers()
                    }
               })
          }

     }, [map, layers, deforestationData, floodData, fireData, biodiversityData, userReports])

     return null
}

export default MapLayers
