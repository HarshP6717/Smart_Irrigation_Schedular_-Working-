import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotification } from '../../contexts/NotificationContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { showSuccess } = useNotification();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      weatherAlerts: true,
      irrigationReminders: true
    },
    irrigation: {
      autoSchedule: true,
      rainDelay: true,
      waterSavingMode: true
    },
    privacy: {
      shareData: false,
      analytics: true
    }
  });

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting]
      }
    });
    showSuccess('Settings updated');
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {t('nav.settings')}
          </h1>
          <p className="text-lg font-body text-muted-foreground">
            Customize your app experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
              <Icon name="Palette" size={24} className="mr-3" color="var(--color-primary)" />
              Appearance
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Theme</p>
                  <p className="text-sm text-muted-foreground">Choose light or dark mode</p>
                </div>
                <Button onClick={toggleTheme} variant="outline">
                  <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} className="mr-2" />
                  {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground mb-3">Language</p>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        localStorage.setItem('selectedLanguage', lang.code);
                        showSuccess(`Language changed to ${lang.name}`);
                      }}
                      className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                        i18n.language === lang.code
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
              <Icon name="Bell" size={24} className="mr-3" color="var(--color-primary)" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {key === 'email' && 'Receive updates via email'}
                      {key === 'push' && 'Browser push notifications'}
                      {key === 'sms' && 'SMS alerts for critical updates'}
                      {key === 'weatherAlerts' && 'Weather warnings and forecasts'}
                      {key === 'irrigationReminders' && 'Irrigation schedule reminders'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications', key)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation Settings */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
              <Icon name="Droplet" size={24} className="mr-3" color="var(--color-primary)" />
              Irrigation Settings
            </h2>
            
            <div className="space-y-4">
              {Object.entries(settings.irrigation).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {key === 'autoSchedule' && 'Automatically generate irrigation schedules'}
                      {key === 'rainDelay' && 'Skip irrigation when rain is predicted'}
                      {key === 'waterSavingMode' && 'Optimize for maximum water conservation'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('irrigation', key)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
              <Icon name="Shield" size={24} className="mr-3" color="var(--color-primary)" />
              Privacy & Data
            </h2>
            
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {key === 'shareData' && 'Share anonymized data for research'}
                      {key === 'analytics' && 'Help improve the app with usage data'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', key)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center">
              <Icon name="Info" size={24} className="mr-3" color="var(--color-primary)" />
              About
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium text-foreground">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium text-foreground">Oct 12, 2025</span>
              </div>
              <div className="pt-3 border-t border-border">
                <Button variant="outline" className="w-full">
                  <Icon name="FileText" size={18} className="mr-2" />
                  Terms & Conditions
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <Icon name="Lock" size={18} className="mr-2" />
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
