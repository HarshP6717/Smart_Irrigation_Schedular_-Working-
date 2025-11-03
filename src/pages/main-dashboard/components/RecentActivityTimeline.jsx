import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      type: 'irrigation',
      title: 'Irrigation Completed',
      description: 'Zone A watered for 30 minutes',
      time: '2 hours ago',
      icon: 'Droplets',
      color: 'var(--color-primary)'
    },
    {
      id: 2,
      type: 'weather',
      title: 'Weather Update',
      description: 'Rain expected tomorrow',
      time: '4 hours ago',
      icon: 'CloudRain',
      color: 'var(--color-secondary)'
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Schedule Adjusted',
      description: 'Next irrigation postponed',
      time: '6 hours ago',
      icon: 'Calendar',
      color: 'var(--color-warning)'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Check',
      description: 'All sensors working normally',
      time: '1 day ago',
      icon: 'CheckCircle',
      color: 'var(--color-success)'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                <Icon name={activity.icon} size={16} color={activity.color} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground mb-1">
                {activity.description}
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 font-body">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivityTimeline;