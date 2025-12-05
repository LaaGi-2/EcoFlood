interface FloodApi {
    daily: {
        river_discharge_mean: Array<number>
    },
    daily_units: {
        river_discharge_mean: string
    }
}

export default FloodApi;