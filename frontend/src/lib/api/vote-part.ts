import axiosConfig from "./config/axiosConfig";

// GET : 파트 후보 조회
export async function getPartList(part: "FRONT" | "BACK") {
    if (!["FRONT", "BACK"].includes(part)) {
        throw new Error("유효하지 않은 파트입니다.");
    // union type 사용해서 유용한 part 선언했는지 체크
    }

    try {
        const response = await axiosConfig.get("/api/votes/candidates", {
        params: { type: "leader", part },
        });
    return response.data;
    }   catch (error: any) {
    throw error;
    }
}

{/*

    
// 팀 투표 post api
export async function postTeamVote(teamname: string) {
  try {
    const response = await axiosConfig.post("/votes", {}, {
        params: {
            type: "team",
            voted: teamname,
        }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// 팀 투표 결과 조회 get api
export async function getTeamVoteResult() {
  try {
    const response = await axiosConfig.get("/api/votes/results", {
      params: {
        type: "team",
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};



    */}