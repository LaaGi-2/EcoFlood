import { AlertCircle } from "lucide-react";

export default function InfoBox() {
     return (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
               <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 shrink-0" />
                    <div className="text-sm text-yellow-700">
                         <p className="font-semibold mb-1">Informasi Penting:</p>
                         <ul className="list-disc list-inside space-y-1">
                              <li>Laporan Anda akan diverifikasi oleh admin</li>
                              <li>Pastikan foto menunjukkan kondisi yang dilaporkan</li>
                              <li>Lokasi harus akurat untuk memudahkan penanganan</li>
                         </ul>
                    </div>
               </div>
          </div>
     );
}
