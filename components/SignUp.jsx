import React from 'react'
import { motion, useInView, easeInOut } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

function SignUp() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.8 });
    const [showHeading, setShowHeading] = useState(false);
    const [bgLoaded, setBgLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isInView) {
            setShowHeading(true);
        }
    }, [isInView]);

    function goToSignUp(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        router.push('/signup');
    }

    return (
        <div ref={ref} className='flex justify-end h-[80vh] md:h-[70vh] w-screen pt-20 px-8'>
            <div className={`flex h-full rounded-t-3xl overflow-hidden md:rounded-t-[70px] justify-center w-full items-center ${bgLoaded ? '' : 'bg-gradient-to-b from-[#101e3d]/70 to-[#090b10]/70'}`}>
                <img
                    src='/images/signup.png'
                    height={1080}
                    width={1920}
                    quality={100}
                    loading="lazy"
                    className='object-cover object-left md:object-top w-full h-full'
                    alt='Background'
                    onLoad={() => setBgLoaded(true)}
                    onError={() => setBgLoaded(false)}
                />

                <motion.div className='absolute flex flex-col justify-center items-center' initial={{ opacity: 0 }} animate={{ opacity: showHeading ? 1 : 0 }} transition={{ duration: 2, easeInOut }}>
                    <h2 className='flex animate-gradient mb-3'>Join us now.</h2>
                    <p className='flex text-center text-xs w-2/3 lg:w-[40%] mb-6'>This is your chance to be part of a
                        vibrant community that&apos;s shaping the future of AI.
                        Secure your spot today.</p>
                    <Button text={"Register Now"} onClick={goToSignUp}/>
                </motion.div>

            </div>
        </div>
    )
}

export default SignUp