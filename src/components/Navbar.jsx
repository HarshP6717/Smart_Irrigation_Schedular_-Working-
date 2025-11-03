import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Icon from './AppIcon';
import Button from './ui/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const profileDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  // Navigation links
  const navLinks = [
    { path: '/main-dashboard', label: 'nav.home', icon: 'Home' },
    { path: '/farms', label: 'nav.myFarms', icon: 'MapPin' },
    { path: '/weather', label: 'nav.weather', icon: 'Cloud' },
    { path: '/schedule-results', label: 'nav.schedule', icon: 'Calendar' },
    { path: '/help', label: 'nav.help', icon: 'HelpCircle' },
  ];

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/authentication');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-card border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/main-dashboard')}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"
            >
              <Icon name="Droplet" size={24} color="white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                Smart Irrigation
              </h1>
              <p className="text-xs text-muted-foreground hidden lg:block">
                Optimize Water, Maximize Yield
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(link.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActivePath(link.path)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon name={link.icon} size={18} />
                <span>{t(link.label)}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Language Selector */}
            <div className="relative" ref={languageDropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium text-foreground">
                  {currentLanguage.name}
                </span>
                <Icon name="ChevronDown" size={16} />
              </motion.button>

              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent transition-colors ${
                          i18n.language === lang.code ? 'bg-primary/10' : ''
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium text-foreground">{lang.name}</span>
                        {i18n.language === lang.code && (
                          <Icon name="Check" size={16} color="var(--color-primary)" className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
            </motion.button>

            {/* Profile Dropdown */}
            {user && (
              <div className="hidden lg:block relative" ref={profileDropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <Icon name="ChevronDown" size={16} />
                </motion.button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{t('nav.profile')}</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon name="User" size={18} />
                        <span className="text-foreground">{t('nav.viewProfile')}</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/farms');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon name="MapPin" size={18} />
                        <span className="text-foreground">{t('nav.manageFarms')}</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-accent transition-colors"
                      >
                        <Icon name="Settings" size={18} />
                        <span className="text-foreground">{t('nav.settings')}</span>
                      </button>
                      
                      <div className="border-t border-border">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-error/10 text-error transition-colors"
                        >
                          <Icon name="LogOut" size={18} />
                          <span>{t('auth.logout')}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-card"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.path}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(link.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActivePath(link.path)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon name={link.icon} size={20} />
                  <span>{t(link.label)}</span>
                </motion.button>
              ))}

              {user && (
                <>
                  <div className="border-t border-border my-2"></div>
                  
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Icon name="User" size={20} />
                    <span className="text-foreground">{t('nav.viewProfile')}</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/farms')}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Icon name="MapPin" size={20} />
                    <span className="text-foreground">{t('nav.manageFarms')}</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Icon name="Settings" size={20} />
                    <span className="text-foreground">{t('nav.settings')}</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-error/10 text-error transition-colors"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>{t('auth.logout')}</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
