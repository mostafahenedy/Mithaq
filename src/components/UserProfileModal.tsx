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
  Users,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Check
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

  // Notification Preferences State
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifySessions, setNotifySessions] = useState(true);
  const [notifyEmergency, setNotifyEmergency] = useState(true);
  
  const [notificationEmail, setNotificationEmail] = useState(user.email || 'user@mithaq.sa');
  const [notificationPhone, setNotificationPhone] = useState('+966 50 123 4567');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

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

  const handleSave = () => {
    onUpdateUser({ ...user, name: userName, email: notificationEmail, familyMembers: members });
    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl">
      <div className="bg-white dark:bg-[#0B1A19] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#C89B3C]" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{user.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-[#0F5C5A] dark:text-[#C89B3C] font-extrabold">
                  {user.subscription === 'vip' ? 'باقة السكينة الشاملة (VIP)' : user.subscription === 'plus' ? 'اشتراك أنيس الذهبي الأسري' : 'الباقة المجانية الأساسية'}
                </span>
              </div>
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

          {/* NOTIFICATION PREFERENCES SECTION */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#C89B3C]" />
                <span>إعدادات وقنوات استقبال التنبيهات (Notification Channels)</span>
              </h4>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              تحديد الوسائل والحسابات التي يفضل المستشار والمستفيد استقبال إشعارات الاستشارات المباشرة وطوارئ الحجز عبرها.
            </p>

            {/* Notification Channels Toggles */}
            <div className="space-y-2 bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              
              {/* In-App Alerts */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-[#0F5C5A] dark:text-[#C89B3C]" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">إشعارات التطبيق والموقع المباشرة</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyInApp}
                  onChange={(e) => setNotifyInApp(e.target.checked)}
                  className="w-4 h-4 accent-[#0F5C5A] cursor-pointer"
                />
              </div>

              {/* Email Alerts */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">البريد الإلكتروني الرسمي</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="w-4 h-4 accent-[#0F5C5A] cursor-pointer"
                  />
                </div>
                {notifyEmail && (
                  <input
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="البريد لاستقبال التنبيهات..."
                    className="w-full bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200"
                  />
                )}
              </div>

              {/* SMS / WhatsApp Alerts */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">رسائل الواتساب والـ SMS الفورية</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifySms}
                    onChange={(e) => setNotifySms(e.target.checked)}
                    className="w-4 h-4 accent-[#0F5C5A] cursor-pointer"
                  />
                </div>
                {notifySms && (
                  <input
                    type="text"
                    value={notificationPhone}
                    onChange={(e) => setNotificationPhone(e.target.value)}
                    placeholder="رقم الهاتف لاستقبال الرسائل..."
                    className="w-full bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200"
                  />
                )}
              </div>

            </div>

            {/* Notification Topics */}
            <div className="space-y-1.5 pt-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] block">أنواع التنبيهات المفعّلة:</span>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 cursor-pointer text-[11px] font-bold">
                  <input
                    type="checkbox"
                    checked={notifySessions}
                    onChange={(e) => setNotifySessions(e.target.checked)}
                    className="accent-[#0F5C5A]"
                  />
                  <span>حجوزات الاستشارات</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 cursor-pointer text-[11px] font-bold">
                  <input
                    type="checkbox"
                    checked={notifyEmergency}
                    onChange={(e) => setNotifyEmergency(e.target.checked)}
                    className="accent-[#0F5C5A]"
                  />
                  <span>اتصالات الطوارئ العاجلة</span>
                </label>
              </div>
            </div>

          </div>

          {/* Family Members Management */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
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

          {isSavedAlert && (
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>تم حفظ إعدادات الحساب والتنبيهات بنجاح!</span>
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition shadow-md mt-4"
          >
            حفظ التغييرات
          </button>
        </div>

      </div>
    </div>
  );
};

