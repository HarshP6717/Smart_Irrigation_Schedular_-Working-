import React from 'react';
import LanguageCard from './LanguageCard';

const LanguageGrid = ({ 
  languages, 
  selectedLanguage, 
  onLanguageSelect, 
  onTestVoice,
  className = "" 
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Language Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {languages?.map((language) => (
          <LanguageCard
            key={language?.code}
            language={language}
            isSelected={selectedLanguage === language?.code}
            onSelect={onLanguageSelect}
            onTestVoice={onTestVoice}
            className="w-full"
          />
        ))}
      </div>
      {/* Selection Hint */}
      <div className="mt-8 text-center">
        <p className="text-sm font-caption text-muted-foreground">
          {selectedLanguage 
            ? "Language selected! Tap Continue to proceed." :"Select your preferred language to continue"
          }
        </p>
      </div>
    </div>
  );
};

export default LanguageGrid;