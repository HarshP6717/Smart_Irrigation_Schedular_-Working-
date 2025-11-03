/**
 * Calculate irrigation schedule based on farm parameters
 * Maximum irrigation time is limited to 12 hours per day
 */

export const calculateIrrigationSchedule = ({
  farmArea,
  cropType,
  soilType,
  pumpCapacity,
  weatherData,
}) => {
  // Base water requirement per acre (in liters)
  const cropWaterNeeds = {
    wheat: 4500,
    rice: 7500,
    corn: 5500,
    tomato: 6000,
    potato: 5000,
    onion: 4000,
    cotton: 6500,
    sugarcane: 8000,
  };

  // Soil water retention multipliers
  const soilMultipliers = {
    clay: 0.8,    // Retains water well
    loamy: 1.0,   // Balanced
    sandy: 1.3,   // Drains quickly, needs more water
    silty: 0.9,   // Good retention
  };

  // Pump flow rates (liters per hour)
  const pumpFlowRates = {
    '5hp': 15000,
    '7hp': 21000,
    '10hp': 30000,
    '15hp': 45000,
  };

  // Get base water requirement
  const baseWaterNeed = cropWaterNeeds[cropType?.toLowerCase()] || 5000;
  const soilMultiplier = soilMultipliers[soilType?.toLowerCase()] || 1.0;
  const pumpFlow = pumpFlowRates[pumpCapacity?.toLowerCase()] || 20000;

  // Calculate total water needed for the farm
  let totalWaterNeeded = farmArea * baseWaterNeed * soilMultiplier;

  // Adjust based on weather
  if (weatherData) {
    const { temp, humidity, rain } = weatherData;
    
    // Temperature adjustment
    if (temp > 35) totalWaterNeeded *= 1.3;
    else if (temp > 30) totalWaterNeeded *= 1.2;
    else if (temp > 25) totalWaterNeeded *= 1.1;
    else if (temp < 15) totalWaterNeeded *= 0.8;
    
    // Humidity adjustment
    if (humidity < 30) totalWaterNeeded *= 1.2;
    else if (humidity < 50) totalWaterNeeded *= 1.1;
    else if (humidity > 80) totalWaterNeeded *= 0.9;
    
    // Rain adjustment
    if (rain > 5) totalWaterNeeded = 0; // No irrigation needed
    else if (rain > 2) totalWaterNeeded *= 0.3;
    else if (rain > 0) totalWaterNeeded *= 0.5;
  }

  // Calculate total irrigation time needed (in hours)
  const totalHoursNeeded = totalWaterNeeded / pumpFlow;

  // Maximum 12 hours per day
  const MAX_HOURS_PER_DAY = 12;
  const actualHours = Math.min(totalHoursNeeded, MAX_HOURS_PER_DAY);

  // If no irrigation needed
  if (actualHours <= 0) {
    return {
      schedules: [],
      totalHours: 0,
      totalWater: 0,
      summary: 'No irrigation needed today due to weather conditions',
    };
  }

  // Split into morning and evening sessions
  const schedules = [];
  
  if (actualHours <= 3) {
    // Single morning session
    schedules.push({
      time: '06:00 AM',
      duration: formatDuration(actualHours),
      waterAmount: `${Math.round(actualHours * pumpFlow)}L`,
      zone: 'All zones',
    });
  } else if (actualHours <= 6) {
    // Two sessions
    const morningHours = actualHours / 2;
    const eveningHours = actualHours / 2;
    
    schedules.push({
      time: '06:00 AM',
      duration: formatDuration(morningHours),
      waterAmount: `${Math.round(morningHours * pumpFlow)}L`,
      zone: 'Zone A',
    });
    
    schedules.push({
      time: '05:00 PM',
      duration: formatDuration(eveningHours),
      waterAmount: `${Math.round(eveningHours * pumpFlow)}L`,
      zone: 'Zone B',
    });
  } else {
    // Three sessions for heavy irrigation
    const sessionHours = actualHours / 3;
    
    schedules.push({
      time: '05:30 AM',
      duration: formatDuration(sessionHours),
      waterAmount: `${Math.round(sessionHours * pumpFlow)}L`,
      zone: 'Zone A',
    });
    
    schedules.push({
      time: '11:00 AM',
      duration: formatDuration(sessionHours),
      waterAmount: `${Math.round(sessionHours * pumpFlow)}L`,
      zone: 'Zone B',
    });
    
    schedules.push({
      time: '05:00 PM',
      duration: formatDuration(sessionHours),
      waterAmount: `${Math.round(sessionHours * pumpFlow)}L`,
      zone: 'Zone C',
    });
  }

  const totalWater = Math.round(actualHours * pumpFlow);
  
  let summary = `Recommended: ${formatDuration(actualHours)} of irrigation today`;
  if (weatherData?.temp > 30) {
    summary += ' due to high temperature';
  } else if (weatherData?.humidity < 40) {
    summary += ' due to low humidity';
  } else {
    summary += ' for optimal crop growth';
  }

  return {
    schedules,
    totalHours: actualHours,
    totalWater,
    summary,
  };
};

/**
 * Format hours to HH:MM format
 */
const formatDuration = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * Calculate water savings compared to traditional methods
 */
export const calculateWaterSavings = (optimizedUsage, traditionalUsage) => {
  const saved = traditionalUsage - optimizedUsage;
  const percentage = (saved / traditionalUsage) * 100;
  
  return {
    liters: Math.round(saved),
    percentage: Math.round(percentage),
    co2Saved: Math.round(saved * 0.002), // Approximate CO2 savings in kg
    moneySaved: Math.round(saved * 0.15), // Approximate money saved in rupees
  };
};

/**
 * Generate weekly water usage data for charts
 */
export const generateWeeklyUsageData = (dailyUsage) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const target = 150; // Target liters per day
  
  return days.map((day, index) => ({
    day,
    usage: dailyUsage?.[index] || Math.round(Math.random() * 200),
    target,
    saved: Math.max(0, target - (dailyUsage?.[index] || 0)),
  }));
};

export default {
  calculateIrrigationSchedule,
  calculateWaterSavings,
  generateWeeklyUsageData,
};
