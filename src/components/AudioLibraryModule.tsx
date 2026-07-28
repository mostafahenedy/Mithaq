import React, { useState, useRef, useEffect } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  Bookmark, 
  Share2, 
  Clock, 
  Radio, 
  Upload, 
  Sparkles, 
  X, 
  CheckCircle2, 
  MessageCircle,
  FileAudio,
  UserCheck
} from 'lucide-react';
import { PodcastEpisode } from '../types';
import { MOCK_PODCASTS, MOCK_CONSULTANTS } from '../data/mockData';

export const AudioLibraryModule: React.FC = () => {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(MOCK_PODCASTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHost, setSelectedHost] = useState<string>('all');
  
  // Audio Player State
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(MOCK_PODCASTS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.9);
  const [savedEpisodes, setSavedEpisodes] = useState<string[]>(['pod-1']);

  // Modal State for adding new episodes
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'counseling' | 'stories' | 'disputes'>('counseling');
  const [newHostName, setNewHostName] = useState<string>('أ. روض');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newAudioUrl, setNewAudioUrl] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filter logic
  const filteredEpisodes = episodes.filter(ep => {
    const matchesCategory = selectedCategory === 'all' || ep.category === selectedCategory;
    const matchesHost = selectedHost === 'all' || ep.hostName === selectedHost;
    return matchesCategory && matchesHost;
  });

  // Handle Play/Pause
  const togglePlay = (ep?: PodcastEpisode) => {
    if (ep && ep.id !== currentEpisode.id) {
      setCurrentEpisode(ep);
      setIsPlaying(true);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        duration || 9999
      );
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const toggleSave = (id: string) => {
    if (savedEpisodes.includes(id)) {
      setSavedEpisodes(savedEpisodes.filter(item => item !== id));
    } else {
      setSavedEpisodes([...savedEpisodes, id]);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Create Object URL for client-side local playback
      const objectUrl = URL.createObjectURL(file);
      setNewAudioUrl(objectUrl);
    }
  };

  const handleAddEpisodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const hostConsultant = MOCK_CONSULTANTS.find(c => c.name === newHostName);
    const categoryAr = newCategory === 'counseling' ? 'إرشاد أسري' : newCategory === 'stories' ? 'قصص أسرية' : 'خلافات أسرية';

    const newEp: PodcastEpisode = {
      id: `pod-custom-${Date.now()}`,
      title: newTitle,
      hostName: newHostName,
      hostTitle: hostConsultant?.title || 'مستشار ميثاق الأسري',
      hostAvatar: hostConsultant?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      duration: '20 دقيقة',
      category: newCategory,
      categoryAr: categoryAr,
      publishedDate: 'اليوم',
      listensCount: 1,
      isFeatured: true,
      audioUrl: newAudioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-111154.mp3',
      description: newDescription || 'حلقة جديدة تم إضافتها بنجاح إلى منصة ميثاق الصوتية.'
    };

    setEpisodes([newEp, ...episodes]);
    setCurrentEpisode(newEp);
    setIsPlaying(true);
    setIsUploadModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewAudioUrl('');
    setUploadedFileName('');

    setSuccessToast('تم إضافة الحلقة الصوتية بنجاح وتجهيزها للتشغيل!');
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0F5C5A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 border border-emerald-400/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-bold">{successToast}</span>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0F5C5A] via-[#123E3C] to-[#0A2E2C] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-[#C89B3C]/30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(200,155,60,0.15),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E5C178] text-xs font-semibold backdrop-blur-md">
              <Radio className="w-4 h-4 animate-pulse text-[#C89B3C]" />
              المكتبة الصوتية والبودكاست الأسري
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
              حلقات الإرشاد الأسري والقصص الواقعية
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              استمع إلى حلقات صوتية موجهة في الإرشاد الأسري وقصص وتجارب التعامل مع الخلافات الأسرية يقدمها نخبة من مستشاري ميثاق.
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="group flex items-center gap-3 bg-[#C89B3C] hover:bg-[#b08630] text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-slate-950 group-hover:rotate-90 transition-transform" />
            <span>إضافة / رفع حلقة جديدة</span>
          </button>
        </div>
      </div>

      {/* Audio Player Bar (Active Episode Controls) */}
      <div className="bg-white dark:bg-[#122625] rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <audio
          ref={audioRef}
          src={currentEpisode.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-111154.mp3'}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Episode Info */}
          <div className="flex items-center gap-4 w-full lg:w-1/3">
            <div className="relative shrink-0">
              <img
                src={currentEpisode.hostAvatar}
                alt={currentEpisode.hostName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#C89B3C]/50 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#0F5C5A] text-white p-1 rounded-full text-xs">
                <Headphones className="w-3.5 h-3.5 text-[#C89B3C]" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold text-[#C89B3C] bg-[#C89B3C]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {currentEpisode.categoryAr}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base truncate">
                {currentEpisode.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                تقديم: {currentEpisode.hostName} {currentEpisode.hostTitle ? `• ${currentEpisode.hostTitle}` : ''}
              </p>
            </div>
          </div>

          {/* Controls & Progress */}
          <div className="w-full lg:w-1/2 space-y-2">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => skipTime(-15)}
                title="تراجع 15 ثانية"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#0F5C5A] dark:hover:text-[#C89B3C] transition"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => togglePlay()}
                className="w-12 h-12 rounded-full bg-[#0F5C5A] hover:bg-[#0A4341] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 mr-0.5" />}
              </button>

              <button
                onClick={() => skipTime(15)}
                title="تقديم 15 ثانية"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#0F5C5A] dark:hover:text-[#C89B3C] transition"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Time Bar */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <div className="relative flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCurrentTime(val);
                    if (audioRef.current) audioRef.current.currentTime = val;
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="h-full bg-gradient-to-r from-[#0F5C5A] to-[#C89B3C] rounded-full"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Speed & Tools */}
          <div className="flex items-center justify-end gap-3 w-full lg:w-auto shrink-0">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {[1, 1.25, 1.5, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2 py-1 text-xs rounded-lg font-bold transition ${
                    playbackSpeed === speed
                      ? 'bg-[#0F5C5A] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            <button
              onClick={() => toggleSave(currentEpisode.id)}
              className={`p-2.5 rounded-xl border transition ${
                savedEpisodes.includes(currentEpisode.id)
                  ? 'bg-[#C89B3C]/10 border-[#C89B3C] text-[#C89B3C]'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

        </div>
      </div>

      {/* Filter Tabs & Consultants */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'جميع الحلقات' },
            { id: 'counseling', label: 'إرشاد أسري' },
            { id: 'stories', label: 'قصص أسرية' },
            { id: 'disputes', label: 'خلافات أسرية' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0F5C5A] text-white shadow-md'
                  : 'bg-white dark:bg-[#122625] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Host Filter */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#122625] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <UserCheck className="w-4 h-4 text-[#0F5C5A] dark:text-[#C89B3C] ml-1 mr-2" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">المستشار:</span>
          <select
            value={selectedHost}
            onChange={(e) => setSelectedHost(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer pr-1"
          >
            <option value="all" className="dark:bg-[#122625]">الكل (أ. روض / أ. مصطفى / أ. إمام)</option>
            <option value="أ. روض" className="dark:bg-[#122625]">أ. روض (إرشاد أسري وزوجي)</option>
            <option value="أ. مصطفى" className="dark:bg-[#122625]">أ. مصطفى (تربية وسلوك)</option>
            <option value="أ. إمام" className="dark:bg-[#122625]">أ. إمام (توجيه ودعم نفسي)</option>
          </select>
        </div>

      </div>

      {/* Episode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEpisodes.map(ep => {
          const isCurrent = currentEpisode.id === ep.id;
          const isThisPlaying = isCurrent && isPlaying;

          return (
            <div
              key={ep.id}
              className={`group relative bg-white dark:bg-[#122625] rounded-3xl p-6 shadow-md border transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
                isCurrent 
                  ? 'ring-2 ring-[#0F5C5A] dark:ring-[#C89B3C] border-transparent' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-[#0F5C5A]/30'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={ep.hostAvatar}
                      alt={ep.hostName}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#0F5C5A]/20"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {ep.hostName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {ep.hostTitle || 'مستشار أسري'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#0F5C5A] dark:text-[#E5C178] bg-[#0F5C5A]/10 dark:bg-white/5 px-2.5 py-1 rounded-full">
                    {ep.categoryAr}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-[#0F5C5A] dark:group-hover:text-[#C89B3C] transition-colors">
                  {ep.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {ep.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ep.duration}
                  </span>
                  <span>•</span>
                  <span>{ep.listensCount.toLocaleString('ar-SA')} استماع</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSave(ep.id)}
                    className="p-2 text-slate-400 hover:text-[#C89B3C] transition"
                  >
                    <Bookmark className={`w-4 h-4 ${savedEpisodes.includes(ep.id) ? 'fill-[#C89B3C] text-[#C89B3C]' : ''}`} />
                  </button>

                  <button
                    onClick={() => togglePlay(ep)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                      isThisPlaying
                        ? 'bg-[#C89B3C] text-slate-950'
                        : 'bg-[#0F5C5A] text-white hover:bg-[#0A4341]'
                    }`}
                  >
                    {isThisPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>إيقاف</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current mr-0.5" />
                        <span>تشغيل</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Upload/Add New Episode Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white dark:bg-[#122625] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 relative">
            
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#C89B3C] rounded-2xl">
                <FileAudio className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">إضافة حلقة صوتية جديدة</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">أدخل معلومات الحلقة والملف الصوتي لنشرها في المكتبة</p>
              </div>
            </div>

            <form onSubmit={handleAddEpisodeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان الحلقة الصوتية *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الحلقة 6: حل الخلافات الأسرية بهدوء والتفاهم الزوجي"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5C5A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تصنيف الحلقة
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5C5A]"
                  >
                    <option value="counseling">إرشاد أسري</option>
                    <option value="stories">قصص أسرية</option>
                    <option value="disputes">خلافات أسرية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    المستشار المقدم *
                  </label>
                  <select
                    value={newHostName}
                    onChange={(e) => setNewHostName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5C5A]"
                  >
                    <option value="أ. روض">أ. روض (إرشاد أسري وزوجي)</option>
                    <option value="أ. مصطفى">أ. مصطفى (تربية وسلوك)</option>
                    <option value="أ. إمام">أ. إمام (توجيه ودعم نفسي)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وصف مختصر عن الحلقة
                </label>
                <textarea
                  rows={3}
                  placeholder="اكتب نبذة عن المحاور أو القصة الأسرية التي تناقشها الحلقة..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0F5C5A]"
                />
              </div>

              {/* Upload audio file or enter URL */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  رفع الملف الصوتي (MP3 / WAV / M4A) أو إضافة الرابط
                </label>
                
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#0F5C5A] rounded-2xl p-4 text-center cursor-pointer transition relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUploadSim}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-7 h-7 text-[#0F5C5A] dark:text-[#C89B3C] mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {uploadedFileName ? `الملف المختار: ${uploadedFileName}` : 'اضغط هنا لرفع الملف الصوتي من جهازك'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">يدعم جميع صيغ الصوت الصوتية المباشرة</p>
                </div>

                <div className="text-center text-xs text-slate-400 my-1">أو دخل رابط صوتي مباشر:</div>

                <input
                  type="url"
                  placeholder="https://example.com/audio-episode.mp3"
                  value={newAudioUrl}
                  onChange={(e) => setNewAudioUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0F5C5A]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0F5C5A] hover:bg-[#0A4341] text-white shadow-md transition"
                >
                  نشر الحلقة في المنصة
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
