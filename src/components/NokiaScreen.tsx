import { StatusBar } from './StatusBar';
import { SoftkeyBar } from './SoftkeyBar';
import { useEffect, useState } from 'react';

interface NokiaScreenProps {
  title?: string;
  softLeft?: string;
  softRight?: string;
  showScrollbar?: boolean;
  children: React.ReactNode;
}

export function NokiaScreen({
  softLeft,
  softRight,
  showScrollbar = false,
  children,
}: NokiaScreenProps) {
  const [time, setTime] = useState('');
  const [signal] = useState(4); // Default full signal
  const [battery] = useState(85); // Default 85% battery

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col bg-[#9ca89c] text-[#0f380f] font-mono"
      style={{
        width: '100%',
        height: '100%',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      }}
      role="region"
      aria-label="Nokia phone screen"
    >
      {/* Status Bar */}
      <StatusBar signal={signal} battery={battery} time={time} />

      {/* Content Area */}
      <div
        className={`flex-1 overflow-y-auto px-2 py-1 nokia-screen-content ${
          showScrollbar ? '' : 'scrollbar-hide'
        }`}
        role="main"
        aria-label="Screen content"
      >
        <div className="app-transition">
          {children}
        </div>
      </div>

      {/* Softkey Bar */}
      <SoftkeyBar leftLabel={softLeft} rightLabel={softRight} />
    </div>
  );
}
