require("dotenv").config();
const openweathermapAPI = process.env.OPENWEATHER_API;

exports.climateRouter = async (request, response) => {
    const { city } = request.params;

    try {
        // Gets the latitude and longitude using city names as input
        const geolocationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openweathermapAPI}`);
        const geolocationData = await geolocationResponse.json();
        const lat = geolocationData[0].lat;
        const lon = geolocationData[0].lon;

        // console.log(lat, lon);

        // Gets weather information using the latitude and longitude from above code 
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweathermapAPI}`);
        const weatherData = await weatherResponse.json();
        
        return response.status(200).json({
            geolocationData: geolocationData,
            weatherData: weatherData,
        });
    }
    catch (error) {
        return response.status(500).json({
            error: error,
        });
    }
};
