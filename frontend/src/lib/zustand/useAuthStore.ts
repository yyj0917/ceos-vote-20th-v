import { create } from "zustand";

// 스토어 상태 타입 정의
type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
};

// create()를 통해 zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
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
    })),
}));
