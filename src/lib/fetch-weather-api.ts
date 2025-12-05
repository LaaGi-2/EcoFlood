export async function fetchWeatherApi(latitude: number, longitude: number) {
    try {
        const responseOpenMeteoAPI = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum&hourly=soil_moisture_0_to_1cm&timezone=Asia%2FBangkok&forecast_days=1`);
        return responseOpenMeteoAPI.json();
    } catch (error) {
        console.error('Error: ',error);
    }
}