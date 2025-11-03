import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const StatusCard = ({ 
  status = 'pending', // 'yes', 'no', 'pending', 'active'
  title = "Irrigation Recommendation",
  message = "",
  weatherCondition = "",
  soilMoisture = "",
  nextCheck = "",
  onAction,
  actionLabel = "View Details",
  className = ""
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'yes':
        return {
          bgColor: 'bg-success',
          textColor: 'text-success-foreground',
          icon: 'Droplets',
          iconColor: 'white',
          borderColor: 'border-success',
          title: 'Irrigate Now',
          defaultMessage: 'Your crops need water based on current conditions.'
        };
      case 'no':
        return {
          bgColor: 'bg-muted',
          textColor: 'text-foreground',
          icon: 'CloudRain',
          iconColor: 'var(--color-muted-foreground)',
          borderColor: 'border-muted',
          title: 'No Irrigation Needed',
          defaultMessage: 'Soil moisture levels are adequate for now.'
        };
      case 'active':
        return {
          bgColor: 'bg-primary',
          textColor: 'text-primary-foreground',
          icon: 'Play',
          iconColor: 'white',
          borderColor: 'border-primary',
          title: 'Irrigation Active',
          defaultMessage: 'Currently watering your crops.'
        };
      case 'warning':
        return {
          bgColor: 'bg-warning',
          textColor: 'text-warning-foreground',
          icon: 'AlertTriangle',
          iconColor: 'white',
          borderColor: 'border-warning',
          title: 'Attention Required',
          defaultMessage: 'Check your irrigation system.'
        };
      default:
        return {
          bgColor: 'bg-card',
          textColor: 'text-card-foreground',
          icon: 'Clock',
          iconColor: 'var(--color-muted-foreground)',
          borderColor: 'border-border',
          title: 'Calculating...',
          defaultMessage: 'Analyzing weather and soil conditions.'
        };
    }
  };

  const config = getStatusConfig();
  const displayMessage = message || config?.defaultMessage;

  return (
    <div className={`w-full ${className}`}>
      {/* Main Status Card */}
      <div className={`
        relative overflow-hidden rounded-xl border-2 ${config?.borderColor} 
        ${config?.bgColor} ${config?.textColor} card-shadow
        transition-all duration-300 ag-transition
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4">
            <Icon name={config?.icon} size={120} color="currentColor" />
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 lg:p-8">
          <div className="flex items-start space-x-4">
            {/* Status Icon */}
            <div className="flex-shrink-0">
              <div className={`
                flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 
                rounded-full bg-white/20 backdrop-blur-sm
                ${status === 'yes' ? 'animate-pulse-gentle' : ''}
              `}>
                <Icon 
                  name={config?.icon} 
                  size={32} 
                  color={config?.iconColor}
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Status Content */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                {title || config?.title}
              </h2>
              <p className="text-base lg:text-lg font-body opacity-90 mb-4">
                {displayMessage}
              </p>

              {/* Action Button */}
              {onAction && (
                <Button
                  variant={status === 'yes' ? 'secondary' : 'outline'}
                  size="lg"
                  onClick={onAction}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="touch-target"
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Supporting Information Cards */}
      {(weatherCondition || soilMoisture || nextCheck) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {weatherCondition && (
            <div className="bg-card border border-border rounded-lg p-4 card-shadow">
              <div className="flex items-center space-x-3">
                <Icon name="Cloud" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                    Weather
                  </p>
                  <p className="text-sm font-body text-foreground font-medium">
                    {weatherCondition}
                  </p>
                </div>
              </div>
            </div>
          )}

          {soilMoisture && (
            <div className="bg-card border border-border rounded-lg p-4 card-shadow">
              <div className="flex items-center space-x-3">
                <Icon name="Thermometer" size={20} color="var(--color-secondary)" />
                <div>
                  <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                    Soil Moisture
                  </p>
                  <p className="text-sm font-mono text-foreground font-medium">
                    {soilMoisture}
                  </p>
                </div>
              </div>
            </div>
          )}

          {nextCheck && (
            <div className="bg-card border border-border rounded-lg p-4 card-shadow">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} color="var(--color-accent)" />
                <div>
                  <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                    Next Check
                  </p>
                  <p className="text-sm font-body text-foreground font-medium">
                    {nextCheck}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusCard;