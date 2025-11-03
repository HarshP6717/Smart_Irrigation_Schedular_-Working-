import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ManualLocationForm = ({ onLocationSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    farmName: '',
    latitude: '',
    longitude: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        farmName: initialData?.farmName || '',
        latitude: initialData?.latitude?.toString() || '',
        longitude: initialData?.longitude?.toString() || '',
        address: initialData?.address || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.farmName?.trim()) {
      newErrors.farmName = 'Farm name is required';
    }

    if (!formData?.latitude?.trim()) {
      newErrors.latitude = 'Latitude is required';
    } else {
      const lat = parseFloat(formData?.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = 'Please enter a valid latitude (-90 to 90)';
      }
    }

    if (!formData?.longitude?.trim()) {
      newErrors.longitude = 'Longitude is required';
    } else {
      const lng = parseFloat(formData?.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = 'Please enter a valid longitude (-180 to 180)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const locationData = {
        farmName: formData?.farmName?.trim(),
        latitude: parseFloat(formData?.latitude),
        longitude: parseFloat(formData?.longitude),
        address: formData?.address?.trim(),
        isManual: true
      };
      
      await onLocationSubmit(locationData);
    } catch (error) {
      console.error('Error submitting location:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position?.coords?.latitude?.toFixed(6),
            longitude: position?.coords?.longitude?.toFixed(6)
          }));
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 card-shadow">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-full mx-auto mb-4">
            <Icon name="Edit" size={40} color="var(--color-secondary)" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Enter Farm Location Manually
          </h3>
          <p className="text-sm font-body text-muted-foreground">
            Provide your farm details and coordinates for accurate weather data
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Name */}
          <Input
            label="Farm Name"
            type="text"
            name="farmName"
            placeholder="e.g., Green Valley Farm"
            value={formData?.farmName}
            onChange={handleInputChange}
            error={errors?.farmName}
            required
            description="Give your farm a memorable name"
          />

          {/* Coordinates Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-body font-medium text-foreground">
                Farm Coordinates
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleUseCurrentLocation}
                iconName="Navigation"
                iconPosition="left"
                iconSize={14}
              >
                Use Current Location
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Latitude"
                type="number"
                name="latitude"
                placeholder="e.g., 19.0760"
                value={formData?.latitude}
                onChange={handleInputChange}
                error={errors?.latitude}
                required
                step="any"
                description="North-South position"
              />

              <Input
                label="Longitude"
                type="number"
                name="longitude"
                placeholder="e.g., 72.8777"
                value={formData?.longitude}
                onChange={handleInputChange}
                error={errors?.longitude}
                required
                step="any"
                description="East-West position"
              />
            </div>
          </div>

          {/* Address (Optional) */}
          <Input
            label="Farm Address (Optional)"
            type="text"
            name="address"
            placeholder="Village, District, State"
            value={formData?.address}
            onChange={handleInputChange}
            description="Helps identify your farm location"
          />

          {/* Map Preview */}
          {formData?.latitude && formData?.longitude && !errors?.latitude && !errors?.longitude && (
            <div className="bg-muted/30 rounded-lg h-48 overflow-hidden border-2 border-dashed border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Farm Location Preview"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${formData?.latitude},${formData?.longitude}&z=16&output=embed`}
                className="rounded-lg"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isSubmitting}
            iconName="Check"
            iconPosition="left"
            className="w-full touch-target"
            disabled={!formData?.farmName || !formData?.latitude || !formData?.longitude}
          >
            {isSubmitting ? 'Saving Farm Location...' : 'Save Farm Location'}
          </Button>
        </form>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={18} color="var(--color-primary)" />
              <div>
                <p className="text-sm font-body text-primary font-medium mb-2">
                  How to find your coordinates:
                </p>
                <ul className="space-y-1 text-xs font-caption text-muted-foreground">
                  <li>• Open Google Maps and search for your farm location</li>
                  <li>• Right-click on your farm location</li>
                  <li>• Click on the coordinates that appear</li>
                  <li>• Copy and paste the latitude and longitude values</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualLocationForm;