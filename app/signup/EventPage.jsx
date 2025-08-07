'use client'
import SleekButtonBack from '@/components/SleekButtonBack';
import { useRouter } from 'next/navigation';
import { FaDoorClosed } from "react-icons/fa";

export default function EventPage() {
    const router = useRouter();

    function returnToHome() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        router.push('/');
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center gap-6 items-center bg-bg">
            <FaDoorClosed size={100} />
            <h2 className='text-2xl md:text-[40px] leading-none'>Registrations Closed.</h2>
            <div className="w-[26vw] mb-3 flex text-[#8a8ba0] justify-center text-center text-sm text-pretty">
                <span>
                    We'll be back next year! If you have
                    any questions,
                    contact us at <a
                        href="mailto:deeplearningweek@gmail.com"
                        className="text-[#c7c8e2] hover:text-white duration-200 ease-in-out transition"
                    >
                        deeplearningweek@gmail.com
                    </a>
                </span>

            </div>
            <SleekButtonBack text={'Return to home'} styles={"border-[#8a8ba0] text-[#8a8ba0] border-[0.5px] rounded-full"} onClick={returnToHome} />
        </div>
    );
}
