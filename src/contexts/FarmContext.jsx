import React, { createContext, useContext, useState, useEffect } from 'react';
import farmService from '../services/farmService';
import { useAuth } from './AuthContext';

const FarmContext = createContext();

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};

export const FarmProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load farms when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadFarms();
    } else {
      setFarms([]);
      setSelectedFarm(null);
    }
  }, [isAuthenticated]);

  // Load selected farm from localStorage
  useEffect(() => {
    const savedFarmId = localStorage.getItem('selectedFarmId');
    if (savedFarmId && farms.length > 0) {
      const farm = farms.find(f => f.id === savedFarmId);
      if (farm) {
        setSelectedFarm(farm);
      }
    } else if (farms.length > 0 && !selectedFarm) {
      // Auto-select first farm if none selected
      setSelectedFarm(farms[0]);
      localStorage.setItem('selectedFarmId', farms[0].id);
    }
  }, [farms]);

  const loadFarms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await farmService.getAllFarms();
      setFarms(data.farms || []);
    } catch (err) {
      setError(err.message || 'Failed to load farms');
      console.error('Load farms error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFarm = async (farmData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await farmService.createFarm(farmData);
      setFarms(prev => [...prev, response.farm]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to add farm');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFarm = async (farmId, farmData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await farmService.updateFarm(farmId, farmData);
      setFarms(prev => prev.map(f => f.id === farmId ? response.farm : f));
      if (selectedFarm?.id === farmId) {
        setSelectedFarm(response.farm);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update farm');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFarm = async (farmId) => {
    try {
      setLoading(true);
      setError(null);
      await farmService.deleteFarm(farmId);
      setFarms(prev => prev.filter(f => f.id !== farmId));
      if (selectedFarm?.id === farmId) {
        setSelectedFarm(null);
        localStorage.removeItem('selectedFarmId');
      }
    } catch (err) {
      setError(err.message || 'Failed to delete farm');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const selectFarm = (farm) => {
    setSelectedFarm(farm);
    if (farm) {
      localStorage.setItem('selectedFarmId', farm.id);
    } else {
      localStorage.removeItem('selectedFarmId');
    }
  };

  const value = {
    farms,
    selectedFarm,
    loading,
    error,
    loadFarms,
    addFarm,
    updateFarm,
    deleteFarm,
    selectFarm,
  };

  return (
    <FarmContext.Provider value={value}>
      {children}
    </FarmContext.Provider>
  );
};

export default FarmContext;
