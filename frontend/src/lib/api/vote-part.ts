import axiosConfig from "./config/axiosConfig";

// 이름은 다 part로 통일하고 따로 프백 호출

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

// POST : 파트 투표하기
export async function postPartVote(part: "FRONT"|"BACK", partname: string) {
    if (!["FRONT", "BACK"].includes(part)) {
        throw new Error("유효하지 않은 파트입니다.");
    }

    try {
    const response = await axiosConfig.post("/votes", {}, {
        params: {
            type: "leader",
            part,
            voted: partname,
            // voted 맞는지 노션이랑 체크하기
        }
    });
    return response.data;
    }   catch (error: any) {
    throw error;
    }
};

// GET : 파트 투표 결과 조회
export async function getPartVoteResult(part: "FRONT"|"BACK") {    if (!["FRONT", "BACK"].includes(part)) {
    throw new Error("유효하지 않은 파트입니다.");
    // union type 사용해서 유용한 part 선언했는지 체크
    }

    try {
        const response = await axiosConfig.get("/api/votes/results", {
        params: {
            type: "leader",
            part
        }
    });
    return response.data;
    }   catch (error: any) {
    throw error;
    }
};