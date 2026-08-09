import React from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

import { AuthModal } from './pages/AuthModal';
import { ClassDetailsModal } from './components/modals/ClassDetailsModal';
import { BookTrainerModal } from './components/modals/BookTrainerModal';

import { HomePage } from './pages/HomePage';
import { ClassesPage } from './pages/ClassesPage';
import { TrainersPage } from './pages/TrainersPage';
import { MembershipPage } from './pages/MembershipPage';
import { ContactAboutPage } from './pages/ContactAboutPage';

import { MemberDashboard } from './pages/member/MemberDashboard';
import { MemberClasses } from './pages/member/MemberClasses';
import { MemberProgress } from './pages/member/MemberProgress';
import { MemberBilling } from './pages/member/MemberBilling';
import { MemberSettings } from './pages/member/MemberSettings';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminClasses } from './pages/admin/AdminClasses';
import { AdminStaff } from './pages/admin/AdminStaff';
import { AdminBilling } from './pages/admin/AdminBilling';
import { AdminInventory } from './pages/admin/AdminInventory';

const AppContent: React.FC = () => {
  const { activeView } = useGym();

  const renderPage = () => {
    switch (activeView) {
      // Public Pages
      case 'home':
        return <HomePage />;
      case 'classes':
        return <ClassesPage />;
      case 'trainers':
        return <TrainersPage />;
      case 'pricing':
        return <MembershipPage />;
      case 'about':
        return <ContactAboutPage />;

      // Member Pages
      case 'dashboard':
        return <MemberDashboard />;
      case 'my-classes':
        return <MemberClasses />;
      case 'progress':
        return <MemberProgress />;
      case 'billing':
        return <MemberBilling />;
      case 'settings':
        return <MemberSettings />;

      // Admin Pages
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-members':
        return <AdminMembers />;
      case 'admin-classes':
        return <AdminClasses />;
      case 'admin-staff':
        return <AdminStaff />;
      case 'admin-billing':
        return <AdminBilling />;
      case 'admin-inventory':
        return <AdminInventory />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#111111] text-gray-100">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <AuthModal />
      <ClassDetailsModal />
      <BookTrainerModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <GymProvider>
      <AppContent />
    </GymProvider>
  );
}

export default App;
