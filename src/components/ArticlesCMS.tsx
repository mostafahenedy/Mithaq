import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Heart, 
  Share2, 
  Clock, 
  User, 
  ArrowLeft, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Article } from '../types';
import { MOCK_ARTICLES } from '../data/mockData';

export const ArticlesCMS: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(['art-1']);

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = art.title.includes(searchQuery) || art.summary.includes(searchQuery) || art.authorName.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id: string) => {
    if (likedArticles.includes(id)) {
      setLikedArticles(likedArticles.filter(a => a !== id));
    } else {
      setLikedArticles([...likedArticles, id]);
    }
  };

  const toggleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(bookmarkedArticles.filter(a => a !== id));
    } else {
      setBookmarkedArticles([...bookmarkedArticles, id]);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0F5C5A] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-[11px] bg-[#C89B3C] text-slate-900 font-extrabold px-3 py-1 rounded-full">
            المكتبة والمحتوى الاستشاري
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">مقالات أسرية وتربوية بقلم كبار الخبراء</h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            محتوى موثق ورؤى علمية رصينة تغطي التفاهم الزوجي، تربية الأبناء، التعامل مع المراهقين، والرعاية النفسية.
          </p>
        </div>
      </div>

      {!selectedArticle ? (
        <div className="space-y-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في عنوان المقال أو اسم الكاتب..."
                className="w-full bg-white dark:bg-[#122625] text-slate-900 dark:text-white pr-10 pl-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:border-[#0F5C5A]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
              {[
                { id: 'all', label: 'جميع المقالات' },
                { id: 'marriage', label: 'الحياة الزوجية' },
                { id: 'parenting', label: 'تربية الأبناء' },
                { id: 'teenagers', label: 'المراهقون' },
                { id: 'mental-health', label: 'الصحة النفسية' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#0F5C5A] text-white shadow-sm'
                      : 'bg-white dark:bg-[#122625] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#0F5C5A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="bg-white dark:bg-[#122625] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-[#0F5C5A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {art.categoryAr}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                      <span>• {art.publishedDate}</span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-[#0F5C5A] dark:group-hover:text-[#C89B3C] transition leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Article Card Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <img src={art.authorAvatar} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C89B3C]" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{art.authorName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(art.id);
                      }}
                      className="p-1.5 hover:text-rose-500 transition"
                    >
                      <Heart className={`w-4 h-4 ${likedArticles.includes(art.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(art.id);
                      }}
                      className="p-1.5 hover:text-[#C89B3C] transition"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedArticles.includes(art.id) ? 'fill-[#C89B3C] text-[#C89B3C]' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Full Article Detail Reader View */
        <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-3xl mx-auto animate-in fade-in">
          
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-xs font-bold text-[#0F5C5A] dark:text-[#C89B3C] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>العودة إلى جميع المقالات</span>
          </button>

          <div className="space-y-4">
            <span className="text-xs bg-[#0F5C5A]/10 text-[#0F5C5A] font-extrabold px-3 py-1 rounded-full">
              {selectedArticle.categoryAr}
            </span>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <img src={selectedArticle.authorAvatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C89B3C]" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{selectedArticle.authorName}</h4>
                  <p className="text-[11px] text-slate-400">{selectedArticle.authorTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button onClick={() => toggleLike(selectedArticle.id)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-rose-500">
                  <Heart className={`w-4 h-4 ${likedArticles.includes(selectedArticle.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
                <button onClick={() => toggleBookmark(selectedArticle.id)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-[#C89B3C]">
                  <Bookmark className={`w-4 h-4 ${bookmarkedArticles.includes(selectedArticle.id) ? 'fill-[#C89B3C] text-[#C89B3C]' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <img src={selectedArticle.imageUrl} alt="" className="w-full h-64 sm:h-80 rounded-2xl object-cover" />

          {/* Body Content */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-4 whitespace-pre-line">
            {selectedArticle.content}
          </div>

        </div>
      )}

    </div>
  );
};
