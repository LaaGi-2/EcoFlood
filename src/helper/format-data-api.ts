import FloodApi from "@/interface/flood-api";
import NominatimApi from "@/interface/nominatim-api";
import WeatherApi from "@/interface/weather-api";

export async function formatDataApi(dataWeatherApi: WeatherApi, dataFloodApi: FloodApi, dataNominatimApi: NominatimApi) {
    const { elevation, daily: { precipitation_sum }, daily_units: { precipitation_sum: precipitation_sum_unit }, hourly: { soil_moisture_0_to_1cm }, hourly_units: { soil_moisture_0_to_1cm: soil_moisture_0_to_1cm_unit } } = dataWeatherApi;
    const { daily: { river_discharge_mean }, daily_units: { river_discharge_mean: river_discharge_mean_unit } } = dataFloodApi;
    const { display_name } = dataNominatimApi;
    const hoursNow = new Date().getHours();
    const dataToPredict = {
        elevation: elevation,
        precipitation_sum: [precipitation_sum[0], precipitation_sum_unit],
        soil_moisture_0_to_1cm: [soil_moisture_0_to_1cm[hoursNow], soil_moisture_0_to_1cm_unit],
        river_discharge_mean: [river_discharge_mean[0], river_discharge_mean_unit],
        hours: hoursNow,
        address: display_name
    };
    return dataToPredict;
}