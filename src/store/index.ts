import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from 'firebase/auth';

interface UserProgress {
  completedSections: string[];
  quizScores: Record<string, number>;
  badges: string[];
}

type Theme = 'light' | 'dark';

interface AppState {
  region: string;
  language: string;
  textSize: 'sm' | 'md' | 'lg';
  theme: Theme;
  highContrast: boolean;
  progress: UserProgress;
  setRegion: (region: string) => void;
  setLanguage: (lang: string) => void;
  setTextSize: (size: 'sm' | 'md' | 'lg') => void;
  setTheme: (theme: Theme) => void;
  toggleHighContrast: () => void;
  markSectionCompleted: (sectionId: string) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  resetProgress: () => void;
  setProgress: (progress: UserProgress) => void;
  addBadge: (badgeId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      region: 'IN', 
      language: 'en',
      textSize: 'md',
      theme: 'light',
      highContrast: false,
      progress: {
        completedSections: [],
        quizScores: {},
        badges: [],
      },
      user: null,
      setRegion: (region) => set({ region }),
      setLanguage: (language) => set({ language }),
      setTextSize: (textSize) => set({ textSize }),
      setTheme: (theme) => set({ theme }),
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
      markSectionCompleted: (sectionId) => set((state) => ({
        progress: {
          ...state.progress,
          completedSections: state.progress.completedSections.includes(sectionId)
            ? state.progress.completedSections
            : [...state.progress.completedSections, sectionId],
        }
      })),
      saveQuizScore: (quizId, score) => set((state) => ({
        progress: {
          ...state.progress,
          quizScores: { ...state.progress.quizScores, [quizId]: score },
        }
      })),
      setUser: (user) => set({ user }),
      resetProgress: () => set({
        progress: {
          completedSections: [],
          quizScores: {},
          badges: [],
        }
      }),
      setProgress: (progress) => set({ progress }),
      addBadge: (badgeId) => set((state) => ({
        progress: {
          ...state.progress,
          badges: state.progress.badges?.includes(badgeId)
            ? state.progress.badges
            : [...(state.progress.badges || []), badgeId],
        }
      })),
    }),
    {
      name: 'voter-ed-storage',
    }
  )
);
