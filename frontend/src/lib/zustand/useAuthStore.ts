// import { create } from "zustand";
// import { getMemberProfile } from "../api/member";

// // 스토어 상태 타입 정의
// type MemberInfo = {
//     loginId: string;
//     username: string;
//     part: string;
//     team: string;
// };
  

// type AuthState = {
//   token: string | null;
//   isAuthenticated: boolean;
//   memberInfo: MemberInfo | null; // Adjust the type as per the API response
//   setAuth: (token: string) => void;
//   fetchMemberInfo: () => Promise<void>;
//   logout: () => void;
// };

// // create()를 통해 zustand 스토어 생성
// export const useAuthStore = create<AuthState>((set) => ({
//     token: null,
//     isAuthenticated: false,
//     memberInfo: null,

//     // 로그인(토큰 세팅) 시
//     setAuth: (token: string) =>
//         set(() => ({
//         token,
//         isAuthenticated: Boolean(token),
//         })),
//     fetchMemberInfo: async () => {
//         try {
//             // Zustand의 `get` 없이 직접 상태를 가져와 사용 - 이거 좀 알아봐야할듯 partial
//             set((state : any) => {
//             if (!state.token) {
//                 console.error("토큰이 없습니다. 멤버 정보를 가져올 수 없습니다.");
//                 return state; // 상태 변화 없이 그대로 반환
//             }
    
//             // API 요청
//             getMemberProfile(state.token).then((data) => {
//                 set({ memberInfo: data });
//                 console.log(memberInfo);
//                 });
//             });
//         } catch (error) {
//             console.error("멤버 정보 가져오기 실패:", error);
//         }
//         },


//     // 로그아웃 시
//     logout: () =>
//         set(() => ({
//         token: null,
//         isAuthenticated: false,
//         })),
// }));
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMemberProfile } from "../api/member";

// // 스토어 상태 타입 정의
// type MemberInfo = {
//   loginId: string;
//   username: string;
//   part: string;
//   team: string;
// };

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
//   memberInfo: MemberInfo | null; // Adjust the type as per the API response
  setAuth: (token: string) => void;
//   fetchMemberInfo: () => Promise<void>;
  logout: () => void;
};

// `persist`를 적용한 Zustand 스토어 생성
export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
    //   memberInfo: null,

      // 로그인(토큰 세팅) 시
      setAuth: (token: string) =>
        set(() => ({
          token,
          isAuthenticated: Boolean(token),
        })),

    //   // 멤버 정보 가져오기
    //   fetchMemberInfo: async () => {
    //     const state = get();
    //     if (!state.token) {
    //       console.error("토큰이 없습니다. 멤버 정보를 가져올 수 없습니다.");
    //       return;
    //     }

    //     try {
    //       const data = await getMemberProfile(state.token);
    //       set({ memberInfo: data });
    //     } catch (error) {
    //       console.error("멤버 정보 가져오기 실패:", error);
    //     }
    //   },

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

