import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ScheduleResults = () => {
  const navigate = useNavigate();

  const schedules = [
    {
      id: 1,
      time: '06:00 AM',
      duration: '30 min',
      zone: 'Zone A - Wheat',
      waterAmount: '200L',
      status: 'scheduled'
    },
    {
      id: 2,
      time: '07:30 AM',
      duration: '45 min',
      zone: 'Zone B - Tomatoes',
      waterAmount: '300L',
      status: 'scheduled'
    },
    {
      id: 3,
      time: '06:00 PM',
      duration: '25 min',
      zone: 'Zone C - Onions',
      waterAmount: '150L',
      status: 'scheduled'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Today's Irrigation Schedule
          </h1>
          <p className="text-muted-foreground">
            Optimized based on weather and soil conditions
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {schedules.map(schedule => (
            <div key={schedule.id} className="bg-card border border-border rounded-xl p-6 card-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {schedule.time}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {schedule.zone}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-foreground">{schedule.duration}</p>
                  <p className="text-sm text-muted-foreground">{schedule.waterAmount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 justify-center">
          <Button 
            onClick={() => navigate('/main-dashboard')}
            iconName="Home"
            iconPosition="left"
          >
            Back to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/crop-and-soil-selection')}
            iconName="Settings"
            iconPosition="left"
          >
            Adjust Schedule
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ScheduleResults;