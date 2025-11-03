// Offline Sync Service for localStorage
class OfflineSyncService {
  constructor() {
    this.SYNC_QUEUE_KEY = 'offline_sync_queue';
    this.LAST_SYNC_KEY = 'last_sync_timestamp';
    this.isOnline = navigator.onLine;
    
    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  // Check if online
  checkOnlineStatus() {
    return navigator.onLine;
  }

  // Handle going online
  handleOnline() {
    this.isOnline = true;
    console.log('🟢 Back online - syncing data...');
    this.syncPendingData();
  }

  // Handle going offline
  handleOffline() {
    this.isOnline = false;
    console.log('🔴 Offline mode - data will be saved locally');
  }

  // Add data to sync queue
  addToSyncQueue(action, data) {
    const queue = this.getSyncQueue();
    const item = {
      id: Date.now() + Math.random(),
      action,
      data,
      timestamp: new Date().toISOString(),
      synced: false
    };
    
    queue.push(item);
    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
    
    // Try to sync immediately if online
    if (this.isOnline) {
      this.syncPendingData();
    }
    
    return item;
  }

  // Get sync queue
  getSyncQueue() {
    try {
      const queue = localStorage.getItem(this.SYNC_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Error reading sync queue:', error);
      return [];
    }
  }

  // Sync pending data
  async syncPendingData() {
    if (!this.isOnline) {
      console.log('Cannot sync - offline');
      return;
    }

    const queue = this.getSyncQueue();
    const pendingItems = queue.filter(item => !item.synced);

    if (pendingItems.length === 0) {
      console.log('✓ No pending items to sync');
      return;
    }

    console.log(`Syncing ${pendingItems.length} items...`);

    for (const item of pendingItems) {
      try {
        await this.syncItem(item);
        item.synced = true;
        item.syncedAt = new Date().toISOString();
      } catch (error) {
        console.error('Sync failed for item:', item, error);
        // Keep item in queue for retry
      }
    }

    // Update queue
    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
    
    // Update last sync timestamp
    localStorage.setItem(this.LAST_SYNC_KEY, new Date().toISOString());

    // Clean up old synced items (older than 7 days)
    this.cleanupSyncedItems();
  }

  // Sync individual item
  async syncItem(item) {
    // This would normally make API calls to backend
    // For now, we'll just simulate the sync
    console.log('Syncing item:', item.action, item.data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  }

  // Clean up old synced items
  cleanupSyncedItems() {
    const queue = this.getSyncQueue();
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    const cleanedQueue = queue.filter(item => {
      if (!item.synced) return true; // Keep unsynced items
      const itemTime = new Date(item.timestamp).getTime();
      return itemTime > sevenDaysAgo; // Keep recent synced items
    });

    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(cleanedQueue));
  }

  // Get last sync time
  getLastSyncTime() {
    const timestamp = localStorage.getItem(this.LAST_SYNC_KEY);
    return timestamp ? new Date(timestamp) : null;
  }

  // Get pending count
  getPendingCount() {
    const queue = this.getSyncQueue();
    return queue.filter(item => !item.synced).length;
  }

  // Clear all sync data
  clearSyncQueue() {
    localStorage.removeItem(this.SYNC_QUEUE_KEY);
    localStorage.removeItem(this.LAST_SYNC_KEY);
  }

  // Save data locally with offline support
  saveLocally(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      
      // Add to sync queue if we want to sync this data
      if (!this.isOnline) {
        this.addToSyncQueue('save', { key, data });
      }
      
      return true;
    } catch (error) {
      console.error('Error saving locally:', error);
      return false;
    }
  }

  // Get data from local storage
  getLocally(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading locally:', error);
      return null;
    }
  }

  // Check if data is stale (needs refresh)
  isDataStale(key, maxAgeMinutes = 30) {
    const timestampKey = `${key}_timestamp`;
    const timestamp = localStorage.getItem(timestampKey);
    
    if (!timestamp) return true;
    
    const age = Date.now() - parseInt(timestamp);
    const maxAge = maxAgeMinutes * 60 * 1000;
    
    return age > maxAge;
  }

  // Update data timestamp
  updateDataTimestamp(key) {
    const timestampKey = `${key}_timestamp`;
    localStorage.setItem(timestampKey, Date.now().toString());
  }
}

// Create singleton instance
const offlineSync = new OfflineSyncService();

export default offlineSync;
