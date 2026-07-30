import { Consultant, Article, Course, PodcastEpisode, CommunityPost, FamilyTest, DailyAdvice, User, Appointment } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-1001',
  name: 'عبدالرحمن المحمد',
  email: 'abdulrahman@example.com',
  phone: '+966 50 123 4567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'user',
  subscription: 'premium',
  streakDays: 14,
  familyMembers: [
    { id: 'fm-1', name: 'سارة (الزوجة)', relation: 'spouse', age: 31, notes: 'نمط لغات الحب: التقدير والكلمات الطيبة' },
    { id: 'fm-2', name: 'عمر (الابن الأكبر)', relation: 'son', age: 12, notes: 'مرحلة بداية المراهقة، يحب الألعاب الإلكترونية' },
    { id: 'fm-3', name: 'ريم (الابنة الصغرى)', relation: 'daughter', age: 6, notes: 'تستعد للالتحاق بالمدرسة الابتدائية' }
  ],
  savedArticles: ['art-1', 'art-3'],
  enrolledCourses: ['crs-1', 'crs-2'],
  completedTests: [
    {
      testId: 'test-1',
      testTitle: 'اختبار لغات الحب الخمس للزوجين',
      completedAt: '2026-07-20',
      score: 88,
      maxScore: 100,
      reportSummary: 'لغة الحب الرئيسية هي (الكلمات والثناء الإيجابي)، تليها (قضاء الوقت النوعي).'
    }
  ],
  goals: [
    { id: 'g-1', title: 'جلسة حوار أسبوعية مع الزوجة بدون هواتف', category: 'communication', targetDays: 7, completedDays: 5, isDoneToday: true },
    { id: 'g-2', title: 'قراءة قصة تربوية للأبناء قبل النوم', category: 'education', targetDays: 7, completedDays: 6, isDoneToday: true },
    { id: 'g-3', title: 'تمرين التنفس العميق والهدوء عند الانفعال', category: 'health', targetDays: 7, completedDays: 4, isDoneToday: false }
  ]
};

