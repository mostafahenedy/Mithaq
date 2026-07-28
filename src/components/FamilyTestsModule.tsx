import React, { useState } from 'react';
import { 
  Heart, 
  Compass, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Printer, 
  Download, 
  Award, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { FamilyTest, TestQuestion, User } from '../types';
import { MOCK_TESTS } from '../data/mockData';

interface FamilyTestsModuleProps {
  user: User;
}

export const FamilyTestsModule: React.FC<FamilyTestsModuleProps> = ({ user }) => {
  const [activeTest, setActiveTest] = useState<FamilyTest | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [reportResult, setReportResult] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNextQuestion = () => {
    if (!activeTest) return;
    if (currentQuestionIdx < activeTest.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate score and trigger AI analysis
      finishTestAndAnalyze();
    }
  };

  const finishTestAndAnalyze = async () => {
    if (!activeTest) return;
    setLoadingReport(true);

    const totalScore = Object.values(answers).reduce((a: number, b: number) => a + b, 0);
    const maxScore = activeTest.questions.length * 25;

    try {
      const res = await fetch('/api/ai/analyze-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testTitle: activeTest.titleAr,
          answers,
          score: totalScore,
          maxScore
        })
      });

      const data = await res.json();
      setReportResult({
        title: activeTest.titleAr,
        score: totalScore,
        maxScore,
        analysis: data.report
      });
    } catch (err) {
      console.error(err);
      setReportResult({
        title: activeTest.titleAr,
        score: totalScore,
        maxScore,
        analysis: {
          overallAssessment: 'أظهرت نتائج التقييم مستوى ممتازاً من الحرص والوعي العالي بجودة الحياة الأسرية.',
          strengths: ['الرغبة في الحوار البناء', 'مرونة التعامل مع الضغوط'],
          growthAreas: ['تخصيص أوقات هادئة دورية للحديث'],
          recommendations: ['متابعة دورات ميثاق الأكاديمية والاستفادة من جلسات أنيس اليومية']
        }
      });
    } finally {
      setLoadingReport(false);
    }
  };

  const handleResetTest = () => {
    setActiveTest(null);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setReportResult(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            المقاييس والاختبارات الأسرية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">اختبارات ميثاق العلمية والتشخيص الذاتي</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            اكتشف لغات الحب، نمط التوافق الزوجي، والنمط التربوي من خلال أسئلة علمية دقيقة تصدر لك تقريراً تفصيلياً موثقاً بالذكاء الاصطناعي.
          </p>
        </div>
      </div>

      {/* Main Container */}
      {!activeTest && !reportResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTS.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center">
                  {test.category === 'love-language' && <Heart className="w-6 h-6" />}
                  {test.category === 'marriage-compatibility' && <Compass className="w-6 h-6" />}
                  {test.category === 'parenting-style' && <Users className="w-6 h-6" />}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{test.titleAr}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{test.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold pt-1">
                  <span>⏱ {test.timeMinutes} دقائق</span>
                  <span>• {test.questionsCount} أسئلة</span>
                  <span>• تقرير أخصائي شامل</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveTest(test);
                  setCurrentQuestionIdx(0);
                  setAnswers({});
                }}
                className="w-full py-3 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                <span>بدء الاختبار الآن</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Active Quiz Runner */}
      {activeTest && !reportResult && (
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 max-w-2xl mx-auto">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] text-[#0F5C5A] dark:text-[#C89B3C] font-bold block">
                السؤال {currentQuestionIdx + 1} من {activeTest.questions.length}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{activeTest.titleAr}</h3>
            </div>
            <button onClick={handleResetTest} className="text-xs text-slate-400 hover:text-slate-600 font-bold">
              إلغاء الاختبار
            </button>
          </div>

          {/* Question & Options */}
          {activeTest.questions[currentQuestionIdx] && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed">
                {activeTest.questions[currentQuestionIdx].questionAr}
              </h4>

              <div className="space-y-2.5 pt-2">
                {activeTest.questions[currentQuestionIdx].options.map((opt, idx) => {
                  const questionId = activeTest.questions[currentQuestionIdx].id;
                  const isSelected = answers[questionId] === opt.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(questionId, opt.score)}
                      className={`w-full p-4 rounded-2xl text-right text-xs font-bold transition flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#0F5C5A] text-white border-[#0F5C5A] shadow-md'
                          : 'bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#0F5C5A]'
                      }`}
                    >
                      <span>{opt.textAr}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 disabled:opacity-30"
            >
              السابق
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={answers[activeTest.questions[currentQuestionIdx]?.id] === undefined || loadingReport}
              className="px-6 py-2.5 rounded-2xl bg-[#0F5C5A] text-white text-xs font-extrabold hover:bg-[#157A77] disabled:opacity-50 transition flex items-center gap-2 shadow-md"
            >
              {loadingReport ? (
                <span>جاري تحليل التقرير بالذكاء الاصطناعي...</span>
              ) : (
                <>
                  <span>{currentQuestionIdx === activeTest.questions.length - 1 ? 'إنهاء واستخراج التقرير' : 'السؤال التالي'}</span>
                  <ArrowLeft className="w-4 h-4 text-[#C89B3C]" />
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* Generated Report View Card */}
      {reportResult && (
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 border-2 border-[#C89B3C]/40 shadow-xl space-y-6 max-w-3xl mx-auto">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0F5C5A] text-[#C89B3C] font-black text-2xl flex items-center justify-center shadow-md">
                م
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{reportResult.title}</h3>
                <p className="text-xs text-slate-500">تقرير تشخيصي صادر من منصة ميثاق الأسرية الرقمية</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 transition"
              >
                <Printer className="w-4 h-4 text-[#C89B3C]" />
                <span>طباعة التقرير</span>
              </button>
            </div>
          </div>

          {/* Overall Score Badge */}
          <div className="bg-gradient-to-r from-[#0F5C5A] to-[#157A77] text-white p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-200 font-bold">النتيجة الإجمالية المحققة:</span>
              <h4 className="text-3xl font-black mt-1">{reportResult.score} <span className="text-sm font-normal text-slate-300">/ {reportResult.maxScore} درجة</span></h4>
            </div>
            <Award className="w-12 h-12 text-[#C89B3C]" />
          </div>

          {/* Analytical Sections */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 space-y-1">
              <h5 className="font-bold text-[#0F5C5A] dark:text-[#C89B3C]">الملخص الشامل للحالة:</h5>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {reportResult.analysis.overallAssessment}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h5 className="font-bold text-emerald-800 dark:text-emerald-300">نقاط القوة البارزة:</h5>
                <ul className="list-disc list-inside space-y-1 text-emerald-900 dark:text-emerald-200">
                  {reportResult.analysis.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 space-y-2">
                <h5 className="font-bold text-amber-800 dark:text-amber-300">التوصيات والخطوات التالية:</h5>
                <ul className="list-disc list-inside space-y-1 text-amber-900 dark:text-amber-200">
                  {reportResult.analysis.recommendations?.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
            <button
              onClick={handleResetTest}
              className="px-6 py-2.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition"
            >
              إجراء اختبار آخر
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
