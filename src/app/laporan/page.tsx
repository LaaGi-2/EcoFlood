/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import AlertMessage from "@/components/laporan/AlertMessage";
import ImageUpload from "@/components/laporan/ImageUpload";
import LocationPicker from "@/components/laporan/LocationPicker";
import InfoBox from "@/components/laporan/InfoBox";

export default function LaporanPage() {
     const [formData, setFormData] = useState({
          latitude: "",
          longitude: "",
          description: "",
     });
     const [selectedImage, setSelectedImage] = useState<File | null>(null);
     const [imagePreview, setImagePreview] = useState<string | null>(null);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [success, setSuccess] = useState(false);

     const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setFormData((prev) => ({ ...prev, description: e.target.value }));
          setError(null);
     };

     const handleLocationChange = (lat: string, lng: string) => {
          setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
          setError(null);
     };

     const handleImageChange = (file: File | null) => {
          if (file) {
               if (file.size > 5 * 1024 * 1024) {
                    setError("Ukuran file maksimal 5MB");
                    return;
               }
               if (!file.type.startsWith("image/")) {
                    setError("File harus berupa gambar");
                    return;
               }
               setSelectedImage(file);
               const reader = new FileReader();
               reader.onloadend = () => {
                    setImagePreview(reader.result as string);
               };
               reader.readAsDataURL(file);
               setError(null);
          } else {
               setSelectedImage(null);
               setImagePreview(null);
          }
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError(null);
          setSuccess(false);

          if (!formData.latitude || !formData.longitude || !formData.description || !selectedImage) {
               setError("Semua field wajib diisi!");
               return;
          }

          setIsLoading(true);

          try {
               const formDataToSend = new FormData();
               formDataToSend.append("latitude", formData.latitude);
               formDataToSend.append("longitude", formData.longitude);
               formDataToSend.append("description", formData.description);
               formDataToSend.append("imageUrl", selectedImage);

               const response = await fetch("/api/report-disaster", {
                    method: "POST",
                    body: formDataToSend,
               });

               if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Gagal mengirim laporan");
               }

               setSuccess(true);
               // Reset form
               setFormData({ latitude: "", longitude: "", description: "" });
               setSelectedImage(null);
               setImagePreview(null);
          } catch (err: any) {
               setError(err.message || "Terjadi kesalahan saat mengirim laporan");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
               <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                         {/* Header */}
                         <div className="bg-linear-to-r from-blue-600 to-green-600 px-6 py-8 text-white">
                              <h1 className="text-3xl font-bold text-center">Laporkan Kondisi Lingkungan</h1>
                              <p className="text-center mt-2 text-blue-100">
                                   Bantu kami memantau kondisi lingkungan dengan melaporkan kerusakan yang Anda temukan
                              </p>
                         </div>

                         {/* Form */}
                         <div className="px-6 py-8">
                              <form onSubmit={handleSubmit} className="space-y-6">
                                   {/* Alert Messages */}
                                   {error && <AlertMessage type="error" message={error} />}

                                   {success && (
                                        <AlertMessage
                                             type="success"
                                             message="Laporan berhasil dikirim! Admin akan memverifikasi laporan Anda."
                                        />
                                   )}

                                   {/* Location Section */}
                                   <LocationPicker
                                        latitude={formData.latitude}
                                        longitude={formData.longitude}
                                        onLocationChange={handleLocationChange}
                                        onError={setError}
                                   />

                                   {/* Description */}
                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                             Deskripsi Kondisi Lingkungan
                                        </label>
                                        <textarea
                                             name="description"
                                             rows={4}
                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                             placeholder="Jelaskan kondisi yang Anda temukan (contoh: kerusakan hutan, aliran air tersumbat, erosi kecil, dll)"
                                             value={formData.description}
                                             onChange={handleDescriptionChange}
                                             required
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                             Jelaskan secara detail kondisi yang Anda laporkan
                                        </p>
                                   </div>

                                   {/* Image Upload */}
                                   <ImageUpload
                                        selectedImage={selectedImage}
                                        imagePreview={imagePreview}
                                        onImageChange={handleImageChange}
                                   />

                                   {/* Info Box */}
                                   <InfoBox />

                                   {/* Submit Button */}
                                   <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-linear-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                                        size="lg"
                                   >
                                        {isLoading ? "Mengirim Laporan..." : "Kirim Laporan"}
                                   </Button>
                              </form>
                         </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                         <p>Laporan Anda membantu kami mencegah banjir dan kerusakan lingkungan</p>
                    </div>
               </div>
          </div>
     );
}
