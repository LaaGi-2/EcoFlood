/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { floodService } from '@/services'

const MapComponent = dynamic(
     () => import('@/components/ui/MapComponent'),
     {
          ssr: false,
          loading: () => <div className='h-screen w-full flex items-center justify-center'>Loading...</div>
     }
)

const Page = () => {
     const [isMounted, setIsMounted] = useState(false)

     const { data, isLoading, isError } = useQuery<floodPrediction>({
          queryKey: ['floodPrediction'],
          queryFn: () => floodService.getPrediction(-8.351325, 114.026634),
     })

     const location: [number, number] = [-8.351325, 114.026634]

     useEffect(() => {
          setIsMounted(true)
     }, [])

     if (!isMounted || isLoading) {
          return <div className='h-screen w-full flex items-center justify-center'>Loading...</div>
     }

     if (isError) {
          return <div className='h-screen w-full flex items-center justify-center'>
               Terjadi kesalahan saat memuat data peta.
          </div>
     }

     return (
          <div className='h-screen w-full flex items-center justify-center'>
               <MapComponent location={location} data={data} />
          </div>
     )
}

export default Page