export const MOCK_CONSULTANTS: Consultant[] = [
  {
    id: 'c-101',
    name: 'أ. روض',
    title: 'استشارية العلاقات الأسرية والزوجية والصحة النفسية',
    specialty: 'marriage',
    specialtyAr: 'استشارات زوجية وصحة نفسية',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    rating: 4.98,
    reviewsCount: 620,
    yearsExperience: 18,
    bio: 'مستشارة عالية في الإرشاد الأسري والعلاقات الزوجية والتوافق الأسري، متخصصة في حل المشكلات الزوجية وبناء الميثاق الأسري المستقر وتجاوز الأزمات النفسية.',
    education: ['ماجستير الإرشاد الأسري المتقدم - جامعة الملك سعود', 'زمالة العلاج النفسي والأسري المتقدم'],
    sessionPrice: 0,
    availableFormats: ['voice', 'text', 'emergency'],
    availableDays: ['الأحد', 'الإثنين', 'الأربعاء', 'الخميس'],
    timeSlots: ['04:00 م', '05:30 م', '07:00 م', '08:30 م'],
    isVerified: true,
    totalConsultations: 4500
  },
  {
    id: 'c-102',
    name: 'أ. مصطفى',
    title: 'أخصائي التربية الإيجابية وسلوك الأطفال والمراهقين',
    specialty: 'parenting',
    specialtyAr: 'تربية الأبناء وتعديل السلوك',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewsCount: 480,
    yearsExperience: 15,
    bio: 'مستشار وأخصائي التربية الإيجابية وتعديل سلوك الأطفال والتعامل مع المراهقين وبناء مهارات التواصل الاجتماعي والأكاديمي.',
    education: ['ماجستير التربية الخاصة والنمو النفسي', 'شهادة الموجه التربوي المعتمد'],
    sessionPrice: 0,
    availableFormats: ['voice', 'text'],
    availableDays: ['السبت', 'الإثنين', 'الثلاثاء', 'الخميس'],
    timeSlots: ['10:00 ص', '01:00 م', '06:00 م', '08:00 م'],
    isVerified: true,
    totalConsultations: 3820
  },
  {
    id: 'c-103',
    name: 'أ. إمام',
    title: 'مستشار التوجيه الأسري والدعم النفسي وإدارة الضغوط',
    specialty: 'psychology',
    specialtyAr: 'الدعم النفسي وإدارة الضغوط',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    rating: 4.90,
    reviewsCount: 390,
    yearsExperience: 14,
    bio: 'مستشار التوجيه الأسري والدعم النفسي الذاتي، متخصص في مساعدة الأسر والأفراد على إدارة الضغوط وتجاوز الاحتراق النفسي والتعافي الأسري.',
    education: ['ماجستير الإرشاد والتوجيه النفسي', 'زمالة التوجيه القيادي والأسري'],
    sessionPrice: 0,
    availableFormats: ['voice', 'text', 'emergency'],
    availableDays: ['الأحد', 'الثلاثاء', 'الأربعاء'],
    timeSlots: ['03:00 م', '05:00 م', '07:00 م'],
    isVerified: true,
    totalConsultations: 3100
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-901',
    userId: 'usr-1001',
    userName: 'عبدالرحمن المحمد',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    consultantId: 'c-101',
    consultantName: 'أ. روض',
    consultantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    consultantTitle: 'استشارية العلاقات الأسرية والزوجية',
    specialtyAr: 'استشارات زوجية وصحة نفسية',
    date: '2026-07-28',
    timeSlot: '07:00 م',
    format: 'voice',
    status: 'scheduled',
    price: 0,
    notes: 'جلسة حوار لتطوير وسائل التواصل اليومية وتفادي الانفعال عند نقاش الميزانية الأسرية.',
    meetingLink: 'https://mithaq.app/meet/live-session-901'
  },
  {
    id: 'app-902',
    userId: 'usr-1001',
    userName: 'عبدالرحمن المحمد',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    consultantId: 'c-102',
    consultantName: 'أ. مصطفى',
    consultantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    consultantTitle: 'أخصائي التربية الإيجابية وسلوك الأطفال',
    specialtyAr: 'تربية الأبناء وتعديل السلوك',
    date: '2026-07-15',
    timeSlot: '05:30 م',
    format: 'voice',
    status: 'completed',
    price: 0,
    notes: 'تم وضع خطة لتنظيم وقت الشاشات للابن عمر وتطبيق جداول المكافآت السلوكية.'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'فن الإنصات الزوجي: كيف يحول الحوار الفعال الخلاف إلى تقارب؟',
    summary: 'معظم الخلافات الزوجية لا تعود لعدم الحب، بل لغياب الفهم والإنصات المتبادل. إليك 5 قواعد ذهبية لإدارة الحوار الدافئ.',
    content: `عندما يتحدث الشريك، فإنه لا يبحث دائماً عن حلول فورية، بل يبحث قبل كل شيء عن **الشعور بالأمان والقبول والفهم**.

### قواعد الإنصات الدافئ في ميثاق:
1. **التركيز الكامل:** وضع الهواتف جانباً والنظر في عيني الشريك باهتمام.
2. **الاستجابة بالتعاطف:** استخدام عبارات مثل "أفهم سبب شعورك بهذا" بدلاً من الدفاع السريع.
3. **تجنب المقاطعة:** ترك مساحة كافية للتعبير عن المشاعر حتى كمال الفكرة.
4. **تأكيد الفهم:** إعادة صياغة ما قاله الشريك للتأكد من وصول المعنى الصحيح.
5. **الإنهاء بلفتة طيبة:** كلمة رقيقة أو لمسة حانية تدعم جسر التفاهم.`,
    category: 'marriage',
    categoryAr: 'الحياة الزوجية',
    authorName: 'أ. روض',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorTitle: 'استشارية العلاقات الزوجية والصحة النفسية',
    readTime: '4 دقائق',
    publishedDate: '24 يوليو 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
    likes: 1240,
    bookmarks: 480,
    isFeatured: true
  },
  {
    id: 'art-2',
    title: 'تربية المراهقين في عصر الشاشات: التوازن بين الحزم والمصادقة',
    summary: 'دليل عملي للآباء والأمهات للتعامل مع العناد الرقمي وبناء ثقة متينة مع الأبناء في سن المراهقة.',
    content: `المراهقة ليست مرحلة تمرد لمجرد التمرد، بل هي رحلة البحث عن الهوية والاستقلالية.

### مفاتيح التعامل الذكي:
- التحول من دور "الآمر" إلى دور "الموجه الصديق".
- الاتفاق على قوانين الأجهزة الذكية بالمشاركة وليس بالإملاء التعسفي.
- فتح قنوات حوار غير مشروطة بدون إطلاق أحكام مسبقة.`,
    category: 'teenagers',
    categoryAr: 'تربية المراهقين',
    authorName: 'أ. مصطفى',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorTitle: 'أخصائي التربية وسلوك المراهقين',
    readTime: '6 دقائق',
    publishedDate: '22 يوليو 2026',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    likes: 890,
    bookmarks: 320,
    isFeatured: true
  },
  {
    id: 'art-3',
    title: 'الاحتراق النفسي لدى الأمهات: كيف تستعيدين طاقتك وهدوءك الداخلي؟',
    summary: 'الاهتمام بالذات ليس رفاهية، بل هو الحجر الأساس لاستقرار البيت والأسرة. خطوات عملية للتعافي وتجديد الطاقة.',
    content: `الأم التي تمنح بلا توقف دون أن تغذي روحها ونفسها تنتهي بالإنهاك العصبي.

### خطوات استعادة التوازن:
- تخصيص 20 دقيقة يومية خاصة بك فقط.
- طلب المساعدة من الزوج والأقارب بدون شعور بالذنب.
- ممارسة تمارين التنفس والتأمل الأسري المتاحة في تطبيق ميثاق.`,
    category: 'mental-health',
    categoryAr: 'الصحة النفسية',
    authorName: 'أ. إمام',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorTitle: 'مستشار الدعم النفسي وإدارة الضغوط',
    readTime: '5 دقائق',
    publishedDate: '19 يوليو 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    likes: 1560,
    bookmarks: 720
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'crs-1',
    title: 'ماستر كلاس: بناء الميثاق الزوجي وتجاوز أزمات السنة الأولى',
    description: 'برنامج تدريبي شامل ومكثف تقدمه الاستشارية أ. روض لإعادة رسم خرائط التواصل والتفاهم الزوجي وإدارة الخلافات بحكمة.',
    categoryAr: 'دورة مجانية - الحياة الزوجية',
    instructorName: 'أ. روض',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'استشارية العلاقات الزوجية',
    duration: '4 ساعات - 12 درس',
    lessonsCount: 12,
    price: 0,
    isFree: true,
    rating: 4.96,
    enrolledCount: 1840,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    lessons: [
      { id: 'l-1', title: 'المقدمة: فلسفة التفاهم الزوجي في ميثاق', duration: '15 دقيقة', isCompleted: true },
      { id: 'l-2', title: 'اكتشاف لغات الحب والاحتياجات العاطفية', duration: '25 دقيقة', isCompleted: true },
      { id: 'l-3', title: 'إدارة الميزانية والتخطيط المالي الأسري بدون نزاع', duration: '30 دقيقة', isCompleted: false },
      { id: 'l-4', title: 'كيف تحول لحظات الغضب إلى طاقة تفهم؟', duration: '20 دقيقة', isCompleted: false }
    ]
  },
  {
    id: 'crs-2',
    title: 'أساسيات التربية الإيجابية للأطفال من سن 3 إلى 10 سنوات',
    description: 'دورة مجانية متكاملة للأمهات والآباء يقدمها المستشار أ. مصطفى لتطبيق أساليب الحزم الدافئ وتعديل السلوك وتنمية الذكاء العاطفي.',
    categoryAr: 'دورة مجانية - تربية الأبناء',
    instructorName: 'أ. مصطفى',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    instructorTitle: 'أخصائي التربية الإيجابية',
    duration: '2.5 ساعة - 8 دروس',
    lessonsCount: 8,
    price: 0,
    isFree: true,
    rating: 4.92,
    enrolledCount: 4210,
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80',
    lessons: [
      { id: 'l-10', title: 'فهم العالم الداخلي للطفل ورغباته', duration: '20 دقيقة', isCompleted: true },
      { id: 'l-11', title: 'بدائل العقاب والتوبيخ: الحزم الدافئ', duration: '25 دقيقة', isCompleted: false }
    ]
  }
];

