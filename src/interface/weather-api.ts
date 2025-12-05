interface WeatherApi {
    elevation: number,
    daily: {
        precipitation_sum: Array<number>,
    },
    daily_units: {
        precipitation_sum: string
    },
    hourly: {
        soil_moisture_0_to_1cm: Array<number>,
    },
    hourly_units: {
        soil_moisture_0_to_1cm: string
    },
    hours: number
}

export default WeatherApi;