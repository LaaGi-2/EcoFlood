"use client"

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import { Flame, Leaf, MapPin, Ruler } from 'lucide-react'
import { renderToString } from 'react-dom/server'

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
                    const confidenceColors: Record<string, { color: string, fill: string, label: string }> = {
                         high: { color: '#991b1b', fill: '#dc2626', label: 'Confidence Tinggi' },
                         medium: { color: '#c2410c', fill: '#f97316', label: 'Confidence Sedang' },
                         low: { color: '#ca8a04', fill: '#fbbf24', label: 'Confidence Rendah' }
                    }

                    const config = confidenceColors[fire.confidence] || confidenceColors.medium

                    const marker = L.circleMarker([fire.lat, fire.lng], {
                         radius: 8,
                         fillColor: config.fill,
                         color: config.color,
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.8
                    })

                    const flameIcon = renderToString(<Flame size={24} />)
                    const mapPinIcon = renderToString(<MapPin size={16} />)

                    marker.bindPopup(`
                         <div class="p-4 min-w-70 rounded-lg" style="background: #fcf6e4; border: 2px solid ${config.color};">
                              <div class="flex items-center gap-2 mb-3">
                                   <div style="color: ${config.fill};">${flameIcon}</div>
                                   <h3 class="font-bold text-lg" style="color: #2a6354;">Titik Api</h3>
                              </div>
                              <div class="mb-3">
                                   <div class="px-3 py-1.5 rounded-full text-xs font-bold inline-block" style="background: ${config.fill}; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        ${config.label}
                                   </div>
                              </div>
                              <div class="space-y-2" style="color: #2a6354;">
                                   <div class="flex items-start gap-2">
                                        <div style="min-width: 16px;">${mapPinIcon}</div>
                                        <p class="text-sm"><strong>Lokasi:</strong> ${fire.location}</p>
                                   </div>
                                   <div class="flex items-start gap-2">
                                        <span class="font-bold text-sm">🌡️</span>
                                        <p class="text-sm"><strong>Brightness:</strong> ${fire.brightness}K</p>
                                   </div>
                                   <div class="flex items-start gap-2">
                                        <span class="font-bold text-sm">⚡</span>
                                        <p class="text-sm"><strong>FRP:</strong> ${fire.frp} MW</p>
                                   </div>
                                   <div class="mt-3 p-3 rounded-lg" style="background: linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.2) 100%); border-left: 3px solid ${config.color};">
                                        <p class="text-sm font-semibold mb-1" style="color: #2a6354;">Tipe Kebakaran:</p>
                                        <p class="text-sm capitalize" style="color: #2a6354;">${fire.type}</p>
                                   </div>
                              </div>
                         </div>
                    `)

                    layerGroupsRef.current.fireHotspots?.addLayer(marker)
               })
               map.addLayer(layerGroupsRef.current.fireHotspots)
          }

          // Biodiversity Layer
          if (layers.biodiversity && biodiversityData.length > 0 && layerGroupsRef.current.biodiversity) {
               biodiversityData.forEach(area => {
                    // Color based on protection type - all use green shades for clarity
                    const typeColors: Record<string, { color: string, fill: string, label: string }> = {
                         UNESCO: { color: '#047857', fill: '#10b981', label: 'UNESCO World Heritage' },
                         Critical: { color: '#ca8a04', fill: '#fbbf24', label: 'Kawasan Kritis' },
                         Protected: { color: '#059669', fill: '#34d399', label: 'Kawasan Lindung' }
                    }

                    const config = typeColors[area.type] || { color: '#10b981', fill: '#34d399', label: 'Kawasan Lindung' }

                    const marker = L.circleMarker([area.lat, area.lng], {
                         radius: 8,
                         fillColor: config.fill,
                         color: config.color,
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.7
                    })

                    const leafIcon = renderToString(<Leaf size={24} />)
                    const mapPinIcon = renderToString(<MapPin size={16} />)
                    const rulerIcon = renderToString(<Ruler size={16} />)

                    marker.bindPopup(`
                         <div class="p-4 min-w-70 rounded-lg" style="background: #fcf6e4; border: 2px solid ${config.color};">
                              <div class="flex items-center gap-2 mb-3">
                                   <div style="color: ${config.fill};">${leafIcon}</div>
                                   <h3 class="font-bold text-lg" style="color: #2a6354;">Keanekaragaman Hayati</h3>
                              </div>
                              <div class="mb-3">
                                   <div class="px-3 py-1.5 rounded-full text-xs font-bold inline-block" style="background: ${config.fill}; color: ${area.type === 'Critical' ? '#2a6354' : 'white'}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        ${config.label}
                                   </div>
                              </div>
                              <div class="space-y-2" style="color: #2a6354;">
                                   <div class="flex items-start gap-2">
                                        <div style="min-width: 16px;">${mapPinIcon}</div>
                                        <p class="text-sm"><strong>Lokasi:</strong> ${area.location}</p>
                                   </div>
                                   <div class="flex items-start gap-2">
                                        <div style="min-width: 16px;">${rulerIcon}</div>
                                        <p class="text-sm"><strong>Luas:</strong> ${area.area_km2.toLocaleString()} km²</p>
                                   </div>
                                   <div class="mt-3 p-3 rounded-lg" style="background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.2) 100%); border-left: 3px solid ${config.color};">
                                        <p class="text-sm font-semibold mb-1" style="color: #2a6354;">🐾 Spesies Dilindungi:</p>
                                        <p class="text-sm" style="color: #2a6354;">${area.species.join(', ')}</p>
                                   </div>
                              </div>
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

                    const marker = L.circleMarker([report.lat, report.lng], {
                         radius: 8,
                         fillColor: config.color,
                         color: '#fff',
                         weight: 2,
                         opacity: 1,
                         fillOpacity: 0.7
                    })

                    marker.bindPopup(`
                         <div class="p-4 min-w-70 rounded-lg" style="background: #fcf6e4; border: 2px solid ${config.color};">
                              <div class="flex items-center gap-2 mb-3">
                                   <span style="font-size: 1.5rem;">${config.icon}</span>
                                   <h3 class="font-bold text-lg" style="color: #2a6354;">Laporan Warga</h3>
                              </div>
                              <div class="flex gap-2 mb-3 flex-wrap">
                                   <div class="px-3 py-1.5 rounded-full text-xs font-bold" style="background: ${config.color}; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        ${config.label}
                                   </div>
                                   <div class="px-3 py-1.5 rounded-full text-xs font-bold capitalize" style="background: ${report.status === 'pending' ? '#ff8b71' : report.status === 'verified' ? '#b4e251' : '#ef4444'}; color: ${report.status === 'verified' ? '#2a6354' : 'white'}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        ${report.status === 'pending' ? '⏳ Menunggu' : report.status === 'verified' ? '✓ Terverifikasi' : '✗ Ditolak'}
                                   </div>
                              </div>
                              <div class="space-y-2" style="color: #2a6354;">
                                   <div class="flex items-start gap-2">
                                        <span class="font-bold text-sm">📍</span>
                                        <p class="text-sm"><strong>Lokasi:</strong> ${report.location}</p>
                                   </div>
                                   <div class="flex items-start gap-2">
                                        <span class="font-bold text-sm">📅</span>
                                        <p class="text-sm"><strong>Tanggal:</strong> ${new Date(report.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                   </div>
                                   <div class="mt-3 p-3 rounded-lg" style="background: #2a6354; background: linear-gradient(135deg, rgba(42,99,84,0.05) 0%, rgba(42,99,84,0.1) 100%); border-left: 3px solid #2a6354;">
                                        <p class="text-sm font-semibold mb-1" style="color: #2a6354;">Deskripsi:</p>
                                        <p class="text-sm" style="color: #2a6354;">${report.description}</p>
                                   </div>
                              </div>
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
