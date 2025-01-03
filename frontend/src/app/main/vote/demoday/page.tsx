import { Heart } from "lucide-react";
import Link from "next/link";


export default function DemoDay() {
    return (
        <div className="w-full h-full flex flex-col gap-20 justify-center items-center">
            <div className="px-10 py-4 w-full flex justify-between items-center text-head1 text-grey450 border-b-2 border-newRed ">
                <h1>데모데이 투표 하러가기</h1>
                <Link href="/main/vote/demoday/step2">
                    <Heart size={36} className="hover:text-newRed"/>
                </Link>
            </div>
        </div>
    )
}