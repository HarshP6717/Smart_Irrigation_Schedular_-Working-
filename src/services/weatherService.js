import axios from 'axios';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = {
  // Get current weather by coordinates
  getCurrentWeather: async (lat, lon) => {
    try {
      const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      return {
        temp: Math.round(response.data.main.temp),
        feelsLike: Math.round(response.data.main.feels_like),
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
        condition: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        clouds: response.data.clouds.all,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        rainfall: response.data.rain?.['1h'] || 0, // Rainfall in last hour
      };
    } catch (error) {
      console.error('Weather API error:', error);
      throw error.response?.data || { message: 'Failed to fetch weather data' };
    }
  },

  // Get current weather by city name
  getCurrentWeatherByCity: async (cityName) => {
    try {
      const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      return {
        temp: Math.round(response.data.main.temp),
        feelsLike: Math.round(response.data.main.feels_like),
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
        condition: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        clouds: response.data.clouds.all,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        rainfall: response.data.rain?.['1h'] || 0, // Rainfall in last hour
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        },
      };
    } catch (error) {
      console.error('Weather API error:', error);
      throw error.response?.data || { message: 'Failed to fetch weather data' };
    }
  },

  // Get 5-day forecast
  getForecast: async (lat, lon) => {
    try {
      const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      
      // Process forecast data - get one forecast per day
      const dailyForecasts = [];
      const processedDates = new Set();
      
      response.data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!processedDates.has(date) && dailyForecasts.length < 5) {
          processedDates.add(date);
          dailyForecasts.push({
            date: item.dt,
            temp: Math.round(item.main.temp),
            tempMin: Math.round(item.main.temp_min),
            tempMax: Math.round(item.main.temp_max),
            humidity: item.main.humidity,
            condition: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
            rain: item.rain?.['3h'] || 0,
            clouds: item.clouds.all,
          });
        }
      });
      
      return dailyForecasts;
    } catch (error) {
      console.error('Forecast API error:', error);
      throw error.response?.data || { message: 'Failed to fetch forecast data' };
    }
  },

  // Get forecast by city name
  getForecastByCity: async (cityName) => {
    try {
      const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
        params: {
          q: cityName,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });
      
      // Process forecast data - get one forecast per day
      const dailyForecasts = [];
      const processedDates = new Set();
      
      response.data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!processedDates.has(date) && dailyForecasts.length < 5) {
          processedDates.add(date);
          dailyForecasts.push({
            date: item.dt,
            temp: Math.round(item.main.temp),
            tempMin: Math.round(item.main.temp_min),
            tempMax: Math.round(item.main.temp_max),
            humidity: item.main.humidity,
            condition: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
            rain: item.rain?.['3h'] || 0,
            clouds: item.clouds.all,
          });
        }
      });
      
      return dailyForecasts;
    } catch (error) {
      console.error('Forecast API error:', error);
      throw error.response?.data || { message: 'Failed to fetch forecast data' };
    }
  },

  // Calculate irrigation recommendation based on weather
  getIrrigationRecommendation: (weatherData, cropType, soilType) => {
    const { temp, humidity, rain, condition } = weatherData;
    
    // Base water requirement (liters per square meter)
    let baseWaterNeed = 5;
    
    // Adjust for temperature
    if (temp > 35) baseWaterNeed += 3;
    else if (temp > 30) baseWaterNeed += 2;
    else if (temp > 25) baseWaterNeed += 1;
    else if (temp < 15) baseWaterNeed -= 1;
    
    // Adjust for humidity
    if (humidity < 30) baseWaterNeed += 2;
    else if (humidity < 50) baseWaterNeed += 1;
    else if (humidity > 80) baseWaterNeed -= 1;
    
    // Adjust for rain
    if (rain > 5) baseWaterNeed = 0; // No irrigation needed
    else if (rain > 2) baseWaterNeed *= 0.3;
    else if (rain > 0) baseWaterNeed *= 0.5;
    
    // Adjust for weather condition
    if (condition === 'Rain' || condition === 'Drizzle') {
      baseWaterNeed = 0;
    } else if (condition === 'Clear') {
      baseWaterNeed *= 1.2;
    }
    
    // Crop-specific adjustments
    const cropMultipliers = {
      rice: 1.5,
      wheat: 1.0,
      corn: 1.2,
      tomato: 1.3,
      potato: 1.1,
      onion: 0.9,
      cotton: 1.4,
      sugarcane: 1.6,
    };
    
    // Soil-specific adjustments
    const soilMultipliers = {
      sandy: 1.3,
      loamy: 1.0,
      clay: 0.8,
      silty: 0.9,
    };
    
    baseWaterNeed *= (cropMultipliers[cropType?.toLowerCase()] || 1.0);
    baseWaterNeed *= (soilMultipliers[soilType?.toLowerCase()] || 1.0);
    
    return {
      waterNeed: Math.max(0, Math.round(baseWaterNeed * 10) / 10),
      shouldIrrigate: baseWaterNeed > 0,
      reason: rain > 0 ? 'Rain expected' : temp > 35 ? 'High temperature' : 'Normal conditions',
    };
  },
};

export default weatherService;