export const MOCK_PODCASTS: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'الحلقة 1: كيف نتجاوز الصمت الزوجي ونستعيد الدفء والمودة؟',
    hostName: 'أ. روض',
    hostTitle: 'استشارية العلاقات الزوجية',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    duration: '28 دقيقة',
    category: 'counseling',
    categoryAr: 'إرشاد أسري',
    publishedDate: '24 يوليو 2026',
    listensCount: 18900,
    isFeatured: true,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-111154.mp3',
    description: 'حلقة إرشادية مكثفة مع أ. روض تسلط الضوء على أسباب الجفاف العاطفي والصمت التدريجي في البيوت، مع تقديم 4 خطة عمل سريعة لكسر الحواجز واستعادة لغة التفاهم.'
  },
  {
    id: 'pod-2',
    title: 'الحلقة 2: قصة واقعية - الخلاف حول الميزانية الأسرية وكيف تم حله بسلام',
    hostName: 'أ. إمام',
    hostTitle: 'مستشار الدعم الأسري والنفسي',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    duration: '32 دقيقة',
    category: 'stories',
    categoryAr: 'قصص وخلافات أسرية',
    publishedDate: '21 يوليو 2026',
    listensCount: 15400,
    isFeatured: true,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a86a34.mp3?filename=calm-relaxing-103852.mp3',
    description: 'قصة حقيقية لزوجين في السنة الثانية من الزواج واجها ضغوطاً مالية حادة، وكيف انتقلا من النزاع المستمر إلى الشراكة المالية الهادئة من خلال خطوات التوجيه الأسري.'
  },
  {
    id: 'pod-3',
    title: 'الحلقة 3: التعامل مع نوبات غضب الأطفال وتعديل السلوك بدون توبيخ',
    hostName: 'أ. مصطفى',
    hostTitle: 'أخصائي التربية الإيجابية وسلوك الأطفال',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    duration: '25 دقيقة',
    category: 'counseling',
    categoryAr: 'إرشاد أسري',
    publishedDate: '18 يوليو 2026',
    listensCount: 14200,
    isFeatured: false,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=peaceful-guitar-10118.mp3',
    description: 'يقدم المستشار أ. مصطفى إستراتيجية الحزم الدافئ وإدارة انفعالات الطفل في الأماكن العامة والبيت دون الوجوع للصراخ أو العقاب القاسي.'
  },
  {
    id: 'pod-4',
    title: 'الحلقة 4: قضية وخلاف أسري - تدخل الأهل بين الزوجين وكيفية وضع الحدود الذكية',
    hostName: 'أ. روض',
    hostTitle: 'استشارية العلاقات الزوجية',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    duration: '38 دقيقة',
    category: 'disputes',
    categoryAr: 'قصص وخلافات أسرية',
    publishedDate: '15 يوليو 2026',
    listensCount: 22100,
    isFeatured: true,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-ambient-111154.mp3',
    description: 'تحليل حالة أسرية معقدة لتدخل الأقارب في القرارات التربوية والشخصية للزوجين، والحلول الصوتية لحماية الخصوصية الزوجية باحترام وبر.'
  },
  {
    id: 'pod-5',
    title: 'الحلقة 5: جلسة استماع - كيف نتجاوز آثار الاحتراق النفسي للأمهات والآباء؟',
    hostName: 'أ. إمام',
    hostTitle: 'مستشار الدعم النفسي',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    duration: '30 دقيقة',
    category: 'counseling',
    categoryAr: 'إرشاد أسري',
    publishedDate: '10 يوليو 2026',
    listensCount: 11800,
    isFeatured: false,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a86a34.mp3?filename=calm-relaxing-103852.mp3',
    description: 'حلقة تأملية وإرشادية صوتية موجهة للوالدين للاستراحة النفسية والتخلص من شعور الذنب والضغط المستمر.'
  }
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-101',
    authorName: 'أم لثلاثة أطفال (مجهول)',
    isAnonymous: true,
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'حديث الأمومة وتربية الأبناء',
    title: 'كيف أتعامل مع ابني (11 سنة) بعد تعلقه المتزايد بالألعاب الإلكترونية؟',
    content: 'ألاحظ أن ابني أصبح عصبياً عندما أطلب منه إغلاق اللعبة، ويقضي أكثر من 4 ساعات يومياً أمام الشاشة. كيف أضع الحدود بدون خسارة علاقته؟',
    timeAgo: 'منذ ساعتين',
    likes: 42,
    commentsCount: 18,
    hasExpertAnswer: true,
    expertAnswer: {
      consultantName: 'أ. مصطفى',
      consultantTitle: 'أخصائي التربية وسلوك الأطفال',
      consultantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      answer: 'أهلاً بكِ في ميثاق. المنع المباشر يولد العناد، الحل يكمن في تطبيق قانون "البديل الممتع" وتقسيم الوقت إلى ساعات ثابتة بدعم من الأب.'
    }
  },
  {
    id: 'post-102',
    authorName: 'أبو فهد',
    isAnonymous: false,
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'مجتمع حديثي الزواج',
    title: 'اقتراحاتكم لتنظيم الميزانية الأسرية في بداية الزواج؟',
    content: 'نحن في السنة الأولى من الزواج ونرغب في بناء خطة ادخارية بدون أن تؤثر على استمتاعنا بالرحلات والأنشطة الأسبوعية.',
    timeAgo: 'منذ 5 ساعات',
    likes: 29,
    commentsCount: 14,
    hasExpertAnswer: false
  }
];

