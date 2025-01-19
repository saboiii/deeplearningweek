'use client'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '@/app/utils/mouse';

function Title() {
    const [isHovered, setIsHovered] = useState(false);
    const [isInView, setIsInView] = useState(true);
    const { x, y } = useMousePosition(isInView);
    const titleRef = useRef(null);
    const size = isHovered ? 750 : 500;
    const fadeVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 3 } },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsInView(entry.isIntersecting);
          },
          { threshold: 0.5 }
        );
    
        if (titleRef.current) {
          observer.observe(titleRef.current);
        }
    
        return () => {
          if (titleRef.current) {
            observer.unobserve(titleRef.current);
          }
        };
      }, []);
    

    return (
        <div ref={titleRef} className="relative bg-black flex w-[95vw] h-[95vh] flex-col rounded-b-[70px] overflow-clip">
            <div className='absolute w-full h-full left-0 right-0 z-10'>
                <motion.div
                    className="flex w-full h-full items-center justify-center"
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div
                        className="flex flex-col items-center justify-center cursor-default"
                        onMouseEnter={() => {
                            setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsHovered(false);
                        }}
                    >
                        <p className="flex caption mb-0 md:mb-[-10px]">WELCOME TO</p>
                        <h1 className="flex animate-gradient">Deep Learning</h1>
                        <p className="flex subtitle">WEEK</p>
                    </div>
                </motion.div>
            </div>
            <div className="flex bg-sg bg-cover bg-no-repeat w-full h-full items-center justify-center">
            </div>
            <motion.div
                className="absolute left-0 right-0 mask bg-sg2 bg-cover w-full h-full items-center justify-center"
                animate={{
                    WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            >
            </motion.div>
        </div>
    )
}

export default Title