import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { UserId } from "../types";
import { jwtDecode } from 'jwt-decode';

interface UseAuthStore {
  userId: UserId;
  error: boolean;
  email: string;
  accessToken: string;
  refreshToken: string;

  setUserId: (userId: UserId) => void;
  setEmail: (email: string) => void;
  setaccessToken: (accessToken: string) => void;
  setrefreshToken: (refreshToken: string) => void;
  setError: (error: boolean) => void;

  signUp: (
    email: string,
    password: string,
    username: string,
    navigate: (path: string) => void
  ) => Promise<void>;

  signIn: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;

  forgotPassword: (email: string) => Promise<true | undefined>;

  getEmail: () => string;
  getaccessToken: () => string;
  getrefreshToken: () => string;
}

export const useAuthStore = create<UseAuthStore>((set, get) => ({
  userId: null,
  error: false,
  email: "",
  accessToken: "",
  refreshToken: "",

  setUserId: (userId) => set({ userId }),
  setEmail: (email) => set({ email }),
  setaccessToken: (accessToken) => set ({accessToken}),
  setrefreshToken: (refreshToken) => set ({refreshToken}),
  setError: (error) => set({ error }),

  signUp: async (email, password, username, navigate) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
    const loginRegex = /^[a-z0-9](-?[a-z0-9]){2,20}$/i;

    if (
      loginRegex.test(username) &&
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      try {
        const response = await axios.post(
          "https://cookhub.space/api/v1/auth/register",
          {
            email,
            password,
            username,
          }
        );

        if (response.status === 200) {
          navigate("/auth"); // Перенаправление на страницу входа после успешной регистрации
        }
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        set({ error: true });
        setTimeout(() => set({ error: false }), 3000);
      }
    } else {
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },

  signIn: async (email, password, navigate) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      try {
        const response = await axios.post(
          "https://cookhub.space/api/v1/auth/login",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          const token = response.data.access_token;
          const reftoken = response.data.refresh_token;
          const user = jwtDecode(token) as any;

          get().setUserId(user.uid);
          get().setEmail(email);
          get().setaccessToken(token);
          get().setrefreshToken(reftoken);

          localStorage.setItem("userId", user.uid);
          localStorage.setItem("accessToken", token);
          localStorage.setItem("email", email);
          localStorage.setItem("refreshToken", reftoken);

          navigate("/homemain");
        }
      } catch (error) {
        console.error("Ошибка при входе:", error);
        set({ error: true });
        setTimeout(() => set({ error: false }), 3000);
      }
    } else {
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },

  forgotPassword: async (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (emailRegex.test(email)) {
      try {
        const response = await axios.post(
          "https://cookhub.space/api/v1/auth/send_password_link",
          {
            email,
          }
        );

        if (response.status === 200) {
          return true; // Успешная отправка
        }
      } catch (error) {
        console.error("Ошибка при отправке ссылки:", error);
        set({ error: true });
        setTimeout(() => set({ error: false }), 3000);
      }
    } else {
      set({ error: true });
      setTimeout(() => set({ error: false }), 3000);
    }
  },

  getEmail: () => get().email,
  getaccessToken: () => get().accessToken,
  getrefreshToken: () => get().refreshToken,
}));
