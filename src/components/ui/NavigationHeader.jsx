import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = ({ 
  isCollapsed = false, 
  onToggleSidebar,
  showBackButton = false,
  title = ""
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/main-dashboard', 
      icon: 'Home',
      primary: true 
    },
    { 
      label: 'Farm Setup', 
      path: '/farm-setup', 
      icon: 'MapPin',
      primary: true 
    },
    { 
      label: 'Crop Selection', 
      path: '/crop-and-soil-selection', 
      icon: 'Sprout',
      primary: true 
    },
    { 
      label: 'Schedule', 
      path: '/schedule-results', 
      icon: 'Calendar',
      primary: true 
    },
  ];

  const secondaryItems = [
    { 
      label: 'Language', 
      path: '/language-selection', 
      icon: 'Globe' 
    },
    { 
      label: 'Settings', 
      path: '/settings', 
      icon: 'Settings' 
    },
    { 
      label: 'Help', 
      path: '/help', 
      icon: 'HelpCircle' 
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const isSetupFlow = ['/language-selection', '/authentication', '/farm-setup', '/crop-and-soil-selection']?.includes(location?.pathname);
  const primaryItems = navigationItems?.filter(item => item?.primary);

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border card-shadow">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="lg:hidden"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          )}
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Droplets" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-semibold text-lg text-foreground">
                Smart Irrigation
              </h1>
              <p className="text-xs text-muted-foreground font-caption">
                Scheduler
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 ml-8">
          {!isSetupFlow && primaryItems?.map((item) => (
            <Button
              key={item?.path}
              variant={location?.pathname === item?.path ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="font-body"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Title for Setup Flow */}
        {isSetupFlow && title && (
          <div className="flex-1 text-center lg:text-left lg:ml-8">
            <h2 className="font-heading font-medium text-foreground">
              {title}
            </h2>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Weather Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
            <Icon name="Sun" size={16} color="var(--color-warning)" />
            <span className="text-sm font-mono text-muted-foreground">
              28°C
            </span>
          </div>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/language-selection')}
            className="hidden sm:flex"
          >
            <Icon name="Globe" size={18} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>

          {/* Desktop More Menu */}
          <div className="hidden lg:block relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              iconName="MoreHorizontal"
              iconPosition="right"
              iconSize={16}
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg card-shadow py-2 z-50">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-body text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border card-shadow">
          <nav className="px-4 py-4 space-y-2">
            {!isSetupFlow && primaryItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-body transition-colors touch-target ${
                  location?.pathname === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            <div className="border-t border-border pt-2 mt-4">
              {secondaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-body text-muted-foreground hover:bg-muted hover:text-foreground transition-colors touch-target"
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;