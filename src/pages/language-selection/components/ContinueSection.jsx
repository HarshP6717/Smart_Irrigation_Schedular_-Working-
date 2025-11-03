import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContinueSection = ({ 
  selectedLanguage, 
  onContinue, 
  isLoading = false,
  className = "" 
}) => {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Continue Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        disabled={!selectedLanguage}
        loading={isLoading}
        onClick={onContinue}
        iconName="ArrowRight"
        iconPosition="right"
        iconSize={20}
        className="touch-target mb-4"
      >
        {selectedLanguage ? "Continue" : "Select Language First"}
      </Button>

      {/* Skip Option */}
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onContinue('en')}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip & Use English
        </Button>
      </div>

      {/* Progress Indicator */}
      {selectedLanguage && (
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm font-caption text-muted-foreground">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span>Language preference saved</span>
        </div>
      )}
    </div>
  );
};

export default ContinueSection;