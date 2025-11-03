import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const { t } = useTranslation();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotification();

  const getNotificationIcon = (type) => {
    const icons = {
      success: 'CheckCircle',
      error: 'AlertCircle',
      warning: 'AlertTriangle',
      info: 'Info',
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      success: 'var(--color-primary)',
      error: 'var(--color-error)',
      warning: 'var(--color-warning)',
      info: 'var(--color-secondary)',
    };
    return colors[type] || 'var(--color-primary)';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-heading font-bold text-foreground">
            {t('notifications.title')}
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
          >
            <Icon name="CheckCheck" size={16} />
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{t('notifications.noNotifications')}</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all ${
                notification.read
                  ? 'bg-background border-border'
                  : 'bg-primary/5 border-primary/20'
              }`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={getNotificationIcon(notification.type)}
                  size={20}
                  color={getNotificationColor(notification.type)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground break-words">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(notification.id);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
