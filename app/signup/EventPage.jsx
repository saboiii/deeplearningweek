'use client'
import React, { useState } from 'react';
import SleekButton from '@/components/SleekButton';
import { motion, AnimatePresence } from "framer-motion";
import SoloMember from '@/components/SoloMember';
import TeamMembers from '@/components/TeamMembers';
import SleekButtonBack from '@/components/SleekButtonBack';
import { useRouter } from 'next/navigation';
import { FaDoorClosed } from "react-icons/fa";

export default function EventPage() {
    const version = process.env.NEXT_PUBLIC_VERSION;
    const router = useRouter();

    if (version !== "1.0.0") {
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

    const [regType, setRegType] = useState('');
    const [isExiting, setIsExiting] = useState(false);

    function handleTeam() {
        setIsExiting(true);
        setRegType('team');
    }

    function handleSolo() {
        setIsExiting(true);
        setRegType('solo');
    }

    function handleGoBack() {
        setIsExiting(true);
        setRegType('');
    }

    const variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
        exit: { opacity: 0, x: -200, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    return (
        <div className="flex flex-col gap-4 w-screen items-center justify-center">
            <AnimatePresence mode="wait">
                {!isExiting && regType == '' && (
                    <motion.div
                        key="buttons"
                        className="flex items-center justify-center flex-col gap-4 h-screen"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onAnimationComplete={() => setIsExiting(false)}
                    >
                        <SleekButton text="Register team" styles={"border-[#d1e1f3] border-[0.5px] rounded-full"} onClick={handleTeam} />
                        <SleekButton text="Register solo" styles={"border-[#d1e1f3] border-[0.5px] rounded-full"} onClick={handleSolo} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!isExiting && regType == 'team' && (
                    <motion.div
                        key="new-content"
                        className="flex flex-col items-center justify-center gap-4"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onAnimationComplete={() => setIsExiting(false)}
                    >
                        <TeamMembers exitFunction={handleGoBack} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!isExiting && regType == 'solo' && (
                    <motion.div
                        key="new-content"
                        className="flex w-screen flex-col items-center justify-center"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onAnimationComplete={() => setIsExiting(false)}
                    >
                        <SoloMember exitFunction={handleGoBack} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
