import { Button } from '@/components/button';
import { Vote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 로그인 전 홈화면

export default function Home() {
  return (
    <div className="px-10 w-full h-full flex flex-col justify-around items-center">
      <span className='w-full flex flex-col justify-center items-center text-grey550'>
        <Image src={'/image/logo-main.png'} alt={'musai-logo'} width={200} height={200} priority/>
        <h1 className='w-full text-big text-center'>
          <span>CEOS Election</span>
        </h1>
      </span>
      <section className='w-full flex flex-col gap-4'>
        <Link href='/login' className='w-full'>
          <Button variant={'primary'} className='w-full text-grey350 hover:bg-grey850'>
            Join us
          </Button>
        </Link>
        <Link href='/register' className='w-full'>
          <Button variant={'link'} className='w-full mt-2 text-grey350 underline underline-offset-4'>
            Sign up as a member
          </Button>
        </Link>
      </section>
    </div>
  );
}
