"use client"

import React from 'react'
import { TreePine, CloudRain, Sprout } from 'lucide-react'

interface SimulationControlsProps {
     forestCover: number
     rainfall: number
     soilAbsorption: 'low' | 'medium' | 'high'
     onForestCoverChange: (value: number) => void
     onRainfallChange: (value: number) => void
     onSoilAbsorptionChange: (value: 'low' | 'medium' | 'high') => void
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
     forestCover,
     rainfall,
     soilAbsorption,
     onForestCoverChange,
     onRainfallChange,
     onSoilAbsorptionChange
}) => {
     return (
          <div className="bg-surface-primary/5 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-surface-primary/20">
               <h2 className="text-2xl font-bold text-surface-primary mb-6 flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-xl">
                         <TreePine className="w-5 h-5 text-surface-primary" />
                    </div>
                    Parameter Simulasi
               </h2>

               {/* Forest Cover Control */}
               <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                         <label className="text-surface-primary font-semibold flex items-center gap-2">
                              <TreePine className="w-5 h-5 text-green-600" />
                              Persentase Tutupan Hutan
                         </label>
                         <span className="text-2xl font-bold text-primary">{forestCover}%</span>
                    </div>
                    <input
                         type="range"
                         min="0"
                         max="100"
                         value={forestCover}
                         onChange={(e) => onForestCoverChange(Number(e.target.value))}
                         className="w-full h-3 bg-surface-primary/20 rounded-full appearance-none cursor-pointer slider-forest"
                    />
                    <div className="flex justify-between text-surface-primary/60 text-sm mt-2">
                         <span>0%</span>
                         <span className="text-xs">Lahan Gundul</span>
                         <span className="text-xs">Hutan Primer</span>
                         <span>100%</span>
                    </div>
                    <div className="text-xs text-surface-primary/60 mt-2 italic">
                         Tutupan hutan ≥70% memberikan perlindungan optimal dari banjir
                    </div>
               </div>

               {/* Rainfall Control */}
               <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                         <label className="text-surface-primary font-semibold flex items-center gap-2">
                              <CloudRain className="w-5 h-5 text-blue-600" />
                              Curah Hujan Harian
                         </label>
                         <span className="text-2xl font-bold text-accent">{rainfall} mm/hari</span>
                    </div>
                    <input
                         type="range"
                         min="0"
                         max="300"
                         value={rainfall}
                         onChange={(e) => onRainfallChange(Number(e.target.value))}
                         className="w-full h-3 bg-surface-primary/20 rounded-full appearance-none cursor-pointer slider-rainfall"
                    />
                    <div className="flex justify-between text-surface-primary/60 text-sm mt-2">
                         <span>0 mm</span>
                         <span className="text-xs">Ringan (&lt;50)</span>
                         <span className="text-xs">Ekstrem (&gt;150)</span>
                         <span>300 mm</span>
                    </div>
                    <div className="text-xs text-surface-primary/60 mt-2 italic">
                         Curah hujan &gt;150mm/hari dapat menyebabkan banjir di area rawan
                    </div>
               </div>

               {/* Soil Absorption Control */}
               <div>
                    <label className="text-surface-primary font-semibold mb-3 flex items-center gap-2">
                         <Sprout className="w-5 h-5 text-emerald-600" />
                         Kapasitas Resapan Tanah
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-2">
                         <SoilButton
                              label="Rendah"
                              value="low"
                              selected={soilAbsorption === 'low'}
                              onClick={() => onSoilAbsorptionChange('low')}
                              color="bg-red-500"
                         />
                         <SoilButton
                              label="Sedang"
                              value="medium"
                              selected={soilAbsorption === 'medium'}
                              onClick={() => onSoilAbsorptionChange('medium')}
                              color="bg-yellow-500"
                         />
                         <SoilButton
                              label="Tinggi"
                              value="high"
                              selected={soilAbsorption === 'high'}
                              onClick={() => onSoilAbsorptionChange('high')}
                              color="bg-green-500"
                         />
                    </div>
                    <div className="text-xs text-surface-primary/60 mt-2 italic">
                         Rendah: lahan beton/gundul | Sedang: tanah biasa | Tinggi: tanah berpori + vegetasi
                    </div>
               </div>

               <style jsx>{`
                    .slider-forest::-webkit-slider-thumb {
                         -webkit-appearance: none;
                         appearance: none;
                         width: 24px;
                         height: 24px;
                         background: var(--color-primary);
                         cursor: pointer;
                         border-radius: 50%;
                         border: 3px solid var(--color-background);
                         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    }

                    .slider-forest::-moz-range-thumb {
                         width: 24px;
                         height: 24px;
                         background: var(--color-primary);
                         cursor: pointer;
                         border-radius: 50%;
                         border: 3px solid var(--color-background);
                         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    }

                    .slider-rainfall::-webkit-slider-thumb {
                         -webkit-appearance: none;
                         appearance: none;
                         width: 24px;
                         height: 24px;
                         background: var(--color-accent);
                         cursor: pointer;
                         border-radius: 50%;
                         border: 3px solid var(--color-background);
                         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    }

                    .slider-rainfall::-moz-range-thumb {
                         width: 24px;
                         height: 24px;
                         background: var(--color-accent);
                         cursor: pointer;
                         border-radius: 50%;
                         border: 3px solid var(--color-background);
                         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    }
               `}</style>
          </div>
     )
}

interface SoilButtonProps {
     label: string
     value: string
     selected: boolean
     onClick: () => void
     color: string
}

const SoilButton: React.FC<SoilButtonProps> = ({ label, selected, onClick, color }) => {
     return (
          <button
               onClick={onClick}
               className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${selected
                    ? `${color} text-white scale-105 shadow-lg`
                    : 'bg-surface-primary/10 text-surface-primary hover:bg-surface-primary/20'
                    }`}
          >
               {label}
          </button>
     )
}

export default SimulationControls
