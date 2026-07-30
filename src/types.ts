export type Language = 'ar' | 'en';
export type ThemeMode = 'light' | 'dark';
export type ViewMode = 'landing' | 'app' | 'mobile' | 'consultant-panel' | 'admin-panel' | 'ai-anis-focus';

export type ActiveTab = 
  | 'companion-journey'
  | 'family-dashboard'
  | 'ai-assistant' 
  | 'counseling' 
  | 'relationship-analysis'
  | 'couples-mode'
  | 'child-profile'
  | 'family-timeline'
  | 'audio-library'
  | 'mental-health' 
  | 'tests' 
  | 'parenting' 
  | 'marriage' 
  | 'articles' 
  | 'academy' 
  | 'community' 
  | 'goals'
  | 'monetization';

export type UserRole = 'user' | 'consultant' | 'admin';
export type SubscriptionTier = 'free' | 'plus' | 'premium' | 'vip';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  subscription: SubscriptionTier;
  familyMembers: FamilyMember[];
  savedArticles: string[];
  enrolledCourses: string[];
  completedTests: CompletedTest[];
  goals: FamilyGoal[];
  streakDays: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'spouse' | 'son' | 'daughter' | 'parent';
  age: number;
  notes?: string;
}

export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialty: 'marriage' | 'parenting' | 'psychology' | 'family-finance' | 'teenagers' | 'divorce-support';
  specialtyAr: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  yearsExperience: number;
  bio: string;
  education: string[];
  sessionPrice: number; // SAR
  availableFormats: ('voice' | 'text' | 'emergency')[];
  availableDays: string[];
  timeSlots: string[];
  isVerified: boolean;
  totalConsultations: number;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  consultantId: string;
  consultantName: string;
  consultantAvatar: string;
  consultantTitle: string;
  specialtyAr: string;
  date: string;
  timeSlot: string;
  format: 'voice' | 'text' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  price: number;
  notes?: string;
  meetingLink?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'parenting' | 'marriage' | 'mental-health' | 'teenagers' | 'finance';
  categoryAr: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  readTime: string;
  publishedDate: string;
  imageUrl: string;
  likes: number;
  bookmarks: number;
  isFeatured?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  categoryAr: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle: string;
  duration: string;
  lessonsCount: number;
  price: number; // 0 = free
  isFree: boolean;
  rating: number;
  enrolledCount: number;
  imageUrl: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  hostTitle?: string;
  duration: string;
  category: 'counseling' | 'stories' | 'disputes' | 'general';
  categoryAr: string;
  publishedDate: string;
  audioUrl?: string;
  listensCount: number;
  description: string;
  isFeatured?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string; // Anonymous or name
  isAnonymous: boolean;
  authorAvatar: string;
  category: string;
  title: string;
  content: string;
  timeAgo: string;
  likes: number;
  commentsCount: number;
  hasExpertAnswer: boolean;
  expertAnswer?: {
    consultantName: string;
    consultantTitle: string;
    consultantAvatar: string;
    answer: string;
  };
}

export interface FamilyTest {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  category: 'love-language' | 'marriage-compatibility' | 'parenting-style' | 'family-eq';
  timeMinutes: number;
  questionsCount: number;
  iconName: string;
  questions: TestQuestion[];
}

export interface TestQuestion {
  id: number;
  questionAr: string;
  options: {
    textAr: string;
    score: number;
  }[];
}

export interface CompletedTest {
  testId: string;
  testTitle: string;
  completedAt: string;
  score: number;
  maxScore: number;
  reportSummary: string;
}

export interface FamilyGoal {
  id: string;
  title: string;
  category: 'communication' | 'spiritual' | 'health' | 'education';
  targetDays: number;
  completedDays: number;
  isDoneToday: boolean;
}

export interface DailyAdvice {
  verseAr: string;
  verseRef: string;
  hadithAr: string;
  adviceTitle: string;
  adviceBody: string;
  dailyChallenge: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'anis';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: string[];
  isAudioPlaying?: boolean;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  gender: 'boy' | 'girl';
  schoolStage: string;
  traits: string[];
  habits: string[];
  strengths: string[];
  challenges: string[];
  notes: string;
}

export interface CouplesAssessment {
  spouseName: string;
  isSpouseJoined: boolean;
  inviteCode: string;
  compatibilityScore: number;
  communicationIndex: number;
  strengths: string[];
  weaknesses: string[];
  improvementPlan: string[];
}

export interface FamilyTimelineEvent {
  id: string;
  date: string;
  timeAgo: string;
  type: 'resolution' | 'session' | 'exercise' | 'mood_shift' | 'appointment' | 'milestone';
  title: string;
  description: string;
  statusTag?: string;
}

export interface RelationshipAnalysisResult {
  id: string;
  date: string;
  rawInput: string;
  emotions: { emotion: string; percentage: number; color: string }[];
  tensionScore: number;
  misunderstandings: string[];
  aggressiveWording: { text: string; softerAlternative: string }[];
  recommendations: string[];
}
