import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationConfirmation = ({ 
  location, 
  onConfirm, 
  onEdit, 
  isLoading = false 
}) => {
  const { latitude, longitude, accuracy, address } = location;

  const formatCoordinate = (coord) => {
    return parseFloat(coord)?.toFixed(6);
  };

  const getAccuracyStatus = (accuracy) => {
    if (accuracy <= 10) return { status: 'Excellent', color: 'var(--color-success)', icon: 'CheckCircle' };
    if (accuracy <= 50) return { status: 'Good', color: 'var(--color-primary)', icon: 'Circle' };
    if (accuracy <= 100) return { status: 'Fair', color: 'var(--color-warning)', icon: 'AlertCircle' };
    return { status: 'Poor', color: 'var(--color-error)', icon: 'XCircle' };
  };

  const accuracyInfo = getAccuracyStatus(accuracy);

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 card-shadow">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mx-auto mb-4">
            <Icon name="MapPin" size={40} color="var(--color-success)" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Location Detected Successfully
          </h3>
          <p className="text-sm font-body text-muted-foreground">
            Please confirm this is your farm location
          </p>
        </div>

        {/* Location Details */}
        <div className="space-y-4 mb-6">
          {/* Coordinates */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide mb-1">
                  Latitude
                </p>
                <p className="text-lg font-mono font-bold text-foreground">
                  {formatCoordinate(latitude)}°
                </p>
              </div>
              <div>
                <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide mb-1">
                  Longitude
                </p>
                <p className="text-lg font-mono font-bold text-foreground">
                  {formatCoordinate(longitude)}°
                </p>
              </div>
            </div>
          </div>

          {/* Address (if available) */}
          {address && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} color="var(--color-primary)" />
                <div>
                  <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide mb-1">
                    Approximate Address
                  </p>
                  <p className="text-sm font-body text-foreground">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Accuracy Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={accuracyInfo?.icon} size={18} color={accuracyInfo?.color} />
                <div>
                  <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                    Location Accuracy
                  </p>
                  <p className="text-sm font-body text-foreground font-medium">
                    {accuracyInfo?.status} (±{Math.round(accuracy)}m)
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-caption text-muted-foreground">
                  GPS Signal
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4]?.map((bar) => (
                    <div
                      key={bar}
                      className={`w-1 rounded-full ${
                        accuracy <= bar * 25 
                          ? 'bg-success h-3' :'bg-muted h-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Preview Placeholder */}
        <div className="mb-6 bg-muted/30 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Farm Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`}
            className="rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="lg"
            onClick={onConfirm}
            loading={isLoading}
            iconName="Check"
            iconPosition="left"
            className="flex-1 touch-target"
          >
            Confirm Location
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onEdit}
            iconName="Edit"
            iconPosition="left"
            className="flex-1 touch-target"
          >
            Edit Location
          </Button>
        </div>

        {/* Location Tips */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} color="var(--color-primary)" />
            <div>
              <p className="text-sm font-body text-primary font-medium mb-1">
                Location Tips
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Make sure you're at your farm location for the most accurate weather data. You can always update this later in settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationConfirmation;