"use client"

import React, { useState, useMemo } from 'react'
import { ArrowLeft, RefreshCw, Beaker, TreePine, CloudRain, Sprout, BarChart3, TrendingUp, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SimulationControls from '@/components/simulasi/SimulationControls'
import SimulationResults from '@/components/simulasi/SimulationResults'
import { calculateFloodRisk, getRecommendations } from '@/services/simulation'

const Page = () => {
     const router = useRouter()

     // Simulation parameters
     const [forestCover, setForestCover] = useState(60)
     const [rainfall, setRainfall] = useState(150)
     const [soilAbsorption, setSoilAbsorption] = useState<'low' | 'medium' | 'high'>('medium')

     // Calculate results using useMemo instead of useEffect
     const results = useMemo(() => {
          return calculateFloodRisk(forestCover, rainfall, soilAbsorption)
     }, [forestCover, rainfall, soilAbsorption])

     const handleReset = () => {
          setForestCover(60)
          setRainfall(150)
          setSoilAbsorption('medium')
     }

     const recommendations = getRecommendations(results)

     return (
          <div className='min-h-screen w-full bg-background'>
               {/* Header */}
               <div className='bg-surface-primary text-background shadow-lg'>
                    <div className='max-w-7xl mx-auto px-8 py-6'>
                         <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-4'>
                                   <button
                                        onClick={() => router.push('/')}
                                        className='flex items-center gap-2 hover:text-primary transition-colors duration-300'
                                   >
                                        <ArrowLeft size={24} />
                                        <span className='font-semibold'>Kembali</span>
                                   </button>
                                   <div className='h-8 w-px bg-background/30' />
                                   <div>
                                        <h1 className='text-3xl font-bold'>Simulasi Risiko Banjir</h1>
                                        <p className='text-background/80 text-sm mt-1'>
                                             Prediksi dampak perubahan lingkungan terhadap risiko banjir
                                        </p>
                                   </div>
                              </div>
                              <button
                                   onClick={handleReset}
                                   className='flex items-center gap-2 bg-primary text-surface-primary px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105'
                              >
                                   <RefreshCw size={20} />
                                   Reset
                              </button>
                         </div>
                    </div>
               </div>

               {/* Main Content */}
               <div className='max-w-7xl mx-auto px-8 py-12'>
                    {/* Info Banner */}
                    <div className='bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl p-6 mb-8 border-2 border-primary/30 shadow-lg'>
                         <div className='flex items-start gap-4'>
                              <div className='bg-primary/20 p-3 rounded-2xl'>
                                   <Beaker className='w-10 h-10 text-surface-primary' />
                              </div>
                              <div className='flex-1'>
                                   <h3 className='text-xl font-bold text-surface-primary mb-2 flex items-center gap-2'>
                                        Simulasi Prediksi Risiko Banjir Interaktif
                                        <TrendingUp className='w-5 h-5 text-accent' />
                                   </h3>
                                   <p className='text-surface-primary/80 text-sm leading-relaxed'>
                                        Sesuaikan <strong>tutupan hutan</strong>, <strong>intensitas curah hujan</strong>, dan <strong>kondisi tanah</strong> untuk melihat dampaknya terhadap risiko banjir secara langsung.
                                        Simulasi ini menggunakan model ilmiah berbasis data riset hidrologi dan ekologi untuk prediksi yang akurat dan dapat dijadikan acuan perencanaan mitigasi bencana.
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                         {/* Left Column - Controls */}
                         <div className='space-y-8'>
                              <SimulationControls
                                   forestCover={forestCover}
                                   rainfall={rainfall}
                                   soilAbsorption={soilAbsorption}
                                   onForestCoverChange={setForestCover}
                                   onRainfallChange={setRainfall}
                                   onSoilAbsorptionChange={setSoilAbsorption}
                              />

                              {/* Quick Scenarios */}
                              <div className='bg-surface-primary/5 rounded-3xl p-6 border-2 border-surface-primary/20 shadow-md'>
                                   <h3 className='text-xl font-bold text-surface-primary mb-4 flex items-center gap-2'>
                                        <BarChart3 className='w-5 h-5 text-accent' />
                                        Skenario Cepat
                                   </h3>
                                   <div className='space-y-3'>
                                        <ScenarioButton
                                             label="Ekosistem Optimal"
                                             description="Tutupan hutan 80%, curah hujan rendah, tanah sehat"
                                             onClick={() => {
                                                  setForestCover(80)
                                                  setRainfall(100)
                                                  setSoilAbsorption('high')
                                             }}
                                             icon={<TreePine className='w-6 h-6' />}
                                             color="text-green-600"
                                        />
                                        <ScenarioButton
                                             label="Kondisi Kritis"
                                             description="Deforestasi parah 20%, hujan ekstrem 250mm, tanah rusak"
                                             onClick={() => {
                                                  setForestCover(20)
                                                  setRainfall(250)
                                                  setSoilAbsorption('low')
                                             }}
                                             icon={<AlertCircle className='w-6 h-6' />}
                                             color="text-red-600"
                                        />
                                        <ScenarioButton
                                             label="Kondisi Umum Indonesia"
                                             description="Tutupan hutan 50%, curah hujan 180mm, tanah sedang"
                                             onClick={() => {
                                                  setForestCover(50)
                                                  setRainfall(180)
                                                  setSoilAbsorption('medium')
                                             }}
                                             icon={<BarChart3 className='w-6 h-6' />}
                                             color="text-yellow-600"
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* Right Column - Results */}
                         <div>
                              <SimulationResults
                                   floodProbability={results.floodProbability}
                                   waterRunoff={results.waterRunoff}
                                   environmentalHealth={results.environmentalHealth}
                                   riskLevel={results.riskLevel}
                                   factors={results.factors}
                                   recommendations={recommendations}
                              />
                         </div>
                    </div>

                    {/* Educational Content */}
                    <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
                         <EducationCard
                              icon={<TreePine className='w-10 h-10' />}
                              title="Fungsi Vital Hutan"
                              description="Hutan berfungsi sebagai spons alami yang menyerap air hujan hingga 300mm/hari. Sistem akar pohon mengikat tanah, mencegah erosi, dan mengatur aliran air secara bertahap untuk menghindari banjir bandang."
                              color="text-green-600"
                         />
                         <EducationCard
                              icon={<CloudRain className='w-10 h-10' />}
                              title="Intensitas Curah Hujan"
                              description="Hujan dengan intensitas >150mm/hari dikategorikan ekstrem dan dapat melampaui daya serap tanah. Tanpa vegetasi pelindung, 90% air langsung menjadi run-off yang berpotensi menyebabkan banjir dalam hitungan jam."
                              color="text-blue-600"
                         />
                         <EducationCard
                              icon={<Sprout className='w-10 h-10' />}
                              title="Kapasitas Resapan Tanah"
                              description="Tanah dengan struktur baik dan bahan organik tinggi mampu menyerap air 3-4x lebih banyak. Deforestasi menurunkan porositas tanah hingga 70%, mengubah area hijau menjadi zona rawan banjir."
                              color="text-emerald-600"
                         />
                    </div>
               </div>
          </div>
     )
}

interface ScenarioButtonProps {
     label: string
     description: string
     onClick: () => void
     icon: React.ReactNode
     color: string
}

const ScenarioButton: React.FC<ScenarioButtonProps> = ({ label, description, onClick, icon, color }) => {
     return (
          <button
               onClick={onClick}
               className='cursor-pointer w-full bg-background hover:bg-surface-primary hover:text-background text-surface-primary rounded-2xl p-4 transition-all duration-300 text-left group border-2 border-surface-primary/20 hover:border-primary hover:scale-102 shadow-sm hover:shadow-md'
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

interface EducationCardProps {
     icon: React.ReactNode
     title: string
     description: string
     color: string
}

const EducationCard: React.FC<EducationCardProps> = ({ icon, title, description, color }) => {
     return (
          <div className='bg-linear-to-br from-surface-primary/10 to-surface-primary/5 rounded-2xl p-6 border-2 border-surface-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group'>
               <div className={`${color} mb-3 transition-transform group-hover:scale-110 duration-300`}>
                    {icon}
               </div>
               <h4 className='text-lg font-bold text-surface-primary mb-2'>{title}</h4>
               <p className='text-surface-primary/70 text-sm leading-relaxed'>{description}</p>
          </div>
     )
}

export default Page