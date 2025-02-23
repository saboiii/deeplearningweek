'use client'
import SleekButtonBack from '@/components/SleekButtonBack';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsCheck2Circle } from "react-icons/bs";

function Confirmed() {
    const router = useRouter();

    function returnToHome(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        router.push('/');
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center gap-6 items-center bg-bg">
            <BsCheck2Circle size={100}/>
            <h2 className='text-2xl md:text-[40px] leading-none'>Confirmed.</h2>
            <div className="w-[26vw] mb-3 flex text-[#8a8ba0] justify-center text-center text-sm text-pretty">
                <span>
                    Thank you for your registration. If you have any questions or require any changes to your form,
                    contact us at <a
                        href="mailto:deeplearningweek@gmail.com"
                        className="text-[#c7c8e2] hover:text-white duration-200 ease-in-out transition"
                    >
                        deeplearningweek@gmail.com
                    </a>
                </span>
                
            </div>
            <SleekButtonBack text={'Return to home'} styles={"border-[#8a8ba0] text-[#8a8ba0] border-[0.5px] rounded-full"} onClick={returnToHome}/>
        </div>
    );
}

export default Confirmed;
