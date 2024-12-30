"use client";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

// type TeamVote = {
//     name: string;
//     votes: number;
//   };

export default function Step3() {
    // const [teamData, setTeamData] = useState<TeamVote[]>([]);

    const team = ["MUSAI", "CakeWay", "CoffeeDeal", "PhotoGround", "AngelBridge"];
    const [winnerTeam, setWinnerTeam] = useState("MUSAI");
    const [isVisible, setIsVisible] = useState(false);


    // useEffect(() => {
    //     // 예: "/api/votes" 로부터 팀별 투표 현황을 받아온다고 가정
    //     // 실제 백엔드 API 경로에 맞춰 수정
    //     async function fetchTeamVotes() {
    //       try {
    //         const res = await fetch("/api/votes");
    //         const data = await res.json(); 
    //         // data는 예: [{ name: "MUSAI", votes: 5 }, { name: "CakeWay", votes: 3 }, ...]
      
    //         setTeamData(data);
      
    //         // 우승 팀(가장 votes 높은 팀) 계산
    //         const maxVoteTeam = data.reduce((acc: TeamVote, cur: TeamVote) => {
    //           return cur.votes > acc.votes ? cur : acc;
    //         });
    //         setWinnerTeam(maxVoteTeam.name);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     }
      
    //     fetchTeamVotes();
    //   }, []);
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
                {team.map((team, index) => {
                // 우승 팀 여부
                const isWinner = team === winnerTeam;

                return (
                    <div
                    key={index}
                    className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                    >
                    <div className="relative flex items-center gap-2">
                        <h1>{team}</h1>
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
        </div>

    )
}