"use client"

import { getMemberProfile } from "@/lib/api/member";
import { useEffect, useState } from "react"

export default function MemberShow() {
    const [memberData, setMemberData] = useState<any>(null);

    useEffect(() => {
        handleMemberShow();
    }, [])

    const handleMemberShow = async () => { 
        try {
            // api 요청 로직
            const token = localStorage.getItem("accessToken");
            const res = await getMemberProfile(token);
            setMemberData(res.data);
            return;
        }
        catch (err) {
        }
    }
    return (
        <div className="text-grey350 text-head0">
            <span>{memberData?.username}</span>
            <span className="text-grey550"> 님 환영합니다</span>
        </div>
    )
}
