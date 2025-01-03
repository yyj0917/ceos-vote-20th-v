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
    const [selectedBack, setselectedBack] = useState("");
    const [backList, setBackList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // 백 리스트 가져오기
    const getBack = async () => {
        try{
            const res = await getPartList("BACK");
            if (Array.isArray(res.data)){
                setBackList(res.data);
                console.log(res.data);
            } else {
                throw new Error("안댐댐")
            }
        }
        catch(err){
        }
    }

    useEffect(() => {
        getBack();
    }, []);

    // 투표할 백엔드원 선택하기
    const handleVote = (backName: string) => {
        if (backName === selectedBack) {
            // 같은 사람을 한번 더 클릭한 경우
            setselectedBack("")
            console.log("선택된 사람: " + selectedBack); // 디버깅용
        } else {
            setselectedBack(backName);
            console.log("선택된 사람: " + selectedBack); // 디버깅용
        }
    };

    // 투표하기
    const handleSubmit = async () => {
        if (!selectedBack) {
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
            await postPartVote("BACK", selectedBack);
            setIsLoading(true);
            console.log(selectedBack + "투표 API 호출"); // 디버깅용
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
                router.push("/main/vote/part/back/step3");
            }, 3000);
        }
        // 컴포넌트 언마운트나 isLoading이 false로 바뀔 때 타이머 정리
        return () => {
            if (timer) {
                clearTimeout(timer)
            };
            setIsLoading(false);
        };
    }, [isLoading]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <>
                    <div className="w-full space-y-4 overflow-y-auto scrollbar-hide">
                        {backList.map((back, index) => (
                        <div
                            key={index}
                            className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                        >
                            <h1>{back}</h1>
                            <Heart
                            size={36}
                            className={
                                back === selectedBack
                                ? "text-newRed cursor-pointer fill-newRed"
                                : "text-grey450 fill-none hover:text-newRed cursor-pointer"
                            }
                            onClick={() => handleVote(back)}
                            />
                        </div>
                        ))}
                    </div>
                    <AlertSubmit handleSubmit={handleSubmit} voteCategory="백엔드 파트장" />
                </>
            )}
        </div>
    )
}

