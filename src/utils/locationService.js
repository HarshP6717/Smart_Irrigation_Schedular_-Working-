// GPS Location Detection Service
const locationService = {
  // Get current GPS location
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocode to get city name
            const cityName = await locationService.getCityFromCoords(latitude, longitude);
            
            resolve({
              latitude,
              longitude,
              city: cityName,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp
            });
          } catch (error) {
            // Return coords even if reverse geocoding fails
            resolve({
              latitude,
              longitude,
              city: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp
            });
          }
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },

  // Reverse geocode coordinates to city name using OpenWeatherMap
  getCityFromCoords: async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = data[0];
        return location.name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      }
      
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  },

  // Check if location services are available
  isLocationAvailable: () => {
    return 'geolocation' in navigator;
  },

  // Request location permission
  requestLocationPermission: async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state; // 'granted', 'denied', or 'prompt'
    } catch (error) {
      return 'prompt'; // Default to prompt if permission API not available
    }
  }
};

export default locationService;
