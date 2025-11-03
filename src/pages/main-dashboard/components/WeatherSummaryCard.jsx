import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherSummaryCard = ({ 
  currentTemp = '28°C',
  condition = 'Partly Cloudy',
  humidity = '65%',
  rainfall = '0mm',
  windSpeed = '12 km/h'
}) => {
  const getWeatherIcon = (condition) => {
    if (condition.includes('Rain')) return 'CloudRain';
    if (condition.includes('Cloud')) return 'Cloud';
    if (condition.includes('Sun')) return 'Sun';
    return 'Sun';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Current Weather
        </h3>
        <Icon name={getWeatherIcon(condition)} size={24} color="var(--color-warning)" />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="text-3xl font-mono font-bold text-foreground">
          {currentTemp}
        </div>
        <div className="text-sm text-muted-foreground">
          {condition}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Icon name="Droplets" size={16} color="var(--color-primary)" className="mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Humidity</div>
          <div className="text-sm font-mono text-foreground">{humidity}</div>
        </div>
        <div className="text-center">
          <Icon name="CloudRain" size={16} color="var(--color-secondary)" className="mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Rainfall</div>
          <div className="text-sm font-mono text-foreground">{rainfall}</div>
        </div>
        <div className="text-center">
          <Icon name="Wind" size={16} color="var(--color-accent)" className="mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Wind</div>
          <div className="text-sm font-mono text-foreground">{windSpeed}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummaryCard;