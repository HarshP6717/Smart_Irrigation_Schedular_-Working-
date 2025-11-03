import React from 'react';
import Icon from '../../../components/AppIcon';

const WaterSavingsCard = ({ 
  todaySavings = '15L',
  weeklySavings = '85L',
  monthlySavings = '340L',
  savingsReason = 'Weather-based adjustments',
  className = ''
}) => {
  const savingsData = [
    {
      period: 'Today',
      amount: todaySavings,
      icon: 'Droplets',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      period: 'This Week',
      amount: weeklySavings,
      icon: 'Calendar',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10'
    },
    {
      period: 'This Month',
      amount: monthlySavings,
      icon: 'TrendingUp',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 card-shadow">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-lg">
            <Icon name="Leaf" size={24} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Water Savings
            </h3>
            <p className="text-sm font-caption text-muted-foreground">
              Smart irrigation benefits
            </p>
          </div>
        </div>

        {/* Savings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {savingsData?.map((item, index) => (
            <div 
              key={index}
              className={`${item?.bgColor} border border-transparent rounded-lg p-4 transition-all duration-300 ag-transition hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon name={item?.icon} size={20} color={item?.color} />
                <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                  {item?.period}
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-foreground">
                {item?.amount}
              </div>
              <p className="text-xs font-caption text-muted-foreground mt-1">
                Water saved
              </p>
            </div>
          ))}
        </div>

        {/* Savings Reason */}
        <div className="p-4 bg-muted/50 rounded-lg border border-muted">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} color="var(--color-accent)" />
            <div>
              <p className="text-sm font-body text-foreground font-medium mb-1">
                How you're saving water
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                {savingsReason} help optimize irrigation timing and reduce waste.
              </p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Globe" size={18} color="var(--color-success)" />
            <div className="flex-1">
              <p className="text-sm font-body text-success font-medium">
                Environmental Impact
              </p>
              <p className="text-xs font-caption text-success/80">
                Your smart irrigation saves approximately 1,020L per month, contributing to water conservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterSavingsCard;