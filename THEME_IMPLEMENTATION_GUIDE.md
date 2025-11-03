# Theme Implementation Guide - Smart Irrigation

## ✅ COMPLETED: Global Theme Setup

### **What's Been Done:**

1. **✅ Updated CSS Variables** (`src/styles/tailwind.css`)
   - New green color palette applied
   - Primary: #2E7D32
   - Secondary: #A5D6A7
   - Background: #F8FAF8
   - Text colors updated
   - Dark mode colors configured

2. **✅ Updated Tailwind Config** (`tailwind.config.js`)
   - Added new shadow utilities
   - Added gradient backgrounds
   - Configured custom utilities

3. **✅ Added Font Imports**
   - Poppins for headings
   - Inter for body text
   - JetBrains Mono for monospace

4. **✅ Created Utility Classes**
   - `.card-shadow` - Soft card shadows
   - `.hover-glow` - Hover effects with scale and glow
   - `.bg-green-gradient` - Green gradient backgrounds
   - `.bg-navbar-gradient` - Navbar gradient
   - `.bg-button-gradient` - Button gradient
   - `.smooth-transition` - 300ms transitions

---

## 📋 HOW TO APPLY THE THEME TO PAGES

### **Step-by-Step Process:**

#### **1. Update Background Colors**
```jsx
// Old
className="bg-gradient-to-br from-background via-primary/5 to-secondary/10"

// New
className="bg-background"
// OR for special sections
className="bg-green-gradient"
```

#### **2. Update Card Styling**
```jsx
// Old
className="bg-card border border-border rounded-xl p-6 shadow-lg"

// New
className="bg-card border border-border rounded-2xl p-6 shadow-soft hover-glow smooth-transition"
```

#### **3. Update Button Styling**
```jsx
// Old
<Button variant="default">Action</Button>

// New - Primary Button
<Button className="bg-button-gradient text-white px-6 py-3 rounded-xl hover-glow">
  Action
</Button>

// New - Secondary Button
<Button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl hover-glow">
  Action
</Button>
```

#### **4. Update Text Colors**
```jsx
// Headings
className="text-2xl font-heading font-semibold text-foreground"

// Body text
className="text-base text-muted-foreground"

// Labels
className="text-sm text-muted-foreground"
```

#### **5. Update Gradients**
```jsx
// Old gradient backgrounds
className="bg-gradient-to-br from-primary/10 to-secondary/10"

// New
className="bg-green-gradient"
// OR
className="bg-gradient-to-br from-green-50 to-green-100"
```

#### **6. Add Hover Effects**
```jsx
// Add to interactive cards
className="hover-glow smooth-transition cursor-pointer"
```

---

## 🎯 PAGE-SPECIFIC UPDATES

### **Schedule Page (EnhancedSchedule.jsx)**

#### **Main Container**
```jsx
// Line ~450 - Update main container
<div className="min-h-screen bg-background p-6">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</div>
```

#### **Farm Header Cards**
```jsx
// Update farm header section
<div className="bg-card rounded-2xl p-6 shadow-soft border-2 border-secondary/30 hover-glow">
  <div className="flex items-center space-x-4">
    <div className="w-16 h-16 bg-button-gradient rounded-2xl flex items-center justify-center shadow-lg">
      <Icon name="Sprout" size={32} color="white" />
    </div>
    {/* Rest of content */}
  </div>
</div>
```

#### **Time Section**
```jsx
// Update time section background
<motion.div className="bg-green-gradient rounded-2xl p-6 mb-6 shadow-soft">
  {/* Time boxes */}
</motion.div>
```

#### **Timer Section**
```jsx
// Update timer section
<motion.div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-primary/30 rounded-2xl p-6 mb-6 shadow-card">
  {/* Timer content */}
</motion.div>
```

#### **Calculation Parameters**
```jsx
// Update parameter cards
<div className="bg-green-gradient/50 rounded-xl p-4 border border-primary/20 hover-glow">
  {/* Parameter content */}
</div>
```

---

### **Dashboard Page**

#### **Quick Stats Cards**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <div className="bg-card rounded-2xl p-6 shadow-soft hover-glow smooth-transition">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-button-gradient rounded-xl flex items-center justify-center">
        <Icon name="Droplet" size={24} color="white" />
      </div>
      <span className="text-3xl font-bold text-primary">1,250L</span>
    </div>
    <p className="text-sm text-muted-foreground">Water Used Today</p>
  </div>
  {/* More cards */}
</div>
```

#### **Notifications**
```jsx
<div className="bg-muted rounded-xl p-4 shadow-soft hover:shadow-card smooth-transition mb-3">
  <div className="flex items-start space-x-3">
    <span className="text-2xl">✅</span>
    <div>
      <p className="font-semibold text-foreground">Irrigation Complete</p>
      <p className="text-sm text-muted-foreground">Farm A watered successfully</p>
    </div>
  </div>
</div>
```

---

### **Weather Page**

#### **Weather Cards**
```jsx
<div className="bg-green-gradient rounded-2xl p-6 shadow-card hover-glow">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-4">
      <Icon name="Cloud" size={48} color="var(--color-primary)" />
      <div>
        <h3 className="text-3xl font-bold text-foreground">25°C</h3>
        <p className="text-muted-foreground">Partly Cloudy</p>
      </div>
    </div>
  </div>
  {/* More weather details */}
</div>
```

#### **Forecast Cards**
```jsx
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
  {forecast.map((day) => (
    <div key={day.date} className="bg-card rounded-xl p-4 shadow-soft hover-glow text-center">
      <p className="text-sm text-muted-foreground mb-2">{day.day}</p>
      <Icon name={day.icon} size={32} color="var(--color-primary)" className="mx-auto mb-2" />
      <p className="text-lg font-bold text-foreground">{day.temp}°C</p>
    </div>
  ))}
</div>
```

---

### **My Farms Page**

#### **Farm Cards**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {farms.map((farm) => (
    <div key={farm.id} className="bg-card rounded-2xl p-6 shadow-soft border-2 border-accent/30 hover-glow smooth-transition">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-button-gradient rounded-xl flex items-center justify-center">
          <Icon name="Sprout" size={24} color="white" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground">{farm.name}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span>🌾</span>
          <span className="text-sm text-muted-foreground">Crop:</span>
          <span className="font-medium text-foreground">{farm.crop}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🌍</span>
          <span className="text-sm text-muted-foreground">Soil:</span>
          <span className="font-medium text-foreground">{farm.soil}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>📍</span>
          <span className="text-sm text-muted-foreground">Location:</span>
          <span className="font-medium text-foreground">{farm.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>💧</span>
          <span className="text-sm text-muted-foreground">Pump:</span>
          <span className="font-medium text-foreground">{farm.pump}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-secondary/30">
        <button className="w-full bg-button-gradient text-white py-2 rounded-xl hover-glow">
          View Details
        </button>
      </div>
    </div>
  ))}
</div>
```

---

### **Navbar Component**

```jsx
<nav className="bg-navbar-gradient shadow-soft sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Icon name="Droplet" size={32} color="var(--color-primary)" />
        <span className="text-xl font-heading font-bold text-foreground">
          Smart Irrigation
        </span>
      </div>
      
      {/* Nav Links */}
      <div className="flex items-center space-x-6">
        <a href="/dashboard" className="text-foreground hover:text-primary smooth-transition">
          Dashboard
        </a>
        <a href="/weather" className="text-foreground hover:text-primary smooth-transition">
          Weather
        </a>
        <a href="/farms" className="text-foreground hover:text-primary smooth-transition">
          My Farms
        </a>
        <a href="/schedule" className="text-foreground hover:text-primary smooth-transition">
          Schedule
        </a>
      </div>
    </div>
  </div>
</nav>
```

---

## 🌗 Dark Mode Implementation

### **Add Dark Mode Toggle**

```jsx
// In your main App.jsx or layout component
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 w-12 h-12 bg-button-gradient rounded-full shadow-elevated hover-glow flex items-center justify-center z-50"
      >
        <Icon name={darkMode ? 'Sun' : 'Moon'} size={24} color="white" />
      </button>
      
      {/* Rest of your app */}
    </div>
  );
}
```

---

## 🎨 Quick Reference: Class Replacements

| Old Class | New Class |
|-----------|-----------|
| `bg-gradient-to-br from-primary/5 to-secondary/10` | `bg-background` or `bg-green-gradient` |
| `shadow-lg` | `shadow-soft` or `shadow-card` |
| `rounded-xl` | `rounded-2xl` (for cards) |
| `text-gray-600` | `text-muted-foreground` |
| `text-gray-900` | `text-foreground` |
| `border-gray-200` | `border-border` or `border-secondary/30` |
| `bg-white` | `bg-card` |
| `bg-green-500` | `bg-primary` or `bg-button-gradient` |

---

## ✨ Animation Examples

### **Fade In on Load**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="bg-card rounded-2xl p-6 shadow-soft"
>
  {/* Content */}
</motion.div>
```

### **Staggered Children**
```jsx
<div className="grid grid-cols-3 gap-6">
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-card rounded-2xl p-6 shadow-soft hover-glow"
    >
      {/* Content */}
    </motion.div>
  ))}
</div>
```

---

## 🔧 Testing Checklist

After applying theme to each page:

- [ ] All colors match the new palette
- [ ] Shadows are soft and consistent (0 2px 10px)
- [ ] Border radius is 16px for cards
- [ ] Hover effects work (scale 1.02 + glow)
- [ ] Transitions are smooth (300ms)
- [ ] Typography uses Poppins for headings
- [ ] Icons are properly colored
- [ ] Dark mode works correctly
- [ ] Responsive design maintained
- [ ] Accessibility preserved

---

## 📝 Notes

- **Existing logic preserved**: All data fetching, state management, and business logic remains unchanged
- **Tailwind classes**: Use existing Tailwind utilities where possible
- **Custom classes**: Use new utility classes (`.hover-glow`, `.bg-green-gradient`, etc.)
- **Framer Motion**: Already imported in most pages, use for animations
- **Icons**: Continue using existing Icon component with new colors

---

## 🚀 Next Steps

1. Apply theme to Schedule page (currently open)
2. Apply theme to Dashboard page
3. Apply theme to Weather page
4. Apply theme to My Farms page
5. Apply theme to Help/Settings pages
6. Update Navbar component
7. Add dark mode toggle
8. Test all pages
9. Document any issues

---

**Ready to implement!** Start with the Schedule page and follow the patterns above.
