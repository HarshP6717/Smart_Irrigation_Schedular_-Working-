import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ className = "" }) => {
  return (
    <div className={`text-center mb-8 lg:mb-12 ${className}`}>
      {/* App Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primary rounded-xl card-shadow">
            <Icon name="Droplets" size={32} color="white" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
              Smart Irrigation
            </h1>
            <p className="text-base lg:text-lg font-body text-muted-foreground">
              Scheduler
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground mb-3">
          Welcome to Smart Irrigation
        </h2>
        <p className="text-base lg:text-lg font-body text-muted-foreground mb-2">
          Choose your preferred language to get started
        </p>
        <p className="text-sm font-caption text-muted-foreground">
          Optimize your water usage with intelligent scheduling
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="flex items-center justify-center space-x-4 mt-6 opacity-60">
        <Icon name="Sprout" size={20} color="var(--color-secondary)" />
        <div className="w-8 h-0.5 bg-border rounded-full" />
        <Icon name="CloudRain" size={20} color="var(--color-primary)" />
        <div className="w-8 h-0.5 bg-border rounded-full" />
        <Icon name="Sun" size={20} color="var(--color-warning)" />
      </div>
    </div>
  );
};

export default WelcomeHeader;