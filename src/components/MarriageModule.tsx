import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Calculator, 
  DollarSign, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

export const MarriageModule: React.FC = () => {
  // Financial Budget Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState(15000);
  const [savingsRatio, setSavingsRatio] = useState(20);

  const savingsAmount = Math.round((monthlyIncome * savingsRatio) / 100);
  const fixedExpenses = Math.round(monthlyIncome * 0.5); // 50%
  const personalDiscretionary = monthlyIncome - savingsAmount - fixedExpenses;

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            الحياة الزوجية والسكينة الأسرية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">أبجديات التفاهم والتواصل المستدام</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            أدوات علمية وتطبيقية لتعزيز الدفء العاطفي، حل الخلافات بحكمة، والتخطيط المالي والمستقبلي الموحد بين الزوجين.
          </p>
        </div>
      </div>

      {/* Marriage Financial Planner Tool */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">حاسبة الميزانية والادخار الزوجي الذكية</h3>
              <p className="text-xs text-slate-500">توزيع الميزانية الأسرية لمنع الخلافات المالية وتأمين المستقبل.</p>
            </div>
          </div>
          <span className="text-xs font-extrabold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">قاعدة 50/30/20</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                إجمالي الدخل الشهري للأسرة (رس):
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#0F5C5A]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>نسبة الادخار المستهدفة:</span>
                <span className="text-[#0F5C5A] dark:text-[#C89B3C]">{savingsRatio}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={savingsRatio}
                onChange={(e) => setSavingsRatio(Number(e.target.value))}
                className="w-full accent-[#0F5C5A]"
              />
            </div>
          </div>

          {/* Budget Output Summary */}
          <div className="p-6 rounded-2xl bg-[#0F5C5A]/5 dark:bg-white/5 border border-[#0F5C5A]/10 space-y-4 text-xs">
            <h4 className="font-bold text-sm text-[#0F5C5A] dark:text-[#C89B3C]">توزيع الميزانية الموصى به:</h4>
            
            <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">النفقات الأساسية والبيت (50%):</span>
              <span className="font-black text-slate-900 dark:text-white">{fixedExpenses} رس</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">الادخار والتثقيف والاستثمار ({savingsRatio}%):</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">{savingsAmount} رس</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">الأنشطة والرحلات الشخصية:</span>
              <span className="font-black text-amber-600 dark:text-amber-400">{personalDiscretionary} رس</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marriage Principles Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">محاور تعزيز السكينة والتقارب الزوجي</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">إدارة الخلافات بحكمة</h4>
            <p className="text-xs text-slate-500 leading-relaxed">قواعد التفاوض الهادئ وإبعاد نبرة الاتهام وحفظ كرامة الشريك في لحظات الانفعال.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">لغات الحب الخمس</h4>
            <p className="text-xs text-slate-500 leading-relaxed">فهم كيفية تعبير الشريك عن حبه وتلقيه له لبناء مشاعر الأمان المتبادلة.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">التأهيل للمقبلين على الزواج</h4>
            <p className="text-xs text-slate-500 leading-relaxed">برنامج تدريبي متكامل لرسم التوقعات وتجنب أزمات السنة الأولى من الزواج.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
