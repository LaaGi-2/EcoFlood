"use client"

import React from 'react'

interface SectionContainerProps {
     children: React.ReactNode
     className?: string
     maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
}

const maxWidthClasses = {
     sm: 'max-w-sm',
     md: 'max-w-md',
     lg: 'max-w-lg',
     xl: 'max-w-xl',
     '2xl': 'max-w-2xl',
     '7xl': 'max-w-7xl',
     full: 'max-w-full'
}

/**
 * Reusable container component for consistent page sections
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
     children,
     className = '',
     maxWidth = '7xl'
}) => {
     return (
          <div className={`${maxWidthClasses[maxWidth]} mx-auto px-8 ${className}`}>
               {children}
          </div>
     )
}

export default SectionContainer
