import React, { useState } from 'react';
import { Users, Plus, Sparkles, BookOpen, Heart, Brain, CheckCircle2, User, Activity } from 'lucide-react';
import { MOCK_CHILD_PROFILES } from '../data/mockData';
import { ChildProfile } from '../types';

export function ChildProfileModule() {
  const [children, setChildren] = useState<ChildProfile[]>(MOCK_CHILD_PROFILES);
  const [activeChildId, setActiveChildId] = useState<string>(children[0]?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(8);
  const [newStage, setNewStage] = useState('الابتدائية');
  const [newTraits, setNewTraits] = useState('ذكي، كثير الحركة');
  const [newChallenges, setNewChallenges] = useState('عناد بسيط عند التلفاز');

  const activeChild = children.find(c => c.id === activeChildId) || children[0];

  const handleAddChild = () => {
    if (!newName.trim()) return;
    const newChild: ChildProfile = {
      id: 'ch-' + Date.now(),
      name: newName,
      age: Number(newAge),
      gender: 'boy',
      schoolStage: newStage,
      traits: newTraits.split('،').map(t => t.trim()),
      habits: ['القراءة اليومية', 'الأنشطة الحركية'],
      strengths: ['الاستجابة للثناء والتقدير'],
      challenges: newChallenges.split('،').map(c => c.trim()),
      notes: 'تم إنشاء الملف لمتابعة التطور التربوي مع أنيس.'
    };

    setChildren([...children, newChild]);
    setActiveChildId(newChild.id);
    setShowAddModal(false);
    setNewName('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-bold backdrop-blur-md">
          <Users className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>ملف نمو الأبناء المخصص</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          ملف الأطفال والتربية الذكية 👶
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl font-medium">
          متابعة السلوك، المراحل العمرية، ونقاط القوة لدى أطفالك. يقدم أنيس نصائح تربوية دقيقة ومخصصة لشخصية كل طفل.
        </p>
      </div>

      {/* Children Tabs & Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#122625] p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setActiveChildId(child.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                activeChildId === child.id
                  ? 'bg-[#0F5C5A] text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>{child.name} ({child.age} سنة)</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold text-xs hover:bg-emerald-200 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة طفل جديد</span>
        </button>
      </div>

      {/* Selected Child Profile Overview */}
      {activeChild && (
        <div className="space-y-6">
          
          {/* Main Info Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] font-black text-2xl flex items-center justify-center">
                  {activeChild.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">{activeChild.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{activeChild.schoolStage} • {activeChild.age} سنوات</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                <span>خطة المتابعة التربوية نشطة مع أنيس</span>
              </div>
            </div>

            {/* Traits, Strengths, Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Traits */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-extrabold text-[#0F5C5A] dark:text-[#C89B3C]">سمات الشخصية</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeChild.traits.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">نقاط القوة والإبداع</span>
                <ul className="space-y-1">
                  {activeChild.strengths.map((s, i) => (
                    <li key={i} className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <span className="text-xs font-extrabold text-amber-800 dark:text-amber-400">تحديات سلوكية نطورها</span>
                <ul className="space-y-1">
                  {activeChild.challenges.map((c, i) => (
                    <li key={i} className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* AI Tailored Guidance for this child */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F5C5A]/10 via-[#0F5C5A]/5 to-transparent border border-[#0F5C5A]/20 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0F5C5A] text-[#C89B3C] font-black text-sm flex items-center justify-center">
                أ
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                توجيهات أنيس الخاصة بالطفل/ة ({activeChild.name})
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              بناءً على سمات {activeChild.name} في مرحلة ({activeChild.schoolStage})، يُوصى بالاعتماد على أسلوب "الحزم الدافئ". إعطاء خيارات محددة بدلاً من الأوامر المباشرة يقلل مقاومة العناد بنسبة 70%.
            </p>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-[#0F5C5A] dark:text-[#C89B3C] block">تمرين التشجيع الأسبوعي:</span>
              <p className="text-slate-600 dark:text-slate-300">
                خصص 5 دقائق يومياً للحديث عن مهارة أتقنها اليوم وافخر به أمامه بصوت واضح.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Add Child Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#122625] p-6 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <h3 className="font-black text-base text-slate-900 dark:text-white">إضافة ملف طفل جديد</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">اسم الطفل:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: خالد"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">العمر (سنوات):</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">المرحلة الدراسية:</label>
                  <input
                    type="text"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">أبرز السمات السلوكية (مفصولة بفواصل):</label>
                <input
                  type="text"
                  value={newTraits}
                  onChange={(e) => setNewTraits(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddChild}
                className="flex-1 py-2.5 rounded-xl bg-[#0F5C5A] text-white font-bold text-xs hover:bg-[#157A77]"
              >
                إضافة الملف
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
