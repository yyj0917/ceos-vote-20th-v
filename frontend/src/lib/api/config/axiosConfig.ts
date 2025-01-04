// src/lib/config/axiosConfig.ts

import axios from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://musai-server.store",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

// 요청(request) 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기 - 브라우저 환경 체크.
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token && config.headers) {
      // 헤더에 담아서 보낸다 (Bearer 방식 가정)
      config.headers["access"] = token; // access 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답(response) 인터셉
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러가 401 -> 토큰이 만료되었을 때.
    if (typeof window !== "undefined") {
        // 토큰 제거 (로컬 스토리지 사용 시)
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.');

            window.location.href = "/";
            }
        }
  
    return Promise.reject(error);
  }
);

export default axiosInstance;
