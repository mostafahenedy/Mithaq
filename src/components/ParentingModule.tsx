import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Download, 
  HelpCircle, 
  Smile, 
  Clock, 
  Award,
  ChevronLeft
} from 'lucide-react';

export const ParentingModule: React.FC = () => {
  const [activeAgeGroup, setActiveAgeGroup] = useState<'0-3' | '4-7' | '8-12' | '13-18'>('8-12');

  const ageData = {
    '0-3': {
      title: 'مرحلة الطفولة المبكرة (0 - 3 سنوات)',
      focus: 'بناء الأمان العاطفي وتطوير النوم واللغة الأولى',
      tips: [
        'الاستجابة الفورية لبكاء الرضيع تبني جدار ثقة وأمان عاطفي ولا تعني الدلال المفرط.',
        'تقليل التعرض للشاشات تماماً قبل سن السنتين لدعم النمو اللغوي والذهني الطبيعي.',
        'قراءة القصص المصورة الملونة يومياً لتنمية الحصيلة اللغوية والارتباط الأمومي.'
      ]
    },
    '4-7': {
      title: 'مرحلة الطفولة المتوسطة (4 - 7 سنوات)',
      focus: 'غرس القيم الأولية واللعب الاستكشافي والتعبير عن المشاعر',
      tips: [
        'استخدام جدول المكافآت البصرية المشجعة للسلوكيات الإيجابية (كالترتيب وغسل الأسنان).',
        'تدريب الطفل على مسميات مشاعره: "أعلم أنك غاضب الآن لأن اللعبة كُسرت".',
        'إتاحة ساعة لعب حر يومياً في الهواء الطلق لتصريف الطاقة الزائدة.'
      ]
    },
    '8-12': {
      title: 'مرحلة الناشئة والمدرسة (8 - 12 سنة)',
      focus: 'بناء الثقة بالنفس وتنظيم وقت الشاشات والمسؤولية الذاتية',
      tips: [
        'الاتفاق على قوانين استخدام الهواتف والألعاب الإلكترونية بالمشاركة وليس بالإملاء.',
        'إشراك الطفل في مسؤوليات البيت الأسبوعية ليشعر بأنه عنصر مؤثر ومقدّر.',
        'الإنصات لقصص يومه المدرسي بدون إصدار أحكام سريعة أو توبيخ.'
      ]
    },
    '13-18': {
      title: 'مرحلة المراهقة (13 - 18 سنة)',
      focus: 'المصادقة والحوار الدافئ والاحترام المتبادل وبناء الشخصية',
      tips: [
        'التحول السلس من أسلوب "الآمر" إلى أسلوب "المستشار والصديق الداعم".',
        'احترام خصوصية المراهق واستئذانه قبل دخول غرفته لمنحه الأمان.',
        'مناقشة الأفكار والقيم بأسلوب حواري مقنع بدلاً من فرض القرارات.'
      ]
    }
  };

  const activeGroupData = ageData[activeAgeGroup];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            دليل تربية الأبناء والتنشئة الإيجابية
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">رعاية الأبناء حسب المراحل العمرية</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            نصائح تربوية موجهة، حلول صعوبات التعلم وفرط الحركة، وخطط تعديل السلوك برفق وحزم من أخصائيي ميثاق.
          </p>
        </div>
      </div>

      {/* Age Group Selector Tabs */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: '0-3', label: '0 - 3 سنوات (الطفولة المبكرة)' },
            { id: '4-7', label: '4 - 7 سنوات (الطفولة المتوسطة)' },
            { id: '8-12', label: '8 - 12 سنة (المدرسة والناشئة)' },
            { id: '13-18', label: '13 - 18 سنة (المراهقة)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAgeGroup(tab.id as any)}
              className={`p-3 rounded-2xl text-xs font-bold transition text-center ${
                activeAgeGroup === tab.id
                  ? 'bg-[#0F5C5A] text-white shadow-md'
                  : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age Specific Content Display */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{activeGroupData.title}</h3>
          <p className="text-xs text-[#0F5C5A] dark:text-[#C89B3C] font-semibold mt-1">الهدف الأساسي للمرحلة: {activeGroupData.focus}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">توصيات ميثاق التربوية الذهبية:</h4>
          {activeGroupData.tips.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0F5C5A]/5 dark:bg-white/5 border border-[#0F5C5A]/10 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C89B3C] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{tip}</p>
            </div>
          ))}
        </div>

        {/* Action Downloads */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded-2xl bg-[#0F5C5A] text-white text-xs font-bold hover:bg-[#157A77] transition flex items-center gap-2">
            <Download className="w-4 h-4 text-[#C89B3C]" />
            <span>تحميل جدول المكافآت والسلوك المطبوع (PDF)</span>
          </button>
          <button className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition">
            استشارة أخصائي تربية أبناء
          </button>
        </div>
      </div>

      {/* Specialized Topics Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">مواضيع تربوية خاصة وحلول معتمدة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">تعديل السلوك والعناد</h4>
            <p className="text-xs text-slate-500 leading-relaxed">خطوات التعامل مع نوبات الغضب والعصيان دون الحاجة للصراخ أو العقاب البدني.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">فرط الحركة وتشتت الانتباه ADHD</h4>
            <p className="text-xs text-slate-500 leading-relaxed">استراتيجيات تنظيم البيئة المدرسية والبيتية لدعم تركيز الطفل وإنجازه.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">صعوبات التعلم والمدرسة</h4>
            <p className="text-xs text-slate-500 leading-relaxed">طرق تحفيز الطفل على الواجبات المنزلية وتقوية مهارات القرائية والحساب.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
