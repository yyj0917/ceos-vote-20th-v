"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AlertSubmit } from "@/app/main/_components/alert-submit";
import { getPartList, postPartVote } from "@/lib/api/vote-part";
import axios from "axios";

import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

import { Heart } from "lucide-react";
import "../../../../_components/spinner.css";

export default function Step2() {
    const [selectedFront, setselectedFront] = useState("");
    const [frontList, setFrontList] = useState<string[]>([]); // API 사용해서 불러오기
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log("isLoading 상태 변경:", isLoading);
    }, [isLoading]);
    
    // 프론트 리스트 가져오기
    const getFront = async () => {
        try{
            const res = await getPartList("FRONT");
            if (Array.isArray(res.data)){
                setFrontList(res.data);
                console.log(res.data);
            } else {
                throw new Error("Invalid data format")
            }
        }
        catch(err){
        }
    }

    useEffect(() => {
        getFront();
    }, []);

    // 투표할 프론트원 선택하기
    const handleVote = (frontName: string) => {
        if (frontName === selectedFront) {
            setselectedFront("")
        } else {
            setselectedFront(frontName);
        }
    };

    // 투표하기
    const handleSubmit = async () => {
        if (!selectedFront) {
            toast({
                variant: "destructive",
                title: "파트원 선택 오류",
                description: "파트원을 선택해주세요.",
                action: <ToastAction altText="다시 시도">Try again</ToastAction>,
            });
            return;
        }
        try {
            // api 요청 로직
            await postPartVote("FRONT", selectedFront);
            setIsLoading(true);
            return;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                // 409 재투표 에러처리 - priority
                if (status === 409) {
                    toast({
                        variant: "destructive",
                        title: "중복된 정보",
                        description: err.response?.data.message,
                        action: <ToastAction altText="다시 시도">Try again</ToastAction>,
                        });
                    return;
                }
                // 400 자기 팀 투표 에러처리
                if (status === 400) {
                    toast({
                        variant: "destructive",
                        title: "팀 선택 오류",
                        description: err.response?.data.message,
                        action: <ToastAction altText="다시 시도">Try again</ToastAction>,
                        });
                    return;
                }
            }
            // 기타 에러 처리
            toast({
                variant: "destructive",
                title: "오류 발생",
                description: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
                action: <ToastAction altText="다시 시도">Try again</ToastAction>,
            });
        }
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (isLoading) {
            // 로딩 상태가 true가 된 시점에만 타이머를 등록
            timer = setTimeout(() => {
                router.push("/main/vote/part/front/step3");
                console.log("라우터 호출");
            }, 3000);
        }
        // 컴포넌트 언마운트나 isLoading이 false로 바뀔 때 타이머 정리
        return () => {
            if (timer) {
                clearTimeout(timer)
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
                        {frontList.map((front, index) => (
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
                    </div>
                    <AlertSubmit handleSubmit={handleSubmit} voteCategory="프론트엔드 파트장" />
                </>
            )}
        </div>
    )
}

