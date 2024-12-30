"use client"

import { House, Menu, Undo2 } from "lucide-react"
import { useRouter } from "next/navigation"


export default function NavigationBar() {
    const navigate = useRouter()

    return (
        <div className="absolute bottom-0 flex justify-between items-center px-10 py-6 w-full h-auto text-grey650">
            <button
                onClick={() => navigate.push("/main")}>
                <Menu size={30} className="hover:text-newRed"/>
            </button>
            <button
                onClick={() => navigate.push("/main")}>
                <House size={30} className="hover:text-newRed"/>
            </button>
            <button
                onClick={() => navigate.back()}>
                <Undo2 size={30} className="hover:text-newRed"/>
            </button>
        </div>
    )
}