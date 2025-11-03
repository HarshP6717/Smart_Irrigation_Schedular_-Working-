import React from 'react';
import Icon from '../../../components/AppIcon';

const CropSelectionCard = ({ 
  crop, 
  isSelected, 
  onSelect, 
  className = "" 
}) => {
  const getCropIcon = (cropType) => {
    switch (cropType?.toLowerCase()) {
      case 'wheat':
        return 'Wheat';
      case 'rice':
        return 'Sprout';
      case 'maize':
        return 'Corn';
      case 'sugarcane':
        return 'TreePine';
      default:
        return 'Sprout';
    }
  };

  const getWaterRequirementColor = (requirement) => {
    switch (requirement?.toLowerCase()) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div
      onClick={() => onSelect(crop)}
      className={`
        relative cursor-pointer touch-target transition-all duration-300 ag-transition
        ${isSelected 
          ? 'bg-primary/10 border-2 border-primary card-shadow' 
          : 'bg-card border-2 border-border hover:border-secondary hover:card-shadow'
        }
        rounded-xl p-6 lg:p-8 ${className}
      `}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          onSelect(crop);
        }
      }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
            <Icon name="Check" size={16} color="white" />
          </div>
        </div>
      )}
      {/* Crop Icon */}
      <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 rounded-full bg-muted">
        <Icon 
          name={getCropIcon(crop?.type)} 
          size={32} 
          color={isSelected ? 'var(--color-primary)' : 'var(--color-secondary)'} 
        />
      </div>
      {/* Crop Information */}
      <div className="text-center">
        <h3 className="text-lg lg:text-xl font-heading font-semibold text-foreground mb-2">
          {crop?.name}
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-3">
          {crop?.description}
        </p>

        {/* Water Requirement Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Droplets" size={16} color="var(--color-primary)" />
          <span className={`text-sm font-mono font-medium ${getWaterRequirementColor(crop?.waterRequirement)}`}>
            {crop?.waterRequirement} Water Need
          </span>
        </div>

        {/* Growing Season */}
        <div className="mt-2 flex items-center justify-center space-x-2">
          <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
          <span className="text-xs font-caption text-muted-foreground">
            {crop?.season}
          </span>
        </div>
      </div>
      {/* Hover Effect Overlay */}
      <div className={`
        absolute inset-0 rounded-xl transition-opacity duration-300
        ${isSelected ? 'opacity-0' : 'opacity-0 hover:opacity-5 bg-primary'}
      `} />
    </div>
  );
};

export default CropSelectionCard;