import React from 'react';
import { Heart, ShieldCheck, Lock, Award, PhoneCall, Mail, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1A19] text-white pt-16 pb-8 border-t border-[#0F5C5A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F5C5A] border border-[#C89B3C]/40 text-[#C89B3C] font-black text-2xl flex items-center justify-center">
                م
              </div>
              <span className="text-2xl font-extrabold text-white tracking-wide">ميثاق</span>
            </div>
            <p className="text-[#C89B3C] text-sm font-semibold">ميثاق... حيث يبدأ التفاهم.</p>
            <p className="text-slate-300 text-xs leading-relaxed max-w-md">
              منصة رقمية متكاملة لتمكين الأسرة العربية وبناء علاقات زوجية متينة وتربية إيجابية قائمة على قيم الأصالة والمنهجية العلمية والسرية التامة.
            </p>

            {/* Compliance & Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300">
                <Lock className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>تشفير بيانات معتمد 256-bit</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>مستشارون معتمدون مرخصون</span>
              </div>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-sm font-bold text-[#C89B3C] mb-4">الخدمات الرئيسية</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#counseling" className="hover:text-white transition">حجز استشارة أسرية</a></li>
              <li><a href="#parenting" className="hover:text-white transition">دليل التربية الإيجابية</a></li>
              <li><a href="#marriage" className="hover:text-white transition">استشارات العلاقات الزوجية</a></li>
              <li><a href="#mental-health" className="hover:text-white transition">برامج الدعم النفسي</a></li>
              <li><a href="#anis" className="hover:text-white transition">المساعد الأسري الذكي (أنيس)</a></li>
              <li><a href="#tests" className="hover:text-white transition">اختبار لغات الحب الخمس</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-sm font-bold text-[#C89B3C] mb-4">الأكاديمية والمعرفة</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><a href="#courses" className="hover:text-white transition">دورات الأكاديمية والمشاريع</a></li>
              <li><a href="#audio-library" className="hover:text-white transition">المكتبة الصوتية والبودكاست</a></li>
              <li><a href="#articles" className="hover:text-white transition">مكتبة المقالات الاستشارية</a></li>
              <li><a href="#community" className="hover:text-white transition">مجتمع الأسرة الآمن</a></li>
              <li><a href="#goals" className="hover:text-white transition">تحديات الأهداف الأسرية</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-bold text-[#C89B3C] mb-4">التواصل والدعم</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#C89B3C]" />
                <span dir="ltr">+966 800 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C89B3C]" />
                <span>support@mithaq.app</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C89B3C]" />
                <span>الرياض - المملكة العربية السعودية</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[11px] text-slate-400 mb-2">حمل تطبيق ميثاق على الجوال:</p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/10 text-[10px] font-bold text-center border border-white/10 flex-1 hover:bg-white/20 cursor-pointer">
                  App Store
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/10 text-[10px] font-bold text-center border border-white/10 flex-1 hover:bg-white/20 cursor-pointer">
                  Google Play
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 منصة ميثاق الأسرية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white">سياسة الخصوصية والسرية</a>
            <a href="#terms" className="hover:text-white">الشروط والأحكام</a>
            <a href="#security" className="hover:text-white">أمان البيانات والمعلومات</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