export const MOCK_TESTS: FamilyTest[] = [
  {
    id: 'test-1',
    title: 'اختبار لغات الحب الخمس للزوجين',
    titleAr: 'مقياس لغات الحب الخمس واستكشاف الاحتياجات العاطفية',
    description: 'اكتشف كيف يعبر شريكك عن حبه وكيف يحب أن يتلقى الحب (كلمات الثناء، الخدمة، الهدايا، قضاء الوقت، التلامس الدافئ).',
    category: 'love-language',
    timeMinutes: 5,
    questionsCount: 5,
    iconName: 'Heart',
    questions: [
      {
        id: 1,
        questionAr: 'ما الذي يجعلك تشعر بالامتنان والتقدير الأكبر من شريك حياتك؟',
        options: [
          { textAr: 'كلمة ثناء وتشجيع صريحة أمام الأبناء أو في رسالة رقيقة', score: 20 },
          { textAr: 'مساعدتي في أعباء المنزل وتسهيل المهام اليومية', score: 15 },
          { textAr: 'تخصيص وقت هادئ وممتع لنا معاً بدون تشتيت', score: 25 },
          { textAr: 'هدية رمزية معبرة تفاجئني بها', score: 10 }
        ]
      },
      {
        id: 2,
        questionAr: 'عند حدوث عتب أو ضيق بينكما، ما الذي يعيد السلام لقلبك بسرعة؟',
        options: [
          { textAr: 'اعتذار رقيق وكلمات طيبة تعيد الأمان', score: 20 },
          { textAr: 'جلسة حوار دافئة ونظرات مليئة بالتفهم', score: 25 },
          { textAr: 'عناق دافئ ولمسة حانية توقف التوتر', score: 20 },
          { textAr: 'مبادرة بالقيام بعمل يريحني ويسعدني', score: 15 }
        ]
      },
      {
        id: 3,
        questionAr: 'كيف تعبر أنت عادةً عن محبتك العميقة للطرف الآخر؟',
        options: [
          { textAr: 'أحرص على الثناء على جهوده وأخلاقه دائماً', score: 20 },
          { textAr: 'أصنع له مفاجآت وأهتم بما يحب', score: 15 },
          { textAr: 'أفرغ برنامجي لنقضي أوقاتاً مميزة سواً', score: 25 },
          { textAr: 'أقوم بالاهتمام بكافة التفاصيل والتزامات البيت', score: 15 }
        ]
      },
      {
        id: 4,
        questionAr: 'ما هو أكثر شيء يسبب لك الانزعاج والجفاف العاطفي؟',
        options: [
          { textAr: 'النقد المستمر وتجاهل الإيجابيات', score: 20 },
          { textAr: 'الانشغال بالهاتف أثناء تواجدنا معاً', score: 25 },
          { textAr: 'التقاعس عن المساعدة في المسؤوليات الأسرية', score: 15 },
          { textAr: 'الجفاء والبرود في التعامل الجسدي واللفظي', score: 20 }
        ]
      },
      {
        id: 5,
        questionAr: 'أفضل مسائية بالنسبة لك هي التي تتضمن:',
        options: [
          { textAr: 'حواراً عميقاً وضحكات مشتركة حول المستقبل', score: 25 },
          { textAr: 'جلسة استرخاء وهدوء بعد يوم عمل شاق', score: 20 },
          { textAr: 'تقديم كوب قهوة مع عبارة حب مكتوبة بخط اليد', score: 20 },
          { textAr: 'تخطيط مشترك لرحلة أو نشاط أسري ممتع', score: 15 }
        ]
      }
    ]
  },
  {
    id: 'test-2',
    title: 'مقياس التوافق والسكينة الزوجية',
    titleAr: 'مقياس التوافق والسكينة الزوجية وحل المشكلات',
    description: 'مقياس علمي مكوّن من أسئلة دقيقة لتقييم مدى مرونة العلاقة وقدرتكم على تجاوز التحديات الأسرية بسلام.',
    category: 'marriage-compatibility',
    timeMinutes: 6,
    questionsCount: 4,
    iconName: 'Compass',
    questions: [
      {
        id: 1,
        questionAr: 'كيف تتم مناقشة القرارات الأسرية الكبرى (كالميزانية والتربية والرحلات)؟',
        options: [
          { textAr: 'بالشورى والتفاهم الكامل مع احترام رأي الطرفين', score: 25 },
          { textAr: 'بمناقشات شديدة أحياناً لكن نصل لRadio مرضي', score: 20 },
          { textAr: 'ينفرد طرف واحد عادة بالقرار النهائي', score: 10 }
        ]
      },
      {
        id: 2,
        questionAr: 'عند نشوب خلاف، هل يتم تجاوز الأمر وحفظ كرامة الشريك؟',
        options: [
          { textAr: 'نعم، نتجنب الإساءة ونغلق الملف برقي', score: 25 },
          { textAr: 'نعم، بعد فترة صمت قصيرة للتهدئة', score: 20 },
          { textAr: 'غالباً ما يمتد الخلاف لأيام بسبب المكابرة', score: 10 }
        ]
      }
    ]
  },
  {
    id: 'test-3',
    title: 'اختبار نمط الوالدية (Parenting Style)',
    titleAr: 'استكشاف نمطك التربوي (الحازم الدافئ، المتساهل، أو المتسلط)',
    description: 'تعرف على أسلوبك القيادي مع أبنائك وكيف ينعكس على بناء شخصياتهم وثقتهم بأنفسهم.',
    category: 'parenting-style',
    timeMinutes: 4,
    questionsCount: 3,
    iconName: 'Users',
    questions: [
      {
        id: 1,
        questionAr: 'عندما يرفض طفلك الاستعداد للمدرسة أو إنجاز واجبه:',
        options: [
          { textAr: 'أتحدث معه بهدوء، وأوضح النتائج بالحزم والتعاطف', score: 25 },
          { textAr: 'أصرخ أو أهدد بحرمانه فوراً من كل شيء', score: 10 },
          { textAr: 'أتساهل معه وأقوم بإنجاز الأمر نيابة عنه', score: 15 }
        ]
      }
    ]
  }
];

