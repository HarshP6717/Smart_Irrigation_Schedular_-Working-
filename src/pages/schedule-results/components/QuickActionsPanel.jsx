import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ 
  onViewDashboard,
  onAdjustSettings,
  onGetHelp,
  onRepeatVoice,
  className = ''
}) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleGetHelp = () => {
    setIsHelpModalOpen(true);
    if (onGetHelp) onGetHelp();
  };

  const handleCloseHelp = () => {
    setIsHelpModalOpen(false);
  };

  const emergencyContacts = [
    {
      title: 'Agricultural Helpline',
      number: '1800-180-1551',
      description: 'Government agricultural support',
      icon: 'Phone'
    },
    {
      title: 'Technical Support',
      number: '1800-123-4567',
      description: 'App technical assistance',
      icon: 'Headphones'
    },
    {
      title: 'Local Extension Officer',
      number: '+91-98765-43210',
      description: 'Regional farming guidance',
      icon: 'User'
    }
  ];

  return (
    <>
      <div className={`w-full ${className}`}>
        <div className="bg-card border border-border rounded-xl p-6 lg:p-8 card-shadow">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg">
              <Icon name="Zap" size={24} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-foreground">
                Quick Actions
              </h3>
              <p className="text-sm font-caption text-muted-foreground">
                Manage your irrigation system
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button
              variant="default"
              size="lg"
              onClick={onViewDashboard}
              iconName="BarChart3"
              iconPosition="left"
              fullWidth
              className="h-16 text-lg font-semibold touch-target"
            >
              <div className="text-left">
                <div>View Dashboard</div>
                <div className="text-sm opacity-80 font-normal">
                  See detailed analytics
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onAdjustSettings}
              iconName="Settings"
              iconPosition="left"
              fullWidth
              className="h-16 text-lg font-semibold touch-target"
            >
              <div className="text-left">
                <div>Adjust Settings</div>
                <div className="text-sm opacity-80 font-normal">
                  Modify preferences
                </div>
              </div>
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={onRepeatVoice}
              iconName="Volume2"
              iconPosition="top"
              fullWidth
              className="h-20 flex-col space-y-2 touch-target"
            >
              <span className="text-sm font-medium">Repeat</span>
              <span className="text-xs opacity-70">Voice Guide</span>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={handleGetHelp}
              iconName="HelpCircle"
              iconPosition="top"
              fullWidth
              className="h-20 flex-col space-y-2 touch-target"
            >
              <span className="text-sm font-medium">Get Help</span>
              <span className="text-xs opacity-70">SOS Support</span>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.location.href = '/language-selection'}
              iconName="Globe"
              iconPosition="top"
              fullWidth
              className="h-20 flex-col space-y-2 touch-target"
            >
              <span className="text-sm font-medium">Language</span>
              <span className="text-xs opacity-70">Switch</span>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.location?.reload()}
              iconName="RefreshCw"
              iconPosition="top"
              fullWidth
              className="h-20 flex-col space-y-2 touch-target"
            >
              <span className="text-sm font-medium">Refresh</span>
              <span className="text-xs opacity-70">Update Data</span>
            </Button>
          </div>

          {/* Status Indicator */}
          <div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-body text-success">
                System online • Last updated: {new Date()?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 card-shadow">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-error/20 rounded-lg">
                  <Icon name="AlertCircle" size={24} color="var(--color-error)" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Emergency Help
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseHelp}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-4 mb-6">
              {emergencyContacts?.map((contact, index) => (
                <div 
                  key={index}
                  className="p-4 bg-muted/30 rounded-lg border border-muted"
                >
                  <div className="flex items-start space-x-3">
                    <Icon name={contact?.icon} size={20} color="var(--color-primary)" />
                    <div className="flex-1">
                      <h4 className="text-sm font-body font-medium text-foreground mb-1">
                        {contact?.title}
                      </h4>
                      <p className="text-xs font-caption text-muted-foreground mb-2">
                        {contact?.description}
                      </p>
                      <a 
                        href={`tel:${contact?.number}`}
                        className="text-lg font-mono font-bold text-primary hover:text-primary/80 transition-colors"
                      >
                        {contact?.number}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={handleCloseHelp}
              fullWidth
              className="touch-target"
            >
              Close Help
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsPanel;