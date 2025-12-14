"use client"

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PageHeaderProps {
     title: string
     subtitle?: string
     showBackButton?: boolean
     backTo?: string
     rightContent?: React.ReactNode
     className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
     title,
     subtitle,
     showBackButton = true,
     backTo = '/',
     rightContent,
     className = ''
}) => {
     const router = useRouter()

     return (
          <div className={`bg-surface-primary text-background shadow-lg ${className}`}>
               <div className='max-w-7xl mx-auto px-8 py-6'>
                    <div className='flex items-center justify-between'>
                         <div className='flex items-center gap-4'>
                              {showBackButton && (
                                   <>
                                        <button
                                             onClick={() => router.push(backTo)}
                                             className='flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer'
                                             aria-label='Kembali'
                                        >
                                             <ArrowLeft size={24} />
                                             <span className='font-semibold'>Kembali</span>
                                        </button>
                                        <div className='h-8 w-px bg-background/30' />
                                   </>
                              )}
                              <div>
                                   <h1 className='text-3xl font-bold'>{title}</h1>
                                   {subtitle && (
                                        <p className='text-background/80 text-sm mt-1'>
                                             {subtitle}
                                        </p>
                                   )}
                              </div>
                         </div>
                         {rightContent && (
                              <div>
                                   {rightContent}
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}

export default PageHeader
