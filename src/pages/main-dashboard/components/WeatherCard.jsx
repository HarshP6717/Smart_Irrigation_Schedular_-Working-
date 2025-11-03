import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Icon from '../../../components/AppIcon';

const WeatherCard = ({ weather, forecast, loading, recommendation }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <div className="text-center py-8">
          <Icon name="Cloud" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">{t('weather.current')} - {t('errors.networkError')}</p>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: 'Sun',
      Clouds: 'Cloud',
      Rain: 'CloudRain',
      Drizzle: 'CloudDrizzle',
      Thunderstorm: 'CloudLightning',
      Snow: 'CloudSnow',
      Mist: 'CloudFog',
      Fog: 'CloudFog',
    };
    return icons[condition] || 'Cloud';
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    return format(new Date(timestamp * 1000), 'HH:mm');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-border rounded-xl p-6 card-shadow overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      
      {/* Current Weather */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-foreground">
            {t('weather.current')}
          </h3>
          <div className="text-xs text-muted-foreground">
            {format(new Date(), 'MMM dd, HH:mm')}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name={getWeatherIcon(weather.condition)} size={48} color="var(--color-primary)" />
            </div>
            <div>
              <div className="text-5xl font-bold text-foreground mb-1">
                {weather.temp !== undefined ? `${weather.temp}°` : '--°'}
              </div>
              <div className="text-base text-foreground/80 capitalize mb-1">
                {weather.description || weather.condition || 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">
                Feels like {weather.feelsLike !== undefined ? `${weather.feelsLike}°C` : '--°C'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 relative z-10">
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Droplets" size={16} color="#3b82f6" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Humidity</span>
          </div>
          <div className="text-xl font-bold text-foreground">{weather.humidity || 0}%</div>
        </div>
        
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Wind" size={16} color="#22c55e" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Wind</span>
          </div>
          <div className="text-xl font-bold text-foreground">{weather.windSpeed || 0} <span className="text-sm font-normal">km/h</span></div>
        </div>
        
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Gauge" size={16} color="#a855f7" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Pressure</span>
          </div>
          <div className="text-xl font-bold text-foreground">{weather.pressure || 0} <span className="text-sm font-normal">hPa</span></div>
        </div>
        
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={16} color="#f97316" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Visibility</span>
          </div>
          <div className="text-xl font-bold text-foreground">{weather.visibility ? (weather.visibility / 1000).toFixed(1) : 0} <span className="text-sm font-normal">km</span></div>
        </div>
        
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gray-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Cloud" size={16} color="#6b7280" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Clouds</span>
          </div>
          <div className="text-xl font-bold text-foreground">{weather.clouds || 0}%</div>
        </div>
        
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 transition-all">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Icon name="Sunrise" size={16} color="#eab308" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Sunrise</span>
          </div>
          <div className="text-lg font-bold text-foreground">{formatTime(weather.sunrise)}</div>
        </div>
      </div>
      
      {/* Additional Weather Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Sunset" size={20} color="#f97316" />
                <span className="text-sm text-muted-foreground font-medium">Sunset</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{formatTime(weather.sunset)}</div>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Icon name="Sunset" size={24} color="#f97316" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Thermometer" size={20} color="#3b82f6" />
                <span className="text-sm text-muted-foreground font-medium">Temperature Range</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {weather.temp !== undefined ? `${weather.temp}°C` : '--°C'}
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Icon name="Thermometer" size={24} color="#3b82f6" />
            </div>
          </div>
        </div>
      </div>

      {/* Irrigation Recommendation */}
      {recommendation && (
        <div className={`rounded-xl p-4 mb-6 relative z-10 border-2 ${recommendation.shouldIrrigate ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30' : 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'}`}>
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${recommendation.shouldIrrigate ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
              <Icon 
                name={recommendation.shouldIrrigate ? 'Droplet' : 'CloudRain'} 
                size={24} 
                color={recommendation.shouldIrrigate ? '#3b82f6' : '#22c55e'} 
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1 text-base">
                {recommendation.shouldIrrigate ? '💧 Irrigation Recommended' : '✓ No Irrigation Needed'}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {recommendation.reason}
              </p>
              {recommendation.waterNeed > 0 && (
                <div className="inline-flex items-center space-x-2 bg-card/50 rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground">
                  <Icon name="Droplets" size={14} color="var(--color-primary)" />
                  <span>{recommendation.waterNeed}L/m² recommended</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border/50 relative z-10">
          <h4 className="text-base font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Calendar" size={18} className="mr-2" color="var(--color-primary)" />
            5-Day Forecast
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {forecast.slice(0, 5).map((day, index) => (
              <div key={index} className="text-center bg-card/70 backdrop-blur-sm rounded-xl p-3 border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="text-xs font-semibold text-foreground mb-2">
                  {format(new Date(day.date * 1000), 'EEE')}
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon 
                    name={getWeatherIcon(day.condition)} 
                    size={20} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div className="text-lg font-bold text-foreground mb-1">{day.temp}°</div>
                <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground mb-1">
                  <Icon name="Droplets" size={10} />
                  <span>{day.humidity}%</span>
                </div>
                {day.rain > 0 && (
                  <div className="flex items-center justify-center space-x-1 text-xs text-blue-500">
                    <Icon name="CloudRain" size={10} />
                    <span>{day.rain.toFixed(1)}mm</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
