"use client"

import React from 'react'
import { ArrowLeft, Trees, Droplets, Flame, Leaf, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import UserReportsLegend from './UserReportsLegend'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

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
     onClose?: () => void
     isOpen?: boolean
}

const MapSidebar: React.FC<MapSidebarProps> = ({
     selectedIsland,
     onIslandChange,
     selectedYear,
     onYearChange,
     layers,
     onLayerToggle,
     onClose,
     isOpen = false
}) => {
     const router = useRouter()

     // Animation hooks untuk setiap section
     const [headerRef, headerVisible] = useScrollAnimation({ initialAnimation: true, delay: 100, waitForPageLoad: true })
     const [islandRef, islandVisible] = useScrollAnimation({ initialAnimation: true, delay: 200, waitForPageLoad: true })
     const [timelineRef, timelineVisible] = useScrollAnimation({ initialAnimation: true, delay: 300, waitForPageLoad: true })
     const [layersRef, layersVisible] = useScrollAnimation({ initialAnimation: true, delay: 400, waitForPageLoad: true })

     const islands = [
          { value: 'all', label: 'Semua Pulau' },
          { value: 'sumatra', label: 'Sumatra' },
          { value: 'java', label: 'Jawa' },
          { value: 'kalimantan', label: 'Kalimantan' },
          { value: 'sulawesi', label: 'Sulawesi' },
          { value: 'papua', label: 'Papua' }
     ]

     const years = Array.from({ length: 16 }, (_, i) => 2010 + i)

     return (
          <aside className={`w-[85vw] sm:w-96 lg:w-80 h-screen bg-surface-primary/95 backdrop-blur-sm shadow-xl p-4 sm:p-6 flex flex-col overflow-y-auto fixed inset-y-0 left-0 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
               }`}
               style={{ zIndex: 999 }}
          >
               {/* Header with Back Button and Close Button */}
               <div
                    ref={headerRef}
                    className={`mb-6 transition-all duration-700 ${headerVisible
                         ? 'opacity-100 translate-y-0'
                         : 'opacity-0 -translate-y-4'
                         }`}
               >
                    <div className="flex items-center justify-between mb-4">
                         <button
                              onClick={() => router.push('/')}
                              className="flex items-center gap-2 text-background hover:text-primary transition-colors duration-300 cursor-pointer"
                         >
                              <ArrowLeft size={20} />
                              <span className="font-semibold">Kembali</span>
                         </button>
                         {onClose && (
                              <button
                                   onClick={onClose}
                                   className="lg:hidden text-background hover:text-primary transition-colors p-2 cursor-pointer"
                                   aria-label="Close sidebar"
                              >
                                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                              </button>
                         )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-background">Peta Interaktif</h2>
                    <p className="text-background/80 text-sm mt-1">Analisis Data Lingkungan</p>
               </div>

               {/* Island/Region Select */}
               <div
                    ref={islandRef}
                    className={`mb-6 transition-all duration-700 ${islandVisible
                         ? 'opacity-100 translate-y-0'
                         : 'opacity-0 -translate-y-4'
                         }`}
               >
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
               <div
                    ref={timelineRef}
                    className={`mb-6 transition-all duration-700 ${timelineVisible
                         ? 'opacity-100 translate-y-0'
                         : 'opacity-0 -translate-y-4'
                         }`}
               >
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
               <div
                    ref={layersRef}
                    className={`flex-1 transition-all duration-700 ${layersVisible
                         ? 'opacity-100 translate-y-0'
                         : 'opacity-0 -translate-y-4'
                         }`}
               >
                    <label className="block text-background font-semibold mb-3 text-sm">
                         Layer Peta
                    </label>
                    <div className="space-y-3">
                         <LayerCheckbox
                              label="Deforestasi"
                              checked={layers.deforestation}
                              onChange={() => onLayerToggle('deforestation')}
                              icon={<Trees size={18} />}
                              description="Hilangnya tutupan hutan"
                         />
                         <LayerCheckbox
                              label="Riwayat Banjir"
                              checked={layers.floodHistory}
                              onChange={() => onLayerToggle('floodHistory')}
                              icon={<Droplets size={18} />}
                              description="Kejadian banjir historis"
                         />
                         <LayerCheckbox
                              label="Titik Api"
                              checked={layers.fireHotspots}
                              onChange={() => onLayerToggle('fireHotspots')}
                              icon={<Flame size={18} />}
                              description="Hotspot kebakaran hutan"
                         />
                         <LayerCheckbox
                              label="Keanekaragaman Hayati"
                              checked={layers.biodiversity}
                              onChange={() => onLayerToggle('biodiversity')}
                              icon={<Leaf size={18} />}
                              description="Area konservasi"
                         />
                         <LayerCheckbox
                              label="Laporan Warga"
                              checked={layers.userReports}
                              onChange={() => onLayerToggle('userReports')}
                              icon={<Users size={18} />}
                              description="Laporan dari masyarakat"
                         />
                    </div>
               </div>

               {/* Legend */}
               <div className="mt-6 pt-6 border-t border-background/20">
                    <h3 className="text-background font-semibold mb-3 text-sm">Legenda Tingkat Bahaya</h3>
                    <div className="space-y-4 text-xs text-background/90">
                         {/* Deforestation Legend */}
                         <div>
                              <p className="font-semibold mb-1.5 text-background flex items-center gap-1.5">
                                   <Trees size={14} /> Deforestasi
                              </p>
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
                              <p className="font-semibold mb-2 text-background flex items-center gap-1.5">
                                   <Droplets size={14} /> Banjir
                              </p>
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

                         {/* Fire Hotspots Legend */}
                         <div>
                              <p className="font-semibold mb-2 text-background flex items-center gap-1.5">
                                   <Flame size={14} /> Titik Api
                              </p>
                              <div className="space-y-1 ml-4">
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#dc2626' }}></div>
                                        <span>Confidence Tinggi</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#f97316' }}></div>
                                        <span>Confidence Sedang</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#fbbf24' }}></div>
                                        <span>Confidence Rendah</span>
                                   </div>
                              </div>
                         </div>

                         {/* Kawasan Lindung */}
                         <div>
                              <p className="font-semibold mb-2 text-background flex items-center gap-1.5">
                                   <Leaf size={14} />
                                   <span>Kawasan Lindung</span>
                              </p>
                              <div className='space-y-1 ml-4'>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }}></div>
                                        <span>UNESCO</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#34d399' }}></div>
                                        <span>Protected</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: '#fbbf24' }}></div>
                                        <span>Critical</span>
                                   </div>
                              </div>
                         </div>

                         {/* User Reports Legend */}
                         {layers.userReports && <UserReportsLegend />}
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
          </aside>
     )
}

interface LayerCheckboxProps {
     label: string
     checked: boolean
     onChange: () => void
     icon: React.ReactNode
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
                              <div className={checked ? 'text-surface-primary' : 'text-background'}>{icon}</div>
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
