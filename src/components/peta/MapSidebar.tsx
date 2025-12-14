"use client"

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MapSidebarProps {
     selectedIsland: string
     onIslandChange: (island: string) => void
     selectedYear: number
     onYearChange: (year: number) => void
     layers: {
          deforestation: boolean
          floodHistory: boolean
          fireHotspots: boolean
          biodiversity: boolean
          userReports: boolean
     }
     onLayerToggle: (layer: string) => void
}

const MapSidebar: React.FC<MapSidebarProps> = ({
     selectedIsland,
     onIslandChange,
     selectedYear,
     onYearChange,
     layers,
     onLayerToggle
}) => {
     const router = useRouter()

     const islands = [
          { value: 'all', label: 'Semua Pulau' },
          { value: 'sumatra', label: 'Sumatra' },
          { value: 'java', label: 'Jawa' },
          { value: 'kalimantan', label: 'Kalimantan' },
          { value: 'sulawesi', label: 'Sulawesi' },
          { value: 'papua', label: 'Papua' }
     ]

     const years = Array.from({ length: 15 }, (_, i) => 2010 + i)

     return (
          <div className="w-80 h-full bg-surface-primary/95 backdrop-blur-sm shadow-xl p-6 flex flex-col overflow-y-auto">
               {/* Header with Back Button */}
               <div className="mb-6">
                    <button
                         onClick={() => router.push('/')}
                         className="flex items-center gap-2 text-background hover:text-primary transition-colors duration-300 mb-4"
                    >
                         <ArrowLeft size={20} />
                         <span className="font-semibold">Kembali</span>
                    </button>
                    <h2 className="text-2xl font-bold text-background">Peta Interaktif</h2>
                    <p className="text-background/80 text-sm mt-1">Analisis Data Lingkungan</p>
               </div>

               {/* Island/Region Select */}
               <div className="mb-6">
                    <label className="block text-background font-semibold mb-2 text-sm">
                         Pilih Wilayah
                    </label>
                    <select
                         value={selectedIsland}
                         onChange={(e) => onIslandChange(e.target.value)}
                         className="w-full bg-background text-surface-primary rounded-lg px-4 py-2 border-2 border-primary/30 focus:border-primary focus:outline-none transition-colors cursor-pointer"
                    >
                         {islands.map(island => (
                              <option key={island.value} value={island.value}>
                                   {island.label}
                              </option>
                         ))}
                    </select>
               </div>

               {/* Timeline Slider */}
               <div className="mb-6">
                    <label className="block text-background font-semibold mb-2 text-sm">
                         Timeline: {selectedYear}
                    </label>
                    <input
                         type="range"
                         min={years[0]}
                         max={years[years.length - 1]}
                         value={selectedYear}
                         onChange={(e) => onYearChange(Number(e.target.value))}
                         className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between text-background/70 text-xs mt-1">
                         <span>{years[0]}</span>
                         <span>{years[years.length - 1]}</span>
                    </div>
               </div>

               {/* Layer Controls */}
               <div className="flex-1">
                    <label className="block text-background font-semibold mb-3 text-sm">
                         Layer Peta
                    </label>
                    <div className="space-y-3">
                         <LayerCheckbox
                              label="Deforestasi"
                              checked={layers.deforestation}
                              onChange={() => onLayerToggle('deforestation')}
                              icon="🌳"
                              description="Hilangnya tutupan hutan"
                         />
                         <LayerCheckbox
                              label="Riwayat Banjir"
                              checked={layers.floodHistory}
                              onChange={() => onLayerToggle('floodHistory')}
                              icon="💧"
                              description="Kejadian banjir historis"
                         />
                         <LayerCheckbox
                              label="Titik Api"
                              checked={layers.fireHotspots}
                              onChange={() => onLayerToggle('fireHotspots')}
                              icon="🔥"
                              description="Hotspot kebakaran hutan"
                         />
                         <LayerCheckbox
                              label="Keanekaragaman Hayati"
                              checked={layers.biodiversity}
                              onChange={() => onLayerToggle('biodiversity')}
                              icon="🦜"
                              description="Area konservasi"
                         />
                         <LayerCheckbox
                              label="Laporan Warga"
                              checked={layers.userReports}
                              onChange={() => onLayerToggle('userReports')}
                              icon="📍"
                              description="Laporan dari masyarakat"
                         />
                    </div>
               </div>

               {/* Legend */}
               <div className="mt-6 pt-6 border-t border-background/20">
                    <h3 className="text-background font-semibold mb-3 text-sm">Legenda Tingkat Bahaya</h3>
                    <div className="space-y-3 text-xs text-background/90">
                         {/* Deforestation Legend */}
                         <div>
                              <p className="font-semibold mb-1.5 text-background">🌳 Deforestasi</p>
                              <div className="space-y-1 ml-4">
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#dc2626' }}></div>
                                        <span>Kritis (≥80%)</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }}></div>
                                        <span>Tinggi (60-79%)</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#fb923c' }}></div>
                                        <span>Sedang (40-59%)</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#fde047' }}></div>
                                        <span>Rendah (&lt;40%)</span>
                                   </div>
                              </div>
                         </div>

                         {/* Flood Legend */}
                         <div>
                              <p className="font-semibold mb-1.5 text-background">💧 Banjir</p>
                              <div className="space-y-1 ml-4">
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#1e3a8a' }}></div>
                                        <span>Kritis</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#1e40af' }}></div>
                                        <span>Tinggi</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#3b82f6' }}></div>
                                        <span>Sedang</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#60a5fa' }}></div>
                                        <span>Rendah</span>
                                   </div>
                              </div>
                         </div>

                         {/* Other Layers */}
                         <div className="space-y-1.5 pt-2 border-t border-background/10">
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                   <span>🔥 Titik Api</span>
                              </div>
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                   <span>🦜 Kawasan Lindung</span>
                              </div>
                              <div className="flex items-center gap-2">
                                   <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                   <span>📍 Laporan Warga</span>
                              </div>
                         </div>
                    </div>
               </div>

               <style jsx>{`
                    .slider-thumb::-webkit-slider-thumb {
                         -webkit-appearance: none;
                         appearance: none;
                         width: 20px;
                         height: 20px;
                         background: var(--color-primary);
                         cursor: pointer;
                         border-radius: 50%;
                         border: 2px solid var(--color-background);
                    }

                    .slider-thumb::-moz-range-thumb {
                         width: 20px;
                         height: 20px;
                         background: var(--color-primary);
                         cursor: pointer;
                         border-radius: 50%;
                         border: 2px solid var(--color-background);
                    }
               `}</style>
          </div>
     )
}

interface LayerCheckboxProps {
     label: string
     checked: boolean
     onChange: () => void
     icon: string
     description: string
}

const LayerCheckbox: React.FC<LayerCheckboxProps> = ({ label, checked, onChange, icon, description }) => {
     return (
          <div
               className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${checked
                    ? 'bg-primary text-surface-primary'
                    : 'bg-background/10 text-background hover:bg-background/20'
                    }`}
               onClick={onChange}
          >
               <div className="flex items-center gap-3">
                    <input
                         type="checkbox"
                         checked={checked}
                         onChange={onChange}
                         className="w-5 h-5 cursor-pointer accent-primary"
                         onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1">
                         <div className="flex items-center gap-2">
                              <span className="text-lg">{icon}</span>
                              <span className="font-semibold text-sm">{label}</span>
                         </div>
                         <p className={`text-xs mt-0.5 ${checked ? 'text-surface-primary/80' : 'text-background/60'}`}>
                              {description}
                         </p>
                    </div>
               </div>
          </div>
     )
}

export default MapSidebar
