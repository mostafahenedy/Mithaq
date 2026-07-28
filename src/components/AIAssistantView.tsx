import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User as UserIcon, 
  Volume2, 
  VolumeX, 
  Paperclip, 
  Image as ImageIcon, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  ArrowLeft,
  MessageSquare,
  ShieldAlert,
  Download
} from 'lucide-react';
import { ChatMessage, User } from '../types';

interface AIAssistantViewProps {
  user: User;
  onClose?: () => void;
  isModal?: boolean;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  user,
  onClose,
  isModal = false
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'anis',
      text: `أهلاً بك يا ${user.name.split(' ')[0]} في رحاب ميثاق. أنا "أنيس" مستشارك الأسري الذكي.\n\nأنا هنا للإنصات إليك بخصوصية تامة وتقديم المشورة العلمية والتربوية والزوجية والنفسية. كيف يمكنني مساندتك اليوم؟`,
      timestamp: 'الآن',
      sources: [
        'منهجية ميثاق للتفاهم والسكينة الزوجية',
        'توصيات الاستشاريين المعتمدين لدى ميثاق'
      ],
      suggestedActions: [
        'تأهيل ومصادقة المقبلين على الزواج',
        'حل خلاف زوجي حول الحوار اليومي',
        'نصائح للتعامل مع المراهقين',
        'تمارين تخفيف التوتر والحد من الغضب'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'حل خلاف زوجي', text: 'كيف أفتح حواراً هادئاً مع زوجي حول تقسيط وقت العمل والبيت دون أن يتحول النقاش إلى شجار؟' },
    { label: 'عناد المراهقين', text: 'ابني عمره 12 سنة ويقضي وقتاً طويلاً على الشاشات، كيف أتعامل مع عناده برفق وحزم؟' },
    { label: 'إدارة الغضب', text: 'ما هي الخطوات الفورية للتحكم بالغضب والانفعال عند اشتداد النقاش الأسرى؟' },
    { label: 'تعزيز الحب', text: 'كيف نجدد العاطفة والاهتمام بين الزوجين بعد مرور عدة سنوات على الزواج؟' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || input;
    if (!messageContent.trim() && !attachedFile) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: attachedFile ? `[مرفق ملف/صورة تحليلي]\n${messageContent}` : messageContent,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setAttachedFile(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text
          })),
          userContext: {
            name: user.name,
            subscription: user.subscription,
            familyMembers: user.familyMembers
          }
        })
      });

      const data = await res.json();

      const anisMsg: ChatMessage = {
        id: `anis-${Date.now()}`,
        sender: 'anis',
        text: data.reply || 'أعتذر، حدث تعثر بسيط في شبكة التحليل. أنيس في خدمتك دائماً.',
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || ['ميثاق - دليل التفاهم الأسري'],
        suggestedActions: data.suggestedActions || ['حجز جلسة استشارة أسرية مع أخصائي']
      };

      setMessages(prev => [...prev, anisMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'anis',
          text: 'أعتذر عن هذا الخلل الفني المؤقت. أنا أنيس، وأنا هنا لدعمك. يمكنك المحاولة مرة أخرى الآن.',
          timestamp: 'الآن'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'anis',
        text: 'تم بدء محادثة جديدة ومسح الذاكرة القريبة بحفظ وخصوصية تامة. كيف يمكنني مساندتك الآن؟',
        timestamp: 'الآن'
      }
    ]);
  };

  return (
    <div className={`flex flex-col bg-[#F8F7F3] dark:bg-[#0B1A19] ${isModal ? 'h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-[#0F5C5A]/20' : 'min-h-[75vh] rounded-3xl border border-[#0F5C5A]/20 p-4 sm:p-6 shadow-sm'}`}>
      
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 bg-[#0F5C5A] text-white rounded-2xl shadow-md mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C89B3C] text-slate-900 font-extrabold flex items-center justify-center text-xl shadow-inner relative">
            أ
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0F5C5A]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base">أنيس - المساعد الأسري الذكي</h3>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Gemini AI</span>
            </div>
            <p className="text-xs text-emerald-100">استشارات أسرية ونفسية فورية وسرية</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            title={audioEnabled ? "تعطيل الصوت" : "تفعيل الصوت"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-[#C89B3C]" /> : <VolumeX className="w-4 h-4 text-white/60" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            title="محادثة جديدة"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 space-y-4 py-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'anis' && (
              <div className="w-8 h-8 rounded-xl bg-[#0F5C5A] text-[#C89B3C] font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-1">
                أ
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-[#0F5C5A] text-white rounded-tl-none shadow-sm'
                    : 'bg-white dark:bg-[#122625] text-slate-900 dark:text-slate-100 rounded-tr-none border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {msg.text}
              </div>

              {/* Sources & Suggested Actions for Anis */}
              {msg.sender === 'anis' && (
                <div className="space-y-2 text-xs">
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 p-2 rounded-xl">
                      <FileText className="w-3 h-3 text-[#C89B3C]" />
                      <span className="font-bold">المصادر المعتمدة:</span>
                      {msg.sources.map((s, idx) => (
                        <span key={idx} className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(act)}
                          className="px-2.5 py-1 rounded-xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:bg-white/10 dark:text-[#C89B3C] text-[11px] font-semibold hover:bg-[#0F5C5A]/20 transition flex items-center gap-1 border border-[#0F5C5A]/20"
                        >
                          <Sparkles className="w-3 h-3 text-[#C89B3C]" />
                          <span>{act}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <span className={`text-[10px] text-slate-400 block ${msg.sender === 'user' ? 'text-left' : 'text-right'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-[#C89B3C] text-slate-900 font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-1">
                أنت
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F5C5A] text-[#C89B3C] font-black text-sm flex items-center justify-center shrink-0 animate-pulse">
              أ
            </div>
            <div className="bg-white dark:bg-[#122625] p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0F5C5A] rounded-full animate-ping"></span>
              <span>أنيس يفكر ويصيغ المشورة العلمية والأسرية...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-2 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex gap-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.text)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#122625] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold whitespace-nowrap hover:border-[#0F5C5A] hover:text-[#0F5C5A] transition shrink-0"
          >
            💡 {qp.label}
          </button>
        ))}
      </div>

      {/* Attached File Preview Bar */}
      {attachedFile && (
        <div className="mx-2 mb-2 p-2 bg-[#0F5C5A]/10 rounded-xl flex items-center justify-between text-xs text-[#0F5C5A]">
          <div className="flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-[#C89B3C]" />
            <span>مرفق جاهز للتحليل بواسطة أنيس</span>
          </div>
          <button onClick={() => setAttachedFile(null)} className="text-rose-500 font-bold">إلغاء</button>
        </div>
      )}

      {/* Input Form */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setAttachedFile('صورة / وثيقة استشارية')}
            className="p-3 rounded-2xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#0F5C5A] transition"
            title="إرفاق صورة أو وثيقة"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب استفسارك للبحث والتحليل مع أنيس..."
            className="flex-1 bg-white dark:bg-[#122625] text-slate-900 dark:text-white px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#0F5C5A] text-xs sm:text-sm font-medium"
          />

          <button
            type="submit"
            disabled={loading || (!input.trim() && !attachedFile)}
            className="p-3.5 rounded-2xl bg-[#0F5C5A] text-white disabled:opacity-50 hover:bg-[#157A77] transition shadow-md flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-[#C89B3C] rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
