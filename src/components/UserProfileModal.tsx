import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  Moon, 
  Sun, 
  Plus, 
  X, 
  CheckCircle,
  Users
} from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileModalProps {
  user: UserType;
  onClose: () => void;
  onUpdateUser: (updatedUser: UserType) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  onClose,
  onUpdateUser,
  darkMode,
  setDarkMode
}) => {
  const [userName, setUserName] = useState(user.name);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('ابن/ابنة');
  const [members, setMembers] = useState(user.familyMembers);

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    const newM = {
      id: `mem-${Date.now()}`,
      name: newMemberName,
      relation: newMemberRelation,
      age: 10
    };
    const updated = [...members, newM];
    setMembers(updated);
    setNewMemberName('');
    onUpdateUser({ ...user, familyMembers: updated, name: userName });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0B1A19] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#C89B3C]" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{user.name}</h3>
              <span className="text-[10px] text-[#0F5C5A] dark:text-[#C89B3C] font-bold">عضوية ميثاق المجانية الشاملة (جميع الخدمات مجاناً)</span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* General Name Edit */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">اسم الحساب الكامل:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#0F5C5A]"
            />
          </div>

          {/* Family Members Management */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#C89B3C]" />
              <span>أفراد الأسرة المضافون للحساب:</span>
            </h4>

            <div className="space-y-1.5">
              {members.map((m) => (
                <div key={m.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.relation}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="اسم فرد الأسرة..."
                className="flex-1 bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"
              />
              <button
                onClick={handleAddMember}
                className="px-3 py-2 rounded-xl bg-[#0F5C5A] text-white font-bold text-xs"
              >
                إضافة
              </button>
            </div>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-700 dark:text-slate-300">مظهر التطبيق (الوضع الداكن):</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2 font-bold"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0F5C5A]" />}
              <span>{darkMode ? 'الوضع النهاري' : 'الوضع الداكن'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              onUpdateUser({ ...user, name: userName, familyMembers: members });
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition shadow-md mt-4"
          >
            حفظ التغييرات
          </button>
        </div>

      </div>
    </div>
  );
};
