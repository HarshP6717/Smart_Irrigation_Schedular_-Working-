import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherImpactSummary = ({ 
  currentWeather = {
    condition: 'Sunny',
    temperature: '28°C',
    humidity: '65%',
    windSpeed: '12 km/h'
  },
  forecast = [],
  impactMessage = '',
  className = ''
}) => {
  const defaultForecast = [
    { day: 'Today', condition: 'Sunny', temp: '28°C', rain: '0%', icon: 'Sun' },
    { day: 'Tomorrow', condition: 'Cloudy', temp: '26°C', rain: '20%', icon: 'Cloud' },
    { day: 'Day 3', condition: 'Rain', temp: '24°C', rain: '80%', icon: 'CloudRain' }
  ];

  const displayForecast = forecast?.length > 0 ? forecast : defaultForecast;

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase();
    if (conditionLower?.includes('rain') || conditionLower?.includes('shower')) return 'CloudRain';
    if (conditionLower?.includes('cloud') || conditionLower?.includes('overcast')) return 'Cloud';
    if (conditionLower?.includes('sun') || conditionLower?.includes('clear')) return 'Sun';
    if (conditionLower?.includes('storm')) return 'Zap';
    return 'Sun';
  };

  const getConditionColor = (condition) => {
    const conditionLower = condition?.toLowerCase();
    if (conditionLower?.includes('rain') || conditionLower?.includes('storm')) return 'var(--color-primary)';
    if (conditionLower?.includes('cloud')) return 'var(--color-muted-foreground)';
    if (conditionLower?.includes('sun') || conditionLower?.includes('clear')) return 'var(--color-warning)';
    return 'var(--color-secondary)';
  };

  const getRainProbability = (day) => {
    return day?.rain || (day?.condition?.toLowerCase()?.includes('rain') ? '80%' : '10%');
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 card-shadow">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg">
            <Icon name="CloudSun" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Weather Impact
            </h3>
            <p className="text-sm font-caption text-muted-foreground">
              3-day irrigation forecast
            </p>
          </div>
        </div>

        {/* Current Weather */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-heading font-medium text-foreground">
              Current Conditions
            </h4>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getWeatherIcon(currentWeather?.condition)} 
                size={24} 
                color={getConditionColor(currentWeather?.condition)}
              />
              <span className="text-lg font-mono font-bold text-foreground">
                {currentWeather?.temperature}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Thermometer" size={16} color="var(--color-secondary)" />
              <div>
                <p className="text-xs font-caption text-muted-foreground">Temp</p>
                <p className="text-sm font-mono text-foreground font-medium">
                  {currentWeather?.temperature}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={16} color="var(--color-primary)" />
              <div>
                <p className="text-xs font-caption text-muted-foreground">Humidity</p>
                <p className="text-sm font-mono text-foreground font-medium">
                  {currentWeather?.humidity}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Wind" size={16} color="var(--color-accent)" />
              <div>
                <p className="text-xs font-caption text-muted-foreground">Wind</p>
                <p className="text-sm font-mono text-foreground font-medium">
                  {currentWeather?.windSpeed}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} color="var(--color-muted-foreground)" />
              <div>
                <p className="text-xs font-caption text-muted-foreground">Visibility</p>
                <p className="text-sm font-mono text-foreground font-medium">
                  Good
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="mb-6">
          <h4 className="text-lg font-heading font-medium text-foreground mb-4">
            3-Day Forecast
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayForecast?.map((day, index) => (
              <div 
                key={index}
                className="p-4 bg-muted/20 rounded-lg border border-muted hover:bg-muted/30 transition-colors ag-transition"
              >
                <div className="text-center">
                  <p className="text-sm font-body text-muted-foreground mb-2">
                    {day?.day}
                  </p>
                  <div className="flex justify-center mb-3">
                    <Icon 
                      name={day?.icon || getWeatherIcon(day?.condition)} 
                      size={32} 
                      color={getConditionColor(day?.condition)}
                    />
                  </div>
                  <p className="text-lg font-mono font-bold text-foreground mb-1">
                    {day?.temp}
                  </p>
                  <p className="text-sm font-body text-foreground mb-2">
                    {day?.condition}
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="CloudRain" size={14} color="var(--color-primary)" />
                    <span className="text-xs font-mono text-primary font-medium">
                      {getRainProbability(day)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Message */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} color="var(--color-primary)" />
            <div>
              <p className="text-sm font-body text-primary font-medium mb-1">
                Irrigation Recommendation
              </p>
              <p className="text-xs font-caption text-primary/80">
                {impactMessage || 'Based on current weather conditions and forecast, irrigation timing has been optimized to avoid rain periods and maximize water efficiency.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherImpactSummary;