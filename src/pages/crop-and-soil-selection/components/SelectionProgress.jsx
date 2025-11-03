import React from 'react';
import Icon from '../../../components/AppIcon';

const SelectionProgress = ({ 
  cropSelected, 
  soilSelected, 
  className = "" 
}) => {
  const getStepStatus = (isCompleted) => {
    if (isCompleted) {
      return {
        bgColor: 'bg-success',
        textColor: 'text-success-foreground',
        borderColor: 'border-success',
        icon: 'Check'
      };
    }
    return {
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      borderColor: 'border-muted',
      icon: 'Circle'
    };
  };

  const cropStatus = getStepStatus(cropSelected);
  const soilStatus = getStepStatus(soilSelected);
  const progressPercentage = ((cropSelected ? 1 : 0) + (soilSelected ? 1 : 0)) / 2 * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-muted-foreground">
            Selection Progress
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ag-transition"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:flex items-center justify-center space-x-8">
        {/* Crop Selection Step */}
        <div className="flex items-center space-x-3">
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ag-transition
            ${cropStatus?.bgColor} ${cropStatus?.borderColor} ${cropStatus?.textColor}
          `}>
            <Icon name={cropStatus?.icon} size={16} />
          </div>
          <div>
            <p className={`text-sm font-body font-medium ${cropSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
              Crop Selection
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              {cropSelected ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>

        {/* Connector Line */}
        <div className="flex-1 h-0.5 max-w-24">
          <div className={`
            h-full transition-all duration-500 ag-transition
            ${cropSelected ? 'bg-success' : 'bg-muted'}
          `} />
        </div>

        {/* Soil Selection Step */}
        <div className="flex items-center space-x-3">
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ag-transition
            ${soilStatus?.bgColor} ${soilStatus?.borderColor} ${soilStatus?.textColor}
          `}>
            <Icon name={soilStatus?.icon} size={16} />
          </div>
          <div>
            <p className={`text-sm font-body font-medium ${soilSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
              Soil Selection
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              {soilSelected ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>
      </div>
      {/* Completion Status */}
      {cropSelected && soilSelected && (
        <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            <div>
              <p className="text-sm font-body text-success font-medium">
                Selection Complete
              </p>
              <p className="text-xs font-caption text-success/80">
                Ready to generate your irrigation schedule
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionProgress;