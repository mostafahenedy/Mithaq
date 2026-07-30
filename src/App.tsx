import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CounselingModule } from './components/CounselingModule';
import { AIAssistantView } from './components/AIAssistantView';
import { CompanionJourney } from './components/CompanionJourney';
import { FamilyDashboard } from './components/FamilyDashboard';
import { RelationshipAnalysis } from './components/RelationshipAnalysis';
import { CouplesMode } from './components/CouplesMode';
import { ChildProfileModule } from './components/ChildProfileModule';
import { FamilyTimeline } from './components/FamilyTimeline';
import { EmergencyModal } from './components/EmergencyModal';
import { MentalHealthModule } from './components/MentalHealthModule';
import { FamilyTestsModule } from './components/FamilyTestsModule';
import { ParentingModule } from './components/ParentingModule';
import { MarriageModule } from './components/MarriageModule';
import { ArticlesCMS } from './components/ArticlesCMS';
import { AcademyModule } from './components/AcademyModule';
import { CommunityModule } from './components/CommunityModule';
import { GoalsTrackerModule } from './components/GoalsTrackerModule';
import { AudioLibraryModule } from './components/AudioLibraryModule';
import { MonetizationModule } from './components/MonetizationModule';
import { ConsultantPanel } from './components/ConsultantPanel';
import { AdminDashboard } from './components/AdminDashboard';
import { LandingPage } from './components/LandingPage';
import { UserProfileModal } from './components/UserProfileModal';
import { MobileAccessModal } from './components/MobileAccessModal';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { INITIAL_USER } from './data/mockData';
import { User, ActiveTab } from './types';
import { Bot, Sparkles, X, Heart, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('companion-journey');
  const [activeSystem, setActiveSystem] = useState<'web' | 'ios' | 'android' | 'landing' | 'consultant-panel' | 'admin'>('web');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Floating Anis Chatbot & Emergency Modal State
  const [isAnisFloatingOpen, setIsAnisFloatingOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'companion-journey':
        return (
          <CompanionJourney
            user={currentUser}
            onNavigateToConsultants={(specialty) => setActiveTab('counseling')}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onNavigateToDashboard={() => setActiveTab('family-dashboard')}
          />
        );
      case 'family-dashboard':
        return (
          <FamilyDashboard
            user={currentUser}
            onNavigateToTab={(tab) => setActiveTab(tab as ActiveTab)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        );
      case 'relationship-analysis':
        return <RelationshipAnalysis />;
      case 'couples-mode':
        return <CouplesMode />;
      case 'child-profile':
        return <ChildProfileModule />;
      case 'family-timeline':
        return <FamilyTimeline />;
      case 'counseling':
        return <CounselingModule user={currentUser} />;
      case 'ai-assistant':
        return <AIAssistantView user={currentUser} />;
      case 'mental-health':
        return <MentalHealthModule />;
      case 'tests':
        return <FamilyTestsModule user={currentUser} />;
      case 'parenting':
        return <ParentingModule />;
      case 'marriage':
        return <MarriageModule />;
      case 'articles':
        return <ArticlesCMS />;
      case 'academy':
        return <AcademyModule user={currentUser} />;
      case 'community':
        return <CommunityModule user={currentUser} />;
      case 'goals':
        return <GoalsTrackerModule user={currentUser} />;
      case 'audio-library':
        return <AudioLibraryModule />;
      case 'monetization':
        return (
          <MonetizationModule
            user={currentUser}
            onUpdateUser={(updated) => setCurrentUser(updated)}
          />
        );
      default:
        return (
          <CompanionJourney
            user={currentUser}
            onNavigateToConsultants={() => setActiveTab('counseling')}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onNavigateToDashboard={() => setActiveTab('family-dashboard')}
          />
        );
    }
  };

  // If viewing Landing Website
  if (activeSystem === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B1A19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 dir-rtl p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center bg-white dark:bg-[#122625] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A] text-[#C89B3C] font-black text-2xl flex items-center justify-center shadow-md">
                م
              </div>
              <span className="font-black text-lg text-slate-900 dark:text-white">ميثاق</span>
            </div>
            <button
              onClick={() => setActiveSystem('web')}
              className="px-5 py-2.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition"
            >
              دخول المنصة التطبيقية
            </button>
          </div>

          <LandingPage onStartApp={() => setActiveSystem('web')} />
          <Footer />
        </div>
      </div>
    );
  }

  // If viewing Consultant Panel
  if (activeSystem === 'consultant-panel') {
    return (
      <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B1A19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 dir-rtl p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-[#122625] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="font-extrabold text-sm text-[#0F5C5A] dark:text-[#C89B3C]">بوابة المستشارين والخبراء - ميثاق</span>
            <button
              onClick={() => setActiveSystem('web')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
            >
              العودة لمنصة المستفيدين
            </button>
          </div>
          <ConsultantPanel />
          <Footer />
        </div>
      </div>
    );
  }

  // If viewing Admin Dashboard
  if (activeSystem === 'admin') {
    return (
      <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B1A19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 dir-rtl p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-[#122625] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="font-extrabold text-sm text-[#0F5C5A] dark:text-[#C89B3C]">لوحة تحكم الإدارة التنفيذية SaaS</span>
            <button
              onClick={() => setActiveSystem('web')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
            >
              العودة للمنصة الرئيسية
            </button>
          </div>
          <AdminDashboard />
          <Footer />
        </div>
      </div>
    );
  }

  // Mobile App Simulation Frame (iOS / Android)
  if (activeSystem === 'ios' || activeSystem === 'android') {
    return (
      <MobileDeviceFrame deviceType={activeSystem} onCloseMobileView={() => setActiveSystem('web')}>
        <div className="space-y-4">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectTab={(tab) => setActiveTab(tab as ActiveTab)}
            activeSystem={activeSystem}
            setActiveSystem={setActiveSystem}
            user={currentUser}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenAnisModal={() => setIsAnisFloatingOpen(true)}
          />
          {renderContent()}
        </div>
      </MobileDeviceFrame>
    );
  }

  // Default Responsive Web Application
  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B1A19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectTab={(tab) => setActiveTab(tab as ActiveTab)}
          activeSystem={activeSystem}
          setActiveSystem={setActiveSystem}
          user={currentUser}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenAnisModal={() => setIsAnisFloatingOpen(true)}
          onOpenMobileModal={() => setIsMobileModalOpen(true)}
        />

        {/* Dynamic Main View */}
        <main className="space-y-8">
          {renderContent()}
        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* Floating Anis AI Assistant Launcher Button (Fixed Corner) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsAnisFloatingOpen(true)}
          className="p-4 rounded-full bg-[#0F5C5A] text-white shadow-2xl hover:bg-[#157A77] hover:scale-105 transition flex items-center gap-2 ring-4 ring-[#C89B3C]/30 group"
          title="افتح المساعد الأسري أنيس"
        >
          <div className="w-8 h-8 rounded-full bg-[#C89B3C] text-slate-900 font-black text-sm flex items-center justify-center">
            أ
          </div>
          <span className="font-extrabold text-xs hidden sm:inline text-emerald-100">اسأل أنيس الذكي</span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </button>
      </div>

      {/* Anis Floating AI Modal Overlay */}
      {isAnisFloatingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl relative">
            <AIAssistantView
              user={currentUser}
              onClose={() => setIsAnisFloatingOpen(false)}
              isModal={true}
            />
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {isProfileOpen && (
        <UserProfileModal
          user={currentUser}
          onClose={() => setIsProfileOpen(false)}
          onUpdateUser={(updated) => setCurrentUser(updated)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* Emergency Modal Overlay */}
      {isEmergencyOpen && (
        <EmergencyModal
          onClose={() => setIsEmergencyOpen(false)}
          onBookEmergencyConsultant={() => {
            setIsEmergencyOpen(false);
            setActiveTab('counseling');
          }}
        />
      )}

      {/* Mobile Access QR & Instructions Modal */}
      <MobileAccessModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />

    </div>
  );
}

export default App;
