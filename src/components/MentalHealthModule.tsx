import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  HeartHandshake, 
  Smile, 
  Frown, 
  Meh, 
  Zap, 
  ShieldCheck, 
  Activity,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';

export const MentalHealthModule: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('calm');
  const [moodLogged, setMoodLogged] = useState(false);

  // Guided Breathing Exercise State (4-7-8 Breathing Technique)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseTimer, setPhaseTimer] = useState(4);
  const [totalCycles, setTotalCycles] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio Synth Generator for Relaxing Meditation Ambient Frequency
  const playCalmTone = (frequency: number, duration: number) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  useEffect(() => {
    let interval: any;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setPhaseTimer((prev) => {
          if (prev > 1) return prev - 1;

          // Transition to next breathing stage
          if (breathingPhase === 'inhale') {
            setBreathingPhase('hold');
            playCalmTone(220, 7);
            return 7; // Hold for 7s
          } else if (breathingPhase === 'hold') {
            setBreathingPhase('exhale');
            playCalmTone(174, 8);
            return 8; // Exhale for 8s
          } else {
            setBreathingPhase('inhale');
            setTotalCycles((c) => c + 1);
            playCalmTone(285, 4);
            return 4; // Inhale for 4s
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase, soundEnabled]);

  const handleStartBreathing = () => {
    setIsBreathingActive(true);
    setBreathingPhase('inhale');
    setPhaseTimer(4);
    playCalmTone(285, 4);
  };

  const handleStopBreathing = () => {
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setPhaseTimer(4);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            الصحة النفسية والسكينة الأسرية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">واحة السلام والتعافي الذاتي</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            تمارين التنفس الموجه، مقاييس إدارة القلق والاحتراق النفسي، ومساندة متكاملة للحد من التوتر اليومي واستعادة التوازن الوجداني.
          </p>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 animate-pulse">
            <Sparkles className="w-10 h-10 text-[#C89B3C]" />
          </div>
        </div>
      </div>

      {/* Daily Mood Tracker */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">سجل حالتك الشعورية والوجدانية اليوم</h3>
            <p className="text-xs text-slate-500">متابعة مشاعرك تساعدك ومستشارك في فهم محفزات الهدوء والضغط النفسي.</p>
          </div>
          {moodLogged && (
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
              ✓ تم تسجيل شعورك بنجاح
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {[
            { id: 'happy', label: 'سعيد ومستقر', icon: Smile, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
            { id: 'calm', label: 'هادئ ومطمئن', icon: HeartHandshake, color: 'text-[#0F5C5A] bg-[#0F5C5A]/10' },
            { id: 'neutral', label: 'متوسط الحماس', icon: Meh, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
            { id: 'anxious', label: 'قلق ومشتت', icon: Zap, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/30' },
            { id: 'exhausted', label: 'مجهد ومنهك', icon: Frown, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' }
          ].map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMood(m.id);
                  setMoodLogged(true);
                }}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition ${
                  isSelected
                    ? 'border-[#0F5C5A] ring-2 ring-[#0F5C5A]/30 font-bold'
                    : 'border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100'
                } ${m.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Headspace/Calm-Style Guided Breathing Studio */}
      <div className="bg-gradient-to-b from-[#0B1A19] to-[#0F5C5A] text-white rounded-3xl p-8 shadow-2xl border border-[#C89B3C]/30 text-center space-y-6 relative overflow-hidden">
        
        {/* Toggle Audio */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            title="الصوت الاسترخائي"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#C89B3C]" /> : <VolumeX className="w-5 h-5 text-white/50" />}
          </button>
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <span className="text-xs text-[#C89B3C] font-extrabold tracking-widest uppercase">
            تقنية التنفس الأمني (4 - 7 - 8)
          </span>
          <h3 className="text-2xl font-black">جلسة الهدوء والتنفس الأسري العميق</h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            ممارسة مثبتة علمياً لتهدئة الجهاز العصبي، خفض معدل ضربات القلب، والتخلص السريع من توتر النقاشات الشديدة.
          </p>
        </div>

        {/* Breathing Animated Circle */}
        <div className="py-8 flex flex-col items-center justify-center relative">
          
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-1000 border-4 shadow-2xl relative ${
              breathingPhase === 'inhale'
                ? 'scale-110 bg-gradient-to-br from-[#0F5C5A] to-[#157A77] border-[#C89B3C] shadow-[#C89B3C]/30'
                : breathingPhase === 'hold'
                ? 'scale-105 bg-[#0B1A19] border-emerald-400 shadow-emerald-500/30'
                : 'scale-90 bg-slate-900 border-rose-400 shadow-rose-500/20'
            }`}
          >
            <span className="text-4xl font-black text-[#C89B3C]">{phaseTimer}</span>
            <span className="text-sm font-bold mt-1 text-white">
              {breathingPhase === 'inhale' && 'خذ شهيقاً عميقاً من الأنف...'}
              {breathingPhase === 'hold' && 'احتبس أنفاسك بهدوء...'}
              {breathingPhase === 'exhale' && 'أخرج الزفير ببطء شديد...'}
            </span>
          </div>

        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4">
          {!isBreathingActive ? (
            <button
              onClick={handleStartBreathing}
              className="px-8 py-3.5 rounded-2xl bg-[#C89B3C] text-slate-900 font-extrabold text-sm hover:bg-[#E5BE6A] transition shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 fill-slate-900" />
              <span>ابدأ تمرين التنفس الآن</span>
            </button>
          ) : (
            <button
              onClick={handleStopBreathing}
              className="px-8 py-3.5 rounded-2xl bg-rose-600 text-white font-extrabold text-sm hover:bg-rose-700 transition shadow-lg flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              <span>إيقاف المؤقت ({totalCycles} دورات مكتملة)</span>
            </button>
          )}
        </div>

      </div>

      {/* Mental Health Assessments Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">مقاييس الفحص الذاتي والدعم النفسي</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">مقياس الاحتراق النفسي والأسري</h4>
            <p className="text-xs text-slate-500 leading-relaxed">تقييم مستوى الإجهاد العاطفي الناتج عن أعباء الرعاية والمسؤوليات اليومية.</p>
            <button className="text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C] flex items-center gap-1 hover:underline pt-2">
              <span>بدء التقييم المكون من 6 أسئلة</span> ←
            </button>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">مقياس إدارة القلق والضغوط</h4>
            <p className="text-xs text-slate-500 leading-relaxed">قياس قدرتك على امتصاص الصدمات والمواقف المفاجئة بحكمة ومرونة.</p>
            <button className="text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C] flex items-center gap-1 hover:underline pt-2">
              <span>بدء التقييم المكون من 5 أسئلة</span> ←
            </button>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">مقياس الذكاء العاطفي الأسري</h4>
            <p className="text-xs text-slate-500 leading-relaxed">فهم مشاعر الآخرين واستثمار العاطفة الإيجابية لتعميق الترابط البيتي.</p>
            <button className="text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C] flex items-center gap-1 hover:underline pt-2">
              <span>بدء التقييم المكون من 8 أسئلة</span> ←
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
