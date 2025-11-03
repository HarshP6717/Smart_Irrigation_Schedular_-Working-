import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ 
  activeMode = 'login', 
  onModeChange,
  className = "" 
}) => {
  const tabs = [
    { 
      key: 'login', 
      label: 'Sign In', 
      icon: 'LogIn' 
    },
    { 
      key: 'register', 
      label: 'Register', 
      icon: 'UserPlus' 
    }
  ];

  return (
    <div className={`w-full max-w-md mx-auto mb-8 ${className}`}>
      <div className="flex bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.key}
            variant={activeMode === tab?.key ? "default" : "ghost"}
            size="sm"
            onClick={() => onModeChange(tab?.key)}
            iconName={tab?.icon}
            iconPosition="left"
            iconSize={16}
            className="flex-1 touch-target"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthTabs;