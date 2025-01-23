import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation, easeInOut } from "framer-motion";
import Button from './Button';

function Sponsors() {
  const sponsorBannerAnimationTop = useAnimation();
  const sponsorBannerAnimationBottom = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const [showPluses, setShowPluses] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    if (isInView) {
      sponsorBannerAnimationTop.start({ x: 0, opacity: 1 });
      sponsorBannerAnimationBottom.start({ x: 0, opacity: 1 });
      setShowPluses(true);
      setShowHeading(true);
    }
  }, [isInView, sponsorBannerAnimationTop, sponsorBannerAnimationBottom]);

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center overflow-hidden' ref={ref}>

      <div className='flex h-1/5 w-screen items-center justify-center mb-8'>
        {showHeading && (
          <motion.div className='flex h-full items-center justify-center flex-col w-[300px] md:w-[450px]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, easeInOut }}>
            <h2 className='flex animate-gradient mb-2 md:mb-4'>Our Sponsors.</h2>
            <p className='flex text-center text-xs mb-4 md:mb-6'>We are proudly sponsored by our partners. Their support helps us to provide meaningful experiences for our participants.</p>
            {/* <Button text={"Exclusive Workshops"}/> */}
          </motion.div>
        )}
      </div>


      <div className='sponsorBanner'>
        {showPluses && (
          <>
            <motion.div className='topPlus left-[8vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }} >+</motion.div>
            <motion.div className='topPlus left-[36vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} >+</motion.div>
            <motion.div className='topPlus left-[64vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4 }} >+</motion.div>
            <motion.div className='topPlusEnd left-[92vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }} >+</motion.div>
          </>
        )}

        {showPluses && (
          <>
            <motion.div className='bottomPlus left-[8vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }} >+</motion.div>
            <motion.div className='bottomPlus left-[36vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} >+</motion.div>
            <motion.div className='bottomPlus left-[64vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4 }} >+</motion.div>
            <motion.div className='bottomPlusEnd left-[92vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }} >+</motion.div>
          </>
        )}

        <motion.div className='sponsorContainer' initial={{ x: 200, opacity: 0 }} animate={sponsorBannerAnimationTop} transition={{ duration: 1, type: "tween", easeInOut }}>
          <div className='platinumSponsorBanner animate'>
            <Image
              src='/images/micron.png'
              height={105}
              width={105}
              alt='Micron logo'
              className='object-contain flex w-16 md:w-auto h-auto'
            />
          </div>
        </motion.div>

        <motion.div className='sponsorContainer' initial={{ x: 200, opacity: 0 }} animate={sponsorBannerAnimationTop} transition={{ duration: 1, type: "tween", easeInOut }}>
          <div className='goldSponsorBanner animate'>
            <Image
              src='/images/google.png'
              height={100}
              width={100}
              alt='Google logo'
              className='object-contain flex blur-sm translate-y-1 w-16 md:w-auto h-auto'
            />
          </div>
        </motion.div>

        <motion.div className='sponsorContainerEnd' initial={{ x: 200, opacity: 0 }} animate={sponsorBannerAnimationTop} transition={{ duration: 1, type: "tween", easeInOut }}>
          <div className='bronzeSponsorBanner animate'>
            <Image
              src='/images/jane-street.png'
              height={100}
              width={100}
              alt='Jane Street logo'
              className='object-contain blur-sm flex md:translate-y-[-3px] w-16 md:w-auto h-auto'
            />
          </div>
        </motion.div>
      </div>

      <div className='sponsorBanner'>
        {showPluses && (
          <>
            <motion.div className='topPlus left-[22vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} >+</motion.div>
            <motion.div className='topPlus left-[50vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4 }} >+</motion.div>
            <motion.div className='topPlusEnd left-[78vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }} >+</motion.div>
          </>
        )}

        {showPluses && (
          <>
            <motion.div className='bottomPlus left-[22vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} >+</motion.div>
            <motion.div className='bottomPlus left-[50vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4 }} >+</motion.div>
            <motion.div className='bottomPlusEnd left-[78vw]' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }} >+</motion.div>
          </>
        )}

        <motion.div className='sponsorContainer' initial={{ x: -200, opacity: 0 }} animate={sponsorBannerAnimationBottom} transition={{ duration: 1, type: "tween", easeInOut }}>
          <div className='silverSponsorBanner animate'>
            <Image
              src='/images/nvidia.png'
              height={140}
              width={140}
              alt='Nvidia logo'
              className='object-contain flex translate-y-1 blur-sm w-16 md:w-auto h-auto'
            />
          </div>
        </motion.div>

        <motion.div className='sponsorContainerEnd' initial={{ x: -200, opacity: 0 }} animate={sponsorBannerAnimationBottom} transition={{ duration: 1, type: "tween", easeInOut }}>
          <div className='platinumSponsorBanner animate'>
            <Image
              src='/images/dorahacks.png'
              height={150}
              width={150}
              alt='Dorahacks logo'
              className='object-contain flex translate-y-[5px] blur-sm w-16 md:w-auto h-auto'
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Sponsors;
