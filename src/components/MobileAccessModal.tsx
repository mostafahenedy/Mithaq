import React, { useState } from 'react';
import { Smartphone, QrCode, Copy, Check, Share2, ExternalLink, X, Apple, Chrome } from 'lucide-react';

interface MobileAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileAccessModal: React.FC<MobileAccessModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const appUrl = "https://ais-pre-sm7ztqbxjobfb26xwhavgw-886448666323.europe-west2.run.app";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(appUrl)}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl animate-in fade-in">
      <div className="bg-white dark:bg-[#0B1A19] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-[#0F5C5A]">
              <Smartphone className="w-5 h-5 text-[#0F5C5A] dark:text-[#C89B3C]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">طرق فتح التطبيق عبر الهاتف الذكي</h3>
              <p className="text-[11px] text-slate-500">افتح منصة ميثاق مباشرة على الأيفون والأندرويد</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR CODE DISPLAY */}
        <div className="text-center space-y-3 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            1. وجه كاميرا جوالك نحو رمز الـ QR أدناه للفتح الفوري:
          </span>
          
          <div className="inline-block p-3 bg-white rounded-2xl shadow-md border border-slate-200">
            <img 
              src={qrCodeUrl} 
              alt="QR Code منصة ميثاق" 
              className="w-44 h-44 mx-auto object-contain rounded-xl"
            />
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            يعمل مباشرة مع كاميرا الآيفون والأندرويد دون الحاجة لتنزيل تطبيقات إضافية.
          </p>
        </div>

        {/* DIRECT LINK COPY */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            2. أو انسخ الرابط المباشر وأرسله لجوالك:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={appUrl}
              className="w-full bg-slate-100 dark:bg-slate-900 px-3 py-2.5 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-left dir-ltr"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-[#0F5C5A] hover:bg-[#157A77] text-white font-bold text-xs transition shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* INSTALL AS PWA ON MOBILE */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            3. كيفية تثبيت التطبيق على شاشة الجوال كأيقونة تطبيق مستقلة:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {/* iOS */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#0F5C5A] dark:text-[#C89B3C]">
                <Apple className="w-4 h-4" />
                <span>أجهزة آيفون (iOS):</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                افتح الرابط في متصفح <b>Safari</b> 👈 اضغط زر <b>المشاركة (Share)</b> 👈 اختر <b>"إضافة إلى الشاشة الرئيسية Add to Home Screen"</b>.
              </p>
            </div>

            {/* Android */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                <Chrome className="w-4 h-4" />
                <span>أجهزة أندرويد (Android):</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                افتح الرابط في <b>Chrome</b> 👈 اضغط القائمة (⋮) 👈 اختر <b>"تثبيت التطبيق Install App"</b> أو "الإضافة للشاشة الرئيسية".
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition"
        >
          إغلاق
        </button>

      </div>
    </div>
  );
};
