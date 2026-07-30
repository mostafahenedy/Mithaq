import React, { useState } from 'react';
import { Phone, X, ShieldAlert, Heart, Mic, Send, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_CONSULTANTS } from '../data/mockData';

interface EmergencyModalProps {
  onClose: () => void;
  onBookEmergencyConsultant?: () => void;
}

export function EmergencyModal({ onClose, onBookEmergencyConsultant }: EmergencyModalProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'anis' | 'user'; text: string }>>([
    {
      sender: 'anis',
      text: 'أهلاً بك. أنا أنيس، وأنا معك الآن فوراً. أرجوك خذ نفساً عميقاً هادئاً. مهما كان حجم الانفعال أو المشكلة الزوجية/الأسرية القائمة، نحن هنا لاحتوائك بسلام وسرية تامة.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const emergencyConsultant = MOCK_CONSULTANTS[0]; // أ. روض - طوارئ

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'anis',
          text: 'أفهم مشاعرك تماماً وتأثرك الشديد في هذه اللحظة. أول خطوة لحماية نفسك وأسرتك الآن هي التوقف عن أي نقاش مشدود لدقائق، وشرب القليل من الماء. إذا كنت تود حجز مكالمة صوتية طارئة ومباشرة فوراً مع استشاري معتمد، انقر على زر الطوارئ بالأسفل.'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 dir-rtl">
      <div className="w-full max-w-xl bg-white dark:bg-[#122625] rounded-3xl border-2 border-amber-500 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Top Emergency Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6 text-yellow-200 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-base">غرفة الدعم العاجل والطوارئ الأسرية</h3>
              <p className="text-[11px] text-amber-100 font-medium">استجابة فورية • احتواء عاطفي • سرية مشفرة</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Anees Chat Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-[#F8F7F3] dark:bg-slate-900/60 min-h-[250px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                m.sender === 'user'
                  ? 'bg-[#0F5C5A] text-white self-end mr-auto rounded-tl-none'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tr-none shadow-sm'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Direct Emergency Booking Callout */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border-t border-amber-200 dark:border-amber-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={emergencyConsultant.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500"
              />
              <div>
                <h4 className="font-black text-xs text-slate-900 dark:text-white">{emergencyConsultant.name}</h4>
                <p className="text-[10px] text-slate-500">استشارية طوارئ زوجية ونفسية مباشرة</p>
              </div>
            </div>

            {!isBooked ? (
              <button
                onClick={() => {
                  setIsBooked(true);
                  if (onBookEmergencyConsultant) onBookEmergencyConsultant();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-black text-xs shadow-md hover:scale-105 transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصال صوته طارئ فوراً</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم تجهيز القاعة الصوتية!</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Input Bar */}
        <div className="p-3 bg-white dark:bg-[#122625] border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="تحدث لأنيس عن الوضع الطارئ الآن..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
          >
            إرسال
          </button>
        </div>

      </div>
    </div>
  );
}
