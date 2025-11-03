import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationDetector = ({ onLocationDetected, onError, isDetecting, setIsDetecting }) => {
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check geolocation permission status
    if (navigator.permissions) {
      navigator.permissions?.query({ name: 'geolocation' })?.then((result) => {
        setPermissionStatus(result?.state);
      });
    }
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      const error = "Geolocation is not supported by this browser.";
      setErrorMessage(error);
      onError(error);
      return;
    }

    setIsDetecting(true);
    setErrorMessage('');

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        onLocationDetected({
          latitude: parseFloat(latitude?.toFixed(6)),
          longitude: parseFloat(longitude?.toFixed(6)),
          accuracy: position?.coords?.accuracy
        });
        setIsDetecting(false);
      },
      (error) => {
        let errorMsg = '';
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMsg = "Location access denied. Please enable location permissions and try again.";
            break;
          case error?.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable. Please try manual entry.";
            break;
          case error?.TIMEOUT:
            errorMsg = "Location request timed out. Please try again or enter manually.";
            break;
          default:
            errorMsg = "An unknown error occurred while detecting location.";
            break;
        }
        setErrorMessage(errorMsg);
        onError(errorMsg);
        setIsDetecting(false);
      },
      options
    );
  };

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 card-shadow">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4">
            <Icon 
              name="MapPin" 
              size={40} 
              color="var(--color-primary)"
              className={isDetecting ? 'animate-pulse' : ''}
            />
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Detect Farm Location
          </h3>
          <p className="text-sm font-body text-muted-foreground max-w-md mx-auto">
            We'll automatically detect your current location to provide accurate weather data and irrigation recommendations for your farm.
          </p>
        </div>

        {/* Permission Status Indicator */}
        {permissionStatus === 'denied' && (
          <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-body text-warning font-medium mb-1">
                  Location Permission Required
                </p>
                <p className="text-xs font-caption text-warning/80">
                  Please enable location access in your browser settings to use automatic detection.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={18} color="var(--color-error)" />
              <div>
                <p className="text-sm font-body text-error font-medium mb-1">
                  Location Detection Failed
                </p>
                <p className="text-xs font-caption text-error/80">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Detection Button */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="default"
            size="lg"
            onClick={detectLocation}
            disabled={isDetecting || permissionStatus === 'denied'}
            loading={isDetecting}
            iconName={isDetecting ? "Loader2" : "Navigation"}
            iconPosition="left"
            className="w-full sm:w-auto touch-target"
          >
            {isDetecting ? 'Detecting Location...' : 'Detect My Location'}
          </Button>

          {/* GPS Info */}
          <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
            <Icon name="Satellite" size={14} />
            <span>Uses GPS for accurate positioning</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-body font-medium text-foreground mb-3">
            Why we need your location:
          </h4>
          <div className="space-y-2">
            {[
              "Get accurate local weather forecasts",
              "Calculate precise irrigation schedules",
              "Monitor regional climate patterns",
              "Provide location-specific crop advice"
            ]?.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span className="text-xs font-caption text-muted-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetector;