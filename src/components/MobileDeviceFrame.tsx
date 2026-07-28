import React from 'react';
import { Smartphone } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  deviceType: 'ios' | 'android';
  onCloseMobileView: () => void;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  deviceType,
  onCloseMobileView
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 relative">
      
      {/* Top Banner Control Bar */}
      <div className="mb-4 bg-slate-800 text-white px-6 py-2.5 rounded-2xl border border-slate-700 flex items-center gap-4 text-xs font-bold shadow-lg">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#C89B3C]" />
          <span>محاكاة تطبيق الهواتف الذكية ({deviceType === 'ios' ? 'تطبيق iOS - iPhone 16 Pro' : 'تطبيق Android - Galaxy S25'})</span>
        </div>
        <button
          onClick={onCloseMobileView}
          className="px-3 py-1 rounded-xl bg-slate-700 hover:bg-slate-600 text-amber-400 font-bold transition"
        >
          العودة لعرض الويب الكامل
        </button>
      </div>

      {/* Realistic Mobile Device Container */}
      <div className={`w-full max-w-[410px] h-[820px] bg-[#0B1A19] rounded-[48px] p-4 ring-8 ring-slate-800 shadow-2xl relative overflow-hidden border-4 ${deviceType === 'ios' ? 'border-slate-700' : 'border-[#0F5C5A]'}`}>
        
        {/* Notch / Dynamic Island */}
        <div className="w-32 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center gap-2 shrink-0 z-30 relative">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800"></div>
        </div>

        {/* Inner App Canvas */}
        <div className="h-[calc(100%-28px)] w-full overflow-y-auto rounded-[36px] bg-[#F8F7F3] dark:bg-[#0B1A19] text-slate-900 dark:text-white p-3 space-y-4 shadow-inner dir-rtl">
          {children}
        </div>
      </div>

    </div>
  );
};
