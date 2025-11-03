import React, { useState } from 'react';
import Icon from './AppIcon';
import HelpModal from './HelpModal';

const FloatingHelpButton = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPulse, setIsPulse] = useState(true);

  const handleClick = () => {
    setIsHelpOpen(true);
    setIsPulse(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
          isPulse ? 'animate-pulse' : ''
        }`}
        title="Help & Support (SOS)"
        aria-label="Help"
      >
        <Icon name="HelpCircle" size={28} color="white" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-red-600">
          !
        </span>
      </button>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
};

export default FloatingHelpButton;
