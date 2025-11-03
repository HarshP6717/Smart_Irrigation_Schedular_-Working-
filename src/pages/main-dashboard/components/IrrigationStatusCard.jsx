import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IrrigationStatusCard = ({ 
  status = 'no', 
  nextIrrigation = 'Tomorrow at 6:00 AM',
  waterAmount = '200L',
  onViewSchedule,
  onAdjustSchedule 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'yes':
        return {
          icon: 'Droplets',
          color: 'var(--color-primary)',
          bgColor: 'bg-primary/10',
          title: 'Irrigation Active',
          message: 'Your crops are being watered'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'var(--color-warning)',
          bgColor: 'bg-warning/10',
          title: 'Irrigation Scheduled',
          message: 'Irrigation will start soon'
        };
      default:
        return {
          icon: 'CloudRain',
          color: 'var(--color-secondary)',
          bgColor: 'bg-secondary/10',
          title: 'No Irrigation Needed',
          message: 'Optimal soil moisture detected'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${statusConfig.bgColor}`}>
            <Icon name={statusConfig.icon} size={24} color={statusConfig.color} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {statusConfig.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {statusConfig.message}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-muted-foreground">Next Irrigation:</span>
          <span className="text-sm font-mono text-foreground">{nextIrrigation}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-muted-foreground">Water Amount:</span>
          <span className="text-sm font-mono text-foreground">{waterAmount}</span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="default"
          size="sm"
          onClick={onViewSchedule}
          iconName="Calendar"
          iconPosition="left"
          className="flex-1"
        >
          View Schedule
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdjustSchedule}
          iconName="Settings"
          iconPosition="left"
          className="flex-1"
        >
          Adjust
        </Button>
      </div>
    </div>
  );
};

export default IrrigationStatusCard;