import React from 'react';
import Icon from '../../../components/AppIcon';

const WaterSavingsCard = ({ 
  dailySavings = '45L',
  weeklySavings = '280L',
  monthlySavings = '1,200L',
  co2Saved = '2.4kg',
  moneySaved = '₹180'
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Water Savings
        </h3>
        <Icon name="Leaf" size={20} color="var(--color-success)" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-muted-foreground">Today</span>
          <span className="text-lg font-mono font-bold text-success">{dailySavings}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-muted-foreground">This Week</span>
          <span className="text-lg font-mono font-bold text-success">{weeklySavings}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-muted-foreground">This Month</span>
          <span className="text-lg font-mono font-bold text-success">{monthlySavings}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Icon name="Leaf" size={16} color="var(--color-success)" className="mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">CO₂ Saved</div>
            <div className="text-sm font-mono text-success">{co2Saved}</div>
          </div>
          <div className="text-center">
            <Icon name="DollarSign" size={16} color="var(--color-success)" className="mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Money Saved</div>
            <div className="text-sm font-mono text-success">{moneySaved}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterSavingsCard;