"use client"

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import { Flame, Leaf, MapPin, Ruler, Clock, Thermometer, Zap, Trees, Droplets, Activity } from 'lucide-react'
import { renderToString } from 'react-dom/server'
import { DISASTER_TYPES } from '@/interface'
import DisasterIcon from '@/components/common/DisasterIcon'

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
     location?: string
     island: string
     type?: 'flood' | 'deforestation' | 'fire' | 'other'
     description: string
     date: string
     status: 'pending' | 'success' | 'rejected'
     imageUrl?: string
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

                    const treesIcon = renderToString(<Trees size={24} />)
                    const mapPinIcon = renderToString(<MapPin size={16} />)
                    const activityIcon = renderToString(<Activity size={16} />)

                    circle.bindPopup(`
                         <div class="p-4 min-w-70 rounded-lg" style="background: #fcf6e4; border: 2px solid ${color};">
                              <div class="flex items-center gap-2 mb-3">
                                   <div style="color: ${fillColor};">${treesIcon}</div>
                                   <h3 class="font-bold text-lg" style="color: #2a6354;">Deforestasi</h3>
                              </div>
                              <div class="mb-3">
                                   <div class="px-3 py-1.5 rounded-full text-xs font-bold inline-block" style="background: ${fillColor}; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        ${severityLabel}
                                   </div>
                              </div>
                              <div style="color: #2a6354;">
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${fillColor};">${mapPinIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Lokasi:</strong> ${point.region}</p>
                                   </div>
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${fillColor};">${activityIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Luas:</strong> ${point.area_hectares.toLocaleString()} ha</p>
                                   </div>
                                   <div class="mt-3 p-3 rounded-lg" style="background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(220,38,38,0.2) 100%); border-left: 3px solid ${color};">
                                        <p class="text-sm font-semibold mb-1" style="color: #2a6354;">Intensitas:</p>
                                        <p class="text-sm" style="color: #2a6354;">${point.intensity}%</p>
                                   </div>
                              </div>
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

                    const dropletsIcon = renderToString(<Droplets size={24} />)
                    const mapPinIcon = renderToString(<MapPin size={16} />)

                    marker.bindPopup(`
                         <div class="p-4 min-w-70 rounded-lg" style="background: #fcf6e4; border: 2px solid ${config.color};">
                              <div class="flex items-center gap-2 mb-3">
                                   <div style="color: ${config.fill};">${dropletsIcon}</div>
                                   <h3 class="font-bold text-lg" style="color: #2a6354;">Banjir ${flood.year}</h3>
                              </div>
                              <div class="mb-3">
                                   <div class="px-3 py-1.5 rounded-full text-xs font-bold inline-block" style="background: ${config.fill}; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                        ${config.label}
                                   </div>
                              </div>
                              <div style="color: #2a6354;">
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${mapPinIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Lokasi:</strong> ${flood.location}</p>
                                   </div>
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${dropletsIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Korban:</strong> ${flood.casualties} orang</p>
                                   </div>
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${dropletsIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Terdampak:</strong> ${flood.affected.toLocaleString()} orang</p>
                                   </div>
                                   <div class="mt-3 p-3 rounded-lg" style="background: linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.2) 100%); border-left: 3px solid ${config.color};">
                                        <p class="text-sm font-semibold mb-1" style="color: #2a6354;">Deskripsi:</p>
                                        <p class="text-sm" style="color: #2a6354;">${flood.description}</p>
                                   </div>
                              </div>
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
                    const thermometerIcon = renderToString(<Thermometer size={16} />)
                    const zapIcon = renderToString(<Zap size={16} />)

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
                              <div style="color: #2a6354;">
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${mapPinIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Lokasi:</strong> ${fire.location}</p>
                                   </div>
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${thermometerIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Brightness:</strong> ${fire.brightness}K</p>
                                   </div>
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${zapIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>FRP:</strong> ${fire.frp} MW</p>
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
                              <div style="color: #2a6354;">
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${mapPinIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Lokasi:</strong> ${area.location}</p>
                                   </div>
                                   <div class="flex items-center gap-2">
                                        <div style="min-width: 16px; color: ${config.fill};">${rulerIcon}</div>
                                        <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Luas:</strong> ${area.area_km2.toLocaleString()} km²</p>
                                   </div>
                                   <div class="mt-3 p-3 rounded-lg" style="background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.2) 100%); border-left: 3px solid ${config.color};">
                                        <div class="flex items-start gap-2 mb-1">
                                             <p class="text-sm font-semibold" style="color: #2a6354;">Spesies Dilindungi:</p>
                                        </div>
                                        <p class="text-sm ml-6" style="color: #2a6354;">${area.species.join(', ')}</p>
                                   </div>
                              </div>
                         </div>
                    `)

                    layerGroupsRef.current.biodiversity?.addLayer(marker)
               })
               map.addLayer(layerGroupsRef.current.biodiversity)
          }

          // User Reports Layer (IMPROVED)
          if (layers.userReports && userReports.length > 0 && layerGroupsRef.current.userReports) {
               userReports.forEach(report => {
                    // Map English type to Indonesian disaster type
                    const typeMapping: Record<string, string> = {
                         'flood': 'banjir',
                         'deforestation': 'deforestasi',
                         'fire': 'kebakaran_hutan',
                         'other': 'lainnya'
                    }
                    const mappedType = report.type ? typeMapping[report.type] : 'lainnya'

                    // Find disaster type from DISASTER_TYPES based on type_disaster field
                    const disasterType = DISASTER_TYPES.find(t => t.value === mappedType)
                    const defaultType = DISASTER_TYPES.find(t => t.value === 'lainnya') || DISASTER_TYPES[DISASTER_TYPES.length - 1]
                    const config = disasterType || defaultType

                    // Create marker with disaster type color
                    const marker = L.circleMarker([report.lat, report.lng], {
                         radius: 10,
                         fillColor: config.color,
                         color: config.color,
                         weight: 3,
                         opacity: 1,
                         fillOpacity: 0.8
                    })

                    // Get disaster icon
                    const disasterIconSvg = renderToString(
                         React.createElement(DisasterIcon, { iconName: config.iconName, size: 20 })
                    )

                    // Format date with relative time
                    const formatDate = (dateString: string) => {
                         const date = new Date(dateString)
                         const now = new Date()
                         const diffMs = now.getTime() - date.getTime()
                         const diffHours = Math.floor(diffMs / 3600000)
                         const diffDays = Math.floor(diffMs / 86400000)

                         if (diffHours < 24) {
                              return `${diffHours} jam yang lalu`
                         } else if (diffDays < 7) {
                              return `${diffDays} hari yang lalu`
                         }
                         return date.toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                         })
                    }

                    // Format location name
                    const formatLocation = () => {
                         if (report.location && report.location.trim() && report.location !== `${report.lat.toFixed(4)}, ${report.lng.toFixed(4)}`) {
                              return report.location
                         }
                         return `<span style="color: #94a3b8; font-style: italic;">Koordinat: ${report.lat.toFixed(4)}, ${report.lng.toFixed(4)}</span>`
                    }

                    // Render icons
                    const mapPinIcon = renderToString(<MapPin size={16} />)
                    const clockIcon = renderToString(<Clock size={16} />)

                    // Create popup element with improved layout
                    const popupContent = `
                         <div class="rounded-lg" style="min-width: 320px; max-width: 360px; background: #fcf6e4; border: 2px solid ${config.color};">
                              <!-- Header -->
                              <div class="p-4">
                                   <div class="flex items-center gap-2 mb-3">
                                        <div style="color: ${config.color};">${disasterIconSvg}</div>
                                        <h3 class="font-bold text-lg" style="color: #2a6354;">Laporan Warga</h3>
                                   </div>
                                   <div class="mb-2">
                                        <div class="px-3 py-1.5 rounded-full text-xs font-bold inline-block" style="background: ${config.color}; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                             ${config.label}
                                        </div>
                                   </div>
                              </div>
                              
                              <!-- Content - Scrollable -->
                              <div class="overflow-y-auto" style="max-height: 400px;">
                                   <div class="p-4 space-y-3">
                                        ${report.imageUrl ? `
                                             <div class="rounded-lg overflow-hidden shadow-md">
                                                  <img src="${report.imageUrl}" alt="Foto laporan" class="w-full h-48 object-cover" style="display: block;" />
                                             </div>
                                        ` : ''}
                                        
                                        <!-- Info Section -->
                                        <div style="color: #2a6354;">
                                             <!-- Location -->
                                             <div class="flex items-center gap-2">
                                                  <div style="min-width: 16px; color: ${config.color};">${mapPinIcon}</div>
                                                  <p class="text-sm" style="margin: 0 0 6px 0;"><strong>Lokasi:</strong> ${formatLocation()}</p>
                                             </div>
                                             
                                             <!-- Time -->
                                             <div class="flex items-center gap-2">
                                                  <div style="min-width: 16px; color: ${config.color};">${clockIcon}</div>
                                                  <p class="text-sm" style="margin: 0 0 4px 0;"><strong>Waktu:</strong> ${formatDate(report.date)}</p>
                                             </div>
                                             
                                             <!-- Description -->
                                             <div class="mt-3 p-3 rounded-lg" style="background: linear-gradient(135deg, ${config.bgColor} 0%, ${config.bgColor}ee 100%); border-left: 3px solid ${config.color};">
                                                  <p class="text-sm font-semibold mb-1" style="color: ${config.color};">Deskripsi:</p>
                                                  <p class="text-sm leading-relaxed" style="color: #2a6354;">${report.description}</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    `

                    marker.bindPopup(popupContent, {
                         maxWidth: 340,
                         minWidth: 340,
                         className: 'custom-popup',
                         closeButton: true,
                         autoPan: true,
                         autoPanPadding: [50, 50]
                    })

                    // Fetch location name on popup open if not available
                    marker.on('popupopen', async () => {
                         if (!report.location || report.location.trim() === '' || report.location === `${report.lat.toFixed(4)}, ${report.lng.toFixed(4)}`) {
                              try {
                                   const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${report.lat}&lon=${report.lng}&zoom=10&addressdetails=1&accept-language=id`)
                                   const data = await response.json()

                                   let locationName = ''
                                   if (data.address) {
                                        const parts = []
                                        if (data.address.village) parts.push(data.address.village)
                                        else if (data.address.suburb) parts.push(data.address.suburb)
                                        else if (data.address.neighbourhood) parts.push(data.address.neighbourhood)

                                        if (data.address.city) parts.push(data.address.city)
                                        else if (data.address.town) parts.push(data.address.town)
                                        else if (data.address.municipality) parts.push(data.address.municipality)
                                        else if (data.address.county) parts.push(data.address.county)

                                        if (data.address.state) parts.push(data.address.state)

                                        locationName = parts.join(', ') || data.display_name
                                   }

                                   if (locationName) {
                                        const popup = marker.getPopup()
                                        if (popup) {
                                             const newContent = popupContent.replace(
                                                  `<span style="color: #94a3b8; font-style: italic;">Koordinat: ${report.lat.toFixed(4)}, ${report.lng.toFixed(4)}</span>`,
                                                  locationName
                                             )
                                             popup.setContent(newContent)
                                        }
                                   }
                              } catch (error) {
                                   console.error('Error fetching location:', error)
                              }
                         }
                    })

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
