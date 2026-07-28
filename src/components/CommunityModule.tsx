import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  Send, 
  Lock, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';
import { CommunityPost, User } from '../types';
import { MOCK_COMMUNITY_POSTS } from '../data/mockData';

interface CommunityModuleProps {
  user: User;
}

export const CommunityModule: React.FC<CommunityModuleProps> = ({ user }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [newPostOpen, setNewPostOpen] = useState(false);
  
  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('حديث الأمومة وتربية الأبناء');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleCreatePost = () => {
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: isAnonymous ? 'عضو ميثاق (مجهول)' : user.name,
      isAnonymous,
      authorAvatar: isAnonymous ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : user.avatar,
      category: postCategory,
      title: postTitle,
      content: postContent,
      timeAgo: 'الآن',
      likes: 1,
      commentsCount: 0,
      hasExpertAnswer: false
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setNewPostOpen(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            مجتمع ميثاق الآمن والمشفر
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">مساحة التبادل الأخوي والخبرات الأسرية</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            طرح الاستفسارات بخصوصية وتخفي تام أو باسمك، والحصول على إجابات معتمدة من استشاريي المنصة وتجارب العائلات.
          </p>
        </div>

        <button
          onClick={() => setNewPostOpen(true)}
          className="px-6 py-3 rounded-2xl bg-[#C89B3C] text-slate-900 font-extrabold text-xs hover:bg-[#E5BE6A] transition shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سؤال أو تجربة</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-[#122625] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] font-black text-sm flex items-center justify-center">
                  {p.isAnonymous ? <Lock className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{p.authorName}</h4>
                  <span className="text-[10px] text-slate-400">{p.timeAgo} • {p.category}</span>
                </div>
              </div>

              {p.hasExpertAnswer && (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>تم الرد بواسطة خبير ميثاق</span>
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{p.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{p.content}</p>
            </div>

            {/* Expert Verified Answer Card if present */}
            {p.hasExpertAnswer && p.expertAnswer && (
              <div className="p-4 rounded-2xl bg-[#0F5C5A]/5 dark:bg-white/5 border border-[#0F5C5A]/20 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <img src={p.expertAnswer.consultantAvatar} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C89B3C]" />
                  <div>
                    <h5 className="font-bold text-[#0F5C5A] dark:text-[#C89B3C]">{p.expertAnswer.consultantName}</h5>
                    <p className="text-[10px] text-slate-400">{p.expertAnswer.consultantTitle}</p>
                  </div>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium pt-1">
                  {p.expertAnswer.answer}
                </p>
              </div>
            )}

            {/* Card Footer Interaction */}
            <div className="pt-3 flex items-center gap-4 text-xs text-slate-400 font-semibold">
              <button className="flex items-center gap-1 hover:text-rose-500 transition">
                <Heart className="w-4 h-4" />
                <span>{p.likes} إعجاب</span>
              </button>
              <button className="flex items-center gap-1 hover:text-[#0F5C5A] transition">
                <MessageSquare className="w-4 h-4" />
                <span>{p.commentsCount} تعليق مشارك</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {newPostOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1A19] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">طرح سؤال أو استشارة في المجتمع</h3>
              <button onClick={() => setNewPostOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">عنوان الاستفسار:</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="اكتب عنواناً واضحاً ومختصراً..."
                  className="w-full bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-[#0F5C5A]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">التفاصيل والأبعاد:</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="اشرح المشكلة أو السؤال بشفافية..."
                  className="w-full bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-[#0F5C5A] h-28"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 accent-[#0F5C5A] rounded"
                  />
                  <span className="font-bold text-slate-700 dark:text-slate-300">النشر في وضع التخفي السرّي (مجهول)</span>
                </label>
              </div>

              <button
                onClick={handleCreatePost}
                className="w-full py-3.5 rounded-2xl bg-[#0F5C5A] text-white font-extrabold text-xs hover:bg-[#157A77] transition shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4 text-[#C89B3C] rotate-180" />
                <span>نشر الاستفسار الآن</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
