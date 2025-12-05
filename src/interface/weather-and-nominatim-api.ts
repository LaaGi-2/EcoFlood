/* eslint-disable @typescript-eslint/no-explicit-any */
interface WeatherAndNominatimApi {
    elevation: number,
    precipitation_sum: Array<any>,
    soil_moisture_0_to_1cm: Array<any>,
    river_discharge_mean: Array<any>,
    hours: number,
    address: string
}
 
export default WeatherAndNominatimApi;