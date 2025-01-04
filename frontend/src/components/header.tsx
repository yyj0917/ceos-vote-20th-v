"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
    title: string;
    className?: string; // className을 선택적으로 받음
  }
  

  export default function Header({ title, className = "" }: HeaderProps) {
    const router = useRouter()
    const goBack = () => {
        router.back()
    }
    return (
        <div className={`relative w-full flex justify-center items-center py-4 text-big text-grey450 shadow-md ${className}`}>
            <span 
                className="absolute left-0 cursor-pointer"
                onClick={goBack}
                >
                <ArrowLeft size={36} />
            </span>
            <p>
                {title}
            </p>
        </div>
    )
}
