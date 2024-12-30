import axiosConfig from "./config/axiosConfig";

// 팀 리스트 get api
export async function getTeamList() {
  try {
    const response = await axiosConfig.get("/api/votes/candidates", {
      params: { type: "team" },
    });
    return response.data; 
  } catch (error: any) {
    throw error; 
  }
};

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
