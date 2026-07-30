import React, { useState } from 'react';
import { Heart, Users, ShieldCheck, Share2, Copy, Check, Sparkles, TrendingUp, Award, MessageCircle } from 'lucide-react';
import { MOCK_COUPLES_ASSESSMENT } from '../data/mockData';

export function CouplesMode() {
  const [copied, setCopied] = useState(false);
  const [assessment] = useState(MOCK_COUPLES_ASSESSMENT);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(assessment.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-bold backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 text-rose-200" />
          <span>خاص بالزوجين - نمط الشريكين</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          نمط الشريكين والميثاق الزوجي 💑
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 leading-relaxed max-w-2xl font-medium">
          دعوة الشريك لاستخدام ميثاق سوية. يقارن أنيس الرؤى ولغات الحب وتوقعات الحوار لإبراز نقاط القوة وبناء خطة توافق زوجي هادئة ومستقرة.
        </p>
      </div>

      {/* Invite Spouse Widget */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              الشريك انضم بالفعل: <strong className="text-[#0F5C5A] dark:text-[#C89B3C]">{assessment.spouseName}</strong>
            </h3>
          </div>
          <p className="text-xs text-slate-500">رمز الربط الخاص بحسابكما الزوجي الموحد:</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="font-mono font-black text-sm text-[#0F5C5A] dark:text-[#C89B3C] px-3">
            {assessment.inviteCode}
          </span>
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold hover:bg-[#157A77] transition flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ الرمز'}</span>
          </button>
        </div>
      </div>

      {/* Compatibility Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-center">
          <span className="text-xs font-extrabold text-slate-500 uppercase">نسبة التوافق الزوجي الموحد</span>
          <div className="text-4xl font-black text-[#0F5C5A] dark:text-[#C89B3C]">
            {assessment.compatibilityScore}%
          </div>
          <p className="text-xs text-emerald-600 font-bold">تنسجم وتكامل ممتاز في القيم والأهداف الأسرية</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-center">
          <span className="text-xs font-extrabold text-slate-500 uppercase">مستوى التفاهم والتواصل اليومي</span>
          <div className="text-4xl font-black text-[#0F5C5A] dark:text-[#C89B3C]">
            {assessment.communicationIndex}%
          </div>
          <p className="text-xs text-emerald-600 font-bold">حوار إيجابي يتطلب فقط تثبيت أوقات النقاش</p>
        </div>
      </div>

      {/* Strengths & Weaknesses Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base">ركائز القوة والانسجام في العلاقة</h3>
          </div>
          <ul className="space-y-2.5">
            {assessment.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Growth Areas */}
        <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-base">مجالات يحتاجها التوافق لتجنب الضغوط</h3>
          </div>
          <ul className="space-y-2.5">
            {assessment.weaknesses.map((wk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Personal & Mutual Improvement Plan */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-[#C89B3C]" />
          <span>خطة تحسين التواصل الزوجي الموصى بها من أنيس</span>
        </h3>

        <div className="space-y-3">
          {assessment.improvementPlan.map((plan, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-[#0F5C5A] text-white font-black text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{plan}</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                موصى به
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
