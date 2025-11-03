import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceTestModal = ({ 
  isOpen, 
  onClose, 
  language, 
  message,
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  const playVoice = () => {
    if (!isSupported || !message) return;

    setIsPlaying(true);
    
    // Cancel any ongoing speech
    window.speechSynthesis?.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = getLanguageCode(language);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
    };
    
    window.speechSynthesis?.speak(utterance);
  };

  const stopVoice = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  };

  const getLanguageCode = (langCode) => {
    const langMap = {
      'en': 'en-US',
      'mr': 'mr-IN',
      'hi': 'hi-IN'
    };
    return langMap?.[langCode] || 'en-US';
  };

  const getLanguageName = (langCode) => {
    const nameMap = {
      'en': 'English',
      'mr': 'Marathi',
      'hi': 'Hindi'
    };
    return nameMap?.[langCode] || 'English';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`
        w-full max-w-md bg-card border border-border rounded-xl card-shadow
        transform transition-all duration-300 ag-transition
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Voice Test - {getLanguageName(language)}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSupported ? (
            <>
              {/* Message Preview */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-caption text-muted-foreground mb-2">
                  Preview Message:
                </p>
                <p className="text-base font-body text-foreground">
                  {message}
                </p>
              </div>

              {/* Voice Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={isPlaying ? stopVoice : playVoice}
                  iconName={isPlaying ? "Square" : "Play"}
                  iconPosition="left"
                  iconSize={20}
                  className="touch-target"
                >
                  {isPlaying ? "Stop" : "Play Voice"}
                </Button>
              </div>

              {/* Voice Status */}
              {isPlaying && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm font-caption text-primary">
                  <Icon name="Volume2" size={16} className="animate-pulse" />
                  <span>Playing audio...</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Icon name="VolumeX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <p className="text-base font-body text-muted-foreground mb-2">
                Voice synthesis not supported
              </p>
              <p className="text-sm font-caption text-muted-foreground">
                Your browser doesn't support text-to-speech functionality
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceTestModal;