import React from "react";
import AppRoutes from "./Routes";
import ThemeProvider from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FarmProvider } from "./contexts/FarmContext";
import NotificationProvider from "./contexts/NotificationContext";
import "./i18n/config";

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <FarmProvider>
            <div className="min-h-screen">
              <AppRoutes />
            </div>
          </FarmProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
