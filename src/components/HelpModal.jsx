import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from './AppIcon';
import Button from './ui/Button';

const HelpModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const helpSteps = [
    {
      icon: 'MapPin',
      title: 'Step 1: Setup Farm',
      description: 'Enter your farm name, location, and size. Use GPS button to auto-detect location.',
      color: 'bg-blue-500'
    },
    {
      icon: 'Sprout',
      title: 'Step 2: Select Crop',
      description: 'Choose the crop you are growing. This helps calculate water needs.',
      color: 'bg-green-500'
    },
    {
      icon: 'Mountain',
      title: 'Step 3: Select Soil',
      description: 'Pick your soil type. Different soils need different water amounts.',
      color: 'bg-amber-500'
    },
    {
      icon: 'Zap',
      title: 'Step 4: Select Pump',
      description: 'Choose your water pump size to calculate irrigation time.',
      color: 'bg-purple-500'
    },
    {
      icon: 'Calendar',
      title: 'Step 5: Get Schedule',
      description: 'Generate your irrigation schedule based on weather and crop needs.',
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border-2 border-border rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="HelpCircle" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Help & Support</h2>
                <p className="text-white/80 text-sm">Quick guide to get started</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={20} color="white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Emergency Contact */}
          <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-500/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={20} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Emergency Support</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Need immediate help? Contact our support team
                </p>
                <div className="space-y-1">
                  <a href="tel:+911234567890" className="flex items-center space-x-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:underline">
                    <Icon name="Phone" size={14} />
                    <span>+91 123-456-7890</span>
                  </a>
                  <a href="mailto:support@smartirrigation.com" className="flex items-center space-x-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:underline">
                    <Icon name="Mail" size={14} />
                    <span>support@smartirrigation.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
              <Icon name="List" size={20} className="mr-2" />
              How to Use
            </h3>
            <div className="space-y-4">
              {helpSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors">
                  <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon name={step.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Issues */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
              <Icon name="AlertCircle" size={20} className="mr-2" />
              Common Issues
            </h3>
            <div className="space-y-3">
              <details className="bg-background rounded-lg border border-border overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
                  <span>Location not detecting?</span>
                  <Icon name="ChevronDown" size={20} />
                </summary>
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  Make sure location permission is enabled in your browser settings. You can also enter location manually.
                </div>
              </details>

              <details className="bg-background rounded-lg border border-border overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
                  <span>Weather not showing?</span>
                  <Icon name="ChevronDown" size={20} />
                </summary>
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  Check your internet connection. Weather data requires an active internet connection.
                </div>
              </details>

              <details className="bg-background rounded-lg border border-border overflow-hidden">
                <summary className="p-4 cursor-pointer font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
                  <span>How to change language?</span>
                  <Icon name="ChevronDown" size={20} />
                </summary>
                <div className="p-4 pt-0 text-sm text-muted-foreground">
                  Go to Settings and select your preferred language from the language selector.
                </div>
              </details>
            </div>
          </div>

          {/* Voice Guidance Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Volume2" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Voice Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Click the speaker icon 🔊 on any page to hear instructions in your language.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-muted/50 backdrop-blur-sm p-4 rounded-b-2xl border-t border-border">
          <Button
            onClick={onClose}
            fullWidth
            size="lg"
            iconName="Check"
            iconPosition="left"
          >
            Got It!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
