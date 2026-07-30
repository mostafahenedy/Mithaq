import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Brain, 
  Home, 
  UserCheck, 
  Sparkles, 
  ArrowLeft, 
  Send, 
  Bot, 
  ShieldCheck, 
  MessageSquare, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  Volume2,
  RotateCcw
} from 'lucide-react';
import { User, Consultant, Appointment } from '../types';
import { MOCK_CONSULTANTS } from '../data/mockData';

interface CompanionJourneyProps {
  user: User;
  onNavigateToConsultants?: (specialtyFilter?: string) => void;
  onOpenEmergency?: () => void;
  onNavigateToDashboard?: () => void;
}

type JourneyStep = 'welcome' | 'situation' | 'chat';

export function CompanionJourney({ 
  user, 
  onNavigateToConsultants, 
  onOpenEmergency,
  onNavigateToDashboard 
}: CompanionJourneyProps) {
  const [step, setStep] = useState<JourneyStep>('welcome');
  const [selectedSituation, setSelectedSituation] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'anis'; text: string; time: string; suggestedConsultant?: Consultant }[]>([
    {
      sender: 'anis',
      text: 'أهلاً بك بك في ميثاق. أنا "أنيس"، رفيقك الأسري والتربوي الذكي. أنا هنا للإنصات إليك بكل سرية ومساعدتك على فهم أسباب المشكلة وتحديد الخطوات العملية المناسبة لاستقرار أسرتك.',
      time: 'الآن'
    }
  ]);

  const situations = [
    {
      id: 'marriage',
      title: 'أواجه مشكلة زوجية',
      subtitle: 'الفتور، صعوبة الحوار، إدارة الخلافات، والميثاق الزوجي',
      icon: Heart,
      color: 'from-amber-500/20 to-rose-500/10 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800',
      suggestions: [
        'زوجتي لم تعد تتحدث معي ونعيش في صمت',
        'أريد إنقاذ زواجي وتجاوز الخلافات التراكمية',
        'كيف ندير النقاش المالي دون صراخ؟'
      ]
    },
    {
      id: 'parenting',
      title: 'أحتاج مساعدة في تربية الأبناء',
      subtitle: 'عناد الأطفال، سلوكيات المراهقين، وإدمان الأجهزة',
      icon: Users,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
      suggestions: [
        'ابني كثير الغضب والعناد ولا يستمع لي',
        'كيف أتعامل مع ابني المراهق والعزلة؟',
        'طرق بناء ميثاق استخدام الأجهزة الإلكترونية'
      ]
    },
    {
      id: 'mental',
      title: 'أعاني من ضغوط نفسية',
      subtitle: 'القلق الأسري، الاحتراق النفسي، والشعور بالوحدة',
      icon: Brain,
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
      suggestions: [
        'أشعر بالوحدة والإنهاك النفسي من مسؤوليات الأسرة',
        'كيف أتعامل مع نوبات القلق عند اتخاذ قرارات مصيرية؟',
        'تمارين استعادة الهدوء والتوازع العاطفي'
      ]
    },
    {
      id: 'family',
      title: 'أريد استشارة أسرية',
      subtitle: 'توازن الأسرة، تدخل الأقارب، والاستقرار الشامل',
      icon: Home,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800',
      suggestions: [
        'كيف نحمي أسرتنا من التدخلات الخارجية الجائرة؟',
        'أثر ضغوط المعيشة على التفاهم الأسري',
        'إصلاح العلاقة بين أفراد العائلة'
      ]
    },
    {
      id: 'expert',
      title: 'أبحث عن مستشار',
      subtitle: 'توجيه مباشر لأفضل نخبة الاستشاريين المعتمدين',
      icon: UserCheck,
      color: 'from-teal-500/20 to-emerald-500/10 text-teal-800 dark:text-teal-200 border-teal-200 dark:border-teal-800',
      suggestions: [
        'أريد حجز استشارة زوجية مع أخصائية معتمدة',
        'أبحث عن خبير تربوي لمتابعة سلوك طفلي',
        'كيف أختار المستشار الأنسب لحالتي؟'
      ]
    },
    {
      id: 'all',
      title: 'كل ما سبق',
      subtitle: 'ترميم شامل وتطوير كامل لجودة الحياة الأسرية',
      icon: Sparkles,
      color: 'from-yellow-500/20 to-amber-500/10 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-700',
      suggestions: [
        'كيف أبدأ خطة تطوير شاملة لأسرتي اليوم؟',
        'أشعر بالتشتت في عدة ملفات زوجية وتربوية',
        'أين أجد الخطوة الأولى للسكينة والتفاهم؟'
      ]
    }
  ];

  const activeSituationObj = situations.find(s => s.id === selectedSituation) || situations[0];

  const handleSelectSituation = (id: string) => {
    setSelectedSituation(id);
    const chosen = situations.find(s => s.id === id);
    if (chosen) {
      setMessages([
        {
          sender: 'anis',
          text: `مرحباً بك. يسعدني مرافقتك اليوم بخصوص (${chosen.title}). اخبرني أكثر عما يشغل بالك، أو يمكنك اختيار إحدى البدايات المقترحة بالأسفل لنتحدث عنها سوية.`,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
    setStep('chat');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isLoading) return;

    const timeNow = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const updatedMessages = [
      ...messages,
      { sender: 'user' as const, text: query, time: timeNow }
    ];
    setMessages(updatedMessages);
    setChatInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text
          })),
          category: activeSituationObj.title,
          userContext: {
            userName: user.name,
            selectedTopic: activeSituationObj.title
          }
        })
      });

      const data = await res.json();
      const replyText = data.reply || 'أنا أنيس رفيقك الأسري. استمعت إليك جيداً، وأؤكد لك أن أول خطوة في التغيير هي الاعتراف بالرغبة في التفاهم. دعنا نضع خطة عمل هادئة.';
      
      // Auto recommend consultant if context matches or after 2 messages
      let recommended: Consultant | undefined = undefined;
      if (query.includes('مستشار') || query.includes('حجز') || query.includes('زوجي') || updatedMessages.length >= 3) {
        recommended = MOCK_CONSULTANTS[0];
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'anis',
          text: replyText,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          suggestedConsultant: recommended
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'anis',
          text: 'شكراً لمشاركتي هذا الفكر. أنا أنيس، ومعك خطوة بخطوة. أرى أن الحوار الهادئ وإعطاء الفرصة للإنصات هما مفتاح الحل الأول.',
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          suggestedConsultant: MOCK_CONSULTANTS[0]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // PAGE 1: Minimal Hero Welcome
  if (step === 'welcome') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12 relative overflow-hidden">
        {/* Soft Background Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0F5C5A]/10 dark:bg-[#C89B3C]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl space-y-8 relative z-10">
          
          {/* Anis Companion Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C]">
            <div className="w-6 h-6 rounded-full bg-[#0F5C5A] text-white flex items-center justify-center font-black text-xs">
              أ
            </div>
            <span>مرافقتك الأسرية الذكية عبر "أنيس"</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          {/* Core Headline & Subtitle as requested by CPO vision */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              ابدأ أول خطوة نحو أسرة أكثر استقرارًا
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
              أنيس يساعدك على فهم المشكلة ويوجهك للحل المناسب.
            </p>
          </div>

          {/* ONLY ONE MAIN CTA */}
          <div className="pt-4">
            <button
              onClick={() => setStep('situation')}
              className="px-10 py-5 rounded-2xl bg-[#0F5C5A] hover:bg-[#157A77] text-white font-black text-lg sm:text-xl shadow-2xl hover:scale-105 transition duration-300 flex items-center justify-center gap-3 mx-auto group ring-4 ring-[#C89B3C]/20"
            >
              <span>ابدأ الآن</span>
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition" />
            </button>
          </div>

          {/* Confidentiality Trust Footer */}
          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500 font-bold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>خصوصية وسرية مشفرة 100%</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
              <span>خبراء معتمدون</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // PAGE 2: Choose Your Situation
  if (step === 'situation') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6 px-4">
        {/* Header */}
        <div className="text-center space-y-3">
          <button 
            onClick={() => setStep('welcome')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>العودة للرئيسية</span>
          </button>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            ما هي الاستشارة أو الملف الذي يهمك اليوم؟
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            اختر الحالة التي تود مناقشتها، وسيقوم أنيس ببدء حوار هادئ مخصص معك.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {situations.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSituation(item.id)}
                className={`p-6 rounded-3xl bg-white dark:bg-[#122625] border-2 transition-all duration-300 text-right flex flex-col justify-between space-y-4 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden ${
                  selectedSituation === item.id 
                    ? 'border-[#0F5C5A] dark:border-[#C89B3C] ring-2 ring-[#0F5C5A]/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-[#0F5C5A]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center font-bold border shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-[#0F5C5A] dark:group-hover:text-[#C89B3C] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C]">
                  <span>متابعة مع أنيس</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // PAGE 3: Talk to Anees AI Companion Chat
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Top Companion Bar */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F5C5A] text-[#C89B3C] font-black text-xl flex items-center justify-center shadow-md">
            أ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base text-slate-900 dark:text-white">أنيس - رفيقك الأسري</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                متصل الآن
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              المجال المختار: <strong className="text-[#0F5C5A] dark:text-[#C89B3C]">{activeSituationObj.title}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep('situation')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition"
          >
            تغيير الحالة
          </button>
        </div>
      </div>

      {/* Suggested Starter Questions Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 block px-1">مقترحات حوار سريعة مع أنيس:</span>
        <div className="flex flex-wrap gap-2">
          {activeSituationObj.suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sug)}
              className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 hover:border-[#0F5C5A] text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0F5C5A] dark:hover:text-[#C89B3C] transition shadow-sm text-right"
            >
              "{sug}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
          >
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] font-bold text-slate-400">{m.time}</span>
              <span className="text-xs font-black text-slate-600 dark:text-slate-300">
                {m.sender === 'user' ? user.name : 'أنيس'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl max-w-[88%] sm:max-w-[80%] text-sm leading-relaxed shadow-sm ${
                m.sender === 'user'
                  ? 'bg-[#0F5C5A] text-white rounded-tl-none font-medium'
                  : 'bg-[#F8F7F3] dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tr-none'
              }`}
            >
              {m.text}

              {/* Contextual Recommendation Card if returned by Anees */}
              {m.suggestedConsultant && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0F5C5A] dark:text-[#C89B3C]">
                      توصية أنيس: حجز جلسة مع مستشار معتمد
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      موصى به
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={m.suggestedConsultant.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C89B3C]"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{m.suggestedConsultant.name}</h4>
                      <p className="text-[10px] text-slate-500">{m.suggestedConsultant.title}</p>
                    </div>
                  </div>
                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={() => onNavigateToConsultants && onNavigateToConsultants('marriage')}
                      className="w-full py-2 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold hover:bg-[#157A77] transition"
                    >
                      حجز الموعد الآن
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0F5C5A] animate-ping"></span>
            <span>أنيس يفكر ويصيغ التوجيه المناسب...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex gap-2 bg-white dark:bg-[#122625] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="اكتب رسالتك لأنيس بكل سرية..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none placeholder-slate-400"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!chatInput.trim() || isLoading}
          className="px-5 py-2.5 rounded-xl bg-[#0F5C5A] text-white font-bold text-xs hover:bg-[#157A77] transition disabled:opacity-50 flex items-center gap-1.5"
        >
          <span>إرسال</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation to Dashboard option */}
      <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
        <button
          onClick={onNavigateToDashboard}
          className="font-bold text-[#0F5C5A] dark:text-[#C89B3C] hover:underline"
        >
          ← الانتقال للوحة تحكم الأسرة
        </button>
        <button
          onClick={onOpenEmergency}
          className="font-bold text-rose-600 hover:underline flex items-center gap-1"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>حالة طوارئ عاجلة؟ انقر هنا</span>
        </button>
      </div>
    </div>
  );
}
