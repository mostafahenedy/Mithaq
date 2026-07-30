import React, { useState } from 'react';
import { MessageSquare, Sparkles, AlertTriangle, CheckCircle2, ArrowLeft, RefreshCw, HeartHandshake } from 'lucide-react';
import { RelationshipAnalysisResult } from '../types';

export function RelationshipAnalysis() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RelationshipAnalysisResult | null>({
    id: 'res-1',
    date: 'اليوم',
    rawInput: 'محادثة حول ميزانية الترفيه الصيفية',
    emotions: [
      { emotion: "عتاب وتوجس", percentage: 40, color: "bg-amber-500" },
      { emotion: "حرص على الأسرة", percentage: 35, color: "bg-emerald-500" },
      { emotion: "شغور بالدفاعية", percentage: 25, color: "bg-rose-500" }
    ],
    tensionScore: 55,
    misunderstandings: [
      "تفسير إرهاق الطرف الآخر من العمل على أنه تجاهل لمطالب المنزل",
      "الشعور بعدم تقدير المجهود والتضحيات المتبادلة"
    ],
    aggressiveWording: [
      { text: "أنت لا تهتم بالبيت أبداً", softerAlternative: "أشعر بالضغط وأحتاج مشاركتك وتواجدك معي في ترتيب الأمر" },
      { text: "دائماً نكرر نفس الكلام", softerAlternative: "يهمني أن نصل لحل مستدام يريحنا جميعاً" }
    ],
    recommendations: [
      "تجنب فتح المواضيع الحساسة عند العودة المباشرة من العمل",
      "استبدال صيغة الاتهام 'أنت قصرت' بصيغة التعبير 'أنا أحتاج دعمك'",
      "إتاحة فرصة 3 دقائق متواصلة للطرف الآخر للحديث دون أي مقاطعة"
    ]
  });

  const handleAnalyze = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/analyze-relationship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textInput: inputText })
      });

      const data = await res.json();
      if (data.analysis) {
        setResult({
          id: 'res-' + Date.now(),
          date: 'الآن',
          rawInput: inputText,
          emotions: data.analysis.emotions || [],
          tensionScore: data.analysis.tensionScore || 50,
          misunderstandings: data.analysis.misunderstandings || [],
          aggressiveWording: data.analysis.aggressiveWording || [],
          recommendations: data.analysis.recommendations || []
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F5C5A] to-[#157A77] text-white shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#C89B3C]" />
          <h1 className="text-xl sm:text-2xl font-black">محلل تواصل العلاقات والنصوص (أنيس الذكي)</h1>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          قم بلصق أو كتابة نص المحادثة التي حدث بينك وبين شريك حياتك أو أحد أفراد الأسرة. سيقوم أنيس بتحليل المشاعر السائدة، كشف مكامن سوء الفهم، واقتراح بدائل عبارات ألطف تعيد الدفء والتفاهم.
        </p>
      </div>

      {/* Text Input Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <label className="font-extrabold text-sm text-slate-900 dark:text-white block">
          انسخ نص المحادثة أو الرسائل هنا (واتساب / مسنجر / حوار):
        </label>
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="مثال: - كيف نسيت طلب المنزل؟ / - كنت مشغولاً بالعمل ولم ألاحظ الرسالة / - أنت دائماً تتجاهل ما أطلبه..."
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F5C5A] placeholder-slate-400"
        />

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] font-bold text-slate-400">🔒 البيانات مشفرة وتُعالج بمنتهى الخصوصية</span>
          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isLoading}
            className="px-6 py-3 rounded-2xl bg-[#0F5C5A] text-white font-black text-xs hover:bg-[#157A77] transition disabled:opacity-50 flex items-center gap-2 shadow-md"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#C89B3C]" />
                <span>جاري تحليل المشاعر وتفكيك سوء الفهم...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                <span>تحليل الحوار وتوليد التوصيات</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Result Display */}
      {result && (
        <div className="space-y-6">
          
          {/* Tension Score & Emotions Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Tension Gauge */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-500 block">مؤشر التوتر في الحوار</span>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-[#0F5C5A] dark:text-[#C89B3C]">
                  {result.tensionScore}%
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {result.tensionScore > 70 ? 'توتر مرتفع يتطلب التهدئة' : result.tensionScore > 40 ? 'توتر متوسط قابل للتدارك بمرونة' : 'حوار هادئ وإيجابي'}
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0F5C5A] h-full" style={{ width: `${result.tensionScore}%` }}></div>
              </div>
            </div>

            {/* Emotions Breakdown */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-500 block">المشاعر السائدة المكتشفة بالنص</span>
              <div className="space-y-2">
                {result.emotions.map((e, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>{e.emotion}</span>
                      <span>{e.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`${e.color || 'bg-[#0F5C5A]'} h-full`} style={{ width: `${e.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Aggressive Wording & Softer Alternatives */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>الألفاظ الحادة والبدائل الأكثر لطفاً وددفئاً</span>
            </h3>

            <div className="space-y-3">
              {result.aggressiveWording.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-rose-500 uppercase">العبارة الحادة التي زادت التوتر:</span>
                    <p className="font-bold text-rose-900 dark:text-rose-200">"{item.text}"</p>
                  </div>
                  <div className="space-y-1 sm:border-r border-slate-200 dark:border-slate-700 sm:pr-3">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">الصياغة البديلة الموصى بها من أنيس:</span>
                    <p className="font-bold text-emerald-900 dark:text-emerald-200">"{item.softerAlternative}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations from Anees */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F5C5A]/10 via-[#0F5C5A]/5 to-transparent border border-[#0F5C5A]/20 space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>خطة أنيس لإعادة الدفء والحوار البناء</span>
            </h3>

            <ul className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#0F5C5A] text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}
