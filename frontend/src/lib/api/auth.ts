// src/lib/api/auth.ts

import axios from "axios";
import axiosInstance from "./config/axiosConfig";
import { useAuthStore } from "../zustand/useAuthStore";
import { set } from "react-hook-form";

// 회원가입 API
// (중복 체크는 별도 API로 할 수도, 여기서 에러를 받아 처리할 수도 있음)
export async function RegisterAPI({
  loginId,
  password,
  email,
  username,
  part,
  team,
}: {
  loginId: string;
  password: string;
  email: string;
  username: string;
  part: string;
  team: string;
}) {
  // 백엔드가 요구하는 엔드포인트 (/api/signup 등)와 요청 형식에 맞춰 전송
  const res = await axios.post("http://43.201.23.26:80/api/auth", {
    loginId,
    password,
    email,
    username,
    part,
    team,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
    timeout : 1000,
  });
  // res.data에 백엔드 응답이 들어있음
  return res.data;
}

// 로그인 API
// 백엔드가 "POST /api/login" 형식으로 토큰을 내려준다고 가정
export async function LoginAPI(loginId: string, password: string) {
    const res = await axios.post("http://43.201.23.26:80/api/login", {
        loginId,
        password,
    }, {
        headers: {
        "Content-Type": "application/json",
        },
        timeout : 1000,
    });

    // res.headers access 토큰 받기
    const access = res.headers["access"];


    // 로컬 스토리지에 저장(문자열로)
    if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", access);
    }

    return res.data; 
}

// 로그아웃 API (Optional)
// 백엔드가 별도 요청 필요 없다면 로컬 스토리지 토큰만 제거
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
}
