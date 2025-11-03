import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CropAndSoilSelection = () => {
  const navigate = useNavigate();
  const [selectedCrops, setSelectedCrops] = useState([]);

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: 'Wheat', waterNeed: 'Medium' },
    { id: 'rice', name: 'Rice', icon: 'Sprout', waterNeed: 'High' },
    { id: 'corn', name: 'Corn', icon: 'Corn', waterNeed: 'Medium' },
    { id: 'tomato', name: 'Tomato', icon: 'Apple', waterNeed: 'High' },
    { id: 'potato', name: 'Potato', icon: 'Circle', waterNeed: 'Medium' },
    { id: 'onion', name: 'Onion', icon: 'Circle', waterNeed: 'Low' }
  ];

  const toggleCrop = (cropId) => {
    setSelectedCrops(prev => 
      prev.includes(cropId) 
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };

  const handleSubmit = () => {
    navigate('/main-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Select Your Crops
          </h1>
          <p className="text-muted-foreground">
            Choose the crops you're growing to optimize irrigation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {crops.map(crop => (
            <div
              key={crop.id}
              onClick={() => toggleCrop(crop.id)}
              className={`
                p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${selectedCrops.includes(crop.id)
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div className="text-center">
                <Icon name={crop.icon} size={32} color="var(--color-primary)" className="mx-auto mb-2" />
                <h3 className="font-heading font-semibold text-foreground">{crop.name}</h3>
                <p className="text-xs text-muted-foreground">{crop.waterNeed} Water</p>
                {selectedCrops.includes(crop.id) && (
                  <Icon name="Check" size={16} color="var(--color-primary)" className="mx-auto mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={selectedCrops.length === 0}
            size="lg"
          >
            Complete Setup ({selectedCrops.length} crops selected)
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CropAndSoilSelection;