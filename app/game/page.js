'use client'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { Protect } from '@clerk/nextjs'
import { GoSignOut } from "react-icons/go";
import { CiUser } from "react-icons/ci"
import { AiOutlineHome } from "react-icons/ai";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MemoizedGameComponent = dynamic(() => import('@/game/GameComponent'), { ssr: false });

function Game() {
  const { user } = useUser();
  const router = useRouter();
  const [pause, setPause] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeydown = (event) => {
      const activeElement = document.activeElement;
      const isInputOrUserProfileMenu =
        activeElement.tagName === "INPUT" ||
        activeElement.closest('.userButtonPopoverCard');

      if (isInputOrUserProfileMenu) {
        return;
      }

      if (event.key === "Escape") {
        setPause(true);
      } else if (event.key === " ") {
        setPause((prevPause) => !prevPause);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);


  const handlePause = () => {
    setPause(prevPause => !prevPause);
  };

  const fetchLeaderboard = async () => {
    if (fetching) return;
    setFetching(true);

    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);


  return (
    <Protect
      fallback={
        <div className='flex items-center justify-center w-screen h-screen'>
          <div className='lg:hidden flex flex-col text-xs gap-4 text-center px-16 w-full md:w-1/2 h-full items-center justify-center'>
            <div>
              You have been signed out.
            </div>
            <Link href='/' className='flex authButton uppercase text-[9px]'>
              <AiOutlineHome className='mr-3' />
            </Link>
          </div>
        </div>
      }
    >
      <div className='flex items-center justify-center'>
        <div className='hidden lg:flex flex-row w-screen h-screen items-center justify-center py-32'>

          <div className='flex flex-col w-[40%]'>
            <div className="relative flex mb-4 px-2 py-4 overflow-hidden border-slate-300 items-center justify-center rounded-md border-[0.5px]">
              <MemoizedGameComponent pause={pause} className='flex' />
              {pause && (
                <div className='z-50 absolute flex flex-col w-full h-full bg-white/10 items-center justify-center'>
                  <h2 className='flex text-center'>PAUSED.</h2>
                  <button className="authButton uppercase" onClick={handlePause}>
                    Resume
                  </button>
                </div>
              )}
            </div>
            <div className='flex flex-row items-center justify-between wfull'>
              <div className='flex authButton'>
                <GoSignOut className='mr-3' />
                <SignOutButton redirectUrl="/">
                  <button className='uppercase'>Logout</button>
                </SignOutButton>
              </div>
              <div className="relative flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1">
                <CiUser className='absolute left-0 right-0 translate-x-2' />
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "hidden",
                      userButtonOuterIdentifier: "hidden",
                      userButtonTrigger: "flex h-6 w-2",

                      // The popover (dropdown menu)
                      userButtonPopoverCard: "pb-4 px-4 pt-2 font-montserrat font-medium bg-black border-[0.5px] border-white rounded-lg",
                      userButtonPopoverMain: "bg-transparent text-white",
                      userButtonPopoverActionButton: "text-white bg-transparent hover:bg-[#111111] hover:text-white rounded-md px-3 py-2 transition-all",
                      userButtonPopoverFooter: "hidden",

                      // Sign-out button
                      userButtonPopoverSignOutButton: "text-white bg-transparent hover:bg-[#111111] hover:text-white rounded-md px-3 py-2 transition-all",

                      // Box wrapper
                      userButtonBox: "bg-black",

                      // Popover arrow
                      userButtonPopoverArrow: "border-black",
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className='h-full pl-8 w-[40%] flex flex-col'>
            <div className='text-4xl mb-4 w-full text-left leading-tight font-montserrat font-medium tracking-tighter text-slate-200 '>LEADERBOARD</div>
            <div className='grid gap-1 overflow-scroll'>

              {leaderboard.map((player, index) => (
                <div key={index} className='flex py-2 text-xs mt-2 h-8 uppercase tracking-wide items-center justify-between px-4 text-slate-300 border-slate-300 rounded-3xl border-[0.5px]'>
                  <div>{player.username}</div>
                  <div>{player.highScore}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='lg:hidden flex flex-col text-xs gap-4 text-center px-16 w-screen md:w-1/2 h-screen items-center justify-center'>
          <div>
            Welcome, <span className='inline-block text-indigo-400'>{user?.username || 'user'}</span>. This page is best viewed on a larger screen.
            Try using a laptop or a tablet!
          </div>
          <div className='flex authButton'>
            <GoSignOut className='mr-3' />
            <SignOutButton redirectUrl="/">
              <button className='uppercase text-[9px]'>Logout</button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </Protect>
  )
}

export default Game