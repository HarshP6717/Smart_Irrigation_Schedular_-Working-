import React from 'react';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const FarmSetupProgress = () => {
  const setupSteps = [
    { label: 'Language', icon: 'Globe' },
    { label: 'Authentication', icon: 'Shield' },
    { label: 'Farm Setup', icon: 'MapPin' },
    { label: 'Crop Selection', icon: 'Sprout' }
  ];

  return (
    <div className="w-full mb-8">
      <ProgressIndicator
        currentStep={3}
        totalSteps={4}
        steps={setupSteps}
        className="max-w-4xl mx-auto"
      />
    </div>
  );
};

export default FarmSetupProgress;