import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FarmerSummaryCard = ({ schedule, weather, recommendation, onGenerateSchedule }) => {
  const { t } = useTranslation();

  // Calculate if irrigation is needed today
  const shouldIrrigateToday = recommendation?.shouldIrrigate !== false;
  
  // Get next irrigation time
  const nextIrrigation = schedule && schedule.length > 0 ? schedule[0] : null;
  
  // Calculate total water time today
  const totalMinutesToday = schedule ? schedule.reduce((sum, item) => {
    const durationStr = item.duration || '0 min';
    let minutes = 0;
    
    if (durationStr.includes(':')) {
      const [hours, mins] = durationStr.split(':').map(Number);
      minutes = (hours * 60) + mins;
    } else {
      minutes = parseInt(durationStr.match(/\d+/)?.[0] || '0');
    }
    
    return sum + minutes;
  }, 0) : 0;
  
  const hours = Math.floor(totalMinutesToday / 60);
  const minutes = totalMinutesToday % 60;
  
  // Estimate water saved (mock calculation)
  const waterSaved = Math.floor(Math.random() * 500) + 200;

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 dark:from-green-950/30 dark:via-blue-950/30 dark:to-cyan-950/30 border-2 border-primary/30 rounded-2xl p-6 shadow-xl">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center">
          <Icon name="Droplets" size={28} className="mr-2" color="var(--color-primary)" />
          💧 Today's Irrigation
        </h2>
        <p className="text-sm text-muted-foreground">Quick summary for your farm</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Water Today - Big Yes/No */}
        <div className={`rounded-2xl p-6 text-center border-4 ${
          shouldIrrigateToday 
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-600' 
            : 'bg-gradient-to-br from-gray-400 to-gray-500 border-gray-600'
        }`}>
          <div className="text-white">
            <div className="text-sm font-semibold mb-2 opacity-90">💧 WATER TODAY?</div>
            <div className="text-6xl font-black mb-2">
              {shouldIrrigateToday ? 'YES' : 'NO'}
            </div>
            <div className="text-sm opacity-90">
              {shouldIrrigateToday ? '✓ Irrigation needed' : '✗ Skip today'}
            </div>
          </div>
        </div>

        {/* Next Irrigation Time */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-center border-4 border-purple-600">
          <div className="text-white">
            <div className="text-sm font-semibold mb-2 opacity-90">⏰ NEXT TIME</div>
            <div className="text-5xl font-black mb-2">
              {nextIrrigation ? nextIrrigation.time : '--:--'}
            </div>
            <div className="text-sm opacity-90">
              {nextIrrigation ? nextIrrigation.zone || 'Zone A' : 'No schedule'}
            </div>
          </div>
        </div>

        {/* Water Duration */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-center border-4 border-orange-600">
          <div className="text-white">
            <div className="text-sm font-semibold mb-2 opacity-90">⏱️ DURATION</div>
            <div className="text-5xl font-black mb-2">
              {hours > 0 ? `${hours}h` : `${minutes}m`}
            </div>
            <div className="text-sm opacity-90">
              {hours > 0 && minutes > 0 ? `${minutes} minutes more` : 'Total time'}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Water Saved */}
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-4 border-2 border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">💰 Water Saved</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {waterSaved}L
              </div>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="#22c55e" />
            </div>
          </div>
        </div>

        {/* Weather Status */}
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">🌡️ Temperature</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {weather?.temp || '--'}°C
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Icon name="Thermometer" size={24} color="#3b82f6" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onGenerateSchedule}
          size="lg"
          fullWidth
          iconName="Zap"
          iconPosition="left"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg py-4"
        >
          ⚡ Generate Schedule
        </Button>
        <Button
          onClick={() => window.location.href = '/schedule-results'}
          size="lg"
          fullWidth
          variant="outline"
          iconName="Calendar"
          iconPosition="left"
          className="font-bold text-lg py-4"
        >
          📅 View Full Schedule
        </Button>
      </div>

      {/* Weather Alert */}
      {recommendation && (
        <div className={`mt-4 rounded-xl p-4 border-2 ${
          recommendation.shouldIrrigate 
            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500/30' 
            : 'bg-green-50 dark:bg-green-950/30 border-green-500/30'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              recommendation.shouldIrrigate ? 'bg-blue-500' : 'bg-green-500'
            }`}>
              <Icon 
                name={recommendation.shouldIrrigate ? 'Droplet' : 'CloudRain'} 
                size={20} 
                color="white" 
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">
                {recommendation.shouldIrrigate ? '💧 Irrigation Recommended' : '✓ No Irrigation Needed'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {recommendation.reason}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerSummaryCard;
