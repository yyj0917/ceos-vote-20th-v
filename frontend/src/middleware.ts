// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 일단 가정. 추후 백엔드로직보고 변경 'userToken'이라는 이름의 쿠키로 로그인 여부 판별
    const accessToken = request.headers.get("access");
    // 사용자가 "/" 경로로 진입했을 때
    if (request.nextUrl.pathname === "/") {
        // 로그인되어 있는지(토큰 존재) 확인
        if (accessToken) {
        // 로그인 상태라면 "/main"으로 이동
        const url = request.nextUrl.clone();
        url.pathname = "/main";
        return NextResponse.redirect(url);
        } else {
        // 로그인되어 있지 않다면 "/" 페이지 그대로
        return NextResponse.next();
        }
    }

    // 위 조건 외 경로는 계속 진행
    return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ["/"],
};
