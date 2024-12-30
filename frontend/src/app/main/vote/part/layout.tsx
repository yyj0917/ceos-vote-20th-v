"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Next.js 13+ App Router
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";

export default function PartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 현재 라우트 경로
  const pathname = usePathname();
  // 진행도(퍼센트)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // pathname에 따라 진행도 결정
    if (pathname === "/main/vote/part") {
        setProgress(33);
    } else if (pathname === "/main/vote/part/front/step2") {
        setProgress(66);
    } else if (pathname === "/main/vote/part/front/step3") {
        setProgress(100);
    } else if (pathname === "/main/vote/part/back/step2") {
        setProgress(66);
    } else if (pathname === "/main/vote/part/back/step3") {
        setProgress(100);
    } else {
        // 그 외 경로: 0 or -1 등으로 설정
        setProgress(0);
    }
  }, [pathname]);

  return (
    <div className="px-6 py-6 w-full h-full">
        <div className="w-full flex flex-col items-center">
            {/* Header */}
            <Header title="파트장 투표" className="text-logo py-6"/>
            {/* Bar */}
            <div className="w-full border-2 border-grey450 mb-10"></div>
            {/* 진행 바 */}
            <Progress value={progress} className="w-[90%] bg-grey450" />
        </div>
        <div className="w-full h-[80%]">
            {children}
        </div>
    </div>
  );
}
