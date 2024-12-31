import { Button } from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import MemberShow from "./_components/member-show";


export default function Main() {
    return (
        <div className="px-10 w-full h-full flex flex-col justify-around items-center">
            <span className='w-full flex flex-col justify-center items-center gap-10 text-grey550'>
                <Image src={'/image/logo-main.png'} alt={'musai-logo'} width={200} height={200} priority/>
                <h1 className='w-full flex flex-col items-center text-big'>
                    <span>Welcome</span>
                    <span>CEOS Election</span>
                </h1>
                <span className="">
                    <MemberShow/>
                </span>
            </span>
            <section className='w-full flex flex-col gap-4'>
                <Link href='/main/vote' className='w-full'>
                    <Button variant={'primary'} className='w-full text-grey350  hover:bg-grey850'>
                        Start
                    </Button>
                </Link>
            </section>
        </div>
    )
}