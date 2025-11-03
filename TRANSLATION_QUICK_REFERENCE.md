# 🌐 Translation Quick Reference Guide

## ✅ Setup Complete

i18next is configured with **3 languages**:
- **English** (en)
- **Hindi** (हिंदी) (hi)
- **Marathi** (मराठी) (mr)

---

## 🚀 How to Use Translations in Components

### **1. Import the Hook**
```jsx
import { useTranslation } from 'react-i18next';
```

### **2. Use in Component**
```jsx
function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('irrigation.currentTime')}</p>
    </div>
  );
}
```

---

## 📋 Common Translation Keys

### **Navigation**
```jsx
{t('nav.home')}           // Home / होम / होम
{t('nav.myFarms')}        // My Farms / मेरे खेत / माझी शेती
{t('nav.weather')}        // Weather / मौसम / हवामान
{t('nav.schedule')}       // Schedule / अनुसूची / वेळापत्रक
{t('nav.profile')}        // Profile / प्रोफाइल / प्रोफाइल
{t('nav.help')}           // Help / मदद / मदत
```

### **Dashboard**
```jsx
{t('dashboard.title')}              // Dashboard
{t('dashboard.irrigationStatus')}   // Irrigation Status
{t('dashboard.weatherSummary')}     // Weather Summary
{t('dashboard.waterUsage')}         // Water Usage
{t('dashboard.quickActions')}       // Quick Actions
```

### **Schedule/Irrigation**
```jsx
{t('irrigation.currentTime')}       // Current Time / वर्तमान समय / सध्याचा वेळ
{t('irrigation.nextSession')}       // Next Session / अगला सत्र / पुढील सत्र
{t('irrigation.todayScheduleTitle')}// Today's Schedule / आज की अनुसूची / आजचे वेळापत्रक
{t('irrigation.session')}           // Session / सत्र / सत्र
{t('irrigation.startsIn')}          // Starts in / शुरू होगा / सुरू होईल
{t('irrigation.totalDuration')}     // total duration / कुल अवधि / एकूण कालावधी
{t('irrigation.irrigationTimer')}   // Irrigation Timer / सिंचाई टाइमर / सिंचन टाइमर
{t('irrigation.dayProgress')}       // Day Progress / दिन की प्रगति / दिवसाची प्रगती
```

### **Farm Details**
```jsx
{t('irrigation.farmDetails')}       // Farm Details / खेत विवरण / शेत तपशील
{t('irrigation.area')}              // Area / क्षेत्र / क्षेत्रफळ
{t('irrigation.crop')}              // Crop / फसल / पीक
{t('irrigation.soil')}              // Soil / मिट्टी / मातीचा प्रकार
{t('irrigation.baseNeed')}          // Base Need / आधार आवश्यकता / मूलभूत गरज
```

### **Weather**
```jsx
{t('weather.temperature')}          // Temperature / तापमान / तापमान
{t('weather.humidity')}             // Humidity / आर्द्रता / आर्द्रता
{t('weather.rainfall')}             // Rainfall / वर्षा / पाऊस
{t('weather.condition')}            // Condition / स्थिति / स्थिती
{t('weather.sunrise')}              // Sunrise / सूर्योदय / सूर्योदय
{t('weather.sunset')}               // Sunset / सूर्यास्त / सूर्यास्त
```

### **Pump**
```jsx
{t('irrigation.pumpSpecifications')}// Pump Specifications / पंप विनिर्देश / पंप तपशील
{t('irrigation.capacity')}          // Capacity / क्षमता / क्षमता
{t('irrigation.flowRate')}          // Flow Rate / प्रवाह दर / वाहण्याचा दर
{t('irrigation.efficiency')}        // Efficiency / कार्यक्षमता / कार्यक्षमता
{t('irrigation.type')}              // Type / प्रकार / प्रकार
```

### **Calculations**
```jsx
{t('irrigation.totalWater')}        // Total Water / कुल पानी / एकूण पाणी
{t('irrigation.totalTime')}         // Total Time / कुल समय / एकूण वेळ
{t('irrigation.sessions')}          // Sessions / सत्र / सत्रे
{t('irrigation.soilFactor')}        // Soil Factor / मिट्टी कारक / माती घटक
```

---

## 🔄 Dynamic Translations

### **Crop Types**
```jsx
// Dynamic crop translation
<span>{t(`crop.${cropType}`)}</span>

// Examples:
t('crop.wheat')      // Wheat / गेहूं / गहू
t('crop.rice')       // Rice / चावल / तांदूळ
t('crop.corn')       // Corn / मक्का / मका
t('crop.tomato')     // Tomato / टमाटर / टोमॅटो
t('crop.potato')     // Potato / आलू / बटाटा
t('crop.onion')      // Onion / प्याज / कांदा
t('crop.cotton')     // Cotton / कपास / कापूस
t('crop.sugarcane')  // Sugarcane / गन्ना / ऊस
```

### **Soil Types**
```jsx
// Dynamic soil translation
<span>{t(`soil.${soilType}`)}</span>

// Examples:
t('soil.clay')       // Clay / चिकनी मिट्टी / चिकणमाती
t('soil.sandy')      // Sandy / रेतीली मिट्टी / वाळूमाती
t('soil.loamy')      // Loamy / दोमट मिट्टी / दुमट माती
t('soil.silty')      // Silty / गाद मिट्टी / गाळाची माती
```

### **Weather Conditions**
```jsx
// Dynamic weather translation
<span>{t(`weather.conditions.${condition}`)}</span>

// Examples:
t('weather.conditions.Clear')        // Clear / साफ / स्वच्छ
t('weather.conditions.Clouds')       // Cloudy / बादल / ढगाळ
t('weather.conditions.Rain')         // Rain / बारिश / पाऊस
t('weather.conditions.Thunderstorm') // Thunderstorm / तूफान / वादळ
```

### **Status**
```jsx
// Dynamic status translation
<span>{t(`irrigation.status.${status}`)}</span>

// Examples:
t('irrigation.status.active')    // Currently Irrigating / सिंचाई चल रही है / सध्या सिंचन सुरू आहे
t('irrigation.status.pending')   // Schedule Pending / अनुसूची लंबित / वेळापत्रक प्रलंबित
t('irrigation.status.completed') // Completed / पूर्ण / पूर्ण
```

### **Priority**
```jsx
// Dynamic priority translation
<span>{t(`irrigation.priority.${priority}`)}</span>

// Examples:
t('irrigation.priority.high')    // High / उच्च / उच्च
t('irrigation.priority.medium')  // Medium / मध्यम / मध्यम
t('irrigation.priority.low')     // Low / निम्न / कमी
```

---

## 🎯 Complete Example Component

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function FarmCard({ farm }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft">
      {/* Farm Details Header */}
      <h3 className="text-xl font-semibold mb-4">
        {t('irrigation.farmDetails')}
      </h3>
      
      {/* Farm Name (NOT translated - user data) */}
      <h4 className="text-lg font-bold mb-3">{farm.name}</h4>
      
      {/* Area with translation */}
      <div className="flex items-center mb-2">
        <span className="text-muted-foreground">{t('irrigation.area')}:</span>
        <span className="ml-2 font-medium">
          {farm.area} {t('farm.areaUnit')}
        </span>
      </div>
      
      {/* Crop with dynamic translation */}
      <div className="flex items-center mb-2">
        <span className="text-muted-foreground">{t('irrigation.crop')}:</span>
        <span className="ml-2 font-medium">
          {t(`crop.${farm.cropType}`)}
        </span>
      </div>
      
      {/* Soil with dynamic translation */}
      <div className="flex items-center mb-2">
        <span className="text-muted-foreground">{t('irrigation.soil')}:</span>
        <span className="ml-2 font-medium">
          {t(`soil.${farm.soilType}`)}
        </span>
      </div>
      
      {/* Weather Section */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="font-semibold mb-2">
          {t('irrigation.weatherConditions')}
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-muted-foreground">
              {t('irrigation.temp')}:
            </span>
            <span className="ml-1">{farm.weather.temp}°C</span>
          </div>
          
          <div>
            <span className="text-sm text-muted-foreground">
              {t('weather.humidity')}:
            </span>
            <span className="ml-1">{farm.weather.humidity}%</span>
          </div>
          
          <div>
            <span className="text-sm text-muted-foreground">
              {t('irrigation.condition')}:
            </span>
            <span className="ml-1">
              {t(`weather.conditions.${farm.weather.condition}`)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        <button className="bg-button-gradient text-white px-4 py-2 rounded-xl">
          {t('irrigation.generateSchedule')}
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-xl">
          {t('common.edit')}
        </button>
      </div>
    </div>
  );
}

export default FarmCard;
```

---

## 🔄 Change Language Programmatically

```jsx
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hi')}>हिंदी</button>
      <button onClick={() => changeLanguage('mr')}>मराठी</button>
    </div>
  );
}
```

---

## ❌ What NOT to Translate

```jsx
// ❌ DON'T translate these:
<span>{farmName}</span>              // User-entered data
<span>{cityName}</span>              // Location names
<span>{25}°C</span>                  // Numbers and units
<span>{1500} L</span>                // Measurements
<span>{10} HP</span>                 // Technical specs
<span>12:30 PM</span>                // Times
<span>2024-10-14</span>              // Dates
<span>user@email.com</span>          // Email addresses

// ✅ DO translate these:
<span>{t('irrigation.temp')}: 25°C</span>     // Labels
<span>{t('irrigation.capacity')}: 10 HP</span> // Labels
```

---

## 📊 Translation Coverage

| Category | Keys | Status |
|----------|------|--------|
| Navigation | 8 | ✅ |
| Common | 17 | ✅ |
| Dashboard | 10 | ✅ |
| Farm Management | 15 | ✅ |
| Irrigation | 50+ | ✅ |
| Weather | 15 | ✅ |
| Soil Types | 4 | ✅ |
| Crop Types | 8 | ✅ |
| Pump | 4 | ✅ |
| Notifications | 6 | ✅ |
| Errors | 9 | ✅ |
| Success | 6 | ✅ |
| **TOTAL** | **250+** | ✅ |

---

## 🎯 Quick Tips

1. **Always use `t()` for visible text**
2. **Never translate user data or numbers**
3. **Use dynamic keys for dropdown values** (crop, soil, weather)
4. **Keep units unchanged** (°C, L, HP, km/h)
5. **Language preference is auto-saved** in localStorage
6. **No page reload needed** - instant switching

---

**Ready to use!** All translations are complete and functional. 🚀
