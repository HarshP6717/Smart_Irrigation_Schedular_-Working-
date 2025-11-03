import React from 'react';
import Icon from '../AppIcon';

const WeatherSummary = ({ 
  currentTemp = "28°C",
  condition = "Sunny",
  humidity = "65%",
  windSpeed = "12 km/h",
  rainfall = "0mm",
  forecast = [],
  className = ""
}) => {
  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase();
    if (conditionLower?.includes('rain') || conditionLower?.includes('shower')) return 'CloudRain';
    if (conditionLower?.includes('cloud') || conditionLower?.includes('overcast')) return 'Cloud';
    if (conditionLower?.includes('sun') || conditionLower?.includes('clear')) return 'Sun';
    if (conditionLower?.includes('storm') || conditionLower?.includes('thunder')) return 'Zap';
    if (conditionLower?.includes('fog') || conditionLower?.includes('mist')) return 'CloudFog';
    return 'Sun';
  };

  const getConditionColor = (condition) => {
    const conditionLower = condition?.toLowerCase();
    if (conditionLower?.includes('rain') || conditionLower?.includes('storm')) return 'var(--color-primary)';
    if (conditionLower?.includes('cloud')) return 'var(--color-muted-foreground)';
    if (conditionLower?.includes('sun') || conditionLower?.includes('clear')) return 'var(--color-warning)';
    return 'var(--color-secondary)';
  };

  const defaultForecast = [
    { day: 'Today', temp: '28°C', condition: 'Sunny', icon: 'Sun' },
    { day: 'Tomorrow', temp: '26°C', condition: 'Cloudy', icon: 'Cloud' },
    { day: 'Wed', temp: '24°C', condition: 'Rain', icon: 'CloudRain' },
    { day: 'Thu', temp: '27°C', condition: 'Sunny', icon: 'Sun' },
  ];

  const displayForecast = forecast?.length > 0 ? forecast : defaultForecast;

  return (
    <div className={`w-full ${className}`}>
      {/* Current Weather Card */}
      <div className="bg-card border border-border rounded-xl p-6 card-shadow mb-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Current Weather
          </h3>
          <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
            <Icon name="RefreshCw" size={14} />
            <span>Updated now</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          {/* Temperature & Condition */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
              <Icon 
                name={getWeatherIcon(condition)} 
                size={32} 
                color={getConditionColor(condition)}
              />
            </div>
            <div>
              <p className="text-3xl font-mono font-bold text-foreground">
                {currentTemp}
              </p>
              <p className="text-sm font-body text-muted-foreground">
                {condition}
              </p>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name="Droplets" size={18} color="var(--color-primary)" />
            <div>
              <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                Humidity
              </p>
              <p className="text-sm font-mono text-foreground font-medium">
                {humidity}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Wind" size={18} color="var(--color-secondary)" />
            <div>
              <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                Wind Speed
              </p>
              <p className="text-sm font-mono text-foreground font-medium">
                {windSpeed}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="CloudRain" size={18} color="var(--color-accent)" />
            <div>
              <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                Rainfall
              </p>
              <p className="text-sm font-mono text-foreground font-medium">
                {rainfall}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Eye" size={18} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                Visibility
              </p>
              <p className="text-sm font-mono text-foreground font-medium">
                10km
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 4-Day Forecast */}
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          4-Day Forecast
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayForecast?.map((day, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors ag-transition"
            >
              <p className="text-sm font-body text-muted-foreground mb-2">
                {day?.day}
              </p>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card mb-2">
                <Icon 
                  name={day?.icon || getWeatherIcon(day?.condition)} 
                  size={20} 
                  color={getConditionColor(day?.condition)}
                />
              </div>
              <p className="text-lg font-mono font-bold text-foreground mb-1">
                {day?.temp}
              </p>
              <p className="text-xs font-caption text-muted-foreground text-center">
                {day?.condition}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Irrigation Impact */}
      <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-success)" />
          <div>
            <p className="text-sm font-body text-success font-medium mb-1">
              Irrigation Impact
            </p>
            <p className="text-xs font-caption text-success/80">
              Current conditions are favorable for irrigation. No rain expected in the next 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;