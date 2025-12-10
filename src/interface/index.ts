export interface floodPrediction {
     floodPrediction: {
          ketinggian_daratan: number,
          jumlah_hujan_turun_hari_ini: string,
          kadar_air_pada_tanah: string,
          debit_sungai_rata_rata: string,
          jam_saat_ini: number,
          hasil: {
               drainase_alami: string,
               kondisi_tanah: string,
               status_sungai: string,
               analisis_hujan: string
          }
          hasil_prediksi_potensi_banjir: string
     },
     lat: number;
     lng: number;
}