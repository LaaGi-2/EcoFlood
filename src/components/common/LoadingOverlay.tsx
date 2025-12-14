"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingOverlayProps {
     isLoading: boolean
     message?: string
     className?: string
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
     isLoading,
     message = 'Memuat data...',
     className = ''
}) => {
     if (!isLoading) return null

     return (
          <div className={`absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center ${className}`} style={{ zIndex: 1000 }}>
               <div className='bg-surface-primary text-background px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3'>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    <span className='font-semibold'>{message}</span>
               </div>
          </div>
     )
}

export default LoadingOverlay
