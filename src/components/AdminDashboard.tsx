import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  ShieldAlert, 
  Activity, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  FileText, 
  Server,
  Sparkles
} from 'lucide-react';
import { MOCK_CONSULTANTS } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [pendingConsultants, setPendingConsultants] = useState([
    { id: 'p1', name: 'أ. سارة الدوسري', title: 'ماجستير عالي في الإرشاد النفسي والأسري', status: 'pending' },
    { id: 'p2', name: 'أ. فيصل القحطاني', title: 'ماجستير التوجيه والتربية الإيجابية', status: 'pending' }
  ]);

  const handleApprove = (id: string) => {
    setPendingConsultants(pendingConsultants.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Admin Header */}
      <div className="bg-[#0B1A19] text-white rounded-3xl p-6 sm:p-8 border border-[#C89B3C]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black">لوحة الإدارة التنفيذية والعمليات - ميثاق</h2>
            <span className="text-[10px] bg-emerald-500 text-slate-900 font-extrabold px-2.5 py-0.5 rounded-full">
              SaaS Admin
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">مراقبة الأداء الشامل، الاشتراكات، واعتماد المستشارين الجدد.</p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
          <Server className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>حالة السيرفرات: متصلة ومليون مشاور/ثانية</span>
        </div>
      </div>

      {/* Enterprise Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>إجمالي المشتركين النشطين</span>
            <Users className="w-4 h-4 text-[#0F5C5A]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">124,850</h3>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +14% هذا الشهر</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>إجمالي الإيرادات الشهرية</span>
            <DollarSign className="w-4 h-4 text-[#C89B3C]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">1,840,200 <span className="text-xs font-bold text-slate-400">رس</span></h3>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +22% مقارنة بالربع السابق</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>الاستشارات المنفذة</span>
            <Activity className="w-4 h-4 text-[#0F5C5A]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">48,920</h3>
          <span className="text-[10px] text-slate-400">نسبة الرضا 99.2%</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>استفسارات الذكاء الاصطناعي (أنيس)</span>
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">312,400</h3>
          <span className="text-[10px] text-[#0F5C5A] font-bold">استجابة فائقة السرعة</span>
        </div>

      </div>

      {/* Consultant Applications Approval Queue */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">طلبات انضمام المستشارين الجدد قيد التدقيق:</h3>
        
        {pendingConsultants.length > 0 ? (
          <div className="space-y-3">
            {pendingConsultants.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-400">{p.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="px-4 py-2 rounded-xl bg-[#0F5C5A] text-white text-xs font-bold hover:bg-[#157A77] transition"
                  >
                    اعتماد حسابه
                  </button>
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="px-4 py-2 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-200 transition"
                  >
                    رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">لا يوجد طلبات انضمام معلقة حالياً.</p>
        )}
      </div>

    </div>
  );
};
