// src/lib/config/axiosConfig.ts

import axios from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://43.201.23.26:80",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청(request) 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/register")) {
        return config;
      }
    // localStorage에서 토큰 가져오기
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token && config.headers) {
      // 헤더에 담아서 보낸다 (Bearer 방식 가정)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답(response) 인터셉터 (필요하다면)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 예: 토큰 만료 시 로직, 에러 공통 처리 등
    return Promise.reject(error);
  }
);

export default axiosInstance;
