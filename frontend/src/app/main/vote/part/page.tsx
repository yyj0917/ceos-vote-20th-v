import Header from "@/components/header";
import { Heart } from "lucide-react";
import Link from "next/link";
import { AlertResult } from "../../_components/alert-result";


export default function Part() {
    return (
        <div className="w-full h-full flex flex-col gap-20 justify-center items-center">
            <div className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed ">
                <h1>프론트엔드 투표하기</h1>
                <Link href={"/main/vote/part/front/step2"}>
                    <Heart size={36} className="hover:text-newRed"/>
                </Link>
            </div>
            <div className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed ">
                <h1>백엔드 투표하기</h1>
                <Link href={"/main/vote/part/back/step2"}>
                    <Heart size={36} className="hover:text-newRed"/>
                </Link>
            </div>
            <AlertResult/>
        </div>
    )
}