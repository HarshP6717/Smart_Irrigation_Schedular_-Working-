import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFarm } from '../../contexts/FarmContext';
import { useNotification } from '../../contexts/NotificationContext';
import weatherService from '../../services/weatherService';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const WeatherPage = () => {
  const { t } = useTranslation();
  const { selectedFarm } = useFarm();
  const { showError } = useNotification();
  
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, [selectedFarm]);

  const loadWeatherData = async () => {
    if (!selectedFarm?.city) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const currentWeather = await weatherService.getCurrentWeatherByCity(selectedFarm.city);
      setWeather(currentWeather);

      const forecastData = await weatherService.getForecastByCity(selectedFarm.city);
      setForecast(forecastData);
    } catch (error) {
      console.error('Weather fetch error:', error);
      showError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('rain')) return 'CloudRain';
    if (conditionLower.includes('cloud')) return 'Cloud';
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return 'Sun';
    if (conditionLower.includes('snow')) return 'CloudSnow';
    if (conditionLower.includes('thunder')) return 'CloudLightning';
    return 'Cloud';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!selectedFarm) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-20 max-w-2xl">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="MapPin" size={48} color="var(--color-primary)" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
              No Farm Selected
            </h2>
            <p className="text-muted-foreground mb-6">
              Please select a farm to view weather information
            </p>
            <Button onClick={() => window.location.href = '/farms'}>
              Go to Farms
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {t('nav.weather')}
          </h1>
          <p className="text-lg font-body text-muted-foreground">
            Weather forecast for {selectedFarm.name}
          </p>
        </div>

        {/* Current Weather Card */}
        {weather && (
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 lg:p-8 text-white mb-8 shadow-elevated">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/80 text-sm mb-1">Current Weather</p>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold">
                  {weather.temp}°C
                </h2>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name={getWeatherIcon(weather.condition)} size={48} color="white" />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Droplets" size={20} color="white" />
                  <p className="text-white/80 text-sm">Humidity</p>
                </div>
                <p className="text-2xl font-bold">{weather.humidity}%</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Wind" size={20} color="white" />
                  <p className="text-white/80 text-sm">Wind Speed</p>
                </div>
                <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CloudRain" size={20} color="white" />
                  <p className="text-white/80 text-sm">Rainfall</p>
                </div>
                <p className="text-2xl font-bold">{weather.rainfall || 0} mm</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Gauge" size={20} color="white" />
                  <p className="text-white/80 text-sm">Pressure</p>
                </div>
                <p className="text-2xl font-bold">{weather.pressure || 1013} hPa</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/90 text-lg font-medium">{weather.condition}</p>
              <p className="text-white/70 text-sm">Feels like {weather.feelsLike || weather.temp}°C</p>
            </div>
          </div>
        )}

        {/* 7-Day Forecast */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
            7-Day Forecast
          </h3>

          {forecast.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-accent/5 border border-accent/20 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-heading font-semibold text-foreground">
                        {new Date(day.date * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-muted-foreground">{new Date(day.date * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name={getWeatherIcon(day.condition)} size={24} color="var(--color-primary)" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Temp</span>
                      <span className="font-bold text-foreground">
                        {day.tempMax}° / {day.tempMin}°
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rain</span>
                      <span className="font-medium text-foreground">{day.rain || 0} mm</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Humidity</span>
                      <span className="font-medium text-foreground">{day.humidity}%</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-foreground font-medium">{day.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="CloudOff" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <p className="text-muted-foreground">No forecast data available</p>
              <Button onClick={loadWeatherData} variant="outline" className="mt-4">
                Retry
              </Button>
            </div>
          )}
        </div>

        {/* Weather Alerts */}
        <div className="mt-8 bg-warning/10 border border-warning/30 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Weather Advisory
              </h4>
              <p className="text-sm text-muted-foreground">
                Monitor weather conditions regularly for optimal irrigation scheduling. 
                Adjust your irrigation plans based on rainfall predictions to conserve water.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeatherPage;
