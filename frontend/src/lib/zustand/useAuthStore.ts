import { create } from "zustand";
import { persist } from "zustand/middleware";


type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
};

// `persist`를 적용한 Zustand 스토어 생성
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      isAuthenticated: false,

      // 로그인(토큰 세팅) 시
      setAuth: (token: string) =>
        set(() => ({
          token,
          isAuthenticated: Boolean(token),
        })),

      // 로그아웃 시
      logout: () =>
        set(() => ({
          token: null,
          isAuthenticated: false,
          memberInfo: null,
        })),
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장할 키
    }
  )
);

