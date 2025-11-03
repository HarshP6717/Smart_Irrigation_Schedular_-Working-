import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NextScheduleCard = ({ 
  nextIrrigationDate = '2025-09-30T06:00:00',
  estimatedAmount = '40L',
  weatherReason = 'Clear skies expected',
  className = ''
}) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextDate = new Date(nextIrrigationDate);
      const diff = nextDate?.getTime() - now?.getTime();

      if (diff <= 0) {
        setTimeRemaining('Now');
        setIsUrgent(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours < 24) {
        setTimeRemaining(`${hours}h ${minutes}m`);
        setIsUrgent(hours < 2);
      } else {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        setTimeRemaining(`${days}d ${remainingHours}h`);
        setIsUrgent(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextIrrigationDate]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short' 
      }),
      time: date?.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const { date, time } = formatDateTime(nextIrrigationDate);

  return (
    <div className={`w-full ${className}`}>
      <div className={`
        bg-card border-2 border-border rounded-xl p-6 lg:p-8 card-shadow
        transition-all duration-300 ag-transition
        ${isUrgent ? 'border-warning bg-warning/5' : ''}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
            Next Irrigation
          </h3>
          {isUrgent && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-warning/20 rounded-full">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
              <span className="text-sm font-caption text-warning font-medium">
                Soon
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Information */}
          <div className="space-y-4">
            {/* Countdown */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-caption text-muted-foreground uppercase tracking-wide mb-2">
                Time Remaining
              </p>
              <div className={`
                text-4xl lg:text-5xl font-mono font-bold mb-2
                ${isUrgent ? 'text-warning' : 'text-primary'}
              `}>
                {timeRemaining}
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} color="var(--color-secondary)" />
                <span className="text-lg font-body text-foreground font-medium">
                  {date}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} color="var(--color-accent)" />
                <span className="text-lg font-mono text-foreground font-medium">
                  {time}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Water Amount */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Droplets" size={24} color="var(--color-primary)" />
                <span className="text-sm font-caption text-muted-foreground">
                  Estimated Amount
                </span>
              </div>
              <span className="text-xl font-mono font-bold text-foreground">
                {estimatedAmount}
              </span>
            </div>

            {/* Weather Reason */}
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="CloudSun" size={20} color="var(--color-success)" />
                <div>
                  <p className="text-sm font-body text-success font-medium mb-1">
                    Weather Forecast
                  </p>
                  <p className="text-xs font-caption text-success/80">
                    {weatherReason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-muted-foreground">
              Until next irrigation
            </span>
            <span className="text-sm font-mono text-muted-foreground">
              {isUrgent ? '95%' : '60%'}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ag-transition ${
                isUrgent ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: isUrgent ? '95%' : '60%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextScheduleCard;