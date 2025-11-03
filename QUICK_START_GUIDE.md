# 🚀 Quick Start Guide - Smart Irrigation Scheduler

## 🌾 For Farmers (Simple Guide)

### Step 1: Open the App
- Open your web browser
- Go to the app URL
- You'll see the dashboard

### Step 2: Add Your Farm
1. Click the big **"Add Farm"** button (🌾)
2. Enter your farm name
3. Click **"Auto-Detect GPS"** button to find your location automatically
   - OR type your city and state manually
4. Enter your farm size and select unit (acres/hectares/bigha)
5. Select your soil type (clay/sandy/loamy/silty)
6. Select your crop (wheat/rice/corn/tomato, etc.)
7. Select your water pump size (5HP/7HP/10HP/15HP)
8. Click **✅ Add** button

### Step 3: Generate Irrigation Schedule
1. On the dashboard, click **"⚡ Generate Schedule"**
2. Wait a few seconds
3. You'll see:
   - **YES/NO** - Should you water today?
   - **Time** - When to start watering
   - **Duration** - How long to water (hours/minutes)
   - **Water Saved** - How much water you're saving

### Step 4: Follow the Schedule
- Check dashboard daily
- Look at the big **"Water Today"** card
- If it says **YES** → Water your crops at the shown time
- If it says **NO** → Skip watering (rain expected or soil is wet)

### 🆘 Need Help?
- Click the **red button** at bottom-right corner
- It has:
  - Step-by-step instructions
  - Emergency phone number
  - Common problems and solutions

### 🔊 Voice Instructions
- Click the **speaker icon (🔊)** on any page
- Listen to instructions in your language
- No need to read!

### 📴 Works Offline
- Enter data even without internet
- Data saves on your phone/computer
- Syncs automatically when internet comes back

---

## 💻 For Developers

### Installation
```bash
cd "d:\Smart Irrigation Schedular"
npm install
```

### Environment Setup
Create/update `.env` file:
```env
VITE_OPENWEATHER_API_KEY=your-api-key-here
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run Development Server
```bash
npm start
```
App will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Key Features Implemented

#### 1. GPS Location Service
```javascript
import locationService from './utils/locationService';

// Auto-detect location
const location = await locationService.getCurrentLocation();
// Returns: { latitude, longitude, city, accuracy }
```

#### 2. Voice Guidance
```javascript
import voiceGuidance from './utils/voiceGuidance';

// Speak text
voiceGuidance.speak('Welcome to the app');

// Speak page instructions
voiceGuidance.speakPageInstructions('dashboard');

// Enable/disable
voiceGuidance.setEnabled(true);
```

#### 3. Offline Sync
```javascript
import offlineSync from './utils/offlineSync';

// Save data locally
offlineSync.saveLocally('key', data);

// Get data
const data = offlineSync.getLocally('key');

// Add to sync queue
offlineSync.addToSyncQueue('action', data);
```

#### 4. Weather Service
```javascript
import weatherService from './services/weatherService';

// Get current weather
const weather = await weatherService.getCurrentWeatherByCity('Mumbai');

// Get forecast
const forecast = await weatherService.getForecastByCity('Mumbai');

// Get irrigation recommendation
const recommendation = weatherService.getIrrigationRecommendation(
  weather, 
  'wheat', 
  'loamy'
);
```

#### 5. Schedule Service
```javascript
import scheduleService from './services/scheduleService';

// Generate schedule
const result = await scheduleService.generateSchedule({
  farm: { id, name, cropType, soilType, area, pumpCapacity },
  weather: weatherData
});

// Get schedule
const schedule = await scheduleService.getSchedule(farmId);
```

### Component Usage

#### Floating Help Button
```jsx
import FloatingHelpButton from './components/FloatingHelpButton';

<FloatingHelpButton />
```

#### Voice Button
```jsx
import VoiceButton from './components/VoiceButton';

<VoiceButton text="Instructions to speak" />
```

#### Offline Indicator
```jsx
import OfflineIndicator from './components/OfflineIndicator';

