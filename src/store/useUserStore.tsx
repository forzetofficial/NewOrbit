import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { UserId, User } from "../types";

interface UseUserStore {
  user: User;
  setUser: (user: User) => void;

  error: boolean;
  setError: (error: boolean) => void;

  get: (id: UserId) => Promise<void>;

  update: (id: UserId, icon: string) => Promise<void>;

  updateInfo: (
    id: UserId,
    firstname: string,
    gender: string,
    icon_url: string,
    lastname: string,
    middlename: string,
    phone: string
    ) => Promise<void>;
}

export const useUserStore = create<UseUserStore>((set, get) => ({
  user: {} as User,
  setUser: (user) => set({ user }),

  error: false,
  setError: (error) => set({ error }),

  get: async (id) => {
    try {
      const response = await axios.get(
        "https://cookhub.space/api/v1/user/" + id
      );

      get().setUser(response.data);
    } catch (error) {
      console.error("Ошибка при получении юзера:", error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },


  
  update: async (id, icon_url) => {
    try {
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "accessToken"
      )}`;
      const response = await axios.put(
        "https://cookhub.space/api/v1/user/" + id,
        {
          icon_url,
        }
      );

      if (response.status === 200) {
        if (icon_url != "") {
          localStorage.setItem("user_icon", icon_url);
        }
      }
    } catch (error) {
      console.error("Ошибка при обновлении юзера:", error);
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },

  updateInfo: async (id, firstname, gender, icon_url, lastname, middlename, phone) => {
    try {
      icon_url = '../components/IconUI/logout_659989.png';
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
      const response = await axios.put(
        "https://cookhub.space/api/v1/user/" + id,
        {
          firstname,
          gender,
          icon_url,
          lastname,
          middlename,
          phone,
        }
      );

      if (response.status === 200) {
        console.log("access");
      }
    } catch (error) {
      console.error("Ошибка при обновлении юзера:", error);
      
      if (error.status === 401) {
        const refreshtoken = localStorage.getItem("accessToken");
        const response = await axios.put(
          "https://cookhub.space/api/v1/refresh",
          {
            refreshtoken,
          }
        );
      }

      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },
}));
