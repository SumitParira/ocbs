import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '../types';

interface HistoryState {
  viewedMovies: { movieId: string; timestamp: string }[];
  addToHistory: (movieId: string) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      viewedMovies: [],
      addToHistory: (movieId: string) =>
        set((state) => ({
          viewedMovies: [
            { movieId, timestamp: new Date().toISOString() },
            ...state.viewedMovies,
          ].slice(0, 20), // Keep last 20 viewed movies
        })),
    }),
    { name: 'history-storage' }
  )
);