import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Users, 
  PhoneCall, 
  Lock, 
  Award, 
  CheckCircle2, 
  ArrowLeft,
  Smartphone,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onStartApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] border border-[#0F5C5A]/20 px-4 py-1.5 rounded-full text-xs font-black">
          <Sparkles className="w-4 h-4 text-[#C89B3C]" />
          <span>المنصة السعودية والعربية الأولى للتفاهم والاستقرار الأسري</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
          ميثاق... حيث يبدأ <span className="text-[#0F5C5A] dark:text-[#C89B3C]">التفاهم والسكينة</span>
        </h1>

        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
          استشارات أسرية وزوجية ونفسية مع نخبة الاستشاريين المعتمدين، دعم تربوي، ومساعد ذكي فورية وسرية تامة على مدار الساعة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartApp}
            className="px-8 py-4 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-sm sm:text-base hover:bg-[#157A77] transition shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>دخول المنصة وتجربة التطبيق</span>
            <ArrowLeft className="w-5 h-5 text-[#C89B3C] rotate-180" />
          </button>
        </div>

        {/* Security & Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-bold">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#0F5C5A]" />
            <span>تشفير طبي وتأمين سرية الجلسات 100%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0F5C5A]" />
            <span>مستشارون معتمدون وموثقون</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>تقييم 4.9/5 من أكثر من 50,000 أسرة</span>
          </div>
        </div>
      </section>

      {/* Main Core Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">منظومة ميثاق الشاملة للأسرة</h2>
          <p className="text-xs text-slate-500">حلول متطورة تجمع بين الخبرة البشرية والتقنية الحديثة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">جلسات استشارية صوتية وكتابية</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              حجز موعد ميسر مع استشاريين متفوقين في مجالات العلاقات الزوجية، تربية المراهقين، والصحة النفسية عبر اتصال صوته أو محادثة سرية.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">المساعد الأسري الذكي "أنيس"</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              نموذج ذكاء اصطناعي مدرب على علوم التربية والتوافق الأسري لتقديم إجابات فورية واستشارات إرشادية على مدار 24 ساعة.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">واحة السكينة والتنفس الموجه</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تمارين تنفس عميق مهدئة لامتصاص توتر الخلافات، ومقاييس فحص ذاتي علمية لتشخيص الأنماط الوجدانية.
            </p>
          </div>

        </div>
      </section>

      {/* Pricing Subscription Plans */}
      <section className="space-y-8 bg-slate-50 dark:bg-white/5 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">خطط العضوية والاشتراك الأسري</h2>
          <p className="text-xs text-slate-500">اختر الخطة المناسبة لاحتياجات أسرتك وراحتكم.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">العضوية الأساسية</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#0F5C5A] dark:text-[#C89B3C]">مجاناً</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> دخول استشارات أنيس الذكية (محدودة)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> قراءة المقالات ودليل التربية</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> حجز جلسات استشارية بأسعارها المعتادة</li>
            </ul>
            <button onClick={onStartApp} className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs">
              بدء الاستخدام المجاني
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-[#0F5C5A] text-white border-2 border-[#C89B3C] shadow-xl space-y-4 relative">
            <span className="absolute -top-3 right-6 bg-[#C89B3C] text-slate-900 text-[10px] font-black px-3 py-1 rounded-full">
              الأكثر طلباً للأسرة
            </span>
            <h3 className="font-extrabold text-lg">باقة السكينة الفائقة</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#C89B3C]">199</span>
              <span className="text-xs text-emerald-100 font-bold">رس / شهرياً</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C89B3C]" /> خصم 25% على جميع جلسات الاستشاريين</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C89B3C]" /> استشارات أنيس AI غير محدودة مع تحليل مستندات</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C89B3C]" /> وصول كامل لأكاديمية ميثاق وشهادات الإنجاز</li>
            </ul>
            <button onClick={onStartApp} className="w-full py-3 rounded-2xl bg-[#C89B3C] text-slate-900 font-extrabold text-xs shadow-md">
              الاشتراك في باقة السكينة
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
