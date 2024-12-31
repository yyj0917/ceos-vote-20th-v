"use client";

import { AlertSubmit } from "@/app/main/_components/alert-submit";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../_components/spinner.css"; // CSS 파일 가져오기
import { useRouter } from "next/navigation";
import { getTeamList, postTeamVote } from "@/lib/api/vote-demoday";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";


export default function Step2() {
    const [selectedTeam, setSelectedTeam] = useState("");
    const [ teamList, setTeamList ] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();

    // 팀 리스트 가져오기
    const getTeam = async () => {
        try {
            const res = await getTeamList();
            setTeamList(res.data);
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getTeam();
    }, []);

    // 투표할 팀 정하기
    const handleVote = (teamName: string) => {
        if (teamName === selectedTeam) {
            setSelectedTeam("");
        } else {
            setSelectedTeam(teamName);
        }
    };
    // 투표 제출
    const handleSubmit = async () => {     
        try {
            // api 요청 로직
            const res = await postTeamVote(selectedTeam);
            setIsLoading(true);
            return;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;

                // 409 재투표 에러처리
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
        }
    }
    // loading spinner animation
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
                        {teamList.map((team, index) => (
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

