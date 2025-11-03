// Mock schedule service using AI-like logic (for development without backend)
const SCHEDULES_STORAGE_KEY = 'smart_irrigation_schedules';

const scheduleService = {
  // Generate irrigation schedule
  generateSchedule: async (scheduleData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { farm, weather } = scheduleData;
      
      // AI-powered schedule generation logic
      const schedule = generateSmartSchedule(farm, weather);
      
      // Save to localStorage
      const schedulesJson = localStorage.getItem(SCHEDULES_STORAGE_KEY);
      const schedules = schedulesJson ? JSON.parse(schedulesJson) : [];
      
      const newSchedule = {
        id: `schedule_${Date.now()}`,
        farmId: farm.id,
        farmName: farm.name || farm.farmName,
        schedule: schedule,
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        weather: weather
      };
      
      schedules.push(newSchedule);
      localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(schedules));
      
      return {
        success: true,
        schedule: newSchedule,
        message: 'Schedule generated successfully',
        recommendation: generateRecommendation(farm, weather)
      };
    } catch (error) {
      throw { message: 'Failed to generate schedule' };
    }
  },

  // Get schedule for a farm
  getSchedule: async (farmId, date = null) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const schedulesJson = localStorage.getItem(SCHEDULES_STORAGE_KEY);
      const schedules = schedulesJson ? JSON.parse(schedulesJson) : [];
      
      const farmSchedules = schedules.filter(s => s.farmId === farmId);
      const latestSchedule = farmSchedules.length > 0 ? farmSchedules[farmSchedules.length - 1] : null;
      
      return {
        success: true,
        schedule: latestSchedule,
        count: farmSchedules.length
      };
    } catch (error) {
      throw { message: 'Failed to fetch schedule' };
    }
  },

  // Get schedule history
  getScheduleHistory: async (farmId, startDate, endDate) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const schedulesJson = localStorage.getItem(SCHEDULES_STORAGE_KEY);
      const schedules = schedulesJson ? JSON.parse(schedulesJson) : [];
      
      const farmSchedules = schedules.filter(s => s.farmId === farmId);
      
      return {
        success: true,
        schedules: farmSchedules,
        count: farmSchedules.length
      };
    } catch (error) {
      throw { message: 'Failed to fetch schedule history' };
    }
  },

  // Update schedule
  updateSchedule: async (scheduleId, scheduleData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const schedulesJson = localStorage.getItem(SCHEDULES_STORAGE_KEY);
      const schedules = schedulesJson ? JSON.parse(schedulesJson) : [];
      
      const scheduleIndex = schedules.findIndex(s => s.id === scheduleId);
      if (scheduleIndex === -1) {
        throw { message: 'Schedule not found' };
      }
      
      schedules[scheduleIndex] = {
        ...schedules[scheduleIndex],
        ...scheduleData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(schedules));
      
      return {
        success: true,
        schedule: schedules[scheduleIndex],
        message: 'Schedule updated successfully'
      };
    } catch (error) {
      throw error.message ? error : { message: 'Failed to update schedule' };
    }
  },

  // Delete schedule
  deleteSchedule: async (scheduleId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const schedulesJson = localStorage.getItem(SCHEDULES_STORAGE_KEY);
      const schedules = schedulesJson ? JSON.parse(schedulesJson) : [];
      
      const filteredSchedules = schedules.filter(s => s.id !== scheduleId);
      localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(filteredSchedules));
      
      return {
        success: true,
        message: 'Schedule deleted successfully'
      };
    } catch (error) {
      throw { message: 'Failed to delete schedule' };
    }
  },

  // Get water usage statistics
  getWaterUsageStats: async (farmId, period = 'week') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate mock water usage data
      const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
      const data = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          usage: Math.floor(Math.random() * 200) + 50,
          target: 150,
          saved: Math.floor(Math.random() * 100),
          efficiency: Math.floor(Math.random() * 30) + 70
        });
      }
      
      return {
        success: true,
        data: data,
        summary: {
          totalUsage: data.reduce((sum, d) => sum + d.usage, 0),
          totalSaved: data.reduce((sum, d) => sum + d.saved, 0),
          avgEfficiency: Math.floor(data.reduce((sum, d) => sum + d.efficiency, 0) / data.length)
        }
      };
    } catch (error) {
      throw { message: 'Failed to fetch water usage stats' };
    }
  },
};

