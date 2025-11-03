import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';
import voiceGuidance from '../utils/voiceGuidance';

const VoiceButton = ({ text, action, className = '' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(voiceGuidance.isEnabled());

  useEffect(() => {
    // Update enabled state when it changes
    setIsEnabled(voiceGuidance.isEnabled());
  }, []);

  const handleClick = () => {
    if (!voiceGuidance.isSupported()) {
      alert('Voice guidance is not supported in your browser');
      return;
    }

    if (isSpeaking) {
      voiceGuidance.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      voiceGuidance.speak(text || action, {
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    }
  };

  if (!voiceGuidance.isSupported() || !isEnabled) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ${
        isSpeaking 
          ? 'bg-primary text-white animate-pulse' 
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      } ${className}`}
      title="Listen to instructions"
      aria-label="Voice guidance"
    >
      <Icon 
        name={isSpeaking ? "Volume2" : "Volume2"} 
        size={20} 
        color={isSpeaking ? "white" : "var(--color-primary)"}
      />
    </button>
  );
};

export default VoiceButton;
