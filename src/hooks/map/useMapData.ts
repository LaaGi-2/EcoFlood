"use client"

import { useState, useEffect, useCallback } from 'react'
import {
     fetchTreeCoverLoss,
     fetchFloodHistory,
     fetchFireHotspots,
     fetchBiodiversityData
} from '@/services/data'

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

interface UseMapDataReturn {
     deforestationData: DeforestationData[]
     floodData: FloodData[]
     fireData: FireData[]
     biodiversityData: BiodiversityData[]
     userReports: UserReport[]
     isLoading: boolean
     error: Error | null
     refetch: () => Promise<void>
}

/**
 * Custom hook for fetching and managing map data
 * Handles loading states, error handling, and data caching
 */
export function useMapData(selectedIsland: string, selectedYear: number): UseMapDataReturn {
     const [deforestationData, setDeforestationData] = useState<DeforestationData[]>([])
     const [floodData, setFloodData] = useState<FloodData[]>([])
     const [fireData, setFireData] = useState<FireData[]>([])
     const [biodiversityData, setBiodiversityData] = useState<BiodiversityData[]>([])
     const [userReports, setUserReports] = useState<UserReport[]>([])
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState<Error | null>(null)

     // Helper function to determine island from coordinates
     const getIslandFromCoords = useCallback((lat: number, lng: number): string => {
          if (lng < 108) return 'sumatra'
          if (lng > 108 && lng < 120 && lat > -5) return 'kalimantan'
          if (lng > 105 && lng < 116 && lat < -5) return 'java'
          if (lng > 119 && lng < 126) return 'sulawesi'
          if (lng > 130) return 'papua'
          return 'other'
     }, [])

     const loadData = useCallback(async () => {
          setIsLoading(true)
          setError(null)

          try {
               const [deforest, flood, fire, bio, reports] = await Promise.all([
                    fetchTreeCoverLoss(selectedYear),
                    fetchFloodHistory(selectedIsland, selectedYear),
                    fetchFireHotspots(selectedIsland, selectedYear),
                    fetchBiodiversityData(selectedIsland),
                    fetch('/api/report-disaster').then(res => res.json())
               ])

               setDeforestationData(deforest.data || [])
               setFloodData((flood || []) as FloodData[])
               setFireData((fire || []) as FireData[])
               setBiodiversityData((bio || []) as BiodiversityData[])

               // Only show approved reports
               const approvedReports = (reports || [])
                    .filter((r: { status: string }) => r.status === 'success')
                    .map((r: { id: number; latitude: number; longitude: number; description: string; createdAt: number | string; imageUrl: string }) => {
                         // Validate and handle date properly
                         let dateStr: string
                         try {
                              const date = new Date(r.createdAt)
                              // Check if date is valid
                              if (isNaN(date.getTime())) {
                                   // Use current date as fallback
                                   dateStr = new Date().toISOString().split('T')[0]
                              } else {
                                   dateStr = date.toISOString().split('T')[0]
                              }
                         } catch {
                              // Fallback to current date if parsing fails
                              dateStr = new Date().toISOString().split('T')[0]
                         }

                         return {
                              id: String(r.id),
                              lat: r.latitude,
                              lng: r.longitude,
                              description: r.description,
                              date: dateStr,
                              status: 'success' as const,
                              island: getIslandFromCoords(r.latitude, r.longitude),
                              imageUrl: r.imageUrl
                         }
                    })
               setUserReports(approvedReports)
          } catch (err) {
               const error = err instanceof Error ? err : new Error('Error loading data')
               setError(error)
               console.error('Error loading map data:', error)
          } finally {
               setIsLoading(false)
          }
     }, [selectedIsland, selectedYear, getIslandFromCoords])

     useEffect(() => {
          loadData()
     }, [loadData])

     return {
          deforestationData,
          floodData,
          fireData,
          biodiversityData,
          userReports,
          isLoading,
          error,
          refetch: loadData
     }
}
