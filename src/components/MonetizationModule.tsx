import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  Zap, 
  Award, 
  Calendar, 
  Check, 
  ArrowLeft, 
  Lock, 
  Receipt, 
  DollarSign, 
  Star,
  Users,
  Video,
  FileText,
  Printer
} from 'lucide-react';
import { User, SubscriptionTier } from '../types';

interface MonetizationModuleProps {
  user: User;
  onUpdateUser?: (updated: User) => void;
}

export const MonetizationModule: React.FC<MonetizationModuleProps> = ({
  user,
  onUpdateUser
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'pricing' | 'payouts'>('pricing');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>('plus');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'applepay' | 'card'>('mada');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null);

  // Bank Account Settings State for Owner
  const [bankName, setBankName] = useState('البنك الأهلي السعودي (SNB)');
  const [accountHolder, setAccountHolder] = useState('مؤسسة ميثاق لتقنية المعلومات والحلول الأسرية');
  const [iban, setIban] = useState('SA94 1000 0001 8492 0019 9000');
  const [payoutSchedule, setPayoutSchedule] = useState<'weekly' | 'monthly'>('weekly');
  const [isBankSaved, setIsBankSaved] = useState(false);
  const [isManualPayoutRequested, setIsManualPayoutRequested] = useState(false);

  // Pricing calculations
  const plans = [
    {
      id: 'free' as SubscriptionTier,
      name: 'باقة أنيس الأساسية',
      badge: 'مجانية دائماً',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'مدخل مثالي للاستفادة من الذكاء الاصطناعي ومتابعة شؤون الأسرة الأساسية.',
      features: [
        'محادثات محدودة مع المستشار الذكي أنيس',
        'لوحة تحكم الأسرة الأساسية',
        'قراءة المقالات والاستشارات العامة',
        'اختبار القياس النفسي الأساسي'
      ],
      popular: false,
      color: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1A19]'
    },
    {
      id: 'plus' as SubscriptionTier,
      name: 'اشتراك أنيس الذهبي الأسري',
      badge: 'الأكثر طلباً للعينات الأسرية',
      priceMonthly: 99,
      priceYearly: 890,
      description: 'حل متكامل لإدارة الحوار الأسري، تحليل المحادثات، ونمط الشريكين التفاعلي.',
      features: [
        'محادثات ذكية غير محدودة 24/7 مع أنيس',
        'تحليل نبرة وسياق محادثات الواتساب الأسرية',
        'تفعيل نمط الشريكين (Couples Sync)',
        'تقارير سلوكية وتربوية أسبوعية للأبناء',
        'خصم 10% على كافة الجلسات الاستشارية المباشرة'
      ],
      popular: true,
      color: 'border-[#0F5C5A] ring-2 ring-[#0F5C5A]/30 bg-emerald-50/30 dark:bg-[#0F5C5A]/10'
    },
    {
      id: 'vip' as SubscriptionTier,
      name: 'باقة السكينة الشاملة',
      badge: 'VIP العناية الفائقة',
      priceMonthly: 299,
      priceYearly: 2690,
      description: 'تغطية استشارية متكاملة تدمج بين الذكاء الاصطناعي والجلسات البشرية المعتمدة.',
      features: [
        'جميع مزايا الاشتراك الذهبي الأسري',
        'جلسة استشارية مرئية/صوتية مجانية شهرياً (قيمة 250 ر.س)',
        'أولوية حجز استشارات الطوارئ الفورية (خلال 10 دقائق)',
        'وصول كامل لكافة دورات ورش الأكاديمية الأسرية',
        'دعم فني واستشاري مخصص 24 ساعة'
      ],
      popular: false,
      color: 'border-[#C89B3C] ring-2 ring-[#C89B3C]/30 bg-amber-50/30 dark:bg-[#C89B3C]/10'
    }
  ];

  const handleSubscribeClick = (planId: SubscriptionTier) => {
    if (planId === 'free') return;
    setSelectedPlan(planId);
    setIsCheckoutOpen(true);
  };

  const currentPlanObj = plans.find(p => p.id === selectedPlan) || plans[1];
  const rawPrice = billingCycle === 'monthly' ? currentPlanObj.priceMonthly : currentPlanObj.priceYearly;
  const vatAmount = Math.round(rawPrice * 0.15);
  const totalPrice = rawPrice + vatAmount;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaidSuccess(true);

      const inv = {
        invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('ar-SA'),
        planName: currentPlanObj.name,
        subtotal: rawPrice,
        vat: vatAmount,
        total: totalPrice,
        paymentMethodName: paymentMethod === 'mada' ? 'مدى (Mada)' : paymentMethod === 'applepay' ? 'Apple Pay' : 'بطاقة ائتمان'
      };
      setInvoiceDetails(inv);

      if (onUpdateUser) {
        onUpdateUser({
          ...user,
          subscription: selectedPlan
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 dir-rtl pb-16">
      
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F5C5A] via-[#157A77] to-[#0A3D3C] text-white p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(200,155,60,0.15),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#C89B3C]">
            <Crown className="w-4 h-4" />
            <span>منظومة الاستدامة المالية ونماذج تحقيق الربح في ميثاق</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            خطط الاشتراكات والخدمات المدفوعة لتحقيق استدامة المنصة
          </h1>

          <p className="text-sm md:text-base text-slate-100/90 leading-relaxed font-medium">
            تعتمد منصة ميثاق نموذج عمل هجين (Hybrid Freemium SaaS & Paid Consultations) يضمن الاستدامة المالية وتوليد الأرباح عبر عدة قنوات استثمارية مرنة.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#C89B3C]" />
              <span>اشتراكات أسرية دورية</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>عمولة حجز الاستشارات (20%)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-blue-300" />
              <span>عقود الشركات B2B</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP SUB-TAB NAVIGATION */}
      <div className="flex items-center justify-center border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 gap-1">
          <button
            onClick={() => setActiveSubTab('pricing')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
              activeSubTab === 'pricing'
                ? 'bg-[#0F5C5A] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Crown className="w-4 h-4 text-[#C89B3C]" />
            <span>خطط الاشتراكات وبوابة الدفع</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('payouts')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
              activeSubTab === 'payouts'
                ? 'bg-[#0F5C5A] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>تحويل الأرباح للحساب البنكي (Payouts)</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'payouts' ? (
        /* BANK PAYOUTS & FINANCIAL DASHBOARD VIEW */
        <div className="space-y-6 animate-in fade-in">
          
          {/* STATS OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-500">إجمالي دخل المنصة المتراكم</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">64,890 ر.س</div>
              <span className="text-[10px] text-emerald-600 font-bold block">↑ +18.4% هذا الشهر</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">الأرباح القابلة للتحويل الآن</span>
              <div className="text-2xl font-black text-[#0F5C5A] dark:text-[#C89B3C] font-mono">18,450 ر.س</div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">جاهزة للتحويل الفوري</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-500">مجموع الأرباح المحولة سابقاً</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">46,440 ر.س</div>
              <span className="text-[10px] text-slate-400 font-medium block">تم تحويلها لحسابك البنكي</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-500">طريقة التحويل المحددة</span>
              <div className="text-sm font-black text-slate-800 dark:text-slate-200">تحويل آلي أسبوعي</div>
              <span className="text-[10px] text-blue-600 font-bold block">كل يوم أحد عبر SARIE</span>
            </div>
          </div>

          {/* PAYMENT GATEWAYS INTEGRATION & IBAN SETTINGS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* PAYMENT GATEWAY CONNECTIVITY STATUS */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>بوابة الدفع الإلكتروني المعتمدة (Merchant Gateway)</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black">
                  مربوط ومفّعل ⚡
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                تستقبل منصة ميثاق أموال المشتركين والمستفيدين عبر بوابات الدفع المحلية المعتمدة في السعودية (ميسر Moyasar / تاب Tap Payments / هايبرباي HyperPay) وتدعم مدى و Apple Pay.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-[10px]">
                      Moyasar
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white block">بوابة ميسر / Tap Payments</span>
                      <span className="text-[10px] text-slate-400">تحصيل مدى، الفيزا، و Apple Pay</span>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold text-[11px]">متصل (Live Mode)</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-[10px]">
                      SARIE
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white block">التحويل السريع البنكي (سريع)</span>
                      <span className="text-[10px] text-slate-400">تحويل أرباحك مباشرة إلى حسابك البنكي</span>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold text-[11px]">جاهز للتحويل</span>
                </div>
              </div>
            </div>

            {/* IBAN & PAYOUT SETTINGS FORM */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#C89B3C]" />
                  <span>بيانات الحساب البنكي لاستقبال الأرباح (IBAN Payouts)</span>
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">اسم البنك السعودي</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">اسم صاحب الحساب البنكي / المؤسسة</label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">رقم الآيبان (IBAN)</label>
                  <input
                    type="text"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-900 dark:text-white text-left dir-ltr"
                  />
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">تكرار التحويل البنكي الأوتوماتيكي:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPayoutSchedule('weekly')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        payoutSchedule === 'weekly'
                          ? 'bg-[#0F5C5A] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      أسبوعي
                    </button>
                    <button
                      onClick={() => setPayoutSchedule('monthly')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        payoutSchedule === 'monthly'
                          ? 'bg-[#0F5C5A] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      شهري
                    </button>
                  </div>
                </div>

                {isBankSaved && (
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>تم حفظ الحساب البنكي بنجاح! ستصل الأرباح مباشرة هنا.</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsBankSaved(true);
                      setTimeout(() => setIsBankSaved(false), 2500);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-[#0F5C5A] hover:bg-[#157A77] text-white font-extrabold text-xs transition shadow-md"
                  >
                    حفظ الحساب البنكي
                  </button>

                  <button
                    onClick={() => {
                      setIsManualPayoutRequested(true);
                      setTimeout(() => setIsManualPayoutRequested(false), 3000);
                    }}
                    className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4" />
                    <span>طلب تحويل فوري الآن (18,450 ر.س)</span>
                  </button>
                </div>

                {isManualPayoutRequested && (
                  <div className="p-3 rounded-2xl bg-amber-100 text-amber-950 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-700" />
                    <span>تم إرسال أمر التحويل الفوري بمبلغ 18,450 ر.س إلى آيبانك بنجاح!</span>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* PAYOUT TRANSACTIONS HISTORY TABLE */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                <span>سجل تحويلات الأرباح إلى حسابك البنكي (Payout History)</span>
              </h3>
              <span className="text-xs text-slate-500 font-bold">آخر 4 تحويلات</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold">
                    <th className="py-2.5">رقم المرجع (Transaction Ref)</th>
                    <th className="py-2.5">تاريخ التحويل</th>
                    <th className="py-2.5">المبلغ المحول</th>
                    <th className="py-2.5">طريقة التحويل</th>
                    <th className="py-2.5">حالة التحويل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="py-3 font-mono text-[11px]">TXN-984201</td>
                    <td className="py-3">2026-07-25</td>
                    <td className="py-3 font-extrabold text-emerald-600 font-mono">14,200 ر.س</td>
                    <td className="py-3">تحويل آلي أسبوعي (SARIE)</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold">مكتمل وواصل 100%</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono text-[11px]">TXN-873190</td>
                    <td className="py-3">2026-07-18</td>
                    <td className="py-3 font-extrabold text-emerald-600 font-mono">12,850 ر.س</td>
                    <td className="py-3">تحويل آلي أسبوعي (SARIE)</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold">مكتمل وواصل 100%</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono text-[11px]">TXN-761922</td>
                    <td className="py-3">2026-07-11</td>
                    <td className="py-3 font-extrabold text-emerald-600 font-mono">10,500 ر.س</td>
                    <td className="py-3">تحويل آلي أسبوعي (SARIE)</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold">مكتمل وواصل 100%</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono text-[11px]">TXN-650014</td>
                    <td className="py-3">2026-07-04</td>
                    <td className="py-3 font-extrabold text-emerald-600 font-mono">8,890 ر.س</td>
                    <td className="py-3">تحويل آلي أسبوعي (SARIE)</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold">مكتمل وواصل 100%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* ORIGINAL SUBSCRIPTION PRICING VIEW */
        <>
          {/* REVENUE STREAMS OVERVIEW (3 CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-[#0F5C5A] dark:text-[#C89B3C] flex items-center justify-center font-bold">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">1. الاشتراكات الدورية (SaaS)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  رسوم شهريّة/سنوية تبدأ من 99 ر.س للوصول لـ AI أنيس المتقدم، تحليل المحادثات، ونمط الشريكين.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-bold">
                <span>الهامش الربحي المتوقع</span>
                <span className="text-emerald-600 font-extrabold">+85%</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-[#C89B3C] flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">2. عمولة الجلسات (20%)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  تقتطع المنصة تلقائياً نسبة 20% من كل حجز جلسة صوتية أو مرئية بين المستفيد والمستشار المعتمد.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-bold">
                <span>متوسط سعر الجلسة</span>
                <span className="text-[#0F5C5A] font-extrabold">250 ر.س</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1A19] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">3. رعاية الشركات (B2B)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  باقات حماية جودة الحياة الأسرية لمنسوبي الشركات والجهات الحكومية كجزء من المزايا الوظيفية.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-bold">
                <span>عقود سنوية تبدأ من</span>
                <span className="text-blue-600 font-extrabold">25,000 ر.س</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PRICING TOGGLE & PLANS */}
      <div className="space-y-6 pt-4">
        
        {/* CYCLE TOGGLE */}
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center">
            اختر الباقة المناسبة لاحتياجات أسرتك
          </h2>
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                billingCycle === 'monthly'
                  ? 'bg-[#0F5C5A] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              دفع شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-[#0F5C5A] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>دفع سنوّي</span>
              <span className="px-2 py-0.5 rounded-full bg-[#C89B3C] text-slate-950 font-extrabold text-[10px]">
                خصم 25%
              </span>
            </button>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {plans.map((plan) => {
            const isCurrent = user.subscription === plan.id;
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 border transition flex flex-col justify-between shadow-sm hover:shadow-xl ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#0F5C5A] text-white font-extrabold text-[11px] shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">{plan.description}</p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 dark:text-white">
                        {price === 0 ? 'مجاناً' : `${price} ر.س`}
                      </span>
                      {price > 0 && (
                        <span className="text-xs text-slate-500 font-bold">
                          / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && price > 0 && (
                      <p className="text-[11px] text-emerald-600 font-bold mt-1">
                        توفير يصل إلى {plan.priceMonthly * 12 - plan.priceYearly} ر.س سنوياً
                      </p>
                    )}
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">المزايا المشمولة:</span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-[#0F5C5A] dark:text-[#C89B3C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80">
                  {isCurrent ? (
                    <div className="w-full py-3 rounded-2xl bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-xs flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>باقتك الحالية المفعّلة</span>
                    </div>
                  ) : plan.id === 'free' ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 font-bold text-xs cursor-not-allowed"
                    >
                      باقة مجانية افتراضية
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribeClick(plan.id)}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs transition shadow-md flex items-center justify-center gap-2 ${
                        plan.id === 'vip'
                          ? 'bg-[#C89B3C] hover:bg-[#b58a32] text-slate-950'
                          : 'bg-[#0F5C5A] hover:bg-[#157A77] text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>الاشتراك في {plan.name}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* CHECKOUT MODAL & INVOICE GENERATOR */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl">
          <div className="bg-white dark:bg-[#0B1A19] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-[#0F5C5A]">
                  <CreditCard className="w-5 h-5 text-[#0F5C5A] dark:text-[#C89B3C]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">بوابة الدفع الفوري الآمنة</h3>
                  <p className="text-[11px] text-slate-500">إتمام ترقية حسابك إلى {currentPlanObj.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsPaidSuccess(false);
                }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition"
              >
                ✕
              </button>
            </div>

            {isPaidSuccess && invoiceDetails ? (
              /* SUCCESS RECEIPT / INVOICE VIEW */
              <div className="space-y-5 text-center py-2 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">تم الدفع وتفعيل الباقة بنجاح!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    شكراً لاشتراكك في منصة ميثاق. تم إصدار الفاتورة الضريبية وحفظها في حسابك.
                  </p>
                </div>

                {/* INVOICE CARD */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-500">
                    <span>رقم الفاتورة: {invoiceDetails.invoiceNumber}</span>
                    <span>{invoiceDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">الباقة:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{invoiceDetails.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">المبلغ قبل الضريبة:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{invoiceDetails.subtotal} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">ضريبة القيمة المضافة (15%):</span>
                    <span className="font-bold text-slate-900 dark:text-white">{invoiceDetails.vat} ر.س</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-black text-[#0F5C5A] dark:text-[#C89B3C]">
                    <span>الإجمالي المدفوع:</span>
                    <span>{invoiceDetails.total} ر.س</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة الفاتورة</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsPaidSuccess(false);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-[#0F5C5A] text-white font-bold text-xs hover:bg-[#157A77] transition"
                  >
                    العودة للمنصة
                  </button>
                </div>
              </div>
            ) : (
              /* CHECKOUT PAYMENT FORM */
              <div className="space-y-4">
                
                {/* SUMMARY BOX */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">الباقة المختارة:</span>
                    <span className="font-extrabold text-[#0F5C5A] dark:text-[#C89B3C]">{currentPlanObj.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">سعر الاشتراك ({billingCycle === 'monthly' ? 'شهري' : 'سنوي'}):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{rawPrice} ر.س</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">ضريبة القيمة المضافة VAT (15%):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{vatAmount} ر.س</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                    <span className="font-black text-slate-900 dark:text-white">المبلغ الإجمالي المستحق:</span>
                    <span className="text-base font-black text-[#0F5C5A] dark:text-[#C89B3C]">{totalPrice} ر.س</span>
                  </div>
                </div>

                {/* PAYMENT METHOD SELECTOR */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">طريقة الدفع الفوري:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mada')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                        paymentMethod === 'mada'
                          ? 'border-[#0F5C5A] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5C5A] dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                      <span>مدى (Mada)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                        paymentMethod === 'applepay'
                          ? 'border-slate-900 bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Zap className="w-5 h-5 text-amber-400" />
                      <span>Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                        paymentMethod === 'card'
                          ? 'border-[#0F5C5A] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5C5A] dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span>بطاقة ائتمان</span>
                    </button>
                  </div>
                </div>

                {/* CARD FIELDS */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">اسم صاحب البطاقة</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      placeholder="كما هو مكتوب على البطاقة..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">رقم البطاقة</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 font-mono text-left dir-ltr"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">تاريخ الانتهاء</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 font-mono text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>عملية دُفع مشفرة ومحميّة بمعايير PCI-DSS السعودية</span>
                </div>

                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-[#0F5C5A] hover:bg-[#157A77] text-white font-black text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>جاري معالجة الدفع الآمن...</span>
                  ) : (
                    <>
                      <Receipt className="w-4 h-4" />
                      <span>دفع {totalPrice} ر.س وتفعيل الاشتراط فوراً</span>
                    </>
                  )}
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
