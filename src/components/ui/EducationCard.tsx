"use client"

import React from 'react'

interface EducationCardProps {
     icon: React.ReactNode
     title: string
     description: string
     color?: string
     className?: string
}

const EducationCard: React.FC<EducationCardProps> = ({
     icon,
     title,
     description,
     color = 'text-primary',
     className = ''
}) => {
     return (
          <div className={`bg-linear-to-br from-surface-primary/10 to-surface-primary/5 rounded-2xl p-6 border-2 border-surface-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group ${className}`}>
               <div className={`${color} mb-3 transition-transform group-hover:scale-110 duration-300`}>
                    {icon}
               </div>
               <h4 className='text-lg font-bold text-surface-primary mb-2'>{title}</h4>
               <p className='text-surface-primary/70 text-sm leading-relaxed'>{description}</p>
          </div>
     )
}

export default EducationCard
