import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  saveDestination: (destinationId: string) => void;
  unsaveDestination: (destinationId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      saveDestination: (destinationId: string) =>
        set((state) => {
          if (!state.user) return state;
          
          const savedDestinations = state.user.savedDestinations.includes(destinationId)
            ? state.user.savedDestinations
            : [...state.user.savedDestinations, destinationId];
          
          return {
            user: {
              ...state.user,
              savedDestinations,
            },
          };
        }),
      unsaveDestination: (destinationId: string) =>
        set((state) => {
          if (!state.user) return state;
          
          return {
            user: {
              ...state.user,
              savedDestinations: state.user.savedDestinations.filter(
                (id) => id !== destinationId
              ),
            },
          };
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);