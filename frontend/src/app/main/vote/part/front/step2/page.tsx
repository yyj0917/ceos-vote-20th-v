"use client";

import { AlertSubmit } from "@/app/main/_components/alert-submit";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../../_components/spinner.css"; // CSS 파일 가져오기
import { useRouter } from "next/navigation";

export default function Step2() {
    const front = ["강다혜", "김류원", "권혜인", "박지수", "송유선", "이가빈", "이희원", "윤영준", "지민재", "최지원"];
    const [selectFront, selectedFront] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();

    const handleSubmit = () => {
        console.log("투표 완료");

        setIsLoading(true);
        // api 요청 로직
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <>
                    <div className="w-full space-y-4">
                    <div className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                        >
                        <h1>테스트</h1>
                    </div>
                    </div>
                    <AlertSubmit handleSubmit={handleSubmit} />
                    {/* Alert 코드에서 [투표] 부분 수정 필요*/}
                </>
            )}
        </div>
    )
}

