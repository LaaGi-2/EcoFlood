"use client"

import React from 'react'
import { DISASTER_TYPES } from '@/interface'
import DisasterIcon from '@/components/common/DisasterIcon'

const UserReportsLegend: React.FC = () => {
     return (
          <div>
               <p className="font-semibold mb-2 text-background flex items-center gap-1.5">
                    Laporan Warga
               </p>

               {/* Disaster Types Legend */}
               <div className="ml-4">
                    <p className="text-xs text-background/80 mb-1.5 font-medium">Jenis Kejadian:</p>
                    <div className="space-y-1">
                         {DISASTER_TYPES.map((type) => (
                              <div key={type.value} className="flex items-center gap-2">
                                   <div
                                        className="w-4 h-4 rounded flex items-center justify-center"
                                        style={{ backgroundColor: type.color }}
                                   >
                                        <DisasterIcon iconName={type.iconName} size={10} className="text-white" />
                                   </div>
                                   <span className="text-xs">{type.label}</span>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     )
}

export default UserReportsLegend
