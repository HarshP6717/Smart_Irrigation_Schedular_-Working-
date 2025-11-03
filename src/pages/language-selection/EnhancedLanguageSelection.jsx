import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EnhancedLanguageSelection = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      gradient: 'from-blue-500 to-blue-600',
      welcomeMessage: 'Welcome to Smart Irrigation!',
      subtitle: 'Optimize water, maximize yield',
      description: 'International language',
      users: '2.5M+ farmers',
      features: ['Easy to understand', 'Global support', 'Rich resources']
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      gradient: 'from-orange-500 to-orange-600',
      welcomeMessage: 'स्मार्ट सिंचाई में आपका स्वागत है!',
      subtitle: 'पानी बचाएं, उपज बढ़ाएं',
      description: 'राष्ट्रीय भाषा',
      users: '5M+ किसान',
      features: ['आसान समझ', 'स्थानीय समर्थन', 'विस्तृत संसाधन']
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      flag: '🇮🇳',
      gradient: 'from-green-500 to-green-600',
      welcomeMessage: 'स्मार्ट सिंचनात आपले स्वागत आहे!',
      subtitle: 'पाणी वाचवा, उत्पादन वाढवा',
      description: 'प्रादेशिक भाषा',
      users: '3M+ शेतकरी',
      features: ['सोपे समजणे', 'स्थानिक समर्थन', 'विस्तृत साधने']
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
    
    // Hide welcome animation after 2 seconds
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, [i18n]);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    i18n.changeLanguage(languageCode);
    
    // Play selection sound (optional)
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(() => {});
  };

  const handleContinue = async () => {
    if (!selectedLanguage) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const isAuthenticated = localStorage.getItem('authToken');
      
      if (isAuthenticated) {
        navigate('/main-dashboard');
      } else {
        navigate('/authentication');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedLang = languages.find(l => l.code === selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Welcome Animation Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-6"
              >
                <Icon name="Droplet" size={96} color="white" />
              </motion.div>
              <h1 className="text-4xl font-heading font-bold text-white mb-2">
                Smart Irrigation
              </h1>
              <p className="text-white/80 text-lg">
                Optimize Water, Maximize Yield
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-6xl"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <Icon name="Globe" size={40} color="white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Choose Your Language
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              अपनी भाषा चुनें • Select your preferred language • तुमची भाषा निवडा
            </motion.p>
          </div>

          {/* Language Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedLanguage === lang.code
                    ? 'ring-4 ring-primary shadow-2xl'
                    : 'hover:shadow-xl'
                }`}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${lang.gradient} opacity-10`} />
                
                {/* Card Content */}
                <div className="relative bg-card border border-border p-6 h-full">
                  {/* Selected Indicator */}
                  {selectedLanguage === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Icon name="Check" size={20} color="white" />
                    </motion.div>
                  )}
                  
                  {/* Flag */}
                  <div className="text-6xl mb-4">{lang.flag}</div>
                  
                  {/* Language Name */}
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    {lang.nativeName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {lang.name} • {lang.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Users" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-primary">{lang.users}</span>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {lang.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Language Preview */}
          <AnimatePresence>
            {selectedLang && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-border rounded-2xl p-8 mb-8 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{selectedLang.flag}</div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {selectedLang.welcomeMessage}
                      </h3>
                      <p className="text-muted-foreground">{selectedLang.subtitle}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedLanguage('')}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedLanguage || isLoading}
              size="lg"
              className="min-w-64 h-14 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                  Loading...
                </>
              ) : (
                <>
                  Continue
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </>
              )}
            </Button>
            
            {!selectedLanguage && (
              <p className="text-sm text-muted-foreground mt-4">
                Please select a language to continue
              </p>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {[
              { icon: 'Users', label: '10M+ Farmers', color: 'primary' },
              { icon: 'Droplet', label: '50B L Water Saved', color: 'success' },
              { icon: 'TrendingUp', label: '30% Yield Increase', color: 'accent' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <Icon name={stat.icon} size={24} color={`var(--color-${stat.color})`} className="mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedLanguageSelection;
