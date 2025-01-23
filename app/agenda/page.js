'use client'
import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

function Agenda() {
    const { scrollYProgress } = useScroll();
    const [rippleIndex, setRippleIndex] = useState(null);

    const divCount = 9;
    const divHeights = Array.from({ length: divCount }, (_, index) => {
        const start = index / divCount;
        const end = (index + 1) / divCount;
        return useTransform(scrollYProgress, [start, end], ['0%', '100%']);
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // useMotionValueEvent(scrollYProgress, 'change', (value) => {
    //     console.log('Scroll Y Progress:', value);
    // });

    const handleAnimationComplete = (index) => {
        console.log("ripple!");
        if (index + 1 < divCount) {
            setRippleIndex(index + 1);
        }
    };

    return (
        <div className="flex flex-col w-screen">
            <div className="flex bg-bg w-full h-[20vh]" />

            <div className="flex w-full h-[200vh] my-28">
                <div className="bg-bg w-full h-full" />

                <div className="flex-col justify-between flex items-center w-[10px] h-full">
                    <div className="dot" />
                    {divHeights.map((height, index) => (
                        <React.Fragment key={index}>
                            <div className="flex w-[1.5px] h-full my-4 rounded-full overflow-hidden">
                                <motion.div
                                    className="flex w-full bg-[#bcbdde]"
                                    style={{
                                        height,
                                    }}
                                    animate={{ height }}
                                    onAnimationComplete={() => handleAnimationComplete(index)} // Trigger ripple effect after animation
                                />
                            </div>
                            <div
                                className={`dot ${rippleIndex === index + 1 ? 'ripple' : ''}`} // Apply ripple class to the next dot
                            />
                        </React.Fragment>
                    ))}

                </div>

                <div className="bg-bg w-full h-full" />
            </div>
        </div>
    );
}

export default Agenda;
