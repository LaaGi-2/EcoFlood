"use client"

import React from 'react'

interface NotificationProps {
     message: string
     type?: 'success' | 'error' | 'info' | 'warning'
     duration?: number
     onClose?: () => void
}

const typeColors = {
     success: 'from-green-500 to-green-600',
     error: 'from-red-500 to-red-600',
     info: 'from-blue-500 to-blue-600',
     warning: 'from-yellow-500 to-yellow-600'
}

const typeIcons = {
     success: '✓',
     error: '✗',
     info: 'ℹ',
     warning: '⚠'
}

/**
 * Show a temporary notification
 * Usage: showNotification({ message: 'Success!', type: 'success' })
 */
export function showNotification({ message, type = 'success', duration = 4000 }: NotificationProps) {
     if (typeof window === 'undefined') return

     const notification = document.createElement('div')
     notification.className = `fixed top-20 right-8 bg-gradient-to-r ${typeColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl font-bold animate-slideIn flex items-center gap-3`
     notification.style.zIndex = '2001'
     notification.innerHTML = `<span class="text-xl">${typeIcons[type]}</span><span>${message}</span>`
     document.body.appendChild(notification)

     setTimeout(() => {
          notification.remove()
     }, duration)
}

export default showNotification
