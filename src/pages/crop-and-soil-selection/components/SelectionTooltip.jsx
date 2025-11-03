import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SelectionTooltip = ({ 
  title = "Selection Guide",
  content = "",
  position = "top",
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-muted hover:bg-secondary/20 transition-colors touch-target"
        aria-label="Show help information"
      >
        <Icon name="HelpCircle" size={14} color="var(--color-muted-foreground)" />
      </button>

      {/* Tooltip Content */}
      {isVisible && (
        <div className={`
          absolute z-50 w-64 p-3 bg-popover border border-border rounded-lg card-shadow
          ${getPositionClasses()}
        `}>
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-body font-medium text-popover-foreground mb-1">
                {title}
              </h4>
              <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                {content}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className={`
            absolute w-2 h-2 bg-popover border-border transform rotate-45
            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b' : ''}
            ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l border-t' : ''}
            ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t border-r' : ''}
            ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 -mr-1 border-b border-l' : ''}
          `} />
        </div>
      )}
    </div>
  );
};

export default SelectionTooltip;