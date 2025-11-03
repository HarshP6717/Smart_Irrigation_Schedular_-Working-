import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HelpPage = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: 'Rocket' },
    { id: 'farms', label: 'Managing Farms', icon: 'MapPin' },
    { id: 'irrigation', label: 'Irrigation Scheduling', icon: 'Calendar' },
    { id: 'weather', label: 'Weather Features', icon: 'Cloud' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: 'AlertCircle' },
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I get started with Smart Irrigation?',
        answer: 'Start by selecting your preferred language, then create an account. Add your first farm with details like location, crop type, and soil type. The system will automatically generate irrigation schedules based on weather data.'
      },
      {
        question: 'What information do I need to add a farm?',
        answer: 'You need: Farm name, location (city), farm area, crop type, soil type, and irrigation system details (pump capacity, water source).'
      },
      {
        question: 'Is the app available in my language?',
        answer: 'Yes! The app supports English, Hindi (हिंदी), and Marathi (मराठी). You can switch languages anytime from the navbar.'
      }
    ],
    'farms': [
      {
        question: 'How do I add a new farm?',
        answer: 'Go to "My Farms" page and click "Add New Farm". Fill in the farm details including name, location, area, crop type, soil type, and pump details. Click "Save Farm" to add it.'
      },
      {
        question: 'Can I manage multiple farms?',
        answer: 'Yes! You can add and manage multiple farms. Switch between farms from the dashboard or farms page to view specific irrigation schedules and weather data.'
      },
      {
        question: 'How do I edit or delete a farm?',
        answer: 'Go to "My Farms", find the farm you want to modify, and click the edit (pencil) or delete (trash) icon. Confirm your action when prompted.'
      }
    ],
    'irrigation': [
      {
        question: 'How are irrigation schedules calculated?',
        answer: 'Schedules are calculated based on: crop water requirements, soil moisture retention, current weather conditions, rainfall predictions, and evapotranspiration rates. The system optimizes water usage while ensuring crop health.'
      },
      {
        question: 'Can I manually adjust the schedule?',
        answer: 'Yes! While the system provides AI-powered recommendations, you can manually adjust irrigation times, duration, and frequency based on your observations and needs.'
      },
      {
        question: 'What if it rains?',
        answer: 'The system automatically adjusts irrigation schedules when rain is detected or predicted. You\'ll receive notifications about schedule changes due to weather conditions.'
      }
    ],
    'weather': [
      {
        question: 'How accurate is the weather data?',
        answer: 'We use OpenWeatherMap API which provides highly accurate weather data. The forecast includes temperature, humidity, rainfall, wind speed, and 7-day predictions.'
      },
      {
        question: 'How often is weather data updated?',
        answer: 'Weather data is updated every hour automatically. You can also manually refresh the data anytime from the weather page.'
      },
      {
        question: 'What should I do during extreme weather?',
        answer: 'The app will send alerts for extreme weather conditions. Follow the recommendations provided, and consider postponing irrigation during heavy rain or extreme heat.'
      }
    ],
    'troubleshooting': [
      {
        question: 'Weather data is not loading',
        answer: 'Check your internet connection. Ensure you\'ve added a farm with a valid city name. Try refreshing the page. If the issue persists, contact support.'
      },
      {
        question: 'I forgot my password',
        answer: 'Click "Forgot Password" on the login page. Enter your registered email, and you\'ll receive a password reset link.'
      },
      {
        question: 'The app is not in my language',
        answer: 'Click the flag icon in the navbar and select your preferred language (English, Hindi, or Marathi). Your preference will be saved automatically.'
      }
    ]
  };

  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Emergency Helpline',
      value: '1800-123-4567',
      description: 'Available 24/7',
      color: 'error'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp Support',
      value: '+91 98765 43210',
      description: 'Quick responses',
      color: 'success'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      value: 'help@smartirrigation.com',
      description: 'Detailed assistance',
      color: 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="HelpCircle" size={40} color="var(--color-primary)" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {t('nav.help')} & Support
          </h1>
          <p className="text-lg font-body text-muted-foreground">
            Find answers to common questions and get support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
              <h3 className="font-heading font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-accent text-foreground'
                    }`}
                  >
                    <Icon name={category.icon} size={20} />
                    <span className="font-medium text-sm">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                {categories.find(c => c.id === activeCategory)?.label}
              </h2>
              <div className="space-y-6">
                {faqs[activeCategory]?.map((faq, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-6 last:pb-0">
                    <h3 className="font-heading font-semibold text-foreground mb-3 flex items-start">
                      <Icon name="HelpCircle" size={20} className="mr-2 flex-shrink-0 mt-1" color="var(--color-primary)" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground ml-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Contact Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className={`bg-${contact.color}/5 border border-${contact.color}/20 rounded-lg p-4`}
                  >
                    <div className={`w-12 h-12 bg-${contact.color}/10 rounded-full flex items-center justify-center mb-3`}>
                      <Icon name={contact.icon} size={24} color={`var(--color-${contact.color})`} />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">
                      {contact.title}
                    </h4>
                    <p className={`text-${contact.color} font-mono font-bold mb-1`}>
                      {contact.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{contact.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 mt-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Video" size={24} color="white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">Video Tutorials</h3>
                  <p className="text-white/80 text-sm">Learn how to use the app</p>
                </div>
              </div>
              <p className="text-white/90 mb-4">
                Watch step-by-step video guides on setting up farms, understanding irrigation schedules, and maximizing water efficiency.
              </p>
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Icon name="Play" size={18} className="mr-2" />
                Watch Tutorials
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
