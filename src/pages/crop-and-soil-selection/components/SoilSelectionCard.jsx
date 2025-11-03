import React from 'react';
import Icon from '../../../components/AppIcon';

const SoilSelectionCard = ({ 
  soil, 
  isSelected, 
  onSelect, 
  className = "" 
}) => {
  const getSoilIcon = (soilType) => {
    switch (soilType?.toLowerCase()) {
      case 'clay':
        return 'Mountain';
      case 'loam':
        return 'Layers';
      case 'sandy':
        return 'Waves';
      case 'mixed':
        return 'Shuffle';
      default:
        return 'Layers';
    }
  };

  const getAbsorptionColor = (rate) => {
    switch (rate?.toLowerCase()) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div
      onClick={() => onSelect(soil)}
      className={`
        relative cursor-pointer touch-target transition-all duration-300 ag-transition
        ${isSelected 
          ? 'bg-secondary/10 border-2 border-secondary card-shadow' 
          : 'bg-card border-2 border-border hover:border-primary hover:card-shadow'
        }
        rounded-xl p-6 lg:p-8 ${className}
      `}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          onSelect(soil);
        }
      }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center justify-center w-6 h-6 bg-secondary rounded-full">
            <Icon name="Check" size={16} color="white" />
          </div>
        </div>
      )}
      {/* Soil Icon */}
      <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 rounded-full bg-muted">
        <Icon 
          name={getSoilIcon(soil?.type)} 
          size={32} 
          color={isSelected ? 'var(--color-secondary)' : 'var(--color-muted-foreground)'} 
        />
      </div>
      {/* Soil Information */}
      <div className="text-center">
        <h3 className="text-lg lg:text-xl font-heading font-semibold text-foreground mb-2">
          {soil?.name}
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-3">
          {soil?.description}
        </p>

        {/* Absorption Rate Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="ArrowDown" size={16} color="var(--color-secondary)" />
          <span className={`text-sm font-mono font-medium ${getAbsorptionColor(soil?.absorptionRate)}`}>
            {soil?.absorptionRate} Absorption
          </span>
        </div>

        {/* Drainage Info */}
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Filter" size={14} color="var(--color-muted-foreground)" />
          <span className="text-xs font-caption text-muted-foreground">
            {soil?.drainage} Drainage
          </span>
        </div>
      </div>
      {/* Hover Effect Overlay */}
      <div className={`
        absolute inset-0 rounded-xl transition-opacity duration-300
        ${isSelected ? 'opacity-0' : 'opacity-0 hover:opacity-5 bg-secondary'}
      `} />
    </div>
  );
};

export default SoilSelectionCard;