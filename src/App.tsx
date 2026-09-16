import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { OperatorsPage } from './pages/OperatorsPage';
import { OperatorDetailPage } from './pages/OperatorDetailPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { OperatorLoginPage } from './pages/OperatorLoginPage';
import { OperatorDashboardPage } from './pages/OperatorDashboardPage';
import { AdminPage } from './pages/AdminPage';
import { StripeCheckoutModal } from './components/modals/StripeCheckoutModal';
import { CallModal } from './components/modals/CallModal';
import { CandidateWizardModal } from './components/modals/CandidateWizardModal';
import { Operator } from './types';

function MainRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);

  // Sync route navigation
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Match route
  const renderRoute = () => {
    if (currentPath === '/') {
      return <LandingPage onNavigate={navigate} />;
    }
    if (currentPath === '/login') {
      return <LoginPage onNavigate={navigate} />;
    }
    if (currentPath === '/dashboard') {
      return <DashboardPage onNavigate={navigate} />;
    }
    if (currentPath === '/operators') {
      return (
        <OperatorsPage
          onNavigate={navigate}
          onSelectOperatorForDetail={op => setSelectedOperator(op)}
        />
      );
    }
    if (currentPath.startsWith('/operators/')) {
      const id = currentPath.split('/operators/')[1];
      return <OperatorDetailPage operatorId={id} onNavigate={navigate} />;
    }
    if (currentPath === '/operator-login') {
      return <OperatorLoginPage onNavigate={navigate} />;
    }
    if (currentPath === '/operator-dashboard') {
      return <OperatorDashboardPage onNavigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }

    return <LandingPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#14213D]">
      <Header currentPath={currentPath} onNavigate={navigate} />

      <main className="flex-1">
        {renderRoute()}
      </main>

      <Footer onNavigate={navigate} />

      {/* Global Interactive Modals */}
      <StripeCheckoutModal />
      <CallModal />
      <CandidateWizardModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
