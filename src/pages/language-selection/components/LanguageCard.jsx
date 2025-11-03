import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageCard = ({ 
  language, 
  isSelected, 
  onSelect, 
  onTestVoice,
  className = "" 
}) => {
  const { code, name, nativeName, flag, welcomeMessage, description } = language;

  return (
    <div 
      className={`
        relative w-full p-6 lg:p-8 rounded-xl border-2 transition-all duration-300 ag-transition
        cursor-pointer touch-target card-shadow hover:shadow-lg
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border bg-card hover:border-primary/50 hover:bg-primary/2'
        }
        ${className}
      `}
      onClick={() => onSelect(code)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <Icon name="Check" size={16} color="white" />
        </div>
      )}
      {/* Language Content */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Flag/Cultural Icon */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-muted">
            <span className="text-2xl lg:text-3xl" role="img" aria-label={`${name} flag`}>
              {flag}
            </span>
          </div>
        </div>

        {/* Language Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-1">
            {name}
          </h3>
          <p className="text-lg lg:text-xl font-body text-muted-foreground mb-2">
            {nativeName}
          </p>
          <p className="text-sm font-caption text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {/* Welcome Message */}
      <div className="mb-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-base lg:text-lg font-body text-foreground text-center">
          {welcomeMessage}
        </p>
      </div>
      {/* Voice Test Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e?.stopPropagation();
            onTestVoice(code, welcomeMessage);
          }}
          iconName="Volume2"
          iconPosition="left"
          iconSize={16}
          className="touch-target"
        >
          Test Voice
        </Button>
      </div>
      {/* Ripple Effect for Selection */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl bg-primary/5 animate-pulse-gentle pointer-events-none" />
      )}
    </div>
  );
};

export default LanguageCard;