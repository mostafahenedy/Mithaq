import React, { useState } from 'react';
import { 
  Heart, 
  Smile, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  User, 
  BookOpen, 
  Phone, 
  ArrowLeft,
  Clock,
  Zap,
  Award
} from 'lucide-react';
import { User as UserType, Appointment } from '../types';
import { MOCK_APPOINTMENTS, MOCK_DAILY_ADVICE } from '../data/mockData';

interface FamilyDashboardProps {
  user: UserType;
  onNavigateToTab: (tab: string) => void;
  onOpenEmergency: () => void;
}

export function FamilyDashboard({ user, onNavigateToTab, onOpenEmergency }: FamilyDashboardProps) {
  // Family Health & Mood State
  const [healthScore, setHealthScore] = useState<number>(88);
  const [communicationIndex, setCommunicationIndex] = useState<number>(82);
  const [activeMood, setActiveMood] = useState<'calm' | 'happy' | 'tense' | 'reflective'>('calm');
  
  // Daily Follow-up State
  const [followUpAnswer1, setFollowUpAnswer1] = useState<string>('');
  const [followUpAnswer2, setFollowUpAnswer2] = useState<string>('');
  const [isFollowUpCompleted, setIsFollowUpCompleted] = useState<boolean>(false);

  const weeklyMoodData = [
    { day: 'السبت', mood: 'هادئ ومستقر', icon: '😊', score: 85 },
    { day: 'الأحد', mood: 'تفاهم ممتاز', icon: '❤️', score: 90 },
    { day: 'الإثنين', mood: 'تحدي بسيط وتم حله', icon: '🤝', score: 80 },
    { day: 'الثلاثاء', mood: 'دفء وسكينة', icon: '✨', score: 92 },
    { day: 'الأربعاء', mood: 'نشاط وحوار', icon: '🗣️', score: 88 },
    { day: 'الخميس', mood: 'جمعة عائلية', icon: '🏡', score: 95 },
    { day: 'الجمعة', mood: 'هدوء وراحة', icon: '🌿', score: 90 }
  ];

  const handleCompleteFollowUp = () => {
    if (!followUpAnswer1) return;
    setIsFollowUpCompleted(true);
    setHealthScore(prev => Math.min(100, prev + 2));
  };

  const nextAppointment: Appointment | undefined = MOCK_APPOINTMENTS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      
      {/* Top Banner - Welcome & Family Health Score */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F5C5A] to-[#0A4241] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-[#157A77]">
        <div className="space-y-3 max-w-xl text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>لوحة تحكم رفيق الأسرة الذكي</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            مرحباً بك، {user.name} 🌿
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
            متابعة حالة التوافق، مؤشر السكينة اليومي، وتوصيات أنيس الذكية لاستقرار أفراد أسرتك.
          </p>
        </div>

        {/* Circular Health Score Gauge */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 text-center min-w-[220px]">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="currentColor"
                strokeWidth="8"
                className="text-white/20"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="currentColor"
                strokeWidth="8"
                className="text-[#C89B3C]"
                strokeDasharray="213"
                strokeDashoffset={213 - (213 * healthScore) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute font-black text-xl text-white">{healthScore}%</span>
          </div>
          <div className="text-right space-y-1">
            <span className="text-[10px] text-emerald-200 font-bold uppercase block">مؤشر السكينة الأسري</span>
            <span className="font-extrabold text-sm text-white">مستقر وممتاز</span>
            <span className="text-[10px] text-emerald-300 block">▲ +3% عن الأسبوع الماضي</span>
          </div>
        </div>
      </div>

      {/* Daily Follow-up Block from Anees AI */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A] text-[#C89B3C] font-black text-lg flex items-center justify-center shadow-md">
              أ
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">متابعة أنيس اليومية لأسرتك</h3>
              <p className="text-xs text-slate-500">سؤال صباحي سريع لتحديث مؤشر الاستقرار والحلول</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            اليوم {new Date().toLocaleDateString('ar-SA')}
          </span>
        </div>

        {!isFollowUpCompleted ? (
          <div className="space-y-4 pt-2">
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
              "كيف حال أسرتك اليوم؟ وكيف انقضى يوم أمس من حيث التفاهم والهدوء؟"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'calm', label: 'هدوء وتفاهم رائع 😊', bonus: 2 },
                { id: 'happy', label: 'طاقة إيجابية وضحك ❤️', bonus: 3 },
                { id: 'tense', label: 'سوء فهم بسيط 🤝', bonus: 0 },
                { id: 'reflective', label: 'نحتاج جلسة حوار 🗣️', bonus: 1 }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMood(m.id as any);
                    setFollowUpAnswer1(m.label);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold border text-right transition ${
                    activeMood === m.id
                      ? 'bg-[#0F5C5A] text-white border-[#0F5C5A]'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0F5C5A]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">هل هناك خلاف أو ملف تربوي تود حلوله اليوم؟ (اختياري)</label>
              <input
                type="text"
                value={followUpAnswer2}
                onChange={(e) => setFollowUpAnswer2(e.target.value)}
                placeholder="مثال: نقاش الميزانية أو وقت ألعاب الأطفال..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F5C5A]"
              />
            </div>

            <button
              onClick={handleCompleteFollowUp}
              disabled={!followUpAnswer1}
              className="px-6 py-2.5 rounded-xl bg-[#0F5C5A] text-white font-bold text-xs hover:bg-[#157A77] transition disabled:opacity-50"
            >
              حفظ الإجابة وتحديث التوصيات
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>تم تسجيل متابعة اليوم بنجاح! تم رفع مؤشر السكينة الأسري بنسبة +2%.</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              توصية أنيس لك اليوم: حافظ على 15 دقيقة حوار هادئ مساء اليوم مع العائلة لتأكيد التفاهم.
            </p>
          </div>
        )}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Weekly Mood & Communication Index */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Weekly Mood Bar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">مزاج الأسرة الأسبوعي</h3>
              </div>
              <span className="text-xs font-bold text-slate-400">سجل 7 أيام</span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {weeklyMoodData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-lg">{d.icon}</span>
                  <span className="text-[10px] font-bold text-slate-500">{d.day}</span>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0F5C5A] dark:bg-[#C89B3C] h-full" style={{ width: `${d.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Index & Daily Exercise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Communication Index */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500">مؤشر التواصل والتفاهم</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#0F5C5A] dark:text-[#C89B3C]">{communicationIndex}%</span>
                <span className="text-xs font-bold text-emerald-600">تفاهم عالي</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                يعكس هذا الرقم مدى استخدام لغة التقدير والإنصات الإيجابي أثناء مناقشة الملفات الزوجية والتربوية.
              </p>
              <button 
                onClick={() => onNavigateToTab('relationship-analysis')}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0F5C5A] dark:text-[#C89B3C] font-bold text-xs hover:bg-slate-200 transition"
              >
                تحليل محادثات التواصل ←
              </button>
            </div>

            {/* Daily Exercise */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500">التمرين اليومي الأسري</span>
                <Zap className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">"10 دقائق حوار دافئ بدون شاشات"</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                اطرح سؤالاً واحداً على شريك حياتك: "ما هو أجمل شيء حدث معك اليوم؟" واستمع باهتمام.
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                <span>+50 نقطة سكينة</span>
                <button className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-200">
                  تم التنفيذ اليوم
                </button>
              </div>
            </div>

          </div>

          {/* Today's Advice from Anees */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 dark:border-amber-800/60 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
              <Award className="w-4 h-4" />
              <span>حكمة اليوم من أنيس</span>
            </div>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              {MOCK_DAILY_ADVICE.adviceTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {MOCK_DAILY_ADVICE.adviceBody}
            </p>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C]">
              {MOCK_DAILY_ADVICE.dailyChallenge}
            </div>
          </div>

        </div>

        {/* Column 2: Side Cards (Next Appointment & Quick Tools) */}
        <div className="space-y-6">
          
          {/* Next Appointment Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">الموعد القادم</h3>
              <Calendar className="w-4 h-4 text-[#0F5C5A] dark:text-[#C89B3C]" />
            </div>

            {nextAppointment ? (
              <div className="space-y-3 p-4 rounded-2xl bg-[#F8F7F3] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <img
                    src={nextAppointment.consultantAvatar}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#C89B3C]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{nextAppointment.consultantName}</h4>
                    <p className="text-[10px] text-slate-500">{nextAppointment.specialtyAr}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0F5C5A]" />
                    <span>{nextAppointment.date} ({nextAppointment.timeSlot})</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToTab('counseling')}
                  className="w-full py-2 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold hover:bg-[#157A77] transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>دخول القاعة الصوتية</span>
                </button>
              </div>
            ) : (
              <div className="text-center p-6 space-y-2">
                <p className="text-xs text-slate-500">لا يوجد موعد مستشار قادم.</p>
                <button
                  onClick={() => onNavigateToTab('counseling')}
                  className="px-4 py-2 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold"
                >
                  حجز جلسة استشارية
                </button>
              </div>
            )}
          </div>

          {/* Intelligent Companion Shortcuts */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">أدوات ميثاق المساعدة</h3>

            {[
              { id: 'couples-mode', label: 'نمط الشريكين (التوافق الزوجي)', icon: '💑', desc: 'مقارنة إجابات التوافق وتطوير التواصل' },
              { id: 'child-profile', label: 'ملف ومتابعة نمو الأطفال', icon: '👶', desc: 'تتبع السلوك والخطط التربوية مع أنيس' },
              { id: 'relationship-analysis', label: 'محلل محادثات التواصل', icon: '💬', desc: 'تحليل نبرة الواتساب وتفكيك سوء الفهم' },
              { id: 'family-timeline', label: 'السجل الزمني للأسرة', icon: '📜', desc: 'شريط الإنجازات والخلافات المحلولة' }
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigateToTab(tool.id)}
                className="w-full p-3 rounded-2xl bg-[#F8F7F3] dark:bg-slate-800/60 hover:bg-[#0F5C5A]/10 text-right transition border border-slate-200 dark:border-slate-700/60 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{tool.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#0F5C5A] dark:group-hover:text-[#C89B3C] transition">
                      {tool.label}
                    </h4>
                    <p className="text-[10px] text-slate-500">{tool.desc}</p>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-1 transition" />
              </button>
            ))}
          </div>

          {/* Emergency Button */}
          <button
            onClick={onOpenEmergency}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-black text-sm hover:opacity-95 transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>أحتاج مساعدة عاجلة الآن (طوارئ)</span>
          </button>

        </div>

      </div>

    </div>
  );
}
