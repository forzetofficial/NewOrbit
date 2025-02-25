import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { UserId, User } from "../types";

interface UseUserStore {
  error: boolean;
  setError: (error: boolean) => void;
  get: (
    id: UserId,
  ) => Promise<void>;
  update: (
    id: UserId,

    icon: string,
  ) => Promise<void>;
}

export const useUserStore = create<UseUserStore>((set) => ({
  error: false,
  setError: (error) => set({ error }),

  get: async (id) => {
    try {
      const response = await axios.get(
        "https://cookhub.space/api/v1/user/" + id,
      );

      if (response.status === 200) {
        localStorage.setItem("user_firstname", response.data.firstname)
        let icon = "https://s3.timeweb.cloud/2b22bd72-555c46b6-3494-47e1-aec6-b13be2d5f5f6/icon.png" 
        if (response.data.icon_url){
          icon = response.data.icon_url
        }
        localStorage.setItem("user_icon", icon)
      }
    } catch (error) {

      console.error("Ошибка при получении юзера:", error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },
  update: async (id, icon_url) => {
    try {
      axios.defaults.headers.common['Authorization'] = `${localStorage.getItem("accessToken")}` 
      const response = await axios.put(
        "https://cookhub.space/api/v1/user/" + id,
        {
          icon_url,
        }
      );

      if (response.status === 200) {
        if (icon_url != ""){
          localStorage.setItem("user_icon", icon_url)
        }
      }
    } catch (error) {

      console.error("Ошибка при обновлении юзера:", error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },
}));
