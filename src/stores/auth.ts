import { create } from "zustand";

interface AuthState {
  isLogged: boolean;
  setIsLogged: (data: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  setIsLogged: (data: boolean) =>
    set((state) => ({ ...state, isLogged: data })),
}));
