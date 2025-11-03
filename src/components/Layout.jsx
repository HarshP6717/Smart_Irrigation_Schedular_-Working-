import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Pages where navbar should not be shown
  const noNavbarPages = ['/language-selection', '/'];
  
  const showNavbar = !noNavbarPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'pt-16 lg:pt-20' : ''}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
