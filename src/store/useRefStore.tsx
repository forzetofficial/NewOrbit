import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { UserId, User } from "../types";

interface UseUserStore {
  user: User;
  setUser: (user: User) => void;

  error: boolean;
  setError: (error: boolean) => void;

  get: (id: UserId) => Promise<void>;

}

export const useUserStore = create<UseUserStore>((set, get) => ({
  user: {} as User,
  setUser: (user) => set({ user }),

  error: false,
  setError: (error) => set({ error }),

  get: async (id) => {
    try {
      const response = await axios.get(
        "https://cookhub.space/api/v1/refresh",
      );

      get().setUser(response.data);
    } catch (error) {
      console.error("Ошибка при получении юзера:", error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },
}));