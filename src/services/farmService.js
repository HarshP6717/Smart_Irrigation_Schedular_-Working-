// Mock farm service using localStorage (for development without backend)
const FARMS_STORAGE_KEY = 'smart_irrigation_farms';

const farmService = {
  // Get all farms for current user
  getAllFarms: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const farmsJson = localStorage.getItem(FARMS_STORAGE_KEY);
      const farms = farmsJson ? JSON.parse(farmsJson) : [];
      
      return {
        success: true,
        farms: farms,
        count: farms.length
      };
    } catch (error) {
      throw { message: 'Failed to fetch farms' };
    }
  },

  // Get single farm by ID
  getFarmById: async (farmId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const farmsJson = localStorage.getItem(FARMS_STORAGE_KEY);
      const farms = farmsJson ? JSON.parse(farmsJson) : [];
      const farm = farms.find(f => f.id === farmId);
      
      if (!farm) {
        throw { message: 'Farm not found' };
      }
      
      return {
        success: true,
        farm: farm
      };
    } catch (error) {
      throw error.message ? error : { message: 'Failed to fetch farm details' };
    }
  },

  // Create new farm
  createFarm: async (farmData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const farmsJson = localStorage.getItem(FARMS_STORAGE_KEY);
      const farms = farmsJson ? JSON.parse(farmsJson) : [];
      
      // Generate unique ID
      const newFarm = {
        ...farmData,
        id: `farm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      farms.push(newFarm);
      localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(farms));
      
      return {
        success: true,
        farm: newFarm,
        message: 'Farm created successfully'
      };
    } catch (error) {
      throw { message: 'Failed to create farm' };
    }
  },

  // Update farm
  updateFarm: async (farmId, farmData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const farmsJson = localStorage.getItem(FARMS_STORAGE_KEY);
      const farms = farmsJson ? JSON.parse(farmsJson) : [];
      
      const farmIndex = farms.findIndex(f => f.id === farmId);
      if (farmIndex === -1) {
        throw { message: 'Farm not found' };
      }
      
      const updatedFarm = {
        ...farms[farmIndex],
        ...farmData,
        id: farmId, // Preserve original ID
        updatedAt: new Date().toISOString()
      };
      
      farms[farmIndex] = updatedFarm;
      localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(farms));
      
      return {
        success: true,
        farm: updatedFarm,
        message: 'Farm updated successfully'
      };
    } catch (error) {
      throw error.message ? error : { message: 'Failed to update farm' };
    }
  },

  // Delete farm
  deleteFarm: async (farmId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const farmsJson = localStorage.getItem(FARMS_STORAGE_KEY);
      const farms = farmsJson ? JSON.parse(farmsJson) : [];
      
      const filteredFarms = farms.filter(f => f.id !== farmId);
      
      if (filteredFarms.length === farms.length) {
        throw { message: 'Farm not found' };
      }
      
      localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(filteredFarms));
      
      return {
        success: true,
        message: 'Farm deleted successfully'
      };
    } catch (error) {
      throw error.message ? error : { message: 'Failed to delete farm' };
    }
  },

  // Get farm statistics
  getFarmStats: async (farmId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock statistics
      return {
        success: true,
        stats: {
          totalWaterUsed: '1,250L',
          waterSaved: '350L',
          irrigationCount: 15,
          lastIrrigation: new Date().toISOString()
        }
      };
    } catch (error) {
      throw { message: 'Failed to fetch farm statistics' };
    }
  },
};

export default farmService;