// Helper function to generate smart schedule
function generateSmartSchedule(farm, weather) {
  const schedules = [];
  const cropWaterNeeds = {
    wheat: 400,
    rice: 600,
    corn: 500,
    tomato: 450,
    potato: 400,
    onion: 350,
    cotton: 550,
    sugarcane: 700
  };
  
  const soilRetention = {
    clay: 0.8,
    sandy: 0.4,
    loamy: 0.6,
    silty: 0.7
  };
  
  const baseWater = cropWaterNeeds[farm.cropType?.toLowerCase()] || 400;
  const retention = soilRetention[farm.soilType?.toLowerCase()] || 0.6;
  const adjustedWater = baseWater * (1 / retention);
  
  // Generate schedule for next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Weather-based skip logic
    const dayWeather = weather?.forecast?.[i] || weather;
    const rainfall = dayWeather?.rain || dayWeather?.rainfall || 0;
    const humidity = dayWeather?.humidity || weather?.humidity || 50;
    const temp = dayWeather?.temp || dayWeather?.temperature || weather?.temp || 25;
    
    // Skip irrigation if:
    // 1. Heavy rain expected (>5mm)
    // 2. High humidity (>85%) with moderate rain (>2mm)
    const shouldSkip = rainfall > 5 || (humidity > 85 && rainfall > 2);
    
    if (!shouldSkip) {
      // Calculate water adjustment based on conditions
      let waterMultiplier = 1.0;
      
      // Reduce water if moderate rain or high humidity
      if (rainfall > 2) waterMultiplier *= 0.5;
      else if (rainfall > 0) waterMultiplier *= 0.7;
      else if (humidity > 75) waterMultiplier *= 0.8;
      
      // Increase water if high temperature
      if (temp > 35) waterMultiplier *= 1.3;
      else if (temp > 30) waterMultiplier *= 1.15;
      
      const finalWater = adjustedWater * waterMultiplier;
      
      // Morning slot
      schedules.push({
        date: date.toISOString().split('T')[0],
        time: '06:00 AM',
        duration: Math.floor(finalWater / 10) + ' min',
        waterAmount: Math.floor(finalWater / 2) + 'L',
        zone: `Zone A - ${farm.cropType || 'Crops'}`,
        status: i === 0 ? 'active' : 'scheduled',
        reason: rainfall > 0 ? 'Light rain - reduced watering' : 'Optimal morning irrigation',
        weather: { temp, humidity, rainfall }
      });
      
      // Evening slot (if needed for high temperature)
      if (temp > 30 && rainfall === 0) {
        schedules.push({
          date: date.toISOString().split('T')[0],
          time: '06:00 PM',
          duration: Math.floor(finalWater / 15) + ' min',
          waterAmount: Math.floor(finalWater / 3) + 'L',
          zone: `Zone B - ${farm.cropType || 'Crops'}`,
          status: 'scheduled',
          reason: 'High temperature supplement',
          weather: { temp, humidity, rainfall }
        });
      }
    } else {
      // Add skip entry for visibility
      schedules.push({
        date: date.toISOString().split('T')[0],
        time: 'SKIPPED',
        duration: '0 min',
        waterAmount: '0L',
        zone: 'All Zones',
        status: 'skipped',
        reason: rainfall > 5 ? '🌧️ Heavy rain - irrigation skipped' : '💧 High soil moisture - skip irrigation',
        weather: { temp, humidity, rainfall }
      });
    }
  }
  
  return schedules;
}

// Helper function to generate recommendation
function generateRecommendation(farm, weather) {
  const temp = weather?.temperature || 25;
  const rainfall = weather?.rainfall || 0;
  
  if (rainfall > 10) {
    return {
      irrigate: false,
      reason: 'Heavy rainfall expected. Skip irrigation to conserve water.',
      nextIrrigation: 'Check after 24 hours',
      confidence: 95
    };
  } else if (rainfall > 5) {
    return {
      irrigate: false,
      reason: 'Moderate rainfall expected. Irrigation not needed.',
      nextIrrigation: 'Tomorrow morning at 6:00 AM',
      confidence: 85
    };
  } else if (temp > 35) {
    return {
      irrigate: true,
      reason: 'High temperature detected. Increase irrigation frequency.',
      nextIrrigation: 'Today at 6:00 AM and 6:00 PM',
      confidence: 90
    };
  } else {
    return {
      irrigate: true,
      reason: 'Normal conditions. Follow standard schedule.',
      nextIrrigation: 'Tomorrow at 6:00 AM',
      confidence: 80
    };
  }
}

export default scheduleService;
