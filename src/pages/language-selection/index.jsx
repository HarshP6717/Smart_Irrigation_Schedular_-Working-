import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import WelcomeHeader from './components/WelcomeHeader';
import LanguageGrid from './components/LanguageGrid';
import ContinueSection from './components/ContinueSection';
import VoiceTestModal from './components/VoiceTestModal';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceModal, setVoiceModal] = useState({
    isOpen: false,
    language: '',
    message: ''
  });

  // Mock language data
  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      welcomeMessage: 'Welcome to Smart Irrigation Scheduler! Optimize your water usage with intelligent scheduling.',
      description: 'International language for global users'
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      flag: '🇮🇳',
      welcomeMessage: 'स्मार्ट सिंचन शेड्यूलरमध्ये आपले स्वागत आहे! बुद्धिमान शेड्यूलिंगसह आपला पाण्याचा वापर अनुकूल करा.',
      description: 'Regional language for Maharashtra'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      welcomeMessage: 'स्मार्ट सिंचाई शेड्यूलर में आपका स्वागत है! बुद्धिमान शेड्यूलिंग के साथ अपने पानी के उपयोग को अनुकूलित करें।',
      description: 'National language of India'
    }
  ];

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    // Save to localStorage immediately
    localStorage.setItem('selectedLanguage', languageCode);
    // Change i18n language
    i18n.changeLanguage(languageCode);
  };

  const handleTestVoice = (languageCode, message) => {
    setVoiceModal({
      isOpen: true,
      language: languageCode,
      message: message
    });
  };

  const handleContinue = async (langCode = null) => {
    const finalLanguage = langCode || selectedLanguage;
    
    if (!finalLanguage) return;

    setIsLoading(true);
    
    try {
      // Save language preference
      localStorage.setItem('selectedLanguage', finalLanguage);
      // Change i18n language
      await i18n.changeLanguage(finalLanguage);
      
      // Simulate API call or processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user is already authenticated
      const isAuthenticated = localStorage.getItem('authToken');
      
      if (isAuthenticated) {
        // User is already logged in, go to main dashboard
        navigate('/main-dashboard');
      } else {
        // New user or not authenticated, go to authentication
        navigate('/authentication');
      }
    } catch (error) {
      console.error('Error saving language preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeVoiceModal = () => {
    setVoiceModal({
      isOpen: false,
      language: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={1} 
            totalSteps={4}
            className="mb-8 lg:mb-12"
          />

          {/* Welcome Header */}
          <WelcomeHeader className="mb-8 lg:mb-12" />

          {/* Language Selection Grid */}
          <LanguageGrid
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={handleLanguageSelect}
            onTestVoice={handleTestVoice}
            className="mb-8 lg:mb-12"
          />

          {/* Continue Section */}
          <ContinueSection
            selectedLanguage={selectedLanguage}
            onContinue={handleContinue}
            isLoading={isLoading}
          />
        </div>
      </main>
      {/* Voice Test Modal */}
      <VoiceTestModal
        isOpen={voiceModal?.isOpen}
        onClose={closeVoiceModal}
        language={voiceModal?.language}
        message={voiceModal?.message}
      />
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default LanguageSelection;