export const MOCK_DAILY_ADVICE: DailyAdvice = {
  verseAr: '﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾',
  verseRef: 'سورة الروم - الآية 21',
  hadithAr: '«خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ، وَأَنَا خَيْرُكُمْ لِأَهْلِي»',
  adviceTitle: 'نصيحة اليوم: قوة كلمة "شكراً" في البيوت',
  adviceBody: 'الامتنان اليومي بين الزوجين وبين الآباء والأبناء هو الوقود الحقيقي للسكينة. عبارة تقدير بسيطة لجهد يومي تحول الروتين إلى لحظة حب دافئة.',
  dailyChallenge: 'تحدي اليوم الأسري: عبر لشريك حياتك أو لأحد أبنائك عن 3 أشياء تحبها فيه وتفخر بها، دون أن تنتظر منه شيئاً مقابل ذلك.'
};

export const MOCK_CHILD_PROFILES = [
  {
    id: 'ch-1',
    name: 'عمر',
    age: 12,
    gender: 'boy' as const,
    schoolStage: 'السادس الابتدائي (مرحلة المراهقة المبكرة)',
    traits: ['حساس ذكي', 'كثير الحركة', 'شغوف بالألعاب والتقنية'],
    habits: ['قراءة قصص المغامرات', 'الألعاب الإلكترونية الأسبوعية'],
    strengths: ['سرعة البديهة والذكاء المنطقي', 'مساعدة إخوته الصغار'],
    challenges: ['سرعة الانفعال عند سحب الأجهزة', 'التشتت أثناء المذاكرة'],
    notes: 'يحتاج إلى تشجيع مستمر بالثني والثناء، وإبرام ميثاق استخدام الأجهزة بهدوء.'
  },
  {
    id: 'ch-2',
    name: 'ريم',
    age: 6,
    gender: 'girl' as const,
    schoolStage: 'الروضة المتقدمة / الابتدائية',
    traits: ['اجتماعية ومرحة', 'حساسة للتغيرات المفاجئة', 'مبدعة في الرسم'],
    habits: ['الرسم والتلوين قبل النوم', 'الحديث عن صديقات الروضة'],
    strengths: ['التعبير العاطفي الدافئ', 'الخيال الخصاب والتفاعل الاجتماعي'],
    challenges: ['الخوف المؤقت من الظلام والنوم بمفردها'],
    notes: 'تستجيب بشكل رائع لقصص الأنبياء والحكايات الهادفة قبل النوم.'
  }
];

