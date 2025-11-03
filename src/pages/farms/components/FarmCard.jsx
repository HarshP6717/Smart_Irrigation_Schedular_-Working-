import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FarmCard = ({ farm, onSelect, onEdit, onDelete, isDeleting }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow hover:shadow-lg transition-all duration-200">
      {/* Farm Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground">
              {farm.name || farm.farmName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {farm.location || `${farm.city}, ${farm.state}`}
            </p>
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('farm.area')}</span>
          <span className="text-sm font-medium text-foreground">
            {farm.area} {t('farm.areaUnit')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('farm.soilType')}</span>
          <span className="text-sm font-medium text-foreground capitalize">
            {t(`soil.${farm.soilType}`)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('farm.cropType')}</span>
          <span className="text-sm font-medium text-foreground capitalize">
            {farm.cropType ? t(`crop.${farm.cropType}`) : 'Not set'}
          </span>
        </div>
        {farm.pumpCapacity && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('farm.pumpCapacity')}</span>
            <span className="text-sm font-medium text-foreground">
              {farm.pumpCapacity}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          onClick={onSelect}
          variant="primary"
          size="sm"
          fullWidth
          iconName="Eye"
          iconPosition="left"
        >
          View
        </Button>
        <Button
          onClick={onEdit}
          variant="outline"
          size="sm"
          iconName="Edit"
        >
        </Button>
        <Button
          onClick={onDelete}
          variant="outline"
          size="sm"
          iconName="Trash2"
          disabled={isDeleting}
          className="text-error hover:text-error hover:border-error"
        >
        </Button>
      </div>
    </div>
  );
};

export default FarmCard;
