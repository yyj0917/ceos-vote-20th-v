"use client"

import { House, Menu, Undo2, UserRoundPen } from "lucide-react"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getMemberProfile } from "@/lib/api/member";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { AlertLogut } from "./alert-logout";

type MemberInfo = {
    loginId: string;
    username: string;
    part: string;
    team: string;
};

export default function NavigationBar() {
    const router = useRouter()
    const token = localStorage.getItem("accessToken");
    const [memberInfo, setMemberInfo] = useState<MemberInfo>();
    const { logout } = useAuthStore();



    const modalArr = [
        {
            "name": "name",
            "content": memberInfo?.username,
        },
        {
            "name": "team",
            "content": memberInfo?.team,
        },
        {
            "name": "part",
            "content": memberInfo?.part,
        }
    ];

    const handleMemberOpen = async () => {
        try {
            const res = await getMemberProfile(token);
            setMemberInfo(res.data);
            return;
        }
        catch (err) {
        }
    }
    const handleLogout = () => {

        logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
    }

    return (
        <div className="absolute bottom-0 flex justify-between items-center px-10 py-6 w-full h-auto text-grey550">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        onClick={handleMemberOpen}
                        >
                        <UserRoundPen size={30} className="hover:text-newRed"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 ">
                    <DropdownMenuLabel>
                        <span className="text-grey350">
                            {modalArr.map((item, index) => (
                                <p key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>{item.content}</span>
                                </p>
                            ))}
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <AlertLogut handleLogout={handleLogout}/>
                </DropdownMenuContent>
            </DropdownMenu>
            <button
                onClick={() => router.push("/main")}>
                <House size={30} className="hover:text-newRed"/>
            </button>
            <button
                onClick={() => router.back()}>
                <Undo2 size={30} className="hover:text-newRed"/>
            </button>
        </div>
    )
}