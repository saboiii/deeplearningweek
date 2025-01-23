import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PiMoonStars, PiSun } from "react-icons/pi";

function Schedule({ schedule, title, date, description, divs, styles }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 15%", "end 50%"]
      });
    const [rippleIndex, setRippleIndex] = useState(null);

    const divCount = divs-1;
    const divHeights = Array.from({ length: divCount }, (_, index) => {
        const start = index / divCount;
        const end = (index + 1) / divCount;
        return useTransform(scrollYProgress, [start, end], ['0%', '100%']);
    });

    useEffect(() => {
        const checkHeight = () => {
            divHeights.forEach((height, index) => {
                const value = height.get();
                if (value == '100%') {
                    setRippleIndex(index);
                }
            });
            requestAnimationFrame(checkHeight);
        };

        requestAnimationFrame(checkHeight);
        return () => cancelAnimationFrame(checkHeight);
    });


    return (
        <div ref={ref} className={`relative flex flex-col lg:flex-row w-full lg:my-28 px-10 sm:px-24 ${styles}`}>
            <div className="flex flex-col mb-16 h-[32vh] lg:h-[20vh] w-full items-center justify-center lg:items-start lg:justify-start">
                <h2 className='flex flex-row lg:flex-col items-center justify-center mb-8 lg:items-start w-full md:w-2/3 text-center lg:text-left text-[36px] lg:text-[60px] xl:text-[72px] animate-gradient'>
                    {title == 'Overnight Stay.' ? (
                        <PiMoonStars size={50} className='text-[#b4c0ce] inline mr-4 mb-0 lg:mb-4' />
                    ):(
                        <PiSun size={50} className='text-[#b4c0ce] inline mr-4 mb-0 lg:mb-4' />
                    )}
                    {title}
                </h2>
                
                <p className='text-center lg:text-left text-xs text-pretty w-[70%] mb-4 lg:w-[60%]'>
                    {description}
                </p>
                <p className='navDropdownCaption w-full'>{date}</p>
            </div>
            <div className='flex h-full w-[80vw] pl-32 pr-0 md:px-24 lg:px-0 lg:mt-8'>
                <div className="relative flex-col justify-between flex w-full h-full">
                    <div className="absolute dot w-[10px] -left-[1.5px]" />
                    <div className='absolute -left-[120px] -top-4 py-2 text-xs flex items-center justify-center rounded-full border border-[#2a2b3c]/80 bg-[#0f121a]/70 w-[100px]'>
                        <p>{Object.keys(schedule)[0]}</p>
                    </div>
                    <div className='absolute left-6 text-xs lg:text-base -top-[12px] lg:-top-[18px] w-[80%] lg:w-full py-2 font-medium lg:font-light flex items-center justify-start'>
                        <p>{Object.values(schedule)[0]}</p>
                    </div>
                    {divHeights.map((height, index) => (
                        <React.Fragment key={index}>
                            <div className="flex w-[1.5px] bg-[#2e2e36] h-full my-4 rounded-full overflow-hidden">
                                <motion.div
                                    className="flex w-[10px] bg-[#bcbdde]"
                                    style={{
                                        height,
                                    }}
                                />
                            </div>
                            <div className='flex relative w-full'>
                                <div className={`dot -left-[1.5px] absolute ${(rippleIndex === index) && 'animate-ripple'}`} />
                                <div className='dot -left-[1.5px] absolute ' />
                                <div className='absolute -left-[120px] -top-4 py-2 text-xs flex items-center justify-center rounded-full border border-[#2a2b3c]/80 bg-[#0f121a]/70 w-[100px]'>
                                    <p>{Object.keys(schedule)[index + 1]}</p>
                                </div>
                                <div className='absolute text-xs lg:text-base font-medium lg:font-light -top-[12px] lg:-top-[18px] left-6 w-[80%] lg:w-full py-2  flex items-center justify-start'>
                                    <p>{Object.values(schedule)[index + 1]}</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Schedule