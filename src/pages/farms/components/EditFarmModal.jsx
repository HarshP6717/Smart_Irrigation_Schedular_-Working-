import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFarm } from '../../../contexts/FarmContext';
import { useNotification } from '../../../contexts/NotificationContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditFarmModal = ({ farm, onClose }) => {
  const { t } = useTranslation();
  const { updateFarm } = useFarm();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    farmName: farm.name || farm.farmName || '',
    city: farm.city || '',
    state: farm.state || '',
    area: farm.area || '',
    soilType: farm.soilType || '',
    cropType: farm.cropType || '',
    pumpCapacity: farm.pumpCapacity || '',
  });

  const [errors, setErrors] = useState({});

  const soilTypes = ['clay', 'sandy', 'loamy', 'silty'];
  const cropTypes = ['wheat', 'rice', 'corn', 'tomato', 'potato', 'onion', 'cotton', 'sugarcane'];
  const pumpCapacities = ['5hp', '7hp', '10hp', '15hp'];

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
      await updateFarm(farm.id, {
        name: formData.farmName,
        city: formData.city,
        state: formData.state,
        location: `${formData.city}, ${formData.state}`,
        area: parseFloat(formData.area),
        soilType: formData.soilType,
        cropType: formData.cropType,
        pumpCapacity: formData.pumpCapacity,
      });
      showSuccess(t('success.farmUpdated'));
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
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Edit" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">
                {t('farm.editFarm')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {farm.name || farm.farmName}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t('farm.city')}
              placeholder={t('farm.city')}
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              error={errors.city}
              required
            />
            <Input
              label={t('farm.state')}
              placeholder={t('farm.state')}
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              error={errors.state}
              required
            />
          </div>

          <div>
            <Input
              label={`${t('farm.area')} (${t('farm.areaUnit')})`}
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={formData.area}
              onChange={(e) => handleChange('area', e.target.value)}
              error={errors.area}
              required
            />
          </div>

          <div>
            <Select
              label={t('farm.soilType')}
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

          <div>
            <Select
              label={t('farm.cropType')}
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

          <div>
            <Select
              label={t('farm.pumpCapacity')}
              value={formData.pumpCapacity}
              onChange={(e) => handleChange('pumpCapacity', e.target.value)}
              error={errors.pumpCapacity}
              required
            >
              <option value="">{t('farm.selectPumpCapacity')}</option>
              {pumpCapacities.map(capacity => (
                <option key={capacity} value={capacity}>
                  {t(`pump.${capacity}`)}
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
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? t('common.loading') : t('common.save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFarmModal;
