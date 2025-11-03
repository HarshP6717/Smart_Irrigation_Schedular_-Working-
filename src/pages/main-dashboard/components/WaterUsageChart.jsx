import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const WaterUsageChart = ({ data }) => {
  // Provide default data if none is passed
  const defaultData = [
    { day: 'Mon', usage: 120, target: 150, saved: 30 },
    { day: 'Tue', usage: 0, target: 150, saved: 150 },
    { day: 'Wed', usage: 180, target: 150, saved: 0 },
    { day: 'Thu', usage: 90, target: 150, saved: 60 },
    { day: 'Fri', usage: 160, target: 150, saved: 0 },
    { day: 'Sat', usage: 0, target: 150, saved: 150 },
    { day: 'Sun', usage: 140, target: 150, saved: 10 }
  ];

  const chartData = data && data.length > 0 ? data : defaultData;
  
  // Calculate totals safely
  const totalUsage = chartData.reduce((sum, item) => sum + (item?.usage || 0), 0);
  const totalSaved = chartData.reduce((sum, item) => sum + (item?.saved || 0), 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{payload[0].payload.day}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}L
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Water Usage
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Weekly water consumption analysis
          </p>
        </div>
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
      </div>

      {/* Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Liters', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="usage" 
              fill="var(--color-primary)" 
              name="Water Used"
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="saved" 
              fill="var(--color-success)" 
              name="Water Saved"
              radius={[8, 8, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              name="Target"
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Used</p>
          <p className="text-lg font-bold text-foreground">{totalUsage}L</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Saved</p>
          <p className="text-lg font-bold text-success">{totalSaved}L</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
          <p className="text-lg font-bold text-primary">
            {totalUsage > 0 ? Math.round((totalSaved / (totalUsage + totalSaved)) * 100) : 0}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterUsageChart;