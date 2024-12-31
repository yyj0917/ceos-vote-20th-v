import axiosInstance from "./config/axiosConfig";

/**
 * 회원 정보 조회 (GET /members)
 * Header에 `access` key로 토큰을 실어 보냄.
 */
export async function getMemberProfile(token: string | null) {
  const response = await axiosInstance.get("/members", {
    headers: {
      access: token, 
    },
  });

  return response.data;
}
