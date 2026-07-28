import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  ShieldAlert, 
  Bell, 
  Search, 
  Globe, 
  Moon, 
  Sun, 
  User as UserIcon, 
  Menu, 
  X,
  HeartHandshake,
  Calendar,
  BookOpen,
  MessageSquare,
  Award,
  Video,
  Headphones
} from 'lucide-react';
import { ViewMode, User } from '../types';

interface NavbarProps {
  currentView?: ViewMode;
  onSelectView?: (mode: ViewMode) => void;
  activeSystem?: 'web' | 'ios' | 'android' | 'landing' | 'consultant-panel' | 'admin';
  setActiveSystem?: (sys: 'web' | 'ios' | 'android' | 'landing' | 'consultant-panel' | 'admin') => void;
  activeTab: string;
  onSelectTab?: (tab: string) => void;
  setActiveTab?: (tab: any) => void;
  user: User;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenProfile?: () => void;
  onOpenAnisModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  activeSystem,
  setActiveSystem,
  activeTab,
  onSelectTab,
  setActiveTab,
  user,
  darkMode = false,
  onToggleDarkMode,
  onOpenProfile,
  onOpenAnisModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Computed effective view mode
  const effectiveView: ViewMode = currentView || (
    activeSystem === 'ios' || activeSystem === 'android' 
      ? 'mobile' 
      : activeSystem === 'admin' 
        ? 'admin-panel' 
        : activeSystem === 'landing' 
          ? 'landing' 
          : activeSystem === 'consultant-panel' 
            ? 'consultant-panel' 
            : 'app'
  );

  const handleSelectView = (mode: ViewMode) => {
    if (onSelectView) {
      onSelectView(mode);
    }
    if (setActiveSystem) {
      if (mode === 'landing') setActiveSystem('landing');
      else if (mode === 'app') setActiveSystem('web');
      else if (mode === 'mobile') setActiveSystem('ios');
      else if (mode === 'consultant-panel') setActiveSystem('consultant-panel');
      else if (mode === 'admin-panel') setActiveSystem('admin');
      else setActiveSystem('web');
    }
  };

  const handleSelectTab = (tabId: string) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
    if (setActiveTab) {
      setActiveTab(tabId);
    }
  };

  const navTabs = [
    { id: 'counseling', label: 'الاستشارات الأسرية', icon: HeartHandshake },
    { id: 'audio-library', label: 'المحتوى الصوتي', icon: Headphones },
    { id: 'parenting', label: 'تربية الأبناء', icon: BookOpen },
    { id: 'marriage', label: 'الحياة الزوجية', icon: HeartHandshake },
    { id: 'mental-health', label: 'الصحة النفسية', icon: Sparkles },
    { id: 'academy', label: 'الأكاديمية والدورات', icon: Award },
    { id: 'articles', label: 'المقالات والمكتبة', icon: BookOpen },
    { id: 'tests', label: 'الاختبارات الأسرية', icon: Calendar },
    { id: 'community', label: 'المجتمع الآمن', icon: MessageSquare }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F3]/90 dark:bg-[#0B1A19]/90 backdrop-blur-md border-b border-[#0F5C5A]/10 dark:border-white/10 transition-colors">
      {/* Top System Switcher Banner (Enterprise Preview Bar) */}
      <div className="bg-[#0F5C5A] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse"></span>
            <span>منصة ميثاق الرقمية الأسرية - نظام تشغيل الموديلات والتطبيقات الموحد</span>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-black/20 p-0.5 rounded-lg border border-white/10 overflow-x-auto">
            <button
              onClick={() => handleSelectView('landing')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                effectiveView === 'landing' ? 'bg-[#C89B3C] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>الموقع التعريفي</span>
            </button>

            <button
              onClick={() => handleSelectView('app')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                effectiveView === 'app' ? 'bg-[#C89B3C] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>تطبيق الويب</span>
            </button>

            <button
              onClick={() => handleSelectView('mobile')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                effectiveView === 'mobile' ? 'bg-[#C89B3C] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>تطبيق الجوال (iOS/Android)</span>
            </button>

            <button
              onClick={() => handleSelectView('consultant-panel')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                effectiveView === 'consultant-panel' ? 'bg-[#C89B3C] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>بوابة الاستشاري</span>
            </button>

            <button
              onClick={() => handleSelectView('admin-panel')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                effectiveView === 'admin-panel' ? 'bg-[#C89B3C] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { handleSelectView('app'); handleSelectTab('counseling'); }}>
          <div className="w-11 h-11 rounded-2xl bg-[#0F5C5A] text-white flex items-center justify-center shadow-md border border-[#C89B3C]/30 relative overflow-hidden group">
            <span className="font-bold text-2xl tracking-tighter text-[#C89B3C]">م</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C89B3C]/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-[#0F5C5A] dark:text-white tracking-wide">ميثاق</span>
              <span className="text-[10px] bg-[#C89B3C]/20 text-[#0F5C5A] dark:text-[#C89B3C] font-semibold px-2 py-0.5 rounded-full border border-[#C89B3C]/30">
                Mithaq
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">حيث يبدأ التفاهم.</p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop Web App Mode) */}
        {effectiveView === 'app' && (
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0F5C5A] text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-[#0F5C5A]/10'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-90" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2">
          {/* AI Anis Assistant Floating CTA Button */}
          <button
            onClick={() => onOpenAnisModal?.()}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0F5C5A] to-[#157A77] text-white text-xs font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 border border-[#C89B3C]/40 group"
          >
            <div className="w-5 h-5 rounded-full bg-[#C89B3C] text-slate-900 flex items-center justify-center font-black text-[10px] animate-pulse">
              أ
            </div>
            <span>تحدث مع أنيس الذكي</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C] group-hover:rotate-12 transition" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => onToggleDarkMode?.()}
            className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="تبديل المظهر"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#C89B3C]" /> : <Moon className="w-4 h-4 text-[#0F5C5A]" />}
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-[#122625] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-[#0F5C5A] dark:text-[#C89B3C]">التنبيهات الإشعارية</h4>
                  <span className="text-[10px] bg-[#0F5C5A]/10 text-[#0F5C5A] font-semibold px-2 py-0.5 rounded-full">2 جديد</span>
                </div>
                <div className="space-y-3 py-3 max-h-64 overflow-y-auto">
                  <div className="p-2.5 rounded-xl bg-[#0F5C5A]/5 dark:bg-white/5 border border-[#0F5C5A]/10 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">موعد استشارة قادم</p>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">جلسة استشارية مع أ. روض غداً الساعة 07:00 م.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">منذ ساعة</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">نصيحة أنيس اليومية</p>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">تم إضافة تحدي الحوار الأسري الجديد في قسم الأهداف.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">منذ 4 ساعات</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-[#0F5C5A]/10 dark:bg-white/10 hover:bg-[#0F5C5A]/20 transition border border-[#0F5C5A]/20"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#C89B3C]"
            />
            <span className="hidden md:inline font-bold text-xs text-[#0F5C5A] dark:text-white">{user.name}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && effectiveView === 'app' && (
        <div className="lg:hidden bg-white dark:bg-[#0B1A19] border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleSelectTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                    isActive
                      ? 'bg-[#0F5C5A] text-white'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#C89B3C]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onOpenAnisModal?.();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-3 p-3 rounded-xl bg-gradient-to-r from-[#0F5C5A] to-[#157A77] text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
            <span>المساعد الأسري الذكي (أنيس)</span>
          </button>
        </div>
      )}
    </header>
  );
};
