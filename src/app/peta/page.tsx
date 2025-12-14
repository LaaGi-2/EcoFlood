/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapSidebar from '@/components/peta/MapSidebar'
import MapLayers from '@/components/peta/MapLayers'
import ReportButton from '@/components/peta/ReportButton'
import ReportModal from '@/components/peta/ReportModal'
import { LoadingOverlay, showNotification } from '@/components/common'
import { useMapData, useIslandFilter } from '@/hooks/map'

// Fix Leaflet default marker icon issue
if (typeof window !== 'undefined') {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     delete (L.Icon.Default.prototype as any)._getIconUrl
     L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
     })
}

const Page = () => {
     const [isMounted, setIsMounted] = useState(false)
     const mapRef = useRef<L.Map | null>(null)
     const mapContainerRef = useRef<HTMLDivElement>(null)

     // Sidebar state
     const [selectedIsland, setSelectedIsland] = useState('all')
     const [selectedYear, setSelectedYear] = useState(2024)
     const [layers, setLayers] = useState({
          deforestation: true,
          floodHistory: true,
          fireHotspots: false,
          biodiversity: false,
          userReports: true
     })

     // Use custom hooks for data management
     const {
          deforestationData,
          floodData,
          fireData,
          biodiversityData,
          userReports,
          isLoading
     } = useMapData(selectedIsland, selectedYear)

     // Modal state
     const [isModalOpen, setIsModalOpen] = useState(false)
     const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)

     // Island coordinates for centering map
     const islandCoordinates = {
          all: { center: [-0.7893, 113.9213] as [number, number], zoom: 5 },
          sumatra: { center: [0.0, 101.5] as [number, number], zoom: 6 },
          java: { center: [-7.5, 110.0] as [number, number], zoom: 7 },
          kalimantan: { center: [-1.0, 114.0] as [number, number], zoom: 6 },
          sulawesi: { center: [-1.5, 121.0] as [number, number], zoom: 6 },
          papua: { center: [-4.0, 137.0] as [number, number], zoom: 6 }
     }

     // Filter data based on island selection
     const filteredDeforestationData = useIslandFilter(deforestationData, selectedIsland)
     const filteredUserReports = useIslandFilter(userReports, selectedIsland)

     useEffect(() => {
          setIsMounted(true)
     }, [])

     // Initialize map
     useEffect(() => {
          if (!isMounted || !mapContainerRef.current || mapRef.current) return

          const map = L.map(mapContainerRef.current, {
               zoomControl: false,
               attributionControl: false
          }).setView([-0.7893, 113.9213], 5)

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

          mapRef.current = map

          return () => {
               if (mapRef.current) {
                    mapRef.current.remove()
                    mapRef.current = null
               }
          }
     }, [isMounted])

     // Update map view when island changes
     useEffect(() => {
          if (!mapRef.current) return

          const coords = islandCoordinates[selectedIsland as keyof typeof islandCoordinates]
          if (coords) {
               mapRef.current.setView(coords.center, coords.zoom, {
                    animate: true,
                    duration: 1
               })
          }
     }, [selectedIsland])

     const handleLayerToggle = (layer: string) => {
          setLayers(prev => ({
               ...prev,
               [layer]: !prev[layer as keyof typeof prev]
          }))
     }

     // Helper function to determine island from coordinates
     const getIslandFromCoords = (lat: number, lng: number): string => {
          if (lng < 108) return 'sumatra'
          if (lng > 108 && lng < 120 && lat > -5) return 'kalimantan'
          if (lng > 105 && lng < 116 && lat < -5) return 'java'
          if (lng > 119 && lng < 126) return 'sulawesi'
          if (lng > 130) return 'papua'
          return 'other'
     }

     // Handle report success
     const handleReportSuccess = () => {
          showNotification({
               message: 'Laporan berhasil dikirim! Menunggu persetujuan admin.',
               type: 'success'
          })
     }

     // Update map center when map moves
     useEffect(() => {
          if (mapRef.current) {
               const map = mapRef.current
               const updateCenter = () => {
                    const center = map.getCenter()
                    setMapCenter({ lat: center.lat, lng: center.lng })
               }

               map.on('move', updateCenter)
               updateCenter() // Set initial center

               return () => {
                    map.off('move', updateCenter)
               }
          }
     }, [isMounted])

     if (!isMounted) {
          return (
               <div className='h-screen w-full flex items-center justify-center bg-background text-surface-primary'>
                    <div className='text-center'>
                         <div className='text-xl'>Loading...</div>
                    </div>
               </div>
          )
     }

     return (
          <div className='h-screen w-full flex bg-background overflow-hidden'>
               {/* Sidebar */}
               <MapSidebar
                    selectedIsland={selectedIsland}
                    onIslandChange={setSelectedIsland}
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                    layers={layers}
                    onLayerToggle={handleLayerToggle}
               />

               {/* Map Container */}
               <div className='flex-1 relative'>
                    <div ref={mapContainerRef} className='w-full h-full' />

                    {/* Loading overlay */}
                    <LoadingOverlay isLoading={isLoading} message="Memuat data peta..." />

                    {/* Map Layers */}
                    <MapLayers
                         map={mapRef.current}
                         layers={layers}
                         selectedIsland={selectedIsland}
                         selectedYear={selectedYear}
                         deforestationData={filteredDeforestationData}
                         floodData={floodData}
                         fireData={fireData}
                         biodiversityData={biodiversityData}
                         userReports={filteredUserReports}
                    />

                    {/* Floating Report Button */}
                    <ReportButton
                         onClick={() => setIsModalOpen(true)}
                    />

                    {/* Report Modal */}
                    <ReportModal
                         isOpen={isModalOpen}
                         onClose={() => setIsModalOpen(false)}
                         onSuccess={handleReportSuccess}
                         currentPosition={mapCenter}
                    />
               </div>
          </div>
     )
}

export default Page