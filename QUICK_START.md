# 🚀 Quick Start Guide - Smart Irrigation Scheduler

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure OpenWeatherMap API Key

1. **Get a free API key** from [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your API key

2. **Update `.env` file**:
   ```env
   VITE_OPENWEATHER_API_KEY=your-actual-api-key-here
   ```

### Step 3: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:5173`

---

## 📱 First-Time User Flow

### 1️⃣ Select Language
- Choose **English**, **Hindi (हिंदी)**, or **Marathi (मराठी)**
- Click "Continue"

### 2️⃣ Sign Up
- Enter email and password
- Click "Create Account"

### 3️⃣ Add Your First Farm
- Click "Add New Farm"
- Fill in details:
  - **Farm Name**: e.g., "Green Valley Farm"
  - **City**: e.g., "Pune"
  - **State**: e.g., "Maharashtra"
  - **Area**: e.g., "5" (acres)
  - **Soil Type**: Select from dropdown
  - **Crop Type**: Select from dropdown
  - **Pump Capacity**: Select from dropdown
- Click "Add"

### 4️⃣ View Dashboard
- See real-time weather for your farm location
- View irrigation recommendations
- Click "Generate Schedule" to create irrigation plan

### 5️⃣ View Schedule
- Click "View Schedule" to see detailed irrigation plan
- See time slots, duration, and water amounts

---

## 🎯 Key Features to Try

### ✅ Multiple Farms
- Add multiple farms from the Farms page
- Switch between farms on the dashboard
- Each farm has its own schedule

### ✅ Language Switching
- Toggle between English, Hindi, and Marathi
- All UI elements translate instantly
- Language preference is saved

### ✅ Dark/Light Mode
- Click the moon/sun icon in the header
- Theme preference is saved

### ✅ Weather Integration
- Real-time weather updates every 30 minutes
- 5-day forecast
- Smart irrigation recommendations

### ✅ Notifications
- View notifications in the right panel
- Get alerts for schedule generation
- Mark notifications as read

---

## 🔧 Common Tasks

### Add a New Farm
1. Navigate to "My Farms" (click MapPin icon)
2. Click "+ Add New Farm"
3. Fill in farm details
4. Click "Add"

### Generate Irrigation Schedule
1. Go to Dashboard
2. Click "Generate Schedule"
3. System calculates based on:
   - Weather conditions
   - Crop requirements
   - Soil type
   - Pump capacity
4. View schedule in the card

### Change Language
1. Click on your profile or settings
2. Select language from dropdown
3. Or go back to Language Selection page

### Toggle Theme
1. Click moon icon (for dark mode)
2. Click sun icon (for light mode)

---

## 📊 Understanding the Schedule

### Schedule Calculation
The system calculates irrigation based on:

**Base Water Need** = Farm Area × Crop Water Requirement × Soil Multiplier

**Weather Adjustments**:
- High temperature (>30°C): Increase water
- Low humidity (<50%): Increase water
- Rain expected: Reduce or skip irrigation

**Maximum Limit**: 12 hours per day

### Example Schedule
```
Morning Session:   06:00 AM - 08:30 AM (2.5 hours, 37,500L)
Evening Session:   05:00 PM - 07:00 PM (2 hours, 30,000L)
Total:             4.5 hours, 67,500L
```

---

## 🐛 Troubleshooting

### Weather Not Loading?
- Check your OpenWeatherMap API key in `.env`
- Ensure the key is active (may take 1-2 hours after creation)
- Check browser console for errors

### Translations Not Working?
- Clear browser cache
- Check localStorage (DevTools → Application → Local Storage)
- Verify language files exist in `src/i18n/locales/`

### Schedule Not Generating?
- Ensure you have added a farm
- Check that farm has all required fields
- Verify weather data is loading

### Build Errors?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Add New Language
1. Create `src/i18n/locales/your-lang.json`
2. Copy structure from `en.json`
3. Translate all keys
4. Update `src/i18n/config.js`

### Modify Irrigation Logic
Edit `src/utils/scheduleCalculator.js`:
- Adjust crop water requirements
- Modify soil multipliers
- Change weather adjustment factors

---

## 📞 Need Help?

- **Documentation**: See `README.md` for full documentation
- **Enhancements**: See `ENHANCEMENTS.md` for all features
- **Issues**: Check browser console for errors
- **Support**: Open an issue on GitHub

---

## ✨ Next Steps

1. **Add Backend**: Implement Flask/Node.js API
2. **Database**: Connect PostgreSQL/MongoDB
3. **Deploy**: Deploy to Vercel/Netlify
4. **Mobile**: Create React Native app
5. **IoT**: Integrate sensors and automation

---

**Happy Farming! 🌾💧**

Optimize your water usage and increase crop yield with smart irrigation scheduling.
