import { useState } from "react";
import { MapPin } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface LocationPickerProps {
     latitude: string;
     longitude: string;
     onLocationChange: (lat: string, lng: string) => void;
     onError?: (error: string) => void;
}

export default function LocationPicker({
     latitude,
     longitude,
     onLocationChange,
     onError,
}: LocationPickerProps) {
     const [isGettingLocation, setIsGettingLocation] = useState(false);

     const getLocation = () => {
          setIsGettingLocation(true);

          if (!navigator.geolocation) {
               onError?.("Geolocation tidak didukung oleh browser Anda");
               setIsGettingLocation(false);
               return;
          }

          navigator.geolocation.getCurrentPosition(
               (position) => {
                    onLocationChange(
                         position.coords.latitude.toString(),
                         position.coords.longitude.toString()
                    );
                    setIsGettingLocation(false);
               },
               (error) => {
                    onError?.("Gagal mendapatkan lokasi: " + error.message);
                    setIsGettingLocation(false);
               }
          );
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          if (name === "latitude") {
               onLocationChange(value, longitude);
          } else if (name === "longitude") {
               onLocationChange(latitude, value);
          }
     };

     return (
          <div className="bg-blue-50 p-4 rounded-lg">
               <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                    Lokasi Kejadian
               </h3>
               <div className="space-y-4">
                    <Button
                         type="button"
                         onClick={getLocation}
                         disabled={isGettingLocation}
                         className="w-full"
                    >
                         {isGettingLocation ? "Mendapatkan Lokasi..." : "Gunakan Lokasi Saya"}
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                         <Input
                              type="text"
                              name="latitude"
                              label="Latitude"
                              placeholder="-6.2088"
                              value={latitude}
                              onChange={handleInputChange}
                              required
                         />
                         <Input
                              type="text"
                              name="longitude"
                              label="Longitude"
                              placeholder="106.8456"
                              value={longitude}
                              onChange={handleInputChange}
                              required
                         />
                    </div>
               </div>
          </div>
     );
}
