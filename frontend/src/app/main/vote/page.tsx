import { Heart } from "lucide-react";
import Link from "next/link";


export default function Vote() {
    const voteArray = [
        {
            title: "파트장 투표",
            icon: <Heart size={36} className="hover:text-newRed"/>,
            link: "/main/vote/part"
        },
        {
            title: "데모데이 투표",
            icon: <Heart size={36} className="hover:text-newRed"/>,
            link: "/main/vote/demoday"
        }
    ]

    return (
        <div className="relative px-6 py-6 w-full h-full flex flex-col items-center ">
            <header className="py-6 w-full text-center text-logo text-grey450 border-b-4 border-grey450">파트장 / 데모데이 투표</header>
            <section className="absolute top-[40%] w-full flex flex-col items-center gap-20">
                {voteArray.map((vote, index) => (
                    <div key={index} className="px-10 py-4 w-full flex justify-between items-center text-logo text-grey450 border-b-2 border-newRed">
                        <h1>{vote.title}</h1>
                        <Link href={vote.link}>
                            {vote.icon}
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    )
}