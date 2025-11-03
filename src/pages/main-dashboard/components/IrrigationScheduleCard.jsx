import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IrrigationScheduleCard = ({ schedule, loading, onGenerateSchedule, onViewSchedule }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  // Handle both array and object with schedules property
  const scheduleArray = Array.isArray(schedule) ? schedule : schedule?.schedules || [];
  
  if (!schedule || scheduleArray.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <h3 className="text-lg font-heading font-bold text-foreground mb-4">
          {t('irrigation.todaySchedule')}
        </h3>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={32} color="var(--color-primary)" />
          </div>
          <p className="text-muted-foreground mb-4">{t('irrigation.noSchedule')}</p>
          <Button
            onClick={onGenerateSchedule}
            iconName="Zap"
            iconPosition="left"
          >
            {t('irrigation.generateSchedule')}
          </Button>
        </div>
      </div>
    );
  }

  // Calculate total irrigation time
  const totalMinutes = scheduleArray.reduce((sum, item) => {
    // Handle duration in format "XX min" or "HH:MM"
    const durationStr = item.duration || '0 min';
    let minutes = 0;
    
    if (durationStr.includes(':')) {
      const [hours, mins] = durationStr.split(':').map(Number);
      minutes = (hours * 60) + mins;
    } else {
      // Extract number from "XX min" format
      minutes = parseInt(durationStr.match(/\d+/)?.[0] || '0');
    }
    
    return sum + minutes;
  }, 0);
  
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold text-foreground mb-1">
            {t('irrigation.todaySchedule')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {scheduleArray.length} sessions • {totalHours}h {remainingMinutes}m total
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewSchedule}
          iconName="Eye"
        >
          View All
        </Button>
      </div>

      {/* Schedule Items */}
      <div className="space-y-3">
        {scheduleArray.slice(0, 3).map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{item.time}</div>
                <div className="text-sm text-muted-foreground">
                  {item.zone || `Zone ${index + 1}`}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-mono font-semibold text-foreground">{item.duration}</div>
              <div className="text-sm text-muted-foreground">{item.waterAmount}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {schedule?.summary && (
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-primary)" />
            <div className="flex-1">
              <p className="text-sm text-foreground">{schedule.summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex space-x-3">
        <Button
          variant="outline"
          fullWidth
          onClick={onGenerateSchedule}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Regenerate
        </Button>
        <Button
          variant="primary"
          fullWidth
          onClick={onViewSchedule}
          iconName="Calendar"
          iconPosition="left"
        >
          {t('dashboard.viewSchedule')}
        </Button>
      </div>
    </div>
  );
};

export default IrrigationScheduleCard;
