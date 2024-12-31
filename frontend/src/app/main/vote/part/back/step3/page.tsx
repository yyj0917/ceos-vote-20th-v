"use client";
import { GoOtherVote } from "@/app/main/_components/alert-goOtherVote";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Step3() {
    // const [teamData, setTeamData] = useState<TeamVote[]>([]);

    const back = ["김연수", "이채원", "이한슬", "최서지", "유지민", "남승현", "나혜인", "문서영", "임가현", "황서아"];
    const [winnerFront, setWinnerFront] = useState("MUSAI");
    // const [isVisible, setIsVisible] = useState(false);
    const navigate = useRouter();

    const handleGoOtherVote = () => {
        console.log("다른투표 버튼 클릭");
        navigate.push("/main/vote");
    }

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
        <div className="w-full h-[90%] flex flex-col justify-center items-center gap-10">

            <div className="w-full space-y-4">
                {back.map((back, index) => {
                // 우승 팀 여부
                const isWinner = back === winnerFront;

                return (
                    <div
                    key={index}
                    className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                    >
                    <div className="relative flex items-center gap-2">
                        <h1>{back}</h1>
                        {/* 우승 팀이면 왕관 아이콘 표시 */}
                        {isWinner && (
                        <Crown
                            size={28}
                            className="absolute left-[-35%] bottom-6 text-newRed" 
                            style={{ transform: "rotate(-25deg)" }}
                        />
                        )}
                    </div>

                    {/* 투표 수 표시 예시 */}
                    <p className="w-8 h-8 flex justify-center items-center bg-newRed rounded-full text-head0 text-white">3</p>
                    </div>
                );
                })}
            </div>
            <GoOtherVote handleGoOtherVote={handleGoOtherVote}/>
        </div>

    )
}