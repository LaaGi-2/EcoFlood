"use client"

import React from 'react'
import {
     Droplets, Waves, Leaf, CheckCircle2, AlertTriangle, AlertOctagon, XCircle, Lightbulb,
     TreePine, Shield, Trees, Sprout, CloudRain, Mountain, Layers, BarChart3, Users,
     Eye, BookOpen, CheckCircle, Sparkles, ClipboardCheck, Zap, Wind, Construction
} from 'lucide-react'
import { Recommendation } from '@/services/simulation'

interface SimulationResultsProps {
     floodProbability: number
     waterRunoff: number
     environmentalHealth: number
     riskLevel: 'low' | 'medium' | 'high' | 'critical'
     factors: {
          forestImpact: number
          rainfallImpact: number
          soilImpact: number
     }
     recommendations: Recommendation[]
}

const SimulationResults: React.FC<SimulationResultsProps> = ({
     floodProbability,
     waterRunoff,
     environmentalHealth,
     riskLevel,
     factors,
     recommendations
}) => {
     const riskColors = {
          low: { bg: 'bg-green-500', text: 'text-green-500', label: 'Rendah' },
          medium: { bg: 'bg-yellow-500', text: 'text-yellow-500', label: 'Sedang' },
          high: { bg: 'bg-orange-500', text: 'text-orange-500', label: 'Tinggi' },
          critical: { bg: 'bg-red-600', text: 'text-red-600', label: 'Kritis' }
     }

     const currentRisk = riskColors[riskLevel]

     const riskIcons = {
          low: <CheckCircle2 className="w-16 h-16" />,
          medium: <AlertTriangle className="w-16 h-16" />,
          high: <AlertOctagon className="w-16 h-16" />,
          critical: <XCircle className="w-16 h-16" />
     }

     return (
          <div className="space-y-6">
               {/* Risk Level Banner */}
               <div className={`${currentRisk.bg} text-white rounded-3xl p-6 shadow-xl`}>
                    <div className="flex items-center justify-between">
                         <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">Tingkat Risiko Banjir</h3>
                              <p className="text-4xl font-bold mb-2">{currentRisk.label.toUpperCase()}</p>
                              <div className="text-sm opacity-90">
                                   Probabilitas: {floodProbability}%
                              </div>
                         </div>
                         <div className="animate-pulse">
                              {riskIcons[riskLevel]}
                         </div>
                    </div>
               </div>

               {/* Key Metrics */}
               <div className="grid grid-cols-3 gap-4">
                    <MetricCard
                         title="Probabilitas Banjir"
                         value={floodProbability}
                         icon={<Droplets className="w-8 h-8" />}
                         color="blue"
                    />
                    <MetricCard
                         title="Aliran Air"
                         value={waterRunoff}
                         icon={<Waves className="w-8 h-8" />}
                         color="cyan"
                    />
                    <MetricCard
                         title="Kesehatan Lingkungan"
                         value={environmentalHealth}
                         icon={<Leaf className="w-8 h-8" />}
                         color="green"
                    />
               </div>

               {/* Impact Factors */}
               <div className="bg-surface-primary/5 rounded-3xl p-6 border-2 border-surface-primary/20">
                    <h3 className="text-xl font-bold text-surface-primary mb-4">Faktor Dampak</h3>
                    <div className="space-y-4">
                         <FactorBar
                              label="Dampak Kehilangan Hutan"
                              value={factors.forestImpact}
                              color="bg-primary"
                         />
                         <FactorBar
                              label="Dampak Intensitas Hujan"
                              value={factors.rainfallImpact}
                              color="bg-accent"
                         />
                         <FactorBar
                              label="Dampak Kondisi Tanah"
                              value={factors.soilImpact}
                              color="bg-surface-primary"
                         />
                    </div>
               </div>

               {/* Recommendations */}
               <div className="bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl p-6 border-2 border-primary/30 shadow-md">
                    <h3 className="text-xl font-bold text-surface-primary mb-4 flex items-center gap-2">
                         <Lightbulb className="w-6 h-6 text-accent" />
                         Rekomendasi Mitigasi
                    </h3>
                    <div className="mb-3 text-surface-primary/70 text-xs">
                         Langkah-langkah yang dapat dilakukan untuk mengurangi risiko banjir:
                    </div>
                    <ul className="space-y-3">
                         {recommendations.map((rec, index) => {
                              const IconComponent = getIconComponent(rec.icon)
                              const priorityColor = getPriorityColor(rec.priority)
                              return (
                                   <li key={index} className="flex items-start gap-3 text-surface-primary bg-background/40 p-3 rounded-xl hover:bg-background/60 transition-colors">
                                        <IconComponent className={`w-5 h-5 ${priorityColor} shrink-0 mt-0.5`} />
                                        <span className="flex-1 text-sm leading-relaxed">{rec.text}</span>
                                   </li>
                              )
                         })}
                    </ul>
               </div>
          </div>
     )
}

interface MetricCardProps {
     title: string
     value: number
     icon: React.ReactNode
     color: 'blue' | 'cyan' | 'green'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
     const colorClasses = {
          blue: 'from-blue-500 to-blue-600',
          cyan: 'from-cyan-500 to-cyan-600',
          green: 'from-green-500 to-green-600'
     }

     return (
          <div className={`bg-linear-to-br ${colorClasses[color]} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
               <div className="mb-3 opacity-90">{icon}</div>
               <div className="text-xs font-medium opacity-90 mb-2">{title}</div>
               <div className="text-3xl font-bold">{value}%</div>
          </div>
     )
}

interface FactorBarProps {
     label: string
     value: number
     color: string
}

const FactorBar: React.FC<FactorBarProps> = ({ label, value, color }) => {
     return (
          <div>
               <div className="flex justify-between mb-2">
                    <span className="text-surface-primary font-medium text-sm">{label}</span>
                    <span className="text-surface-primary font-bold">{value}%</span>
               </div>
               <div className="w-full bg-surface-primary/10 rounded-full h-3 overflow-hidden">
                    <div
                         className={`${color} h-full rounded-full transition-all duration-500 ease-out`}
                         style={{ width: `${value}%` }}
                    />
               </div>
          </div>
     )
}

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
     const icons: Record<string, React.ComponentType<{ className?: string }>> = {
          AlertOctagon, Construction, TreePine, Shield, Trees, Sprout,
          CloudRain, Waves, Droplets, Mountain, Layers, Leaf,
          BarChart3, Users, Eye, BookOpen, CheckCircle, Sparkles,
          ClipboardCheck, Zap, Wind, CheckCircle2
     }
     return icons[iconName] || CheckCircle2
}

// Helper function to get priority color
const getPriorityColor = (priority: 'critical' | 'high' | 'medium' | 'low') => {
     const colors: Record<string, string> = {
          critical: 'text-red-600',
          high: 'text-orange-500',
          medium: 'text-yellow-500',
          low: 'text-green-600'
     }
     return colors[priority] || 'text-primary'
}

export default SimulationResults
