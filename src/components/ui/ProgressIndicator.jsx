import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  className = "" 
}) => {
  const defaultSteps = [
    { label: 'Language', icon: 'Globe' },
    { label: 'Authentication', icon: 'Shield' },
    { label: 'Farm Setup', icon: 'MapPin' },
    { label: 'Crop Selection', icon: 'Sprout' }
  ];

  const stepItems = steps?.length > 0 ? steps : defaultSteps;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ag-transition"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {stepItems?.[currentStep - 1] && (
          <div className="flex items-center space-x-2 mt-3">
            <Icon 
              name={stepItems?.[currentStep - 1]?.icon} 
              size={16} 
              color="var(--color-primary)" 
            />
            <span className="text-sm font-body text-foreground">
              {stepItems?.[currentStep - 1]?.label}
            </span>
          </div>
        )}
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {stepItems?.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ag-transition
                      ${isCompleted 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : isCurrent 
                        ? 'bg-card border-primary text-primary' :'bg-card border-muted text-muted-foreground'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <span
                    className={`
                      mt-2 text-xs font-body text-center
                      ${isCurrent 
                        ? 'text-primary font-medium' 
                        : isCompleted 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                      }
                    `}
                  >
                    {step?.label}
                  </span>
                </div>
                {/* Connector Line */}
                {index < stepItems?.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 mb-6">
                    <div
                      className={`
                        h-full transition-all duration-300 ag-transition
                        ${stepNumber < currentStep 
                          ? 'bg-primary' :'bg-muted'
                        }
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;