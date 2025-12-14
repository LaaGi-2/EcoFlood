export interface FloodPredictionData {
     ketinggian_daratan: number;
     jumlah_hujan_turun_hari_ini: string;
     kadar_air_pada_tanah: string;
     debit_sungai_rata_rata: string;
     jam_saat_ini: number;
     hasil: {
          drainase_alami: string;
          kondisi_tanah: string;
          status_sungai: string;
          analisis_hujan: string;
     };
     hasil_prediksi_potensi_banjir: string;
}

export interface FloodPredictionResponse {
     floodPrediction: FloodPredictionData;
     lat: number;
     lng: number;
}

// Disaster Types
export type DisasterType =
     | 'banjir'
     | 'longsor'
     | 'kebakaran_hutan'
     | 'kekeringan'
     | 'erosi'
     | 'pencemaran_air'
     | 'deforestasi'
     | 'lainnya';

export interface DisasterTypeOption {
     value: DisasterType;
     label: string;
     description: string;
     iconName: string; // Lucide icon name
     color: string;
     bgColor: string;
     borderColor: string;
}

export const DISASTER_TYPES: DisasterTypeOption[] = [
     {
          value: 'banjir',
          label: 'Banjir',
          description: 'Genangan air yang merendam wilayah',
          iconName: 'Waves',
          color: '#3b82f6',
          bgColor: '#dbeafe',
          borderColor: '#93c5fd'
     },
     {
          value: 'longsor',
          label: 'Tanah Longsor',
          description: 'Pergerakan massa tanah atau batuan',
          iconName: 'Mountain',
          color: '#92400e',
          bgColor: '#fef3c7',
          borderColor: '#fcd34d'
     },
     {
          value: 'kebakaran_hutan',
          label: 'Kebakaran Hutan',
          description: 'Api yang membakar hutan atau lahan',
          iconName: 'Flame',
          color: '#dc2626',
          bgColor: '#fee2e2',
          borderColor: '#fca5a5'
     },
     {
          value: 'kekeringan',
          label: 'Kekeringan',
          description: 'Kekurangan air dalam jangka waktu lama',
          iconName: 'Sun',
          color: '#f59e0b',
          bgColor: '#fef3c7',
          borderColor: '#fcd34d'
     },
     {
          value: 'erosi',
          label: 'Erosi Tanah',
          description: 'Pengikisan lapisan tanah oleh air/angin',
          iconName: 'Wind',
          color: '#78716c',
          bgColor: '#f5f5f4',
          borderColor: '#d6d3d1'
     },
     {
          value: 'pencemaran_air',
          label: 'Pencemaran Air',
          description: 'Kontaminasi sumber air',
          iconName: 'Droplets',
          color: '#06b6d4',
          bgColor: '#cffafe',
          borderColor: '#67e8f9'
     },
     {
          value: 'deforestasi',
          label: 'Deforestasi',
          description: 'Penebangan hutan secara besar-besaran',
          iconName: 'Trees',
          color: '#16a34a',
          bgColor: '#dcfce7',
          borderColor: '#86efac'
     },
     {
          value: 'lainnya',
          label: 'Lainnya',
          description: 'Kejadian lingkungan lainnya',
          iconName: 'AlertCircle',
          color: '#9333ea',
          bgColor: '#f3e8ff',
          borderColor: '#d8b4fe'
     }
];

export interface Report {
     id: number;
     latitude: number;
     longitude: number;
     description: string;
     imageUrl: string;
     status: 'pending' | 'success' | 'rejected';
     createdAt: number;
     type_disaster: DisasterType;
}