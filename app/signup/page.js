'use client'
import React, { useState } from 'react';
import SleekButton from '@/components/SleekButton';
import { motion, AnimatePresence } from "framer-motion";
import SoloMember from '@/components/SoloMember';
import TeamMembers from '@/components/TeamMembers';

export default function EventPage() {
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
