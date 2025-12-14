"use client"

import React from 'react'

interface ScenarioButtonProps {
     label: string
     description: string
     onClick: () => void
     icon: React.ReactNode
     color?: string
     className?: string
}

const ScenarioButton: React.FC<ScenarioButtonProps> = ({
     label,
     description,
     onClick,
     icon,
     color = 'text-primary',
     className = ''
}) => {
     return (
          <button
               onClick={onClick}
               className={`cursor-pointer w-full bg-background hover:bg-surface-primary hover:text-background text-surface-primary rounded-2xl p-4 transition-all duration-300 text-left group border-2 border-surface-primary/20 hover:border-primary hover:scale-102 shadow-sm hover:shadow-md ${className}`}
          >
               <div className='flex items-center gap-3'>
                    <div className={`${color} transition-transform group-hover:scale-110 duration-300`}>
                         {icon}
                    </div>
                    <div className='flex-1'>
                         <div className='font-bold text-sm mb-0.5'>{label}</div>
                         <div className='text-xs opacity-70'>{description}</div>
                    </div>
               </div>
          </button>
     )
}

export default ScenarioButton
