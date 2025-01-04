"use client";
import { GoOtherVote } from "@/app/main/_components/alert-goOtherVote";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

import { getPartVoteResult } from "@/lib/api/vote-part";

type FrontVote = {
    name: string;
    team: string;
    votes: number;
  };

export default function Step3() {
    const [PartData, setPartData] = useState<FrontVote[]>([]);
    const [winnerFront, setWinnerFront] = useState("MUSAI");

  const navigate = useRouter();
  
  const handleVoteResult = async () => {
    try {
      // api 요청 로직
      const res = await getPartVoteResult("FRONT");
      setPartData(res.data);
      setWinnerFront(res.data[0].name);
      console.log(res.data);
      return;
    }
    catch (err) {
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
                {PartData.map((front, index) => {
                // 우승 팀 여부
                const isWinner = front?.name === winnerFront;

                return (
                    <div
                    key={index}
                    className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                    >
                    <div className="relative flex items-center gap-">
                        <h1>{front?.name}</h1>
                        {/* 우승 파트장이면 왕관 아이콘 표시 */}
                        {isWinner && (
                        <Crown
                            size={28}
                            className="absolute left-[-65%] bottom-2 text-newRed" 
                            style={{ transform: "rotate(-25deg)" }}
                        />
                        )}
                    </div>

                    {/* 투표 수 표시 예시 */}
                    <p className="w-8 h-8 flex justify-center items-center bg-newRed rounded-full text-head0 text-white">
                      {front?.votes}
                    </p>
                    </div>
                );
                })}
            </div>
            <GoOtherVote handleGoOtherVote={handleGoOtherVote}/>
        </div>

    )
}