import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Layout from "components/Layout";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication/EnhancedAuth';
import ScheduleResults from './pages/schedule-results/EnhancedSchedule';
import MainDashboard from './pages/main-dashboard';
import FarmSetup from './pages/farm-setup';
import Farms from './pages/farms';
import Weather from './pages/weather';
import Help from './pages/help';
import Profile from './pages/profile';
import Settings from './pages/settings';
import LanguageSelection from './pages/language-selection/EnhancedLanguageSelection';
import CropAndSoilSelection from './pages/crop-and-soil-selection';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Layout>
          <RouterRoutes>
            <Route path="/" element={<LanguageSelection />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/schedule-results" element={<ScheduleResults />} />
            <Route path="/main-dashboard" element={<MainDashboard />} />
            <Route path="/farm-setup" element={<FarmSetup />} />
            <Route path="/language-selection" element={<LanguageSelection />} />
            <Route path="/crop-and-soil-selection" element={<CropAndSoilSelection />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;