import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaTelegramPlane, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {
    return (
        <div className='flex flex-col justify-between md:h-[50vh] w-screen'>
            <div className='flex flex-col md:flex-row justify-start md:justify-between w-full h-4/5 border-t border-[#2a2b3c]/80 pl-10 md:pl-20 py-12'>
                <div className='flex h-full'>
                    <Image
                        src='/images/logo.png'
                        width={120}
                        height={120}
                        alt='DLW Logo'
                        loading='lazy'
                        className='flex object-fit mt-1 w-auto h-10'
                    />
                </div>
                <div className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-x-4 h-full'>
                    <div className='flex flex-col h-full w-full md:w-[20vw] p-4'>
                        <div className='flex flex-col w-full gap-3 mb-6'>
                            <div className='flex w-full text-sm font-semibold'>Legal</div>
                            <Link href='/privacy' className='footerItem'>Privacy Policy</Link>
                            {/* <Link href='/' className='footerItem'>Terms & Conditions</Link> */}
                        </div>
                        <div className='flex flex-col w-full gap-3'>
                            <div className='flex w-full text-sm font-semibold'>Credits</div>
                            <Link href='/credits' className='footerItem'>3D Model</Link>
                        </div>
                    </div>
                    <div className='flex flex-col  w-full md:w-[20vw] p-4'>
                        <div className='flex flex-col w-full gap-3'>
                            <div className='flex w-full text-sm font-semibold'>Contact Us</div>
                            <a target="_blank" rel="noopener noreferrer" href='mailto:deeplearningweek@gmail.com' className='footerItem'><IoMdMail size={16} className='inline mr-2'/>Email</a>
                            {/* <Link href='/' className='footerItem'><FaTelegramPlane size={16} className='inline mr-2'/>Telegram</Link> */}
                            <a href='https://www.instagram.com/deeplearningweek' className='footerItem'><FaInstagram size={16} className='inline mr-2'/> Instagram</a>
                            {/* <a target="_blank" rel="noopener noreferrer" href='/' className='footerItem'><FaLinkedin size={16} className='inline mr-2'/>Linkedin</a> */}
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex mt-2 border-t border-[#2a2b3c]/80 w-full h-0' />
            <div className='flex flex-row h-1/5 justify-between py-8 px-10 md:px-20 text-[10px] md:text-xs items-center'>
                <div>Website created by <a href='mailto:saba.x.azad@gmail.com' className='text-[#708aa1]'>Saba Azad.</a></div>
                <div className='text-right'>© 2025 MLDA &#64; NTU. All rights reserved.</div>
            </div>
        </div>
    )
}

export default Footer