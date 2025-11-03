import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Farmer Name',
    email: user?.email || 'farmer@example.com',
    phone: user?.phone || '+91 98765 43210',
    location: user?.location || 'Maharashtra, India',
    experience: user?.experience || '5 years',
    farmingType: user?.farmingType || 'Mixed Farming'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // TODO: Implement API call to update profile
    showSuccess('Profile updated successfully!');
    setIsEditing(false);
  };

  const stats = [
    { label: 'Total Farms', value: '3', icon: 'MapPin', color: 'primary' },
    { label: 'Water Saved', value: '1,200L', icon: 'Droplet', color: 'success' },
    { label: 'Active Schedules', value: '5', icon: 'Calendar', color: 'accent' },
    { label: 'Days Active', value: '45', icon: 'Clock', color: 'secondary' }
  ];

  const achievements = [
    { title: 'Water Saver', description: 'Saved 1000L+ water', icon: 'Award', color: 'success' },
    { title: 'Early Adopter', description: 'Joined in first month', icon: 'Star', color: 'warning' },
    { title: 'Consistent User', description: '30 days streak', icon: 'TrendingUp', color: 'primary' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {t('nav.profile')}
          </h1>
          <p className="text-lg font-body text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Profile Information
                </h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm">
                      <Icon name="Check" size={16} className="mr-2" />
                      Save
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-border">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={40} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {formData.name}
                  </h3>
                  <p className="text-muted-foreground">{formData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Farming Experience
                  </label>
                  {isEditing ? (
                    <Input
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.experience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Farming Type
                  </label>
                  {isEditing ? (
                    <Input
                      name="farmingType"
                      value={formData.farmingType}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground font-medium">{formData.farmingType}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`bg-${achievement.color}/5 border border-${achievement.color}/20 rounded-lg p-4`}
                  >
                    <div className={`w-12 h-12 bg-${achievement.color}/10 rounded-full flex items-center justify-center mb-3`}>
                      <Icon name={achievement.icon} size={24} color={`var(--color-${achievement.color})`} />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Your Stats
              </h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                        <Icon name={stat.icon} size={20} color={`var(--color-${stat.color})`} />
                      </div>
                      <span className="text-muted-foreground text-sm">{stat.label}</span>
                    </div>
                    <span className="text-foreground font-bold text-lg">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Lock" size={18} className="mr-3" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Bell" size={18} className="mr-3" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Download" size={18} className="mr-3" />
                  Download Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-error border-error/30 hover:bg-error/10">
                  <Icon name="Trash2" size={18} className="mr-3" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
