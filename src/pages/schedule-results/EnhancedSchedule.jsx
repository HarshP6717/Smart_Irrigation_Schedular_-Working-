import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useFarm } from '../../contexts/FarmContext';
import { useNotification } from '../../contexts/NotificationContext';
import scheduleService from '../../services/scheduleService';
import weatherService from '../../services/weatherService';
import { calculateIrrigationSchedule } from '../../utils/scheduleCalculator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const EnhancedSchedule = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedFarm, farms } = useFarm();
  const { showSuccess, showError, showInfo } = useNotification();
  
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('today'); // today, week, month
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [weather, setWeather] = useState(null);
  const [calculations, setCalculations] = useState(null);
  const [showCalculations, setShowCalculations] = useState(false);
  const [allFarmSchedules, setAllFarmSchedules] = useState([]);
  const [showAllFarms, setShowAllFarms] = useState(false);
  const [showParametersModal, setShowParametersModal] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTimerInstructions, setShowTimerInstructions] = useState(false);

  // Real-time clock update
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    loadSchedule();
    loadAllFarmsSchedules(); // Auto-load all farms on mount
  }, [selectedFarm, farms]);

  const loadSchedule = async () => {
    if (!selectedFarm) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Load weather data
      let weatherData = null;
      if (selectedFarm.city) {
        try {
          weatherData = await weatherService.getCurrentWeatherByCity(selectedFarm.city);
          setWeather(weatherData);
        } catch (error) {
          console.error('Weather fetch error:', error);
        }
      }

      // Calculate irrigation schedule using real parameters
      const scheduleData = calculateIrrigationSchedule({
        farmArea: selectedFarm.farmArea || 5,
        cropType: selectedFarm.cropType || 'wheat',
        soilType: selectedFarm.soilType || 'loamy',
        pumpCapacity: selectedFarm.pumpCapacity || '10hp',
        weatherData: weatherData ? {
          temp: weatherData.temp,
          humidity: weatherData.humidity,
          rain: weatherData.rainfall || 0,
          condition: weatherData.condition
        } : null
      });

      // Set schedules and calculations
      if (scheduleData.schedules && scheduleData.schedules.length > 0) {
        setSchedules(scheduleData.schedules);
      } else {
        setSchedules(getDefaultSchedules());
      }

      setCalculations({
        totalHours: scheduleData.totalHours,
        totalWater: scheduleData.totalWater,
        summary: scheduleData.summary,
        farmArea: selectedFarm.farmArea || 5,
        cropType: selectedFarm.cropType || 'wheat',
        soilType: selectedFarm.soilType || 'loamy',
        pumpCapacity: selectedFarm.pumpCapacity || '10hp',
        weather: weatherData
      });

    } catch (error) {
      console.error('Error loading schedule:', error);
      setSchedules(getDefaultSchedules());
    } finally {
      setLoading(false);
    }
  };

  // Load schedules for all farms
  const loadAllFarmsSchedules = async () => {
    if (!farms || farms.length === 0) return;

    try {
      const allSchedules = [];
      
      for (const farm of farms) {
        let weatherData = null;
        if (farm.city) {
          try {
            weatherData = await weatherService.getCurrentWeatherByCity(farm.city);
          } catch (error) {
            console.error(`Weather fetch error for ${farm.name}:`, error);
          }
        }

        const scheduleData = calculateIrrigationSchedule({
          farmArea: farm.farmArea || 5,
          cropType: farm.cropType || 'wheat',
          soilType: farm.soilType || 'loamy',
          pumpCapacity: farm.pumpCapacity || '10hp',
          weatherData: weatherData ? {
            temp: weatherData.temp,
            humidity: weatherData.humidity,
            rain: weatherData.rainfall || 0,
            condition: weatherData.condition
          } : null
        });

        allSchedules.push({
          farm: farm,
          schedules: scheduleData.schedules || [],
          calculations: {
            totalHours: scheduleData.totalHours,
            totalWater: scheduleData.totalWater,
            summary: scheduleData.summary,
            weather: weatherData
          }
        });
      }

      setAllFarmSchedules(allSchedules);
    } catch (error) {
      console.error('Error loading all farms schedules:', error);
    }
  };

  // Timer functions
  const startTimer = (schedule) => {
    // Parse duration (e.g., "02:30" or "30 min")
    let durationMinutes = 0;
    if (schedule.duration.includes(':')) {
      const [hours, mins] = schedule.duration.split(':').map(Number);
      durationMinutes = (hours * 60) + mins;
    } else {
      durationMinutes = parseInt(schedule.duration.match(/\d+/)?.[0] || '0');
    }

    const durationSeconds = durationMinutes * 60;
    setRemainingTime(durationSeconds);
    setActiveTimer(schedule);
    setTimerRunning(true);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    showSuccess(`Timer started for ${durationMinutes} minutes`);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setActiveTimer(null);
    setRemainingTime(0);
    showInfo('Timer stopped');
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    showInfo('Timer paused');
  };

  const resumeTimer = () => {
    setTimerRunning(true);
    showSuccess('Timer resumed');
  };

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (timerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            // Timer completed
            setTimerRunning(false);
            setActiveTimer(null);
            
            // Show notification
            showSuccess('Irrigation completed! ✅');
            
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Smart Irrigation', {
                body: `Irrigation for ${activeTimer?.zone} is complete!`,
                icon: '/favicon.ico',
                badge: '/favicon.ico'
              });
            }
            
            // Play sound (optional)
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
            audio.play().catch(() => {});
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, remainingTime, activeTimer]);

  const getDefaultSchedules = () => [
    {
      id: 1,
      time: '06:00 AM',
      duration: '30 min',
      zone: 'Zone A - Main Field',
      waterAmount: '200L',
      status: 'active',
      priority: 'high',
      cropType: 'Wheat',
      soilMoisture: '45%',
      weather: 'Sunny',
      temperature: '28°C',
      reason: 'Optimal morning irrigation'
    },
    {
      id: 2,
      time: '07:30 AM',
      duration: '45 min',
      zone: 'Zone B - Vegetable Garden',
      waterAmount: '300L',
      status: 'scheduled',
      priority: 'medium',
      cropType: 'Tomatoes',
      soilMoisture: '52%',
      weather: 'Partly Cloudy',
      temperature: '30°C',
      reason: 'Regular watering schedule'
    },
    {
      id: 3,
      time: '06:00 PM',
      duration: '25 min',
      zone: 'Zone C - Orchard',
      waterAmount: '150L',
      status: 'scheduled',
      priority: 'low',
      cropType: 'Fruit Trees',
      soilMoisture: '60%',
      weather: 'Clear',
      temperature: '26°C',
      reason: 'Evening supplement'
    }
  ];

  const getPumpFlowRate = (capacity) => {
    const rates = {
      '5hp': 15000,
      '7hp': 21000,
      '10hp': 30000,
      '15hp': 45000
    };
    return rates[capacity?.toLowerCase()] || 20000;
  };

  const getCropWaterNeed = (crop) => {
    const needs = {
      wheat: 4500,
      rice: 7500,
      corn: 5500,
      tomato: 6000,
      potato: 5000,
      onion: 4000,
      cotton: 6500,
      sugarcane: 8000
    };
    return needs[crop?.toLowerCase()] || 5000;
  };

  const getSoilMultiplier = (soil) => {
    const multipliers = {
      clay: 0.8,
      loamy: 1.0,
      sandy: 1.3,
      silty: 0.9
    };
    return multipliers[soil?.toLowerCase()] || 1.0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-green-500 to-emerald-600';
      case 'scheduled': return 'from-blue-500 to-cyan-600';
      case 'completed': return 'from-gray-400 to-gray-500';
      case 'skipped': return 'from-orange-500 to-amber-600';
      default: return 'from-primary to-secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'scheduled': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'skipped': return 'XCircle';
      default: return 'Calendar';
    }
  };

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowDetails(true);
  };

  const handleStartNow = (schedule) => {
    showSuccess(`Starting irrigation for ${schedule.zone}`);
    // Update schedule status
    setSchedules(prev => prev.map(s => 
      s.id === schedule.id ? { ...s, status: 'active' } : s
    ));
  };

  const handleSkip = (schedule) => {
    showSuccess(`Skipped irrigation for ${schedule.zone}`);
    setSchedules(prev => prev.map(s => 
      s.id === schedule.id ? { ...s, status: 'skipped' } : s
    ));
  };

  const handleEdit = (schedule) => {
    navigate('/farm-setup', { state: { editSchedule: schedule } });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatClock = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeUntilSession = (sessionTime) => {
    const now = new Date();
    const [time, period] = sessionTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let sessionHours = hours;
    if (period === 'PM' && hours !== 12) sessionHours += 12;
    if (period === 'AM' && hours === 12) sessionHours = 0;
    
    const sessionDate = new Date();
    sessionDate.setHours(sessionHours, minutes, 0, 0);
    
    if (sessionDate < now) {
      sessionDate.setDate(sessionDate.getDate() + 1);
    }
    
    const diff = sessionDate - now;
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
    const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursUntil > 0) {
      return `${hoursUntil}h ${minutesUntil}m`;
    }
    return `${minutesUntil}m`;
  };

  const isSessionActive = (sessionTime) => {
    const now = new Date();
    const [time, period] = sessionTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let sessionHours = hours;
    if (period === 'PM' && hours !== 12) sessionHours += 12;
    if (period === 'AM' && hours === 12) sessionHours = 0;
    
    const sessionStart = new Date();
    sessionStart.setHours(sessionHours, minutes, 0, 0);
    
    const sessionEnd = new Date(sessionStart);
    sessionEnd.setMinutes(sessionEnd.getMinutes() + 60); // Assume 1 hour duration
    
    return now >= sessionStart && now <= sessionEnd;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Icon name="Droplet" size={32} color="white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-4xl font-heading font-bold text-foreground">
                Irrigation Schedule
              </h1>
              <p className="text-muted-foreground">
                {selectedFarm?.name || 'Your Farm'} • Today
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
        >
          {[
            { icon: 'Droplet', label: 'Total Water (All Farms)', value: `${allFarmSchedules.reduce((sum, fs) => sum + (fs.calculations.totalWater || 0), 0).toLocaleString()}L`, color: 'from-blue-500 to-cyan-600', iconColor: 'text-blue-500' },
            { icon: 'Clock', label: 'Total Time (All Farms)', value: `${allFarmSchedules.reduce((sum, fs) => sum + (fs.calculations.totalHours || 0), 0).toFixed(1)}h`, color: 'from-purple-500 to-pink-600', iconColor: 'text-purple-500' },
            { icon: 'Zap', label: 'Total Sessions', value: allFarmSchedules.reduce((sum, fs) => sum + fs.schedules.length, 0), color: 'from-green-500 to-emerald-600', iconColor: 'text-green-500' },
            { icon: 'Map', label: 'Active Farms', value: allFarmSchedules.length, color: 'from-orange-500 to-amber-600', iconColor: 'text-orange-500' },
            { icon: 'TrendingUp', label: 'Avg Efficiency', value: '94%', color: 'from-teal-500 to-cyan-600', iconColor: 'text-teal-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon name={stat.icon} size={24} color="white" />
                </div>
                <Icon name="TrendingUp" size={16} className={stat.iconColor} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center">
            <Icon name="Calendar" size={24} className="mr-3" color="var(--color-primary)" />
            All Farms Irrigation Schedule
          </h2>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/farm-setup')}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Farm
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                loadSchedule();
                loadAllFarmsSchedules();
              }}
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Refresh All
            </Button>
          </div>
        </div>

        {/* All Farms Schedule Timeline */}
        {allFarmSchedules.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <Icon name="Loader" size={48} color="var(--color-primary)" className="mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading schedules for all farms...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {allFarmSchedules.map((farmSchedule, farmIndex) => (
              <motion.div
                key={farmIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: farmIndex * 0.1 }}
                className="bg-gradient-to-br from-card to-card/50 border-2 border-border rounded-2xl p-6 shadow-xl"
              >
                {/* Farm Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon name="Sprout" size={32} color="white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {farmSchedule.farm.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {farmSchedule.farm.farmArea} acres • {farmSchedule.farm.cropType} • {farmSchedule.farm.soilType} soil
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{farmSchedule.calculations.totalWater?.toLocaleString()} L</p>
                    <p className="text-sm text-muted-foreground">{farmSchedule.calculations.totalHours?.toFixed(1)} hours total</p>
                  </div>
                </div>

                {/* Time Section with Clock */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/30 rounded-2xl p-6 mb-6 shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Real-Time Clock */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Icon name="Clock" size={20} color="var(--color-primary)" />
                        <h4 className="text-sm font-semibold text-foreground">Current Time</h4>
                      </div>
                      <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                        <p className="text-4xl font-bold font-mono text-primary mb-2">
                          {formatClock(currentTime)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(currentTime)}
                        </p>
                      </div>
                    </div>

                    {/* Next Session Countdown */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Icon name="Timer" size={20} color="var(--color-secondary)" />
                        <h4 className="text-sm font-semibold text-foreground">Next Session</h4>
                      </div>
                      <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                        {farmSchedule.schedules.length > 0 ? (
                          <>
                            <p className="text-2xl font-bold text-secondary mb-1">
                              {farmSchedule.schedules[0].time}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              Starts in {getTimeUntilSession(farmSchedule.schedules[0].time)}
                            </p>
                            <div className="flex items-center justify-center space-x-1 text-xs">
                              <Icon name="Droplet" size={12} color="var(--color-primary)" />
                              <span className="text-muted-foreground">{farmSchedule.schedules[0].waterAmount}</span>
                            </div>
                          </>
                        ) : (
                          <p className="text-muted-foreground text-sm">No sessions scheduled</p>
                        )}
                      </div>
                    </div>

                    {/* Total Time Breakdown */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Icon name="Calendar" size={20} color="var(--color-accent)" />
                        <h4 className="text-sm font-semibold text-foreground">Today's Schedule</h4>
                      </div>
                      <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                        <p className="text-2xl font-bold text-accent mb-1">
                          {farmSchedule.schedules.length} Session{farmSchedule.schedules.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {farmSchedule.calculations.totalHours?.toFixed(1)}h total duration
                        </p>
                        <div className="flex items-center justify-center space-x-1 text-xs">
                          <Icon name="Zap" size={12} color="var(--color-accent)" />
                          <span className="text-muted-foreground">
                            {farmSchedule.schedules.length > 0 ? 
                              `${farmSchedule.schedules[0].time} - ${farmSchedule.schedules[farmSchedule.schedules.length - 1].time}` 
                              : 'No schedule'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Day Progress</span>
                      <span>{Math.round((currentTime.getHours() * 60 + currentTime.getMinutes()) / 14.4)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${(currentTime.getHours() * 60 + currentTime.getMinutes()) / 14.4}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Irrigation Timer Section */}
                {farmSchedule.schedules.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 mb-6 shadow-lg relative"
                  >
                    {/* Info Button - Top Left */}
                    <button
                      onClick={() => setShowTimerInstructions(!showTimerInstructions)}
                      className="absolute top-4 left-4 w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-full flex items-center justify-center transition-all z-10"
                      title="How to use timer"
                    >
                      <Icon name="Info" size={16} color="var(--color-primary)" />
                    </button>

                    {/* Instructions Popup */}
                    <AnimatePresence>
                      {showTimerInstructions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-14 left-4 bg-card border-2 border-blue-500/50 rounded-xl p-4 shadow-2xl z-20 max-w-sm"
                        >
                          <div className="flex items-start space-x-3">
                            <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground mb-2">How to use the timer</p>
                              <p className="text-sm text-muted-foreground mb-3">
                                Click on any session card below to start the timer. You'll receive a notification when it's time to stop irrigation.
                              </p>
                              <button
                                onClick={() => setShowTimerInstructions(false)}
                                className="text-xs text-primary hover:underline"
                              >
                                Got it!
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 ml-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                          <Icon name="Timer" size={24} color="white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-bold text-foreground">Irrigation Timer</h3>
                          <p className="text-sm text-muted-foreground">Start timer when you begin irrigation</p>
                        </div>
                      </div>
                    </div>

                    {activeTimer && activeTimer.farmId === farmSchedule.farm.id ? (
                      <div className="space-y-4">
                        {/* Active Timer Display */}
                        <div className="bg-card/50 backdrop-blur rounded-xl p-6 border border-border">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Session Time</p>
                              <p className="text-xl font-bold text-foreground">{activeTimer.time}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
                              <p className="text-4xl font-bold font-mono text-primary">
                                {formatTime(remainingTime)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">Duration</p>
                              <p className="text-xl font-bold text-foreground">{activeTimer.duration}</p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                              <span>Progress</span>
                              <span>{Math.round(((activeTimer.durationSeconds - remainingTime) / activeTimer.durationSeconds) * 100)}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                animate={{ width: `${((activeTimer.durationSeconds - remainingTime) / activeTimer.durationSeconds) * 100}%` }}
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>

                          {/* Timer Controls */}
                          <div className="flex space-x-3">
                            {timerRunning ? (
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={pauseTimer}
                                className="flex-1"
                              >
                                <Icon name="Pause" size={18} className="mr-2" />
                                Pause Timer
                              </Button>
                            ) : (
                              <Button
                                size="lg"
                                onClick={resumeTimer}
                                className="flex-1"
                              >
                                <Icon name="Play" size={18} className="mr-2" />
                                Resume Timer
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="lg"
                              onClick={stopTimer}
                            >
                              <Icon name="Square" size={18} className="mr-2" />
                              Stop & Complete
                            </Button>
                          </div>
                        </div>

                        {/* Reminder Message */}
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <Icon name="Bell" size={20} color="#f59e0b" className="mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground mb-1">Reminder Active</p>
                              <p className="text-sm text-muted-foreground">
                                You'll receive a notification when the timer ends. Make sure to stop irrigation at that time.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Session Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {farmSchedule.schedules.slice(0, 4).map((schedule, idx) => (
                            <div
                              key={idx}
                              className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border hover:border-primary/50 transition-all cursor-pointer"
                              onClick={() => {
                                const durationMinutes = parseInt(schedule.duration.match(/\d+/)?.[0] || '0');
                                const durationSeconds = durationMinutes * 60;
                                setRemainingTime(durationSeconds);
                                setActiveTimer({
                                  ...schedule,
                                  farmId: farmSchedule.farm.id,
                                  durationSeconds: durationSeconds
                                });
                                setTimerRunning(true);
                                
                                if ('Notification' in window && Notification.permission === 'default') {
                                  Notification.requestPermission();
                                }
                                
                                showSuccess(`Timer started for ${durationMinutes} minutes`);
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-foreground">{schedule.time}</p>
                                <Icon name="Play" size={16} color="var(--color-primary)" />
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-medium">{schedule.duration}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Water:</span>
                                <span className="font-medium">{schedule.waterAmount}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Calculation Parameters for this Farm */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* Farm Details */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Map" size={16} color="var(--color-primary)" />
                      <h4 className="text-sm font-semibold text-foreground">Farm Details</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Area:</span>
                        <span className="font-semibold">{farmSchedule.farm.farmArea} acres</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Crop:</span>
                        <span className="font-semibold capitalize">{farmSchedule.farm.cropType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Soil:</span>
                        <span className="font-semibold capitalize">{farmSchedule.farm.soilType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Need:</span>
                        <span className="font-semibold text-primary">{getCropWaterNeed(farmSchedule.farm.cropType).toLocaleString()} L/acre</span>
                      </div>
                    </div>
                  </div>

                  {/* Weather Conditions */}
                  <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Cloud" size={16} color="var(--color-secondary)" />
                      <h4 className="text-sm font-semibold text-foreground">Weather</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temp:</span>
                        <span className="font-semibold">{farmSchedule.calculations.weather?.temp || 'N/A'}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Humidity:</span>
                        <span className="font-semibold">{farmSchedule.calculations.weather?.humidity || 'N/A'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rain:</span>
                        <span className="font-semibold">{farmSchedule.calculations.weather?.rainfall || 0} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition:</span>
                        <span className="font-semibold">{farmSchedule.calculations.weather?.condition || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pump Details */}
                  <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Zap" size={16} color="var(--color-accent)" />
                      <h4 className="text-sm font-semibold text-foreground">Pump</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-semibold">{farmSchedule.farm.pumpCapacity?.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Flow Rate:</span>
                        <span className="font-semibold">{getPumpFlowRate(farmSchedule.farm.pumpCapacity).toLocaleString()} L/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Efficiency:</span>
                        <span className="font-semibold">90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-semibold">Electric</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Result */}
                  <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Calculator" size={16} color="#22c55e" />
                      <h4 className="text-sm font-semibold text-foreground">Result</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Water:</span>
                        <span className="font-bold text-primary">{farmSchedule.calculations.totalWater?.toLocaleString()} L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Time:</span>
                        <span className="font-bold text-primary">{farmSchedule.calculations.totalHours?.toFixed(2)}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sessions:</span>
                        <span className="font-semibold">{farmSchedule.schedules.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Soil Factor:</span>
                        <span className="font-semibold">{getSoilMultiplier(farmSchedule.farm.soilType)}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('/main-dashboard')}
            variant="outline"
            size="lg"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Back to Dashboard
          </Button>
          <Button
            onClick={() => navigate('/weather')}
            variant="outline"
            size="lg"
          >
            <Icon name="Cloud" size={20} className="mr-2" />
            Check Weather
          </Button>
          <Button
            size="lg"
            onClick={() => navigate('/farms')}
          >
            <Icon name="Settings" size={20} className="mr-2" />
            Manage Farms
          </Button>
        </motion.div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedSchedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Schedule Details
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="text-lg font-semibold text-foreground">{selectedSchedule.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="text-lg font-semibold text-foreground">{selectedSchedule.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Water Amount</p>
                    <p className="text-lg font-semibold text-foreground">{selectedSchedule.waterAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Priority</p>
                    <p className="text-lg font-semibold text-foreground capitalize">{selectedSchedule.priority}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Zone</p>
                  <p className="text-lg font-semibold text-foreground">{selectedSchedule.zone}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Crop Type</p>
                  <p className="text-lg font-semibold text-foreground">{selectedSchedule.cropType}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reason</p>
                  <p className="text-foreground">{selectedSchedule.reason}</p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() => {
                      handleEdit(selectedSchedule);
                      setShowDetails(false);
                    }}
                    className="flex-1"
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Edit Schedule
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Parameters Modal */}
        {showParametersModal && calculations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowParametersModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Calculator" size={24} color="var(--color-primary)" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-foreground">
                    Complete Calculation Details
                  </h2>
                </div>
                <button
                  onClick={() => setShowParametersModal(false)}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* All Parameters */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Farm Parameters */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="Map" size={24} color="var(--color-primary)" />
                      <h3 className="text-xl font-semibold text-foreground">Farm Parameters</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Farm Name:</span>
                        <span className="font-semibold text-foreground">{selectedFarm?.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Area:</span>
                        <span className="font-semibold text-foreground">{calculations.farmArea} acres</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Crop Type:</span>
                        <span className="font-semibold text-foreground capitalize">{calculations.cropType}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Soil Type:</span>
                        <span className="font-semibold text-foreground capitalize">{calculations.soilType}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold text-foreground">{selectedFarm?.city || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Base Water Need:</span>
                        <span className="font-semibold text-primary">{getCropWaterNeed(calculations.cropType).toLocaleString()} L/acre</span>
                      </div>
                    </div>
                  </div>

                  {/* Weather Parameters */}
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-6 border border-secondary/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="Cloud" size={24} color="var(--color-secondary)" />
                      <h3 className="text-xl font-semibold text-foreground">Weather Conditions</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Temperature:</span>
                        <span className="font-semibold text-foreground">{weather?.temp || 'N/A'}°C</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Feels Like:</span>
                        <span className="font-semibold text-foreground">{weather?.feelsLike || 'N/A'}°C</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Humidity:</span>
                        <span className="font-semibold text-foreground">{weather?.humidity || 'N/A'}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Wind Speed:</span>
                        <span className="font-semibold text-foreground">{weather?.windSpeed || 'N/A'} km/h</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Rainfall:</span>
                        <span className="font-semibold text-foreground">{weather?.rainfall || 0} mm</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Condition:</span>
                        <span className="font-semibold text-foreground">{weather?.condition || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pump Parameters */}
                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="Zap" size={24} color="var(--color-accent)" />
                      <h3 className="text-xl font-semibold text-foreground">Pump Specifications</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-semibold text-foreground">{calculations.pumpCapacity?.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Flow Rate:</span>
                        <span className="font-semibold text-foreground">{getPumpFlowRate(calculations.pumpCapacity).toLocaleString()} L/h</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Efficiency:</span>
                        <span className="font-semibold text-foreground">90%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-semibold text-foreground">Electric</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Results */}
                  <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="Droplets" size={24} color="#22c55e" />
                      <h3 className="text-xl font-semibold text-foreground">Final Results</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Total Water:</span>
                        <span className="font-bold text-primary text-lg">{calculations.totalWater?.toLocaleString()} L</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Total Time:</span>
                        <span className="font-bold text-primary text-lg">{calculations.totalHours?.toFixed(2)} hours</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Sessions:</span>
                        <span className="font-semibold text-foreground">{schedules.length}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Soil Factor:</span>
                        <span className="font-semibold text-foreground">{getSoilMultiplier(calculations.soilType)}x</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Formula */}
                <div className="bg-muted/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="BookOpen" size={20} className="mr-2" />
                    Step-by-Step Calculation
                  </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="p-3 bg-card rounded-lg">
                      <span className="text-muted-foreground">Step 1: Base Water = </span>
                      <span className="text-foreground font-semibold">
                        {calculations.farmArea} acres × {getCropWaterNeed(calculations.cropType)} L/acre = {(calculations.farmArea * getCropWaterNeed(calculations.cropType)).toLocaleString()} L
                      </span>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <span className="text-muted-foreground">Step 2: Soil Adjustment = </span>
                      <span className="text-foreground font-semibold">
                        {(calculations.farmArea * getCropWaterNeed(calculations.cropType)).toLocaleString()} L × {getSoilMultiplier(calculations.soilType)} = {(calculations.farmArea * getCropWaterNeed(calculations.cropType) * getSoilMultiplier(calculations.soilType)).toLocaleString()} L
                      </span>
                    </div>
                    <div className="p-3 bg-card rounded-lg">
                      <span className="text-muted-foreground">Step 3: Weather Factor = </span>
                      <span className="text-foreground font-semibold">
                        {weather?.temp > 30 ? '×1.2 (High Temperature)' : weather?.temp > 25 ? '×1.1 (Moderate)' : '×1.0 (Normal)'}
                      </span>
                    </div>
                    <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                      <span className="text-muted-foreground">Final Water Required = </span>
                      <span className="text-primary font-bold text-lg">
                        {calculations.totalWater?.toLocaleString()} L
                      </span>
                    </div>
                    <div className="p-3 bg-secondary/10 border border-secondary/30 rounded-lg">
                      <span className="text-muted-foreground">Irrigation Time = </span>
                      <span className="text-secondary font-bold">
                        {calculations.totalWater?.toLocaleString()} L ÷ {getPumpFlowRate(calculations.pumpCapacity).toLocaleString()} L/h = {calculations.totalHours?.toFixed(2)} hours
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                {calculations.summary && (
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <Icon name="Sparkles" size={24} color="var(--color-primary)" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">AI Recommendation</h3>
                        <p className="text-foreground">{calculations.summary}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setShowParametersModal(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default EnhancedSchedule;
