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

export const useUserStore = create<UseUserStore>((set, get) => ({
  error: false,
  setError: (error) => set({ error }),

  get: async (id) => {
    try {
      const response = await axios.get(
        "https://cookhub.space/api/v1/user/" + id,
      );

      if (response.status === 200) {

        let u_firstname = "Your first name";
        let u_middlename = "Your middle name";
        let u_lastname = "Your last name";
        let u_gender = "Your gender name";
        let u_phone = "Your phone name";
        let icon = "https://s3.timeweb.cloud/2b22bd72-555c46b6-3494-47e1-aec6-b13be2d5f5f6/icon.png";

        if (response.data.firstname){ u_firstname = response.data.firstname;}
        if (response.data.middlename){ u_middlename = response.data.middlename;}
        if (response.data.lastname){ u_lastname = response.data.lastname;}
        if (response.data.gender){ u_gender = response.data.gender;}
        if (response.data.phone){ u_phone = response.data.phone;}
        if (response.data.icon_url){ icon = response.data.icon_url;}

        localStorage.setItem("user_firstname", u_firstname);
        localStorage.setItem("user_middlename", u_middlename);
        localStorage.setItem("user_lastname", u_lastname);
        localStorage.setItem("user_gender", u_gender);
        localStorage.setItem("user_phone", u_phone);
        localStorage.setItem("user_icon", icon);

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
          localStorage.setItem("user_icon", icon_url);
        }
      }
    } catch (error) {

      console.error("Ошибка при обновлении юзера:", error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },
}));
