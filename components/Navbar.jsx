"use client"
import React from 'react'
import Image from 'next/image'
import NavMenu from './NavMenu'
import { useState } from 'react'
import { IoMenuOutline } from "react-icons/io5";
import { PiTarget, PiFlagBanner } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { RiSpeakAiLine } from "react-icons/ri";
import { IoIosCog } from "react-icons/io";
import { MdOutlineEmojiEvents, MdOutlineEventNote } from "react-icons/md";
import Link from 'next/link'


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuData = {
        "About Us": {
            title: "About Us",
            description: "Learn about our vision and the passionate team organizing the event.",
            caption: "EXPLORE",
            items: [
                { icon: <PiTarget size={20} />, label: "Our Purpose" },
                { icon: <PiFlagBanner size={20} />, label: "Highlights" },
                { icon: <BsPeople size={20} />, label: "Our Team" },
            ]
        },
        "Agenda": {
            title: "Agenda",
            description: "Check out the schedule of workshops, talks, and networking sessions.",
            caption: "Information",
            items: [
                { icon: <MdOutlineEventNote size={20} />, label: "Schedule" },
                { icon: <IoIosCog size={20} />, label: "Workshop I" },
                { icon: <IoIosCog size={20} />, label: "Workshop II" },
                { icon: <IoIosCog size={20} />, label: "Workshop III" },
                { icon: <MdOutlineEmojiEvents size={20} />, label: "Other Events" },
            ]
        },
        // "Speakers": {
        //     title: "Speakers",
        //     description: "Meet the amazing speakers who will be sharing their knowledge with us.",
        //     caption: "Lineup",
        //     items: [
        //         { icon: <RiSpeakAiLine size={20} />, label: "Speaker 1" },
        //         { icon: <RiSpeakAiLine size={20} />, label: "Speaker 2" },
        //         { icon: <RiSpeakAiLine size={20} />, label: "Speaker 3" },
        //     ]
        // },
    };

    function handleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='relative'>
            <div className='hidden lg:block absolute left-0 top-0 z-30 w-screen h-20'>
                <div className='flex flex-row justify-between items-center px-16 h-full'>
                    <div className='flex navMainItem z-20'>
                        <Image
                            src='/images/logo.png'
                            width={120}
                            height={120}
                            alt='DLW Logo'
                            className='object-fit mt-1 w-auto h-auto'
                        />
                    </div>
                    <NavMenu menuData={menuData} />
                    <div className='flex gap-7 items-center z-20'>
                        {/* <div className='flex navMainItem'>Play</div> */}
                        <div className='flex navButton'>Sign Up</div>
                    </div>
                </div>
            </div>
            <div className='lg:hidden w-screen flex fixed top-0 left-0 right-0 z-30 h-12'>
                <div className='flex items-center justify-center w-full h-full mx-6 mt-4'>
                    <div className='flex items-center justify-between gap-4 w-full h-full navMenuContainer pr-2 pl-4'>
                        <div className='flex h-full navMainItem items-center'>
                            <Image
                                src='/images/logosquare.png'
                                width={40}
                                height={40}
                                alt='DLW Logo'
                                className='object-fit w-auto h-[80%]'
                            />
                        </div>
                        <button onClick={handleMenu} className='bg-[#504d87]/20 px-2 py-1 rounded-full border-[0.3px] border-[#272835]'>
                            <IoMenuOutline size={24} className={`flex `} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`lg:hidden fixed w-screen h-screen bg-bg z-[25] pt-24 px-8 ${menuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
                <div className='flex flex-col gap-4'>
                    <Link href='/' className='flex'>Home</Link>
                    <div className='menuDivider'/>
                    <Link href='/' className='flex'>About Us</Link>
                    <div className='menuDivider'/>
                    <Link href='/' className='flex'>Agenda</Link>
                    <div className='menuDivider'/>
                    {/* <Link href='/' className='flex'>Speakers</Link>
                    <div className='menuDivider'/> */}
                    <Link href='/' className='flex'>FAQs</Link>
                    <div className='menuDivider'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar