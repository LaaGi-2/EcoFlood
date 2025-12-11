import { formatDataApi } from "@/helper/format-data-api";
import { fetchFloodApi } from "@/lib/fetch-flood-api";
import { fetchWeatherApi } from "@/lib/fetch-weather-api"
import { logicFloodPrediction } from "@/lib/logic-flood-prediction";
import { NextResponse } from "next/server";
import WeatherAndNominatimApi from "@/interface/weather-and-nominatim-api";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const lat = searchParams.get('latitude') || '';
    const lng = searchParams.get('longitude') || '';

    if (!lat || !lng) {
        return NextResponse.json({
            lat: lat,
            lng: lng,
            error: "Missing latitude or longitude in query parameters."
        }, { status: 400 });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const hoursNow = new Date().getHours();
    let formatData: WeatherAndNominatimApi = {
        elevation: 0,
        precipitation_sum: [0, "mm"],
        soil_moisture_0_to_1cm: [0, "m³/m³"],
        river_discharge_mean: [0, "m³/s"],
        hours: 0,
    };

    const dataOpenMeteoApi = await fetchWeatherApi(latitude, longitude);

    const dataFloodApi = await fetchFloodApi(latitude, longitude);

    if (dataOpenMeteoApi && dataFloodApi) {
        formatData = await formatDataApi(dataOpenMeteoApi, dataFloodApi);
    } else if (dataOpenMeteoApi && dataFloodApi == undefined) {
        const { elevation, daily: { precipitation_sum }, daily_units: { precipitation_sum: precipitation_sum_unit }, hourly: { soil_moisture_0_to_1cm }, hourly_units: { soil_moisture_0_to_1cm: soil_moisture_0_to_1cm_unit } } = dataOpenMeteoApi;
        formatData = {
            elevation: elevation,
            precipitation_sum: [precipitation_sum[0], precipitation_sum_unit],
            soil_moisture_0_to_1cm: [soil_moisture_0_to_1cm[hoursNow], soil_moisture_0_to_1cm_unit],
            river_discharge_mean: [0, "m³/s"],
            hours: hoursNow,
        };
    } else if (dataFloodApi && dataOpenMeteoApi == undefined) {
        const { daily: { river_discharge_mean }, daily_units: { river_discharge_mean: river_discharge_mean_unit } } = dataFloodApi;
        formatData = {
            elevation: 0,
            precipitation_sum: [0, "mm"],
            soil_moisture_0_to_1cm: [0, "m³/m³"],
            river_discharge_mean: [river_discharge_mean[0], river_discharge_mean_unit],
            hours: hoursNow,
        };
    }

    const floodPrediction = await logicFloodPrediction(formatData);

    return NextResponse.json({
        floodPrediction: floodPrediction,
        lat: lat,
        lng: lng
    });
}