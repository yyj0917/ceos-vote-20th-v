"use client";

import { AlertSubmit } from "@/app/main/_components/alert-submit";
import { Eraser, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../../_components/spinner.css"; // CSS 파일 가져오기
import { useRouter } from "next/navigation";
import { getPartList } from "@/lib/api/vote-part";

export default function Step2() {
    const front = ["강다혜", "김류원", "권혜인", "박지수", "송유선", "이가빈", "이희원", "윤영준", "지민재", "최지원"];
    const [selectedFront, setselectedFront] = useState("");
    const [frontList, setFrontList] = useState<string[]>([]); // API 사용해서 불러오기
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // 프론트 리스트 가져오기
    const getFront = async () => {
        try{
            const res = await getPartList("FRONT");
            if (Array.isArray(res.data)){
                setFrontList(res.data);
                console.log(res.data);
            } else {
                throw new Error("안댐댐")
            }
        }
        catch(err){
        }
    }

    useEffect(() => {
        getFront();
    }, []);

    const handleVote = (frontName: string) => {
        if (frontName === selectedFront) {
            setselectedFront("");
        } else {
            setselectedFront(frontName);
        }
      };
    const handleSubmit = () => {
        console.log("투표 완료");

        setIsLoading(true);
        // api 요청 로직
    }
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isLoading) {
            // 로딩 상태가 true가 된 시점에만 타이머를 등록
            timer = setTimeout(() => {
                router.push("/main/vote/part/front/step3");
          }, 3000);
        }
        // 컴포넌트 언마운트나 isLoading이 false로 바뀔 때 타이머 정리
        return () => {
          if (timer) {
            clearTimeout(timer)
            setIsLoading(false);
          };
        };
      }, [isLoading]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <>
                    <div className="w-full space-y-4 overflow-y-auto scrollbar-hide">
                        {front.map((front, index) => (
                        <div
                            key={index}
                            className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                        >
                            <h1>{front}</h1>
                            <Heart
                            size={36}
                            className={
                                front === selectedFront
                                ? "text-newRed cursor-pointer fill-newRed"
                                : "text-grey450 fill-none hover:text-newRed cursor-pointer"
                            }
                            onClick={() => handleVote(front)}
                            />
                        </div>
                        ))}
                        <AlertSubmit handleSubmit={handleSubmit} voteCategory="프론트엔드 파트장" />
                    </div>
                </>
            )}
        </div>
    )
}

