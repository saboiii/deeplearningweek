'use client'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '@/app/utils/mouse';
import Image from 'next/image';

function Title() {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);
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
    <div ref={titleRef} className="relative bg-bg bg-repeat flex w-[95vw] h-[95vh] flex-col rounded-b-[70px] overflow-clip">
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
      <div className={`flex w-full h-full items-center justify-center ${bgLoaded ? '' : 'bg-gradient-to-b from-[#101e3d]/70 to-[#090b10]/70'}`}>
        <img
          src='/images/sg.png'
          height={1080}
          quality={100}
          width={1920}
          className='object-cover object-center w-full h-full'
          alt='Background'
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(false)}
        />
      </div>
      <motion.div
        className={`absolute left-0 right-0 mask  w-full h-full items-center justify-center ${bgLoaded ? '' : 'bg-gradient-to-b from-[#192949]/70 to-[#513668]/70'}`}
        animate={{
          WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <img
          src='/images/sg2.png'
          quality={100}
          height={1080}
          width={1920}
          className='object-cover object-center w-full h-full'
          alt='Background'
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(false)}
        />
      </motion.div>
    </div>
  )
}

export default Title