export const MOCK_COUPLES_ASSESSMENT = {
  spouseName: 'سارة',
  isSpouseJoined: true,
  inviteCode: 'MITHAQ-8821',
  compatibilityScore: 88,
  communicationIndex: 82,
  strengths: [
    'الاتفاق التام على الرؤية التربوية والقيم الأسرية',
    'الاحترام المتبادل والرغبة الصادقة في حل المشكلات',
    'تقاسم المسؤوليات المنزلية والتوازن المالي'
  ],
  weaknesses: [
    'تأجيل النقاشات الحساسة عند حدوث إرهاق العمل',
    'حاجة كل طرف إلى وقت استرخاء فردي يجدد الطاقة'
  ],
  improvementPlan: [
    'تخصيص 15 دقيقة حوار هادئ بدون هواتف يومياً بعد العشاء',
    'ممارسة تمرين "الاستماع المتبادل" لمدة 3 دقائق دون مقاطعة',
    'القيام بنزهة أسبوعية خاصة بالزوجين فقط كل يوم سبت'
  ]
};

export const MOCK_FAMILY_TIMELINE = [
  {
    id: 'tl-1',
    date: '2026-07-27',
    timeAgo: 'أمس',
    type: 'resolution' as const,
    title: 'تم حل خلاف خطة الصيف وميزانية الإجازة',
    description: 'عن طريق جلسة توجيه مع أنيس، تم الاتفاق على ميزانية مرنة ترضي جميع الأطراف.',
    statusTag: 'تفاهم إيجابي'
  },
  {
    id: 'tl-2',
    date: '2026-07-25',
    timeAgo: 'قبل 3 أيام',
    type: 'session' as const,
    title: 'جلسة استشارية صوتية مع أ. روض',
    description: 'تناولت الجلسة تعزيز لغات الحب المتبادلة وتخفيف ضغوط العمل على المنزل.',
    statusTag: 'مكتملة بنجاح'
  },
  {
    id: 'tl-3',
    date: '2026-07-20',
    timeAgo: 'قبل أسبوع',
    type: 'exercise' as const,
    title: 'إتمام تمرين لغات الحب للزوجين',
    description: 'حصلت الأسرة على درجة 88% في الوعي بلغات الحب والثناء الإيجابي.',
    statusTag: 'إنجاز أسري'
  },
  {
    id: 'tl-4',
    date: '2026-07-15',
    timeAgo: 'قبل أسبوعين',
    type: 'milestone' as const,
    title: 'إطلاق ميثاق استخدام الشاشات للطفل عمر',
    description: 'تم تحديد ساعة واحدة يومياً للألعاب مع مكافأة قراءة كتاب.',
    statusTag: 'استقرار تربوي'
  }
];
