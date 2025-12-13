import { useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";

interface ImageUploadProps {
     selectedImage: File | null;
     imagePreview: string | null;
     onImageChange: (file: File | null) => void;
     error?: string;
}

export default function ImageUpload({
     imagePreview,
     onImageChange,
     error,
}: ImageUploadProps) {
     const fileInputRef = useRef<HTMLInputElement>(null);

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
               onImageChange(file);
          }
     };

     const handleReset = (e: React.MouseEvent) => {
          e.stopPropagation();
          onImageChange(null);
          if (fileInputRef.current) {
               fileInputRef.current.value = "";
          }
     };

     return (
          <div>
               <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Upload Foto
               </label>
               <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer ${error ? "border-red-500" : "border-gray-300"
                         }`}
                    onClick={() => fileInputRef.current?.click()}
               >
                    {imagePreview ? (
                         <div className="space-y-4">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                   src={imagePreview}
                                   alt="Preview"
                                   className="max-h-64 mx-auto rounded-lg object-contain"
                              />
                              <Button
                                   type="button"
                                   variant="outline"
                                   size="sm"
                                   onClick={handleReset}
                              >
                                   Ganti Foto
                              </Button>
                         </div>
                    ) : (
                         <div className="space-y-2">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="text-sm text-gray-600">
                                   <span className="font-semibold text-blue-600">Klik untuk upload</span> atau
                                   drag & drop
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
                         </div>
                    )}
                    <input
                         ref={fileInputRef}
                         type="file"
                         accept="image/*"
                         onChange={handleFileChange}
                         className="hidden"
                         required
                    />
               </div>
               {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
     );
}
