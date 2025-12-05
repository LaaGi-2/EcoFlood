import WeatherAndNominatimApi from "@/interface/weather-and-nominatim-api";

export async function logicFloodPrediction(WeatherAndNominatimApi: WeatherAndNominatimApi) {
    const { elevation, precipitation_sum, soil_moisture_0_to_1cm, river_discharge_mean, hours, address } = WeatherAndNominatimApi;

    /** TAHAP 1: Menentukan Konstanta dari Ketinggian (Profilling Daerah) 
     * Sistem ini menentukan seberapa kuat pertahanan darrah terhadap air melalui drainase alaminya (karena gravitasi),
     * semakin tinggi tanah maka semakin bagus 
    */

    let drainase_alami = "";
    let kondisi_tanah = "";
    let status_sungai = "";
    let analisis_hujan = "";

    let safe_limit_river_discharge = 0;
    if (elevation < 10) {
        safe_limit_river_discharge = 50;
        drainase_alami += "⛰️: Drainase alami Daerah ini berada di dataran rendah, Sedikit saja sungai naik, langsung meluap.";
    } else if (elevation >= 10 && elevation < 100) {
        safe_limit_river_discharge = 100;
        drainase_alami += "⛰️: Drainase alami Daerah ini berada di dataran sedang, aliran air standar.";
    } else {
        safe_limit_river_discharge = 200;
        drainase_alami += "⛰️: Drainase alami Daerah ini berada di dataran tinggi, air hujan akan mengalir turun dengan cepat.";
    }

    /** TAHAP 2: Analisis 3 Faktor Utama */

    // Analisis Sungai
    if (river_discharge_mean[0] > safe_limit_river_discharge) {
        status_sungai += "🏞️: Status sungai tidak aman, melebihi batas aman.";
    } else {
        status_sungai += "🏞️: Status sungai aman, tidak melebihi batas aman.";
    }

    // Analisis Tanah
    if (soil_moisture_0_to_1cm[0] < 0.20) {
        kondisi_tanah += "🌱: Kondisi tanah dalam kondisi kering, seperti spons kosong.";
    } else if (soil_moisture_0_to_1cm[0] > 0.20 && soil_moisture_0_to_1cm[0] < 0.35) {
        kondisi_tanah += "🌱: Kondisi tanah dalam kondisi lembab, seperti spons setengah basah. ";
    } else {
        kondisi_tanah += "🌱: Kondisi tanah dalam kondisi jenuh, seperti spons penuh/becek.";
    }

    // Analisis Hujan
    if(precipitation_sum[0] < 10) {
        analisis_hujan += "🌧: Kondisi hujan dalam keadaan gerimis/ringan.";
    } else if(precipitation_sum[0] > 10 && precipitation_sum[0] < 50) {
        analisis_hujan += "🌧: Kondisi hujan dalam keadaan sedang, biasa saja.";
    } else {
        analisis_hujan += "🌧: Kondisi hujan dalam keadaan lebat.";
    }

    /** TAHAP */


    return {
        "ketinggian_daratan": elevation,
        "jumlah hujan turun hari ini": precipitation_sum[0] + " " + precipitation_sum[1],
        "kadar air pada tanah pada 0 sampai 1 cm": soil_moisture_0_to_1cm[0] + " " + soil_moisture_0_to_1cm[1],
        "debit sungai rata-rata": river_discharge_mean[0] + " " + river_discharge_mean[1],
        "jam saat ini": hours,
        "alamat": address,
        "hasil": {
            "drainase alami": drainase_alami,
            "kondisi tanah": kondisi_tanah,
            "status sungai": status_sungai,
            "analisis hujan": analisis_hujan
        }
    };
}