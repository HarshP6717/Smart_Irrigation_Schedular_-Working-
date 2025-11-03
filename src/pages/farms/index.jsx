import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFarm } from '../../contexts/FarmContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FarmCard from './components/FarmCard';
import AddFarmModal from './components/AddFarmModal';
import EditFarmModal from './components/EditFarmModal';

const FarmsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { farms, loading, deleteFarm, selectFarm } = useFarm();
  const { showSuccess, showError } = useNotification();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);
  const [deletingFarm, setDeletingFarm] = useState(null);

  const handleAddFarm = () => {
    setShowAddModal(true);
  };

  const handleEditFarm = (farm) => {
    setEditingFarm(farm);
  };

  const handleDeleteFarm = async (farm) => {
    if (window.confirm(t('farm.deleteFarm') + '?')) {
      try {
        setDeletingFarm(farm.id);
        await deleteFarm(farm.id);
        showSuccess(t('success.farmDeleted'));
      } catch (error) {
        showError(error.message || t('errors.somethingWrong'));
      } finally {
        setDeletingFarm(null);
      }
    }
  };

  const handleSelectFarm = (farm) => {
    selectFarm(farm);
    navigate('/main-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              {t('farm.myFarms')}
            </h1>
            <p className="text-lg font-body text-muted-foreground">
              {farms.length} {farms.length === 1 ? 'farm' : 'farms'} registered
            </p>
          </div>
          <Button
            onClick={handleAddFarm}
            iconName="Plus"
            iconPosition="left"
            size="lg"
          >
            {t('farm.addFarm')}
          </Button>
        </div>

        {/* Loading State */}
        {loading && farms.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t('common.loading')}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && farms.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="MapPin" size={48} color="var(--color-primary)" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
                {t('farm.noFarms')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('farm.addFirstFarm')}
              </p>
              <Button
                onClick={handleAddFarm}
                iconName="Plus"
                iconPosition="left"
                size="lg"
              >
                {t('farm.addFarm')}
              </Button>
            </div>
          </div>
        )}

        {/* Farms Grid */}
        {!loading && farms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map((farm) => (
              <FarmCard
                key={farm.id}
                farm={farm}
                onSelect={() => handleSelectFarm(farm)}
                onEdit={() => handleEditFarm(farm)}
                onDelete={() => handleDeleteFarm(farm)}
                isDeleting={deletingFarm === farm.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add Farm Modal */}
      {showAddModal && (
        <AddFarmModal
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Farm Modal */}
      {editingFarm && (
        <EditFarmModal
          farm={editingFarm}
          onClose={() => setEditingFarm(null)}
        />
      )}
    </div>
  );
};

export default FarmsPage;
