import React from 'react';

interface StatusBarProps {
  signal: number; // 0-4 bars
  battery: number; // 0-100 percentage
  time: string; // HH:MM format
}

const StatusBarComponent: React.FC<StatusBarProps> = ({ signal, battery, time }) => {
  // Render signal bars (0-4)
  const renderSignalBars = () => {
    const bars = '▂▂▂▂';
    return bars.slice(0, signal);
  };

  // Render battery icon based on percentage
  const renderBatteryIcon = () => {
    if (battery >= 75) return '▓';
    if (battery >= 50) return '▒';
    if (battery >= 25) return '░';
    return '▁';
  };

  return (
    <div className="flex justify-between items-center px-2 py-1 text-xs font-mono" role="status" aria-label="Status bar">
      <span aria-label={`Signal strength: ${signal} out of 4 bars`}>{renderSignalBars()}</span>
      <span aria-label={`Current time: ${time}`}>{time}</span>
      <span aria-label={`Battery level: ${battery} percent`}>{renderBatteryIcon()}</span>
    </div>
  );
};

// Memoize StatusBar component for performance optimization
export const StatusBar = React.memo(StatusBarComponent);
