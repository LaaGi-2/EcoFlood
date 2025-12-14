"use client"

import React, { useState } from 'react'
import { X, MapPin, AlertTriangle, Flame, Droplets, Trees, Upload } from 'lucide-react'

interface ReportModalProps {
     isOpen: boolean
     onClose: () => void
     onSubmit: (report: ReportFormData) => void
     currentPosition?: { lat: number; lng: number } | null
}

export interface ReportFormData {
     type: 'flood' | 'deforestation' | 'fire' | 'other'
     location: string
     description: string
     lat: number
     lng: number
     image?: File | null
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit, currentPosition }) => {
     const [formData, setFormData] = useState<ReportFormData>({
          type: 'flood',
          location: '',
          description: '',
          lat: currentPosition?.lat || 0,
          lng: currentPosition?.lng || 0,
          image: null
     })
     const [isSubmitting, setIsSubmitting] = useState(false)

     const reportTypes = [
          { value: 'flood', label: 'Banjir', icon: Droplets, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
          { value: 'deforestation', label: 'Deforestasi', icon: Trees, color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
          { value: 'fire', label: 'Kebakaran', icon: Flame, color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600' },
          { value: 'other', label: 'Lainnya', icon: AlertTriangle, color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' }
     ]

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          setIsSubmitting(true)

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))

          onSubmit(formData)
          setIsSubmitting(false)

          // Reset form
          setFormData({
               type: 'flood',
               location: '',
               description: '',
               lat: currentPosition?.lat || 0,
               lng: currentPosition?.lng || 0,
               image: null
          })
          onClose()
     }

     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
               setFormData({ ...formData, image: e.target.files[0] })
          }
     }

     if (!isOpen) return null

     return (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-surface-primary/80 backdrop-blur-sm animate-fadeIn" style={{ zIndex: 2000 }}>
               <div className="bg-background rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
                    {/* Header */}
                    <div className="sticky top-0 bg-surface-primary text-background px-6 py-4 rounded-t-3xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                              <MapPin className="w-6 h-6 text-primary" />
                              <h2 className="text-2xl font-bold">Laporkan Kejadian</h2>
                         </div>
                         <button
                              onClick={onClose}
                              className="p-2 hover:bg-background/20 rounded-full transition-colors"
                         >
                              <X size={24} />
                         </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                         {/* Report Type Selection */}
                         <div>
                              <label className="block text-surface-primary font-semibold mb-3">
                                   Jenis Kejadian <span className="text-accent">*</span>
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                   {reportTypes.map((type) => {
                                        const Icon = type.icon
                                        const isSelected = formData.type === type.value
                                        return (
                                             <button
                                                  key={type.value}
                                                  type="button"
                                                  onClick={() => setFormData({ ...formData, type: type.value as ReportFormData['type'] })}
                                                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                                                            ? `${type.color} text-white border-transparent scale-105 shadow-lg`
                                                            : 'bg-background border-surface-primary/20 text-surface-primary hover:border-surface-primary/40'
                                                       }`}
                                             >
                                                  <Icon className="w-6 h-6 mx-auto mb-2" />
                                                  <span className="font-semibold text-sm">{type.label}</span>
                                             </button>
                                        )
                                   })}
                              </div>
                         </div>

                         {/* Location */}
                         <div>
                              <label className="block text-surface-primary font-semibold mb-2">
                                   Lokasi Kejadian <span className="text-accent">*</span>
                              </label>
                              <input
                                   type="text"
                                   required
                                   value={formData.location}
                                   onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                   placeholder="Contoh: Jl. Sudirman, Jakarta Pusat"
                                   className="w-full px-4 py-3 rounded-xl border-2 border-surface-primary/20 focus:border-primary focus:outline-none transition-colors text-surface-primary"
                              />
                              {currentPosition && (
                                   <p className="text-xs text-surface-primary/60 mt-2">
                                        📍 Koordinat: {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
                                   </p>
                              )}
                         </div>

                         {/* Description */}
                         <div>
                              <label className="block text-surface-primary font-semibold mb-2">
                                   Deskripsi Kejadian <span className="text-accent">*</span>
                              </label>
                              <textarea
                                   required
                                   value={formData.description}
                                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                   placeholder="Jelaskan detail kejadian yang Anda laporkan..."
                                   rows={4}
                                   className="w-full px-4 py-3 rounded-xl border-2 border-surface-primary/20 focus:border-primary focus:outline-none transition-colors text-surface-primary resize-none"
                              />
                              <p className="text-xs text-surface-primary/60 mt-1">
                                   Minimal 20 karakter ({formData.description.length}/20)
                              </p>
                         </div>

                         {/* Image Upload */}
                         <div>
                              <label className="block text-surface-primary font-semibold mb-2">
                                   Foto Kejadian (Opsional)
                              </label>
                              <div className="border-2 border-dashed border-surface-primary/30 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                                   <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                   />
                                   <label htmlFor="image-upload" className="cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-surface-primary/60" />
                                        {formData.image ? (
                                             <p className="text-sm text-surface-primary font-semibold">
                                                  ✓ {formData.image.name}
                                             </p>
                                        ) : (
                                             <>
                                                  <p className="text-sm text-surface-primary font-semibold mb-1">
                                                       Klik untuk upload foto
                                                  </p>
                                                  <p className="text-xs text-surface-primary/60">
                                                       PNG, JPG hingga 5MB
                                                  </p>
                                             </>
                                        )}
                                   </label>
                              </div>
                         </div>

                         {/* Info Box */}
                         <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4">
                              <p className="text-sm text-surface-primary">
                                   <span className="font-semibold">💡 Tips:</span> Pastikan laporan Anda akurat dan
                                   sertakan foto jika memungkinkan. Laporan akan diverifikasi oleh tim kami.
                              </p>
                         </div>

                         {/* Submit Button */}
                         <div className="flex gap-3 pt-2">
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="flex-1 px-6 py-3 rounded-full border-2 border-surface-primary/20 text-surface-primary font-semibold hover:bg-surface-primary/5 transition-colors"
                              >
                                   Batal
                              </button>
                              <button
                                   type="submit"
                                   disabled={isSubmitting || formData.description.length < 20}
                                   className="flex-1 px-6 py-3 rounded-full bg-primary text-surface-primary font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                              >
                                   {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                             <span className="animate-spin">⏳</span> Mengirim...
                                        </span>
                                   ) : (
                                        'Kirim Laporan'
                                   )}
                              </button>
                         </div>
                    </form>
               </div>

               <style jsx>{`
                    @keyframes fadeIn {
                         from {
                              opacity: 0;
                         }
                         to {
                              opacity: 1;
                         }
                    }

                    @keyframes slideUp {
                         from {
                              opacity: 0;
                              transform: translateY(20px);
                         }
                         to {
                              opacity: 1;
                              transform: translateY(0);
                         }
                    }

                    .animate-fadeIn {
                         animation: fadeIn 0.2s ease-out;
                    }

                    .animate-slideUp {
                         animation: slideUp 0.3s ease-out;
                    }
               `}</style>
          </div>
     )
}

export default ReportModal
