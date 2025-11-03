import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';
import offlineSync from '../utils/offlineSync';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      updatePendingCount();
    };

    const handleOffline = () => {
      setIsOnline(false);
      updatePendingCount();
    };

    const updatePendingCount = () => {
      setPendingCount(offlineSync.getPendingCount());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update pending count periodically
    const interval = setInterval(updatePendingCount, 5000);

    // Initial update
    updatePendingCount();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (isOnline && pendingCount === 0) {
    return null; // Don't show anything when online and synced
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`rounded-xl shadow-lg border-2 transition-all ${
          isOnline
            ? 'bg-green-50 dark:bg-green-950/30 border-green-500'
            : 'bg-orange-50 dark:bg-orange-950/30 border-orange-500'
        }`}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <div className="p-3 flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isOnline ? 'bg-green-500' : 'bg-orange-500'
            }`}
          >
            <Icon
              name={isOnline ? 'Wifi' : 'WifiOff'}
              size={20}
              color="white"
            />
          </div>
          <div>
            <div className="font-bold text-foreground text-sm">
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </div>
            {pendingCount > 0 && (
              <div className="text-xs text-muted-foreground">
                {pendingCount} items pending sync
              </div>
            )}
          </div>
        </div>

        {/* Details on hover */}
        {showDetails && (
          <div className="border-t border-border p-3 text-xs text-muted-foreground">
            {isOnline ? (
              <p>✓ Connected to internet. Data will sync automatically.</p>
            ) : (
              <p>
                ⚠️ No internet connection. Your data is saved locally and will
                sync when you're back online.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
