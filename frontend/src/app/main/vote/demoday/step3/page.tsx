"use client";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { getTeamVoteResult } from "@/lib/api/vote-demoday";

type TeamVote = {
    name: string;
    votes: number;
  };

export default function Step3() {
    const [teamData, setTeamData] = useState<TeamVote[]>([]);
    const [winnerTeam, setWinnerTeam] = useState<string>("");

    const handleVoteResult = async () => {
        try {
            // api 요청 로직
            const res = await getTeamVoteResult();
            setTeamData(res.data);
            setWinnerTeam(res.data[0].name);
            return;
        }
        catch (err) {
        }
    }

    useEffect(() => {
        handleVoteResult();
      }, []);

    // 폭죽 애니메이션
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
        <div className="w-full h-[90%] flex flex-col justify-center items-center">

            <div className="w-full space-y-4">
                {teamData.map((team, index) => {
                    // 우승 팀 여부
                    const isWinner = team?.name === winnerTeam;

                    return (
                        <div
                            key={index}
                            className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                            >
                            <div className="relative flex items-center gap-2">
                                <h1>{team?.name}</h1>
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
                            <p className="w-8 h-8 flex justify-center items-center bg-newRed rounded-full text-head0 text-white">
                                {team?.votes}
                            </p>
                        </div>
                    );
                    })}
            </div>
        </div>

    )
}