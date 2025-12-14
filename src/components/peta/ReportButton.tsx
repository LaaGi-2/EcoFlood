"use client"

import React from 'react'
import { Plus, MessageSquare } from 'lucide-react'

interface ReportButtonProps {
     onClick: () => void
     reportCount?: number
}

const ReportButton: React.FC<ReportButtonProps> = ({ onClick, reportCount = 0 }) => {
     return (
          <button
               onClick={onClick}
               className="group fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-surface-primary rounded-full shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-3 px-6 py-4 font-bold"
               style={{ zIndex: 1000 }}
               title="Laporkan Kejadian"
          >
               {/* Icon Container */}
               <div className="relative">
                    <div className="absolute inset-0 bg-surface-primary/20 rounded-full animate-ping opacity-75"></div>
                    <MessageSquare className="w-6 h-6 relative z-10" />
               </div>

               {/* Text */}
               <span className="text-lg">Laporkan</span>

               {/* Plus Icon */}
               <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />

               {/* Badge for report count */}
               {reportCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-bounce">
                         {reportCount > 99 ? '99+' : reportCount}
                    </div>
               )}
     
               <style jsx>{`
                    @keyframes ping {
                         0% {
                              transform: scale(1);
                              opacity: 1;
                         }
                         75%,
                         100% {
                              transform: scale(1.5);
                              opacity: 0;
                         }
                    }

                    .animate-ping {
                         animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                    }
               `}</style>
          </button>
     )
}

export default ReportButton
