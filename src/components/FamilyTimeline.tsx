import React from 'react';
import { Calendar, CheckCircle2, MessageSquare, Award, Clock, Heart, Sparkles } from 'lucide-react';
import { MOCK_FAMILY_TIMELINE } from '../data/mockData';

export function FamilyTimeline() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 px-2 sm:px-4">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F5C5A] to-[#157A77] text-white shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#C89B3C]" />
          <h1 className="text-xl sm:text-2xl font-black">السجل والتاريخ الزمني للأسرة</h1>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          تتبع المحطات الأسرية المحورية، الخلافات التي تم حلها بنجاح مع أنيس، الجلسات الاستشارية المكتملة، وإبرام المواثيق التربوية والزوجية.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#122625] border border-slate-200 dark:border-slate-800 shadow-sm relative">
        <div className="absolute right-8 top-12 bottom-12 w-0.5 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        <div className="space-y-8 relative z-10">
          {MOCK_FAMILY_TIMELINE.map((event, idx) => (
            <div key={event.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              
              {/* Timeline Icon Marker */}
              <div className="w-10 h-10 rounded-2xl bg-[#0F5C5A] text-[#C89B3C] font-black text-sm flex items-center justify-center shrink-0 shadow-md ring-4 ring-white dark:ring-[#122625]">
                {idx + 1}
              </div>

              {/* Event Card Content */}
              <div className="flex-1 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{event.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {event.statusTag}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{event.timeAgo} ({event.date})</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {event.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
