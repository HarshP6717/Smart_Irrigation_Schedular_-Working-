import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const FarmSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    area: '',
    soilType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/crop-and-soil-selection');
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-6 card-shadow">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MapPin" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Setup Your Farm
            </h1>
            <p className="text-muted-foreground">
              Tell us about your farm to optimize irrigation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Farm Name"
              value={formData.farmName}
              onChange={(e) => setFormData({...formData, farmName: e.target.value})}
              required
            />
            
            <Input
              placeholder="Location (City, State)"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />

            <Input
              placeholder="Farm Area (in acres)"
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              required
            />

            <select 
              className="w-full p-3 border border-border rounded-md bg-input text-foreground"
              value={formData.soilType}
              onChange={(e) => setFormData({...formData, soilType: e.target.value})}
              required
            >
              <option value="">Select Soil Type</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="silty">Silty</option>
            </select>

            <Button type="submit" fullWidth>
              Continue to Crop Selection
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FarmSetup;