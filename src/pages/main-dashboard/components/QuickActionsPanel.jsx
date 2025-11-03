import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ 
  onViewSchedule,
  onAdjustSettings,
  onEmergencyHelp,
  onVoiceGuidance
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h3>

      <div className="space-y-3">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onViewSchedule}
          iconName="Calendar"
          iconPosition="left"
        >
          View Schedule
        </Button>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onAdjustSettings}
          iconName="Settings"
          iconPosition="left"
        >
          Adjust Settings
        </Button>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onVoiceGuidance}
          iconName="Volume2"
          iconPosition="left"
        >
          Voice Guidance
        </Button>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onEmergencyHelp}
          iconName="Phone"
          iconPosition="left"
          className="text-error border-error hover:bg-error hover:text-error-foreground"
        >
          Emergency Help
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsPanel;