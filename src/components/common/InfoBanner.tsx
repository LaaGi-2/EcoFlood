"use client"

import React from 'react'

interface InfoBannerProps {
     icon: React.ReactNode
     title: string | React.ReactNode
     description: string | React.ReactNode
     className?: string
     iconBgColor?: string
}

const InfoBanner: React.FC<InfoBannerProps> = ({
     icon,
     title,
     description,
     className = '',
     iconBgColor = 'bg-primary/20'
}) => {
     return (
          <div className={`bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl p-6 border-2 border-primary/30 shadow-lg ${className}`}>
               <div className='flex items-start gap-4'>
                    <div className={`${iconBgColor} p-3 rounded-2xl flex-shrink-0`}>
                         {icon}
                    </div>
                    <div className='flex-1'>
                         <h3 className='text-xl font-bold text-surface-primary mb-2'>
                              {typeof title === 'string' ? title : <>{title}</>}
                         </h3>
                         <div className='text-surface-primary/80 text-sm leading-relaxed'>
                              {description}
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default InfoBanner
