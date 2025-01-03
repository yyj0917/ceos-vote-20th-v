"use client";
import { GoOtherVote } from "@/app/main/_components/alert-goOtherVote";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import confetti from "canvas-confetti";

import { getPartVoteResult } from "@/lib/api/vote-part";

type BackVote = {
    name: string;
    team: string;
    votes: number;
  };

export default function Step3() {
  const [PartData, setPartData] = useState<BackVote[]>([]);
  const [winnerBack, setWinnerBack] = useState("MUSAI");
  const navigate = useRouter();

  const handleVoteResult = async () => {
    try {
      // api 요청 로직
      const res = await getPartVoteResult("BACK");
      setPartData(res.data);
      setWinnerBack(res.data[0].name);
      console.log(res.data);
      return;
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                // 409 재투표 에러처리 - priority
                if (status === 404) {
                    toast({
                        variant: "destructive",
                        title: "결과 조회 실패",
                        description: err.response?.data.message,
                        action: <ToastAction altText="다시 시도">Try again</ToastAction>,
                      });
                    return;
                }
            }
            toast({
                variant: "destructive",
                title: "오류 발생",
                description: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
                action: <ToastAction altText="다시 시도">Try again</ToastAction>,
            });
        }
  }
    const handleGoOtherVote = () => {
        console.log("다른투표 버튼 클릭");
        navigate.push("/main/vote");
    }

    useEffect(() => {
      handleVoteResult();
    }, []);
  
    useEffect(() => {
        const end = Date.now() + 1.5 * 1000; // 15초 동안 실행
        const colors = ["#bb0000", "#ffffff"]; // 축제 색상
    
        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 }, // 왼쪽에서 발사
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 }, // 오른쪽에서 발사
            colors: colors,
          });
    
          if (Date.now() < end) {
            requestAnimationFrame(frame); // 15초 동안 반복
          }
        })();
      }, []);
      
    return (
        <div className="w-full h-[90%] flex flex-col justify-center items-center gap-7">

            <div className="w-full space-y-4 overflow-y-auto scrollbar-hide">
                {PartData.map((back, index) => {
                // 우승 팀 여부
                const isWinner = back?.name === winnerBack;

                return (
                    <div
                    key={index}
                    className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                    >
                    <div className="relative flex items-center gap-">
                        <h1>{back?.name}</h1>
                        {/* 우승 파트장이면 왕관 아이콘 표시 */}
                        {isWinner && (
                        <Crown
                            size={28}
                            className="absolute left-[-35%] bottom-6 text-newRed" 
                            style={{ transform: "rotate(-25deg)" }}
                        />
                        )}
                    </div>

                    {/* 투표 수 표시 예시 */}
                    <p className="w-8 h-8 flex justify-center items-center bg-newRed rounded-full text-head0 text-white">
                      {back?.votes}
                    </p>
                    </div>
                );
                })}
            </div>
            <GoOtherVote handleGoOtherVote={handleGoOtherVote}/>
        </div>

    )
}