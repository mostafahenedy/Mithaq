import React, { useState } from 'react';
import { 
  Award, 
  Play, 
  CheckCircle, 
  Star, 
  Clock, 
  BookOpen, 
  Printer, 
  Sparkles,
  Download
} from 'lucide-react';
import { Course, User } from '../types';
import { MOCK_COURSES } from '../data/mockData';

interface AcademyModuleProps {
  user: User;
}

export const AcademyModule: React.FC<AcademyModuleProps> = ({ user }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            أكاديمية ميثاق للتدريب الأسري
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">دورات الماستر كلاس وشهادات الإنجاز</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            برامج تدريبية متكاملة مصممة من نخبة الأكاديميين والاستشاريين لتأهيل المقبلين على الزواج وتنمية مهارات الوالدية.
          </p>
        </div>
      </div>

      {!selectedCourse ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_COURSES.map((crs) => (
            <div
              key={crs.id}
              onClick={() => {
                setSelectedCourse(crs);
                setActiveLessonIdx(0);
              }}
              className="bg-white dark:bg-[#122625] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img src={crs.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 right-3 bg-[#0F5C5A] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                    {crs.categoryAr}
                  </span>
                  {crs.isFree && (
                    <span className="absolute top-3 left-3 bg-[#C89B3C] text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                      دورة مجانية
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>⏱ {crs.duration}</span>
                    <span>• {crs.lessonsCount} درس تفاعلي</span>
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{crs.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#0F5C5A] dark:group-hover:text-[#C89B3C] transition">
                    {crs.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {crs.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <img src={crs.instructorAvatar} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-[#C89B3C]" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{crs.instructorName}</h4>
                    <p className="text-[10px] text-slate-400">{crs.instructorTitle}</p>
                  </div>
                </div>

                <button className="px-4 py-2 rounded-xl bg-[#0F5C5A] text-white font-bold text-xs hover:bg-[#157A77] transition shadow-sm">
                  بدء المشاهدة
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Video Course Player View */
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] text-[#0F5C5A] dark:text-[#C89B3C] font-bold block">{selectedCourse.categoryAr}</span>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">{selectedCourse.title}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#C89B3C] text-slate-900 font-extrabold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>شهادة الإنجاز</span>
              </button>

              <button
                onClick={() => setSelectedCourse(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
              >
                رجوع
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Canvas Simulator */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center min-h-[300px] border border-slate-800 text-white">
              <div className="w-16 h-16 rounded-full bg-[#0F5C5A] text-[#C89B3C] flex items-center justify-center font-bold shadow-2xl cursor-pointer hover:scale-110 transition">
                <Play className="w-8 h-8 fill-[#C89B3C] translate-x-0.5" />
              </div>
              <p className="mt-4 font-bold text-sm">
                الدرس الحالي: {selectedCourse.lessons[activeLessonIdx]?.title || 'عرض المحتوى التدريبي'}
              </p>
              <p className="text-xs text-slate-400 mt-1">المدرب: {selectedCourse.instructorName}</p>
            </div>

            {/* Lessons List Playlist */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">قائمة دروس الدورة ({selectedCourse.lessons.length}):</h4>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {selectedCourse.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIdx(idx)}
                    className={`w-full p-3.5 rounded-2xl text-right text-xs font-bold transition flex items-center justify-between border ${
                      activeLessonIdx === idx
                        ? 'bg-[#0F5C5A] text-white border-[#0F5C5A]'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{idx + 1}</span>
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-[10px] opacity-80">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Completion Certificate Modal Preview */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8F7F3] dark:bg-[#0B1A19] rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-[#C89B3C] text-center space-y-6 relative animate-in zoom-in-95">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 left-4 p-2 rounded-xl text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#0F5C5A] text-[#C89B3C] font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                م
              </div>
              <span className="text-xs font-black text-[#0F5C5A] dark:text-[#C89B3C] tracking-widest uppercase">
                أكاديمية ميثاق للتدريب والاستشارات الأسرية
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">شهادة إنجاز واجتياز دورة</h2>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
              تشهد منصة ميثاق بأن المستفيد الكرام <strong className="text-[#0F5C5A] dark:text-[#C89B3C]">{user.name}</strong> قد أتم بنجاح متطلبات الدورة التدريبية المعتمدة:
            </p>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#122625] border border-[#C89B3C]/30 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {selectedCourse?.title || 'بناء الميثاق الزوجي والتفاهم المستدام'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">بواقع {selectedCourse?.duration || '4 ساعات'} تدريبية معتمدة</p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button onClick={() => window.print()} className="px-6 py-2.5 rounded-2xl bg-[#0F5C5A] text-white text-xs font-bold flex items-center gap-2">
                <Printer className="w-4 h-4 text-[#C89B3C]" />
                <span>طباعة الشهادة الرسمية</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
