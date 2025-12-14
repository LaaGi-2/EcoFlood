'use client'

import { Activity } from 'lucide-react'

export default function ProcessSection() {
     return (
          <section className='py-20 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-linear-to-b from-emerald-50 to-background'>
               <div className='max-w-7xl mx-auto'>
                    {/* Section Header */}
                    <div className='text-center mb-12 md:mb-16'>
                         <div className='inline-block mb-4'>
                              <span className='inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full text-sm font-semibold text-emerald-800'>
                                   <Activity size={16} />
                                   Cara Kerja
                              </span>
                         </div>
                         <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900'>
                              Proses Kerja Kami
                         </h2>
                         <p className='text-base md:text-lg text-gray-700 max-w-2xl mx-auto'>
                              Empat langkah sederhana untuk memantau dan mencegah dampak deforestasi.
                         </p>
                    </div>

                    {/* Steps Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
                         {/* Step 1 */}
                         <div className='text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300'>
                              <div className='w-16 h-16 bg-surface-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md'>
                                   <span className='text-2xl font-bold text-background'>01</span>
                              </div>
                              <h3 className='text-lg md:text-xl font-bold mb-3 text-gray-900'>Pengumpulan Data</h3>
                              <p className='text-sm text-gray-700 leading-relaxed'>
                                   Mengintegrasikan data dari Global Forest Watch dan laporan warga.
                              </p>
                         </div>

                         {/* Step 2 */}
                         <div className='text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300'>
                              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md'>
                                   <span className='text-2xl font-bold text-gray-900'>02</span>
                              </div>
                              <h3 className='text-lg md:text-xl font-bold mb-3 text-gray-900'>Analisis & Visualisasi</h3>
                              <p className='text-sm text-gray-700 leading-relaxed'>
                                   Memproses data dalam bentuk peta interaktif.
                              </p>
                         </div>

                         {/* Step 3 */}
                         <div className='text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300'>
                              <div className='w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-md'>
                                   <span className='text-2xl font-bold text-white'>03</span>
                              </div>
                              <h3 className='text-lg md:text-xl font-bold mb-3 text-gray-900'>Prediksi Risiko</h3>
                              <p className='text-sm text-gray-700 leading-relaxed'>
                                   Memprediksi potensi banjir dengan machine learning.
                              </p>
                         </div>

                         {/* Step 4 */}
                         <div className='text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300'>
                              <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md'>
                                   <span className='text-2xl font-bold text-white'>04</span>
                              </div>
                              <h3 className='text-lg md:text-xl font-bold mb-3 text-gray-900'>Aksi & Mitigasi</h3>
                              <p className='text-sm text-gray-700 leading-relaxed'>
                                   Pengambilan keputusan dan tindakan pencegahan.
                              </p>
                         </div>
                    </div>
               </div>
          </section>
     )
}
