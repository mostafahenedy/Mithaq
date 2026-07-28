import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Phone, 
  MessageSquare, 
  Zap, 
  Star, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  X, 
  CheckCircle, 
  User, 
  Mic, 
  MicOff, 
  Volume2,
  VolumeX,
  Share2, 
  FileText,
  Search,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { Consultant, Appointment, User as UserType } from '../types';
import { MOCK_CONSULTANTS, MOCK_APPOINTMENTS } from '../data/mockData';

interface CounselingModuleProps {
  user: UserType;
}

export const CounselingModule: React.FC<CounselingModuleProps> = ({ user }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingConsultant, setBookingConsultant] = useState<Consultant | null>(null);
  
  // Booking Form State
  const [selectedFormat, setSelectedFormat] = useState<'voice' | 'text' | 'emergency'>('voice');
  const [selectedDate, setSelectedDate] = useState('2026-07-29');
  const [selectedTime, setSelectedTime] = useState('07:00 م');
  const [bookingNotes, setBookingNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple' | 'stc' | 'card'>('mada');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Live Session Room Simulator State
  const [activeLiveSession, setActiveLiveSession] = useState<Appointment | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [liveChatInput, setLiveChatInput] = useState('');
  const [liveChatMessages, setLiveChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'أ. روض', text: 'أهلاً بك في الجلسة الاستشارية الخاصة بميثاق. أود أن أسمع منك أولاً كيف تشعر اليوم؟', time: '07:00 م' }
  ]);

  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  const filteredConsultants = MOCK_CONSULTANTS.filter(c => {
    const matchesSpecialty = selectedSpecialty === 'all' || c.specialty === selectedSpecialty;
    const matchesSearch = c.name.includes(searchQuery) || c.specialtyAr.includes(searchQuery) || c.bio.includes(searchQuery);
    return matchesSpecialty && matchesSearch;
  });

  const handleConfirmBooking = () => {
    if (!bookingConsultant) return;

    const newApp: Appointment = {
      id: `app-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      consultantId: bookingConsultant.id,
      consultantName: bookingConsultant.name,
      consultantAvatar: bookingConsultant.avatar,
      consultantTitle: bookingConsultant.title,
      specialtyAr: bookingConsultant.specialtyAr,
      date: selectedDate,
      timeSlot: selectedTime,
      format: selectedFormat,
      status: 'scheduled',
      price: bookingConsultant.sessionPrice,
      notes: bookingNotes || 'حجز استشارة جديدة عبر منصة ميثاق',
      meetingLink: `https://mithaq.app/meet/live-session-${Date.now()}`
    };

    setAppointmentsList([newApp, ...appointmentsList]);
    setIsBookingSuccess(true);
    setTimeout(() => {
      setIsBookingSuccess(false);
      setBookingConsultant(null);
    }, 2500);
  };

  const handleSendLiveMessage = () => {
    if (!liveChatInput.trim()) return;
    const newMsg = {
      sender: user.name,
      text: liveChatInput,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };
    setLiveChatMessages([...liveChatMessages, newMsg]);
    setLiveChatInput('');

    // Simulate response from consultant after 2 seconds
    setTimeout(() => {
      setLiveChatMessages(prev => [
        ...prev,
        {
          sender: activeLiveSession?.consultantName || 'الاستشاري',
          text: 'فهمت وجهة نظرك تماماً. لنتحدث عن خطوة عملية نطبقها بدءاً من الغد.',
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-[#0F5C5A] to-[#157A77] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#C89B3C] text-slate-900 px-3 py-1 rounded-full font-extrabold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>سرية تامة ومستشارون معتمدون</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">الاستشارات الأسرية والزوجية ونخبة الخبراء</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            احجز جلساتك الفردية والزوجية عبر المكالمات الصوتية والمحادثات النصية السرية والاستشارات الطارئة مع أفضل استشاريي المملكة والوطن العربي لبناء بيت أكثر استقراراً وسكينة.
          </p>
        </div>
      </div>

      {/* Scheduled Upcoming Appointments Bar */}
      {appointmentsList.length > 0 && (
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#0F5C5A] dark:text-[#C89B3C] flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>مواعيدك الاستشارية القادمة ({appointmentsList.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointmentsList.map((app) => (
              <div key={app.id} className="p-4 rounded-2xl bg-[#0F5C5A]/5 dark:bg-white/5 border border-[#0F5C5A]/15 flex flex-col justify-between space-y-3">
                <div className="flex items-start gap-3">
                  <img src={app.consultantAvatar} alt={app.consultantName} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#C89B3C]" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{app.consultantName}</h4>
                    <p className="text-xs text-[#0F5C5A] dark:text-[#C89B3C] font-semibold">{app.consultantTitle}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{app.date} • الساعة {app.timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {app.format === 'voice' ? 'مكالمة صوتية مباشرة' : app.format === 'text' ? 'محادثة كتابية' : 'استشارة طارئة'}
                  </span>

                  <button
                    onClick={() => setActiveLiveSession(app)}
                    className="px-4 py-1.5 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold hover:bg-[#157A77] transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>دخول القاعة الصوتية</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specialty Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الاستشاري أو التخصص..."
              className="w-full bg-white dark:bg-[#122625] text-slate-900 dark:text-white pr-10 pl-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-[#0F5C5A]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {[
              { id: 'all', label: 'جميع الخبراء' },
              { id: 'marriage', label: 'استشارات زوجية' },
              { id: 'parenting', label: 'تربية الأبناء' },
              { id: 'teenagers', label: 'المراهقون' },
              { id: 'psychology', label: 'الصحة النفسية' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSpecialty(tab.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                  selectedSpecialty === tab.id
                    ? 'bg-[#0F5C5A] text-white shadow-sm'
                    : 'bg-white dark:bg-[#122625] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#0F5C5A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Consultant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredConsultants.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#C89B3C]/50" />
                    {c.isVerified && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0F5C5A] text-white flex items-center justify-center text-[10px]" title="مستشار موثق">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{c.name}</h3>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{c.rating}</span>
                        <span className="text-slate-400 font-normal">({c.reviewsCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#0F5C5A] dark:text-[#C89B3C] font-semibold mt-0.5">{c.title}</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">خبرة {c.yearsExperience} عاماً • {c.totalConsultations}+ استشارة ناجحة</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl">
                  {c.bio}
                </p>

                {/* Available Formats */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-400">وسائل الاستشارة:</span>
                  <div className="flex gap-1.5">
                    {c.availableFormats.includes('voice') && <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg text-[10px] font-bold flex items-center gap-1"><Phone className="w-3 h-3" /> مكالمة صوتية</span>}
                    {c.availableFormats.includes('text') && <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg text-[10px] font-bold flex items-center gap-1"><MessageSquare className="w-3 h-3" /> كتابية</span>}
                    {c.availableFormats.includes('emergency') && <span className="p-1.5 bg-rose-100 text-rose-800 rounded-lg text-[10px] font-bold flex items-center gap-1"><Zap className="w-3 h-3" /> طارئة</span>}
                  </div>
                </div>
              </div>

              {/* Card Footer Price & Action */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">تكلفة الجلسة:</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xs font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">مجاناً 100%</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingConsultant(c)}
                  className="px-5 py-2.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition shadow-md flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C89B3C]" />
                  <span>حجز موعد الاستشارة</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {bookingConsultant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1A19] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={bookingConsultant.avatar} alt="" className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#C89B3C]" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">حجز استشارة مع {bookingConsultant.name}</h3>
                  <p className="text-xs text-[#0F5C5A] dark:text-[#C89B3C] font-semibold">{bookingConsultant.specialtyAr}</p>
                </div>
              </div>

              <button onClick={() => setBookingConsultant(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isBookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">تم حجز الموعد بنجاح!</h4>
                <p className="text-xs text-slate-500">تم إرسال تفاصيل الموعد ورابط الجلسة المباشرة إلى حسابك والبريد الإلكتروني.</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                
                {/* 1. Format Selection */}
                <div>
                  <label className="font-bold text-slate-900 dark:text-white block mb-2">1. اختر نوع الجلسة الاستشارية:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'voice', label: 'مكالمة صوتية حية', icon: Phone },
                      { id: 'text', label: 'محادثة كتابية سرية', icon: MessageSquare },
                      { id: 'emergency', label: 'استشارة طارئة فورا', icon: Zap }
                    ].map(f => {
                      const Icon = f.icon;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFormat(f.id as any)}
                          className={`p-3 rounded-2xl border font-bold flex items-center gap-2 transition ${
                            selectedFormat === f.id
                              ? 'border-[#0F5C5A] bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C]'
                              : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#C89B3C]" />
                          <span>{f.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Choose Time Slot */}
                <div>
                  <label className="font-bold text-slate-900 dark:text-white block mb-2">2. اختر التاريخ والتوقيت المناسب:</label>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {bookingConsultant.timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(slot)}
                        className={`px-4 py-2 rounded-xl border text-xs font-bold whitespace-nowrap transition ${
                          selectedTime === slot
                            ? 'bg-[#0F5C5A] text-white border-[#0F5C5A]'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Notes */}
                <div>
                  <label className="font-bold text-slate-900 dark:text-white block mb-1">3. ملخص القضية أو الاستفسار (اختياري وسري):</label>
                  <textarea
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="اكتب باختصار الموضوع الذي تود مناقشته مع الاستشاري..."
                    className="w-full bg-slate-50 dark:bg-[#122625] p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0F5C5A] h-20"
                  />
                </div>

                {/* 4. Free Service Banner */}
                <div>
                  <label className="font-bold text-slate-900 dark:text-white block mb-1.5">4. التكلفة والخدمة:</label>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold flex items-center justify-between">
                    <span>خدمة استشارية مجانية بالكامل</span>
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[11px] font-black">مجاناً 100%</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-sm hover:bg-[#157A77] transition shadow-lg mt-4 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-[#C89B3C]" />
                  <span>تأكيد الحجز الفوري (مجاناً)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Video Consultation Room Simulator Modal */}
      {activeLiveSession && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-4 sm:p-6 text-white animate-in fade-in">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-extrabold text-sm sm:text-base">القاعة الصوتية الاستشارية المغلقة - ميثاق</h3>
              <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Headphones className="w-3 h-3" />
                مكالمة صوتية مشفّرة
              </span>
            </div>

            <button
              onClick={() => setActiveLiveSession(null)}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold transition"
            >
              مغادرة القاعة
            </button>
          </div>

          {/* Main Content Audio Call Screen */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 overflow-hidden">
            
            {/* Consultant Audio Call Screen */}
            <div className="lg:col-span-2 bg-[#0B1A19] rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border border-white/10 shadow-2xl min-h-[300px] p-6 text-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#C89B3C]/20 animate-ping"></div>
                <img
                  src={activeLiveSession.consultantAvatar}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-[#C89B3C] relative z-10 shadow-xl"
                />
              </div>
              
              <h3 className="mt-6 font-extrabold text-xl text-white">{activeLiveSession.consultantName}</h3>
              <p className="text-xs text-[#C89B3C] font-bold mt-1">{activeLiveSession.consultantTitle}</p>
              
              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-white/10 rounded-full text-[11px] text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>المكالمة الصوتية متصلة وآمنة 100%</span>
              </div>

              {/* Overlay Audio Call Controls */}
              <div className="mt-8 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? 'إلغاء كتم المايك' : 'كتم المايك'}
                  className={`p-3.5 rounded-2xl transition flex items-center gap-2 font-bold text-xs ${isMuted ? 'bg-rose-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isMuted ? 'مكتوم' : 'الميكروفون'}</span>
                </button>

                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  title={isSpeakerOn ? 'إيقاف مكبر الصوت' : 'تشغيل مكبر الصوت'}
                  className={`p-3.5 rounded-2xl transition flex items-center gap-2 font-bold text-xs ${!isSpeakerOn ? 'bg-amber-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                >
                  {!isSpeakerOn ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  <span>{isSpeakerOn ? 'السماعة' : 'مكتوم'}</span>
                </button>

                <button 
                  onClick={() => setActiveLiveSession(null)}
                  className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 transition text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-5 h-5 rotate-[135deg]" />
                  <span>إنهاء المكالمة</span>
                </button>
              </div>
            </div>

            {/* Live Session Chat & Consultant Case Notes */}
            <div className="bg-[#122625] rounded-3xl p-4 border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#C89B3C] pb-3 border-b border-white/10 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>المحادثة المباشرة والملاحظات الجانبية</span>
                </h4>

                <div className="space-y-3 my-4 max-h-[350px] overflow-y-auto">
                  {liveChatMessages.map((msg, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/5 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-[#C89B3C] mb-1 font-bold">
                        <span>{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendLiveMessage();
                }}
                className="flex items-center gap-2 pt-2 border-t border-white/10"
              >
                <input
                  type="text"
                  value={liveChatInput}
                  onChange={(e) => setLiveChatInput(e.target.value)}
                  placeholder="ارسل ملاحظة للاستشاري أثناء الجلسة..."
                  className="flex-1 bg-white/10 text-white px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-[#C89B3C] border border-transparent"
                />
                <button type="submit" className="px-3 py-2 bg-[#C89B3C] text-slate-900 rounded-xl text-xs font-bold">
                  إرسال
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
