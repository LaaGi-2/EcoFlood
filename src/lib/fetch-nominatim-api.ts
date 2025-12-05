export async function fetchNominatimApi(latitude: number, longitude: number) {
    try {
        const responseOpenMeteoAPI = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        return responseOpenMeteoAPI.json();
    } catch (error) {
        console.error('Error: ',error);
    }
}