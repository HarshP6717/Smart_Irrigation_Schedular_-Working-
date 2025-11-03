import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherForecast = () => {
  const forecast = [
    { day: 'Today', temp: '28°C', condition: 'Sunny', icon: 'Sun', rain: '0%' },
    { day: 'Tomorrow', temp: '26°C', condition: 'Cloudy', icon: 'Cloud', rain: '20%' },
    { day: 'Wed', temp: '24°C', condition: 'Rain', icon: 'CloudRain', rain: '80%' },
    { day: 'Thu', temp: '25°C', condition: 'Partly Cloudy', icon: 'CloudSun', rain: '30%' },
    { day: 'Fri', temp: '27°C', condition: 'Sunny', icon: 'Sun', rain: '10%' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          5-Day Forecast
        </h3>
        <Icon name="Calendar" size={20} color="var(--color-primary)" />
      </div>

      <div className="grid grid-cols-5 gap-3">
        {forecast.map((day, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-xs font-body text-muted-foreground mb-2">
              {day.day}
            </div>
            <Icon 
              name={day.icon} 
              size={24} 
              color="var(--color-warning)" 
              className="mx-auto mb-2"
            />
            <div className="text-sm font-mono font-bold text-foreground mb-1">
              {day.temp}
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
              <Icon name="Droplets" size={10} />
              <span>{day.rain}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;