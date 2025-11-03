import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFarm } from '../../contexts/FarmContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useTheme } from '../../contexts/ThemeContext';
import weatherService from '../../services/weatherService';
import scheduleService from '../../services/scheduleService';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import WeatherCard from './components/WeatherCard';
import IrrigationScheduleCard from './components/IrrigationScheduleCard';
import WaterUsageChart from './components/WaterUsageChart';
import NotificationPanel from './components/NotificationPanel';

const MainDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedFarm, farms } = useFarm();
  const { showError, showInfo } = useNotification();
  const { theme, toggleTheme } = useTheme();
  
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [waterStats, setWaterStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Load weather data
  useEffect(() => {
    const loadWeatherData = async () => {
      if (!selectedFarm?.city) {
        setWeatherLoading(false);
        return;
      }

      try {
        setWeatherLoading(true);
        const currentWeather = await weatherService.getCurrentWeatherByCity(selectedFarm.city);
        setWeather(currentWeather);

        const forecastData = await weatherService.getForecastByCity(selectedFarm.city);
        setForecast(forecastData);
      } catch (error) {
        console.error('Weather fetch error:', error);
        showError(t('errors.networkError'));
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeatherData();
    // Refresh weather every 30 minutes
    const interval = setInterval(loadWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedFarm, t, showError]);

  // Load schedule and water stats
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!selectedFarm?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Load today's schedule
        const scheduleData = await scheduleService.getSchedule(selectedFarm.id);
        setSchedule(scheduleData);

        // Load water usage stats
        const stats = await scheduleService.getWaterUsageStats(selectedFarm.id, 'week');
        setWaterStats(stats);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        // Use mock data if API fails
        setSchedule(null);
        setWaterStats(null);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [selectedFarm]);

  // Calculate irrigation recommendation
  const irrigationRecommendation = React.useMemo(() => {
    if (!weather || !selectedFarm) return null;
    
    return weatherService.getIrrigationRecommendation(
      weather,
      selectedFarm.cropType,
      selectedFarm.soilType
    );
  }, [weather, selectedFarm]);

  const handleGenerateSchedule = async () => {
    if (!selectedFarm) {
      showInfo(t('farm.noFarms'));
      navigate('/farms');
      return;
    }

    try {
      const scheduleData = await scheduleService.generateSchedule({
        farmId: selectedFarm.id,
        cropType: selectedFarm.cropType,
        soilType: selectedFarm.soilType,
        area: selectedFarm.area,
        pumpCapacity: selectedFarm.pumpCapacity,
      });
      
      setSchedule(scheduleData);
      showInfo(t('success.scheduleGenerated'));
    } catch (error) {
      showError(error.message || t('errors.somethingWrong'));
    }
  };

  const handleChangeFarm = () => {
    navigate('/farms');
  };

  if (!selectedFarm && farms.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-20 max-w-2xl">
          <div className="text-center">
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
              onClick={() => navigate('/farms')}
              iconName="Plus"
              iconPosition="left"
              size="lg"
            >
              {t('farm.addFarm')}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header with Farm Selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              {t('dashboard.title')}
            </h1>
            {selectedFarm && (
              <p className="text-lg font-body text-muted-foreground">
                {selectedFarm.name || selectedFarm.farmName} • {selectedFarm.area} {t('farm.areaUnit')}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={toggleTheme}
              iconName={theme === 'dark' ? 'Sun' : 'Moon'}
              size="icon"
            />
            <Button
              variant="outline"
              onClick={handleChangeFarm}
              iconName="MapPin"
              iconPosition="left"
            >
              {farms.length > 1 ? t('farm.myFarms') : t('farm.editFarm')}
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Primary Information */}
          <div className="lg:col-span-8 space-y-6">
            {/* Weather Card */}
            <WeatherCard
              weather={weather}
              forecast={forecast}
              loading={weatherLoading}
              recommendation={irrigationRecommendation}
            />

            {/* Irrigation Schedule */}
            <IrrigationScheduleCard
              schedule={schedule}
              loading={loading}
              onGenerateSchedule={handleGenerateSchedule}
              onViewSchedule={() => navigate('/schedule-results')}
            />

            {/* Water Usage Chart */}
            {waterStats && (
              <WaterUsageChart data={waterStats} />
            )}
          </div>

          {/* Right Column - Secondary Information */}
          <div className="lg:col-span-4 space-y-6">
            {/* Notifications Panel */}
            <NotificationPanel />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6 card-shadow">
              <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                {t('dashboard.quickActions')}
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/schedule-results')}
                  variant="outline"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="left"
                >
                  {t('dashboard.viewSchedule')}
                </Button>
                <Button
                  onClick={() => navigate('/farms')}
                  variant="outline"
                  fullWidth
                  iconName="Settings"
                  iconPosition="left"
                >
                  {t('dashboard.settings')}
                </Button>
                <Button
                  onClick={handleGenerateSchedule}
                  variant="primary"
                  fullWidth
                  iconName="Zap"
                  iconPosition="left"
                >
                  {t('irrigation.generateSchedule')}
                </Button>
              </div>
            </div>

            {/* Farm Info Card */}
            {selectedFarm && (
              <div className="bg-card border border-border rounded-xl p-6 card-shadow">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                  {t('farm.farmDetails')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('farm.cropType')}</span>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {t(`crop.${selectedFarm.cropType}`)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('farm.soilType')}</span>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {t(`soil.${selectedFarm.soilType}`)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('farm.pumpCapacity')}</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedFarm.pumpCapacity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('farm.location')}</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedFarm.location}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Padding */}
        <div className="lg:hidden h-20"></div>
      </main>
    </div>
  );
};

export default MainDashboard;
