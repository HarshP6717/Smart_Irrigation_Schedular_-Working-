import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IrrigationStatusCard = ({ 
  recommendation = 'yes',
  waterAmount = '45L',
  reasoning = '',
  onViewDashboard,
  onAdjustSettings,
  className = ''
}) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const getRecommendationConfig = () => {
    switch (recommendation) {
      case 'yes':
        return {
          status: 'YES',
          bgColor: 'bg-success',
          textColor: 'text-success-foreground',
          icon: 'Droplets',
          iconColor: 'white',
          title: 'Irrigate Today',
          message: `Your crops need ${waterAmount} of water based on current soil and weather conditions.`,
          actionColor: 'bg-white text-success hover:bg-gray-100'
        };
      case 'no':
        return {
          status: 'NO',
          bgColor: 'bg-muted',
          textColor: 'text-foreground',
          icon: 'CloudRain',
          iconColor: 'var(--color-primary)',
          title: 'Skip Irrigation',
          message: 'Rain is expected today. Your crops have sufficient moisture.',
          actionColor: 'bg-primary text-primary-foreground hover:bg-primary/90'
        };
      default:
        return {
          status: '...',
          bgColor: 'bg-card',
          textColor: 'text-card-foreground',
          icon: 'Clock',
          iconColor: 'var(--color-muted-foreground)',
          title: 'Calculating...',
          message: 'Analyzing weather and soil conditions for irrigation recommendation.',
          actionColor: 'bg-primary text-primary-foreground hover:bg-primary/90'
        };
    }
  };

  const config = getRecommendationConfig();
  const displayMessage = reasoning || config?.message;

  const speakRecommendation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Irrigation recommendation: ${config.status}. ${displayMessage}`
      );
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Auto-announce recommendation when component loads
    const timer = setTimeout(() => {
      if (recommendation !== 'calculating') {
        speakRecommendation();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [recommendation]);

  return (
    <div className={`w-full ${className}`}>
      <div className={`
        relative overflow-hidden rounded-2xl border-4 border-white/20
        ${config?.bgColor} ${config?.textColor} card-shadow
        transition-all duration-500 ag-transition
        ${recommendation === 'yes' ? 'animate-pulse-gentle' : ''}
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8">
            <Icon name={config?.icon} size={200} color="currentColor" />
          </div>
          <div className="absolute -bottom-8 -left-8">
            <Icon name="Droplets" size={120} color="currentColor" />
          </div>
        </div>

        {/* Content */}
        <div className="relative p-8 lg:p-12">
          {/* Voice Control */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={speakRecommendation}
              className="text-current hover:bg-white/20"
            >
              <Icon name="Volume2" size={20} />
            </Button>
          </div>

          {/* Main Status Display */}
          <div className="text-center mb-8">
            {/* Large Status Icon */}
            <div className="flex justify-center mb-6">
              <div className={`
                flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40
                rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30
                ${recommendation === 'yes' ? 'animate-bounce-gentle' : ''}
              `}>
                <Icon 
                  name={config?.icon} 
                  size={64} 
                  color={config?.iconColor}
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Status Text */}
            <div className="mb-6">
              <h1 className="text-8xl lg:text-9xl font-heading font-black mb-4 tracking-tight">
                {config?.status}
              </h1>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                {config?.title}
              </h2>
            </div>

            {/* Water Amount (for YES recommendation) */}
            {recommendation === 'yes' && (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/20 rounded-full">
                  <Icon name="Droplets" size={24} color="white" />
                  <span className="text-2xl font-mono font-bold">
                    {waterAmount}
                  </span>
                </div>
              </div>
            )}

            {/* Reasoning */}
            <p className="text-xl lg:text-2xl font-body opacity-90 max-w-2xl mx-auto leading-relaxed">
              {displayMessage}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              onClick={onViewDashboard}
              iconName="BarChart3"
              iconPosition="left"
              className={`${config?.actionColor} font-semibold text-lg px-8 py-4 touch-target`}
            >
              View Full Dashboard
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={onAdjustSettings}
              iconName="Settings"
              iconPosition="left"
              className="bg-white/10 border-white/30 text-current hover:bg-white/20 font-semibold text-lg px-8 py-4 touch-target"
            >
              Adjust Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationStatusCard;