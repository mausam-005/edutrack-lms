import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FloatingDock from './FloatingDock';
import MinimalTopBar from './MinimalTopBar';

const Layout: React.FC = () => {
  const location = useLocation();
  // Check if we are in focus mode (e.g., active quiz)
  const isFocusMode = location.pathname.includes('/quiz/') && !location.pathname.includes('/results');

  if (isFocusMode) {
    return (
      <div className="workspace-layout">
        <main className="main-content overflow-y-auto">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="workspace-layout pl-[72px] md:pl-[72px]">
      <FloatingDock />
      <div className="flex-1 flex flex-col min-w-0 bg-primary-950 relative">
        <MinimalTopBar />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
