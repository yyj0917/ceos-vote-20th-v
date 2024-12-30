"use client";

import { AlertSubmit } from "@/app/main/_components/alert-submit";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../_components/spinner.css"; // CSS 파일 가져오기
import { useRouter } from "next/navigation";


export default function Step2() {
    const team = ["MUSAI", "CakeWay", "CoffeeDeal", "PhotoGround", "AngelBridge"];
    const [selectedTeam, setSelectedTeam] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();

    const handleVote = (teamName: string) => {
        if (teamName === selectedTeam) {
            setSelectedTeam("");
        } else {
            setSelectedTeam(teamName);
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
                navigate.push("/main/vote/demoday/step3");
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
                    <div className="w-full space-y-4">
                        {team.map((team, index) => (
                        <div
                            key={index}
                            className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed"
                        >
                            <h1>{team}</h1>
                            <Heart
                            size={36}
                            className={
                                team === selectedTeam
                                ? "text-newRed cursor-pointer fill-newRed"
                                : "text-grey450 fill-none hover:text-newRed cursor-pointer"
                            }
                            onClick={() => handleVote(team)}
                            />
                        </div>
                        ))}
                    </div>
                    <AlertSubmit handleSubmit={handleSubmit} voteCategory="데모데이" />
                </>
            )}
        </div>
        
    )    
}

