/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname } from 'next/navigation'

function LoadingBarContent() {
     const pathname = usePathname()
     const [loading, setLoading] = useState(false)
     const [progress, setProgress] = useState(0)

     useEffect(() => {
          // Start loading on route change
          setLoading(true)
          setProgress(20)

          const timer1 = setTimeout(() => setProgress(40), 100)
          const timer2 = setTimeout(() => setProgress(60), 300)
          const timer3 = setTimeout(() => setProgress(80), 500)
          const timer4 = setTimeout(() => {
               setProgress(100)
               setTimeout(() => {
                    setLoading(false)
                    setProgress(0)
               }, 200)
          }, 800)

          return () => {
               clearTimeout(timer1)
               clearTimeout(timer2)
               clearTimeout(timer3)
               clearTimeout(timer4)
          }
     }, [pathname])

     if (!loading && progress === 0) return null

     return (
          <div
               className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-primary/20"
               role="progressbar"
               aria-valuemin={0}
               aria-valuemax={100}
               aria-valuenow={progress}
          >
               <div
                    className="h-full bg-primary shadow-lg shadow-primary/50 transition-all duration-300 ease-out"
                    style={{
                         width: `${progress}%`,
                         transition: 'width 300ms ease-out'
                    }}
               >
                    <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-primary to-transparent opacity-50 animate-pulse" />
               </div>
          </div>
     )
}

export default function LoadingBar() {
     return (
          <Suspense fallback={null}>
               <LoadingBarContent />
          </Suspense>
     )
}
