export async function fetchFloodApi(latitude: number, longitude: number) {
    try {
        const responseFloodApi = await fetch(`https://flood-api.open-meteo.com/v1/flood?latitude=${latitude}&longitude=${longitude}&daily=river_discharge_mean&timezone=Asia%2FBangkok&forecast_days=1`);
        return responseFloodApi.json();
    } catch (error) {
        console.error('Error: ',error);
    }
}