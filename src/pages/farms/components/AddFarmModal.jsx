import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFarm } from '../../../contexts/FarmContext';
import { useNotification } from '../../../contexts/NotificationContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import VoiceButton from '../../../components/VoiceButton';
import locationService from '../../../utils/locationService';
import voiceGuidance from '../../../utils/voiceGuidance';

const AddFarmModal = ({ onClose }) => {
  const { t } = useTranslation();
  const { addFarm } = useFarm();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [formData, setFormData] = useState({
    farmName: '',
    city: '',
    state: '',
    area: '',
    areaUnit: 'acres',
    soilType: '',
    cropType: '',
    pumpCapacity: '',
    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Speak instructions when modal opens
    voiceGuidance.speak('Add your farm details. You can use the GPS button to automatically detect your location.');
  }, []);

  const soilTypes = ['clay', 'sandy', 'loamy', 'silty'];
  const cropTypes = ['wheat', 'rice', 'corn', 'tomato', 'potato', 'onion', 'cotton', 'sugarcane'];
  const pumpCapacities = ['5hp', '7hp', '10hp', '15hp'];
  const areaUnits = ['acres', 'hectares', 'bigha'];

  const handleDetectLocation = async () => {
    try {
      setDetectingLocation(true);
      voiceGuidance.speakAction('detect-location');
      
      const location = await locationService.getCurrentLocation();
      
      // Try to extract city and state from the location
      const cityName = location.city || '';
      
      setFormData(prev => ({
        ...prev,
        city: cityName,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      
      showSuccess(`Location detected: ${cityName}`);
      voiceGuidance.speak(`Location detected: ${cityName}`);
    } catch (error) {
      showError(error.message);
      voiceGuidance.speak('Unable to detect location. Please enter manually.');
    } finally {
      setDetectingLocation(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.farmName.trim()) {
      newErrors.farmName = t('errors.required');
    }
    if (!formData.city.trim()) {
      newErrors.city = t('errors.required');
    }
    if (!formData.state.trim()) {
      newErrors.state = t('errors.required');
    }
    if (!formData.area || formData.area <= 0) {
      newErrors.area = t('errors.invalidNumber');
    }
    if (!formData.soilType) {
      newErrors.soilType = t('errors.required');
    }
    if (!formData.cropType) {
      newErrors.cropType = t('errors.required');
    }
    if (!formData.pumpCapacity) {
      newErrors.pumpCapacity = t('errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await addFarm({
        name: formData.farmName,
        city: formData.city,
        state: formData.state,
        location: `${formData.city}, ${formData.state}`,
        area: parseFloat(formData.area),
        soilType: formData.soilType,
        cropType: formData.cropType,
        pumpCapacity: formData.pumpCapacity,
      });
      showSuccess(t('success.farmAdded'));
      onClose();
    } catch (error) {
      showError(error.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl card-shadow max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Sprout" size={32} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">
                🌾 {t('farm.addFarm')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('farm.farmDetails')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <VoiceButton text="Add your farm details. Fill in the form below. You can use the GPS button to automatically detect your location." />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label={t('farm.farmName')}
              placeholder={t('farm.farmName')}
              value={formData.farmName}
              onChange={(e) => handleChange('farmName', e.target.value)}
              error={errors.farmName}
              required
            />
          </div>

          {/* Location with GPS */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={20} color="#3b82f6" />
                <h3 className="font-bold text-foreground">📍 Location</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                iconName={detectingLocation ? "Loader" : "Navigation"}
                iconPosition="left"
              >
                {detectingLocation ? 'Detecting...' : 'Auto-Detect GPS'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('farm.city')}
                placeholder="Enter city name"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                error={errors.city}
                required
              />
              <Input
                label={t('farm.state')}
                placeholder="Enter state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                error={errors.state}
                required
              />
            </div>
          </div>

          {/* Farm Size */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Maximize" size={20} color="#f59e0b" />
              <h3 className="font-bold text-foreground">📏 Farm Size</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Area"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.0"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                error={errors.area}
                required
              />
              <Select
                label="Unit"
                value={formData.areaUnit}
                onChange={(e) => handleChange('areaUnit', e.target.value)}
              >
                {areaUnits.map(unit => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Soil Type */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border-2 border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Mountain" size={20} color="#eab308" />
              <h3 className="font-bold text-foreground">🏔️ Soil Type</h3>
            </div>
            <Select
              label="Select your soil type"
              value={formData.soilType}
              onChange={(e) => handleChange('soilType', e.target.value)}
              error={errors.soilType}
              required
            >
              <option value="">{t('farm.selectSoilType')}</option>
              {soilTypes.map(type => (
                <option key={type} value={type}>
                  {t(`soil.${type}`)}
                </option>
              ))}
            </Select>
          </div>

          {/* Crop Type */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Sprout" size={20} color="#22c55e" />
              <h3 className="font-bold text-foreground">🌱 Crop Type</h3>
            </div>
            <Select
              label="Select your crop"
              value={formData.cropType}
              onChange={(e) => handleChange('cropType', e.target.value)}
              error={errors.cropType}
              required
            >
              <option value="">{t('farm.selectCropType')}</option>
              {cropTypes.map(type => (
                <option key={type} value={type}>
                  {t(`crop.${type}`)}
                </option>
              ))}
            </Select>
          </div>

          {/* Pump Capacity */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Zap" size={20} color="#a855f7" />
              <h3 className="font-bold text-foreground">⚡ Water Pump Size</h3>
            </div>
            <Select
              label="Select pump capacity"
              value={formData.pumpCapacity}
              onChange={(e) => handleChange('pumpCapacity', e.target.value)}
              error={errors.pumpCapacity}
              required
            >
              <option value="">{t('farm.selectPumpCapacity')}</option>
              {pumpCapacities.map(capacity => (
                <option key={capacity} value={capacity}>
                  {capacity.toUpperCase()}
                </option>
              ))}
            </Select>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
              disabled={loading}
              size="lg"
            >
              ❌ {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              size="lg"
              iconName={loading ? "Loader" : "Check"}
              iconPosition="left"
            >
              {loading ? t('common.loading') : `✅ ${t('common.add')}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarmModal;
