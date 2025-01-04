import { z } from "zod";

// 유효성 검사용 스키마

// 회원가입 폼 스키마
export const registerSchema = z
  .object({
    username: z.string().nonempty("이름을 입력하세요."),
    loginId: z.string().nonempty("ID를 입력하세요."),
    password: z
      .string()
      .nonempty("비밀번호를 입력하세요.")
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string().nonempty("비밀번호 확인을 입력하세요."),
    email: z
      .string()
      .nonempty("이메일을 입력하세요.")
      .email("유효한 이메일 주소가 아닙니다."),
    team: z.string().nonempty("팀을 선택하세요."),
    part: z.string().nonempty("Part를 선택하세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 어떤 필드에 에러 메시지를 표시할지
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// 로그인 폼 스키마
export const loginSchema = z
    .object({
        loginId: z.string().nonempty("ID를 입력하세요."),
        password: z.string().nonempty("비밀번호를 입력하세요."),
    });

export type LoginSchema = z.infer<typeof loginSchema>;
