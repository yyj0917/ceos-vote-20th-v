import { Button } from '@/components/button';
import { Vote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="px-10 w-full h-full flex flex-col justify-around items-center gap-[-20px]">
      <Image src={'/image/logo.png'} alt={'musai-logo'} width={200} height={200}/>
      <span className='w-full flex justify-center items-center text-grey750'>
        <h1 className='w-full flex text-big text-grey750'>
          <span>CEOS Election</span>
        </h1>
        <Vote size={40}/>
      </span>
      <section className='w-full'>
        <Button variant={'primary'} className='w-full hover:bg-grey850'>
          <Link href='/login'>Join us</Link>
        </Button>
        <Button variant={'link'} className='w-full mt-2 hover:underline hover:text-underline-offset-2'>
          <Link href='/register'>Sign up as a member</Link>
        </Button>
      </section>
    </div>
  );
}