<OfflineIndicator />
```

#### Farmer Summary Card
```jsx
import FarmerSummaryCard from './pages/main-dashboard/components/FarmerSummaryCard';

<FarmerSummaryCard
  schedule={schedule}
  weather={weather}
  recommendation={recommendation}
  onGenerateSchedule={handleGenerate}
/>
```

### Weather-Based Irrigation Logic

The system automatically:
- **Skips irrigation** if heavy rain (>5mm) expected
- **Reduces water** by 50% for moderate rain (2-5mm)
- **Reduces water** by 30% for light rain (<2mm)
- **Reduces water** by 20% for high humidity (>75%)
- **Increases water** by 30% for very high temp (>35°C)
- **Increases water** by 15% for high temp (>30°C)
- **Adds evening slot** for high temperatures

### File Structure
```
src/
├── components/
│   ├── FloatingHelpButton.jsx
│   ├── HelpModal.jsx
│   ├── VoiceButton.jsx
│   ├── OfflineIndicator.jsx
│   └── ui/
├── pages/
│   ├── main-dashboard/
│   │   ├── EnhancedDashboard.jsx
│   │   └── components/
│   │       ├── FarmerSummaryCard.jsx
│   │       ├── WeatherCard.jsx
│   │       └── IrrigationScheduleCard.jsx
│   └── farms/
│       └── components/
│           └── AddFarmModal.jsx
├── utils/
│   ├── locationService.js
│   ├── voiceGuidance.js
│   └── offlineSync.js
├── services/
│   ├── weatherService.js
│   └── scheduleService.js
└── contexts/
    ├── FarmContext.jsx
    └── NotificationContext.jsx
```

### API Integration

#### OpenWeatherMap API
- Current weather: `api.openweathermap.org/data/2.5/weather`
- Forecast: `api.openweathermap.org/data/2.5/forecast`
- Geocoding: `api.openweathermap.org/geo/1.0/reverse`

### Browser APIs Used
- **Geolocation API**: GPS location detection
- **Speech Synthesis API**: Voice guidance
- **LocalStorage API**: Offline data storage
- **Online/Offline Events**: Network status detection

### Testing

#### Test GPS Location
1. Open browser console
2. Allow location permission
3. Click "Auto-Detect GPS" button
4. Check console for location data

#### Test Voice Guidance
1. Click speaker icon (🔊)
2. Should hear voice instructions
3. Check browser console for errors

#### Test Offline Mode
1. Open DevTools → Network tab
2. Set to "Offline"
3. Try adding farm data
4. Data should save locally
5. Go back online
6. Data should sync

### Troubleshooting

#### GPS Not Working
- Check browser location permissions
- Try HTTPS (required for geolocation)
- Fallback to manual entry

#### Voice Not Working
- Check browser supports Speech Synthesis
- Check volume is not muted
- Try different browser (Chrome/Edge recommended)

#### Weather Not Loading
- Check API key in `.env`
- Check internet connection
- Check browser console for errors

#### Offline Sync Issues
- Check localStorage is enabled
- Check browser storage quota
- Clear old data if needed

---

## 📱 Mobile Usage

### Best Practices
- Use in landscape mode for better view
- Enable location services
- Allow notifications (future feature)
- Keep app open during irrigation

### Recommended Browsers
- ✅ Chrome (Android/iOS)
- ✅ Safari (iOS)
- ✅ Edge (Android)
- ✅ Firefox (Android/iOS)

---

## 🎯 Tips for Farmers

1. **Check Daily**: Open app every morning
2. **Follow Weather**: App adjusts for rain automatically
3. **Save Water**: App calculates optimal water amount
4. **Use Voice**: Click speaker if you can't read
5. **Get Help**: Red button for emergency support
6. **Works Offline**: No internet? No problem!

---

## 📞 Support

- **Emergency**: +91 123-456-7890
- **Email**: support@smartirrigation.com
- **Help Button**: Click 🆘 in app

---

**Made Simple for Farmers** 🌾💚
