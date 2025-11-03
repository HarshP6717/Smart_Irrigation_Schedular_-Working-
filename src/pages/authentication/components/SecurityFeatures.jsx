import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = ({ className = "" }) => {
  const features = [
    {
      icon: "Shield",
      title: "Secure Authentication",
      description: "Your account is protected with industry-standard security measures"
    },
    {
      icon: "Lock",
      title: "Data Privacy",
      description: "Your farm data and personal information remain completely private"
    },
    {
      icon: "Smartphone",
      title: "Mobile Optimized",
      description: "Access your irrigation dashboard from any device, anywhere"
    },
    {
      icon: "Wifi",
      title: "Offline Support",
      description: "Continue using core features even without internet connection"
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Why Choose Smart Irrigation?
        </h3>
        <p className="text-sm font-body text-muted-foreground">
          Trusted by farmers across the region
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features?.map((feature, index) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg card-shadow"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon 
                name={feature?.icon} 
                size={20} 
                color="var(--color-primary)"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-body font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center justify-center space-x-4 text-success">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span className="text-sm font-mono">10,000+</span>
          </div>
          <div className="w-px h-4 bg-success/30"></div>
          <div className="flex items-center space-x-2">
            <Icon name="Droplets" size={16} />
            <span className="text-sm font-mono">30% Water Saved</span>
          </div>
          <div className="w-px h-4 bg-success/30"></div>
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} />
            <span className="text-sm font-mono">4.8/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;