import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Video, 
  Clock, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Star,
  MessageSquare
} from 'lucide-react';
import { MOCK_APPOINTMENTS, MOCK_CONSULTANTS } from '../data/mockData';

export const ConsultantPanel: React.FC = () => {
  const currentConsultant = MOCK_CONSULTANTS[0]; // Dr. Abdullah Al-Otaibi
  const [activeTab, setActiveTab] = useState<'appointments' | 'notes' | 'earnings'>('appointments');
  const [caseNotes, setCaseNotes] = useState([
    { id: '1', client: 'سارة أ.', date: '2026-07-25', note: 'الجلسة الثانية: تحسن واضح في فهم التواصل واستعمال حوار العبارات الإيجابية.' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedClient, setSelectedClient] = useState('سارة أ.');

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    setCaseNotes([
      { id: Date.now().toString(), client: selectedClient, date: '2026-07-26', note: newNoteText },
      ...caseNotes
    ]);
    setNewNoteText('');
  };

  return (
    <div className="space-y-8">
      
      {/* Consultant Header Bar */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={currentConsultant.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#C89B3C]" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold">{currentConsultant.name}</h2>
              <span className="text-[10px] bg-[#C89B3C] text-slate-900 font-extrabold px-2.5 py-0.5 rounded-full">
                مستشار معتمد
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-0.5">{currentConsultant.title}</p>
            <p className="text-[11px] text-[#C89B3C] mt-1 font-bold">تقييم 4.9 ★ • {currentConsultant.totalConsultations} استشارة</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-emerald-200 block">أرباح الشهر الحالي:</span>
            <span className="text-lg font-black text-[#C89B3C]">14,250 رس</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'appointments', label: 'المواعيد والجلسات القادمة', icon: Calendar },
          { id: 'notes', label: 'الملاحظات والسجلات الطبية الأسرية', icon: FileText },
          { id: 'earnings', label: 'التقارير المالية والأرباح', icon: DollarSign }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === t.id
                  ? 'bg-[#0F5C5A] text-white shadow-sm'
                  : 'bg-white dark:bg-[#122625] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 text-[#C89B3C]" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Appointments List View */}
      {activeTab === 'appointments' && (
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">جدول المواعيد المحجوزة لليوم والغد</h3>
          <div className="space-y-3">
            {MOCK_APPOINTMENTS.map((app) => (
              <div key={app.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F5C5A]/10 text-[#0F5C5A] font-bold flex items-center justify-center text-sm">
                    {app.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{app.userName}</h4>
                    <p className="text-[11px] text-slate-400">{app.date} • الساعة {app.timeSlot} • {app.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <Video className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>بدء القاعة المباشرة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case Notes View */}
      {activeTab === 'notes' && (
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">تدوين ملاحظة سريعة في ملف المستفيد:</h3>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="اكتب التوصيات والملاحظات السريرية السرية..."
              className="w-full bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0F5C5A] h-24"
            />
            <button
              onClick={handleAddNote}
              className="px-5 py-2.5 rounded-2xl bg-[#0F5C5A] text-white font-bold text-xs hover:bg-[#157A77] transition"
            >
              حفظ الملاحظة السرية
            </button>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">سجل الملاحظات السابقة:</h4>
            {caseNotes.map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between font-bold text-[#0F5C5A] dark:text-[#C89B3C] mb-1">
                  <span>المستفيد: {n.client}</span>
                  <span>{n.date}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earnings View */}
      {activeTab === 'earnings' && (
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">سجل العوائد والتحويلات البنكية</h3>
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs space-y-2">
            <p className="font-bold text-emerald-800 dark:text-emerald-300">تم تحويل مبلغ 12,800 رس لحسابك في مصرف الراجحي بتاريخ 2026-07-01.</p>
            <p className="text-slate-500">الحوالة القادمة المستحقة: 14,250 رس بتاريخ 2026-08-01.</p>
          </div>
        </div>
      )}

    </div>
  );
};
