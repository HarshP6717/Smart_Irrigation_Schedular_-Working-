import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ 
  mode = 'login',
  className = "" 
}) => {
  const getHeaderConfig = () => {
    if (mode === 'login') {
      return {
        title: "Welcome Back",
        subtitle: "Sign in to access your irrigation dashboard",
        icon: "LogIn",
        iconColor: "var(--color-primary)"
      };
    } else {
      return {
        title: "Create Account",
        subtitle: "Join thousands of farmers optimizing their irrigation",
        icon: "UserPlus",
        iconColor: "var(--color-secondary)"
      };
    }
  };

  const config = getHeaderConfig();

  return (
    <div className={`text-center mb-8 ${className}`}>
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-muted rounded-full">
        <Icon 
          name={config?.icon} 
          size={32} 
          color={config?.iconColor}
          strokeWidth={2}
        />
      </div>
      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">
        {config?.title}
      </h1>
      {/* Subtitle */}
      <p className="text-base lg:text-lg font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
        {config?.subtitle}
      </p>
      {/* Features List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
          <Icon name="Droplets" size={20} color="var(--color-primary)" />
          <span className="text-sm font-body text-foreground">
            Smart Irrigation
          </span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
          <Icon name="CloudRain" size={20} color="var(--color-secondary)" />
          <span className="text-sm font-body text-foreground">
            Weather Insights
          </span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
          <Icon name="TrendingUp" size={20} color="var(--color-success)" />
          <span className="text-sm font-body text-foreground">
            Water Savings
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;