'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
     const [isLoading, setIsLoading] = useState(true)
     const [progress, setProgress] = useState(0)

     useEffect(() => {
          // Simulate initial page load
          const interval = setInterval(() => {
               setProgress((prev) => {
                    if (prev >= 100) {
                         clearInterval(interval)
                         setTimeout(() => setIsLoading(false), 300)
                         return 100
                    }
                    return prev + 10
               })
          }, 100)

          return () => clearInterval(interval)
     }, [])

     if (!isLoading) return null

     return (
          <div className="fixed inset-0 z-[10000] bg-background flex items-center justify-center">
               <div className="text-center">
                    {/* Logo Animation */}
                    <div className="mb-8 animate-bounce">
                         <Image
                              src="/logo.png"
                              alt="EcoFlood Logo"
                              width={80}
                              height={80}
                              className="w-20 h-20 mx-auto"
                         />
                    </div>

                    {/* Brand Name */}
                    <h1 className="text-3xl font-bold text-surface-primary mb-8">EcoFlood</h1>

                    {/* Loading Bar */}
                    <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                         <div
                              className="h-full bg-gradient-to-r from-surface-primary to-primary transition-all duration-300 ease-out"
                              style={{ width: `${progress}%` }}
                         />
                    </div>

                    {/* Loading Text */}
                    <p className="mt-4 text-sm text-gray-600 animate-pulse">
                         Memuat platform...
                    </p>
               </div>
          </div>
     )
}
