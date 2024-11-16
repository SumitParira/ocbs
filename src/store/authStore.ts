import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [],

      login: async (email: string, password: string) => {
        const { users } = get();
        const user = users.find((u) => u.email === email);

        if (!user) {
          return { success: false, error: "User not found. Please sign up first." };
        }

        set({ user, isAuthenticated: true });
        return { success: true };
      },

      signup: async (email: string, password: string, name: string) => {
        const { users } = get();
        
        if (users.some((u) => u.email === email)) {
          return { success: false, error: "Email already registered. Please login instead." };
        }

        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
        };

        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
        }));

        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);