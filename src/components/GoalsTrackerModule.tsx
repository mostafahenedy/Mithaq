import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Calendar, 
  Heart, 
  Plus, 
  RotateCcw
} from 'lucide-react';
import { FamilyGoal, User } from '../types';
import { MOCK_DAILY_ADVICE } from '../data/mockData';

interface GoalsTrackerModuleProps {
  user: User;
}

export const GoalsTrackerModule: React.FC<GoalsTrackerModuleProps> = ({ user }) => {
  const [goals, setGoals] = useState<FamilyGoal[]>(user.goals);

  const toggleGoalDone = (id: string) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const nextIsDone = !g.isDoneToday;
        return {
          ...g,
          isDoneToday: nextIsDone,
          completedDays: nextIsDone ? Math.min(g.targetDays, g.completedDays + 1) : Math.max(0, g.completedDays - 1)
        };
      }
      return g;
    }));
  };

  return (
    <div className="space-y-8">
      
      {/* Daily Content Banner: Verse & Hadith of the Day */}
      <div className="bg-gradient-to-br from-[#0F5C5A] to-[#0B1A19] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C89B3C]/30 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold bg-[#C89B3C] text-slate-900 px-3 py-1 rounded-full uppercase tracking-wider">
            محتوى السكينة اليومي
          </span>
          <span className="text-xs text-emerald-200 font-bold">سلسلة المودة والرحمة • اليوم {user.streakDays}</span>
        </div>

        <div className="space-y-4 max-w-2xl">
          <blockquote className="text-base sm:text-lg font-bold text-[#C89B3C] italic leading-relaxed">
            {MOCK_DAILY_ADVICE.verseAr}
          </blockquote>
          <p className="text-xs text-slate-300 font-semibold">{MOCK_DAILY_ADVICE.verseRef}</p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            <span className="font-bold text-[#C89B3C] block mb-1">💡 {MOCK_DAILY_ADVICE.adviceTitle}:</span>
            {MOCK_DAILY_ADVICE.adviceBody}
          </div>
        </div>

        {/* Daily Family Challenge Box */}
        <div className="p-4 rounded-2xl bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-[#C89B3C] uppercase">تحدي اليوم الأسري:</span>
            <p className="text-xs sm:text-sm font-bold text-white">{MOCK_DAILY_ADVICE.dailyChallenge}</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#C89B3C] text-slate-900 font-extrabold text-xs shrink-0 hover:bg-[#E5BE6A] transition">
            تم إنجاز التحدي 🎉
          </button>
        </div>
      </div>

      {/* Goals & Habits Tracker Grid */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">جدول العادات والأهداف الأسرية الأسبوعي</h3>
            <p className="text-xs text-slate-500">الاستمرار اليومي البسيط يولد التحول الكبير في علاقات البيت.</p>
          </div>
          <span className="text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C] bg-[#0F5C5A]/10 px-3 py-1 rounded-full">
            🔥 سلسلة الأيام المتتالية: {user.streakDays} يوم
          </span>
        </div>

        <div className="space-y-3">
          {goals.map((g) => (
            <div
              key={g.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                g.isDoneToday
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleGoalDone(g.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition border ${
                    g.isDoneToday
                      ? 'bg-[#0F5C5A] border-[#0F5C5A] text-white'
                      : 'border-slate-300 dark:border-slate-700 hover:border-[#0F5C5A]'
                  }`}
                >
                  {g.isDoneToday && <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />}
                </button>

                <div>
                  <h4 className={`font-bold text-xs sm:text-sm ${g.isDoneToday ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {g.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    إنجاز {g.completedDays} من {g.targetDays} أيام هذا الأسبوع
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-28 hidden sm:block">
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0F5C5A] dark:bg-[#C89B3C] h-full transition-all duration-500"
                    style={{ width: `${(g.completedDays / g.targetDays) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
