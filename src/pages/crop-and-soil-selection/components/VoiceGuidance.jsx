import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const VoiceGuidance = ({ 
  isEnabled = true,
  currentLanguage = 'en',
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSupported('speechSynthesis' in window);
  }, []);

  const getLanguageCode = (lang) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'mr':
        return 'mr-IN';
      default:
        return 'en-US';
    }
  };

  const getGuidanceText = (language) => {
    switch (language) {
      case 'hi':
        return `फसल और मिट्टी का चयन करें। पहले अपनी फसल चुनें, फिर अपनी मिट्टी का प्रकार चुनें। यह आपके सिंचाई कार्यक्रम को निर्धारित करने में मदद करेगा।`;
      case 'mr':
        return `पीक आणि माती निवडा. प्रथम तुमची पीक निवडा, नंतर तुमच्या मातीचा प्रकार निवडा. हे तुमच्या सिंचन वेळापत्रक ठरवण्यास मदत करेल.`;
      default:
        return `Select your crop and soil type. First choose your crop, then select your soil type. This will help determine your irrigation schedule.`;
    }
  };

  const speakGuidance = () => {
    if (!isSupported || !isEnabled) return;

    // Stop any ongoing speech
    window.speechSynthesis?.cancel();

    const utterance = new SpeechSynthesisUtterance(getGuidanceText(currentLanguage));
    utterance.lang = getLanguageCode(currentLanguage);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis?.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  };

  if (!isSupported || !isEnabled) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={isPlaying ? stopSpeech : speakGuidance}
        iconName={isPlaying ? "VolumeX" : "Volume2"}
        iconPosition="left"
        iconSize={16}
        disabled={!isSupported}
        className="touch-target"
      >
        {isPlaying ? 'Stop Guide' : 'Voice Guide'}
      </Button>

      {isPlaying && (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" />
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
          <span className="text-xs font-caption text-muted-foreground">
            Playing guidance...
          </span>
        </div>
      )}
    </div>
  );
};

export default VoiceGuidance;