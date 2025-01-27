'use client'
import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GiCrownedSkull } from "react-icons/gi";

const MemberCard = forwardRef(({ isLeader, regType, memberCardId, errorText }, ref) => {
    const [bgLoaded, setBgLoaded] = useState(false);
    const [banner, setBanner] = useState('/images/hebg.png');
    const [icon, setIcon] = useState('/images/he.png');
    const [iconLoaded, setIconLoaded] = useState(false);

    const getStoredData = () => {
        const storedData = localStorage.getItem(`${regType}_${memberCardId}`);
        if (storedData) {
            const { data, timestamp } = JSON.parse(storedData);
            const age = Date.now() - timestamp;
            const sixHours = 6 * 60 * 60 * 1000;
            if (age < sixHours) {
                return data;
            } else {
                localStorage.removeItem(`${regType}_${memberCardId}`);
            }
        }
        return {
            name: '',
            uni: '',
            matricNo: '',
            ntuEmail: '',
            email: '',
            gender: 'she',
            tele: '',
            course: '',
            diet: '',
            size: 'M',
            night: false,
        };
    };

    const [name, setName] = useState(getStoredData().name);
    const [uni, setUni] = useState(getStoredData().uni);
    const [matricNo, setMatricNo] = useState(getStoredData().matricNo);
    const [ntuEmail, setNtuEmail] = useState(getStoredData().ntuEmail);
    const [email, setEmail] = useState(getStoredData().email);
    const [gender, setGender] = useState(getStoredData().gender);
    const [tele, setTele] = useState(getStoredData().tele);
    const [course, setCourse] = useState(getStoredData().course);
    const [diet, setDiet] = useState(getStoredData().diet);
    const [size, setSize] = useState(getStoredData().size);
    const [night, setNight] = useState(getStoredData().night);

    useImperativeHandle(ref, () => ({
        getMemberData: () => ({
            name,
            uni,
            matricNo,
            ntuEmail,
            email,
            gender,
            tele,
            course,
            diet,
            size,
            night
        }),
        resetFields: () => {
            setName('');
            setUni('');
            setMatricNo('');
            setNtuEmail('');
            setEmail('');
            setGender('she');
            setTele('');
            setCourse('');
            setDiet('');
            setSize('M');
            setNight(false);
            localStorage.removeItem(`${regType}_${memberCardId}`);
        }
    }));

    useEffect(() => {
        const storedData = localStorage.getItem(`${regType}_${memberCardId}`);
        if (storedData) {
            const { data, timestamp } = JSON.parse(storedData);
            const age = Date.now() - timestamp;
            const sixHours = 6 * 60 * 60 * 1000;
            if (age < sixHours) {
                setName(data.name);
                setUni(data.uni);
                setMatricNo(data.matricNo);
                setNtuEmail(data.ntuEmail);
                setEmail(data.email);
                setTele(data.tele);
                setCourse(data.course);
                setDiet(data.diet);
                setSize(data.size);
                setNight(data.night);
                setGender(data.gender);
            } else {
                localStorage.removeItem(`${regType}_${memberCardId}`);
            }
        }
    }, [regType, memberCardId]);

    const saveMemberData = () => {
        localStorage.removeItem(`${regType}_${memberCardId}`);

        const memberData = {
            name,
            uni,
            matricNo,
            ntuEmail,
            email,
            tele,
            course,
            diet,
            size,
            night,
            gender
        };
        const timestamp = Date.now();
        localStorage.setItem(`${regType}_${memberCardId}`, JSON.stringify({ data: memberData, timestamp }));
    };

    useEffect(() => {
        saveMemberData();
    }, [name, uni, matricNo, ntuEmail, email, tele, course, diet, size, night, gender]);

    useEffect(() => {
        if (gender === 'he') {
            setBanner('/images/hebg.png');
            setIcon('/images/he.png');
        } else if (gender === 'she') {
            setBanner('/images/shebg.png');
            setIcon('/images/she.png');
        } else if (gender === 'they') {
            setBanner('/images/theybg.png');
            setIcon('/images/they.png');
        };
    }, [gender]);

    return (
        <div className='flex flex-col w-full rounded-3xl overflow-hidden border border-[#1e1d31] shadow-lg shadow-black/50'>
            <div className={`relative flex justify-start ${bgLoaded ? '' : 'bg-indigo-500/20 '} w-full h-[150px]`}>
                <div className="absolute right-0 top-0 translate-y-6 -translate-x-6 flex h-10 justify-end text-white group">
                    <GiCrownedSkull
                        size={32}
                        className={`flex transition-opacity duration-300 ease-in-out ${isLeader ? "" : "opacity-20"
                            }`}
                    />
                    {regType == 'team' ?
                        (
                            <div
                                className="skullKing"
                            >
                                {isLeader ? "Leader" : "Member"}

                            </div>
                        ) : (
                            <div
                                className="skullKing"
                            >
                                Solo
                            </div>
                        )}

                </div>

                <img
                    src={banner}
                    height={1080}
                    width={1920}
                    loading="lazy"
                    className="object-cover object-center w-full h-full"
                    alt="Background"
                    onLoad={() => {
                        setBgLoaded(true);
                    }}
                    onError={() => {
                        setBgLoaded(false);
                    }}
                />

                <div className={`absolute left-8 top-[85px] shadow-md shadow-black/50 overflow-hidden ${iconLoaded ? '' : 'bg-indigo-950'} z-10 h-[140px] w-[140px] rounded-full`}>
                    <Image
                        src={icon}
                        height={1080}
                        width={1920}
                        quality={100}
                        loading="lazy"
                        className='object-cover object-center w-full h-full'
                        alt='Background'
                        onLoad={() => setIconLoaded(true)}
                        onError={() => setIconLoaded(false)}
                    />
                </div>
            </div>
            <div className='flex flex-col text-black bg-gradient-to-br from-[#212738]/40 to-[#1b1b33]/40 backdrop-blur-sm w-full px-10 gap-2 pb-8 lg:pb-0'>
                <div className='flex flex-col lg:flex-row mb-4 mt-0 px-1 lg:px-0 lg:mb-0 lg:h-24 gap-4 w-full pt-2 lg:pt-6 justify-start lg:justify-end z-30 text-white lg:order-none order-4'>
                    <div className='flex flex-row lg:h-10 items-center text-[#8889a5]'>
                        <label className='mr-2 text-sm'>Course/Year:</label>
                        <input type='text' onChange={(e) => setCourse(e.target.value)} placeholder='Course/Year' name="course" value={course} className='flex w-24 text-sm placeholderIndicator outline-none font-normal tracking-tight z-30 bg-transparent' />
                    </div>
                    <div className='flex flex-row lg:h-10 items-center text-[#8889a5]'>
                        <label className='mr-2 text-sm'>T-Shirt Size:</label>
                        <select type='text' onChange={(e) => setSize(e.target.value)} value={size} className='flex outline-none text-sm textIndicator font-normal tracking-tight z-30 bg-transparent'>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div className='flex flex-row lg:h-10 items-center text-[#8889a5]'>
                        <label className='mr-2 text-sm'>Gender:</label>
                        <select type='text' onChange={(e) => setGender(e.target.value)} value={gender} className='flex outline-none text-sm textIndicator font-normal tracking-tight z-30 bg-transparent'>
                            <option value="he">Male</option>
                            <option value="she">Female</option>
                            <option value="they">Prefer not to say</option>
                        </select>
                    </div>
                </div>
                <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Full Name' name="name" value={name} className='placeholderIndicator lg:order-none lg:mt-0 mt-16 order-1 flex ml-1 h-10 z-30 text-[24px] outline-none text-white font-medium tracking-tight  bg-transparent' />
                <select type='text' onChange={(e) => setUni(e.target.value)} value={uni} className='lg:order-none order-2 flex text-sm outline-none textIndicator font-medium tracking-tight z-30 bg-transparent mb-0 lg:mb-4'>
                    <option value="" disabled>
                        Select University
                    </option>
                    <option value="Nanyang Technological University">Nanyang Technological University</option>
                    <option value="Singapore University of Design & Technology">Singapore University of Design &amp; Technology</option>
                    <option value="National University of Singapore">National University of Singapore</option>
                    <option value="Singapore Institute of Technology">Singapore Institute of Technology</option>
                    <option value="Singapore Management University">Singapore Management University</option>
                    <option value="Singapore University of Social Sciences">Singapore University of Social Sciences</option>
                </select>
                {uni === 'Nanyang Technological University' && (
                    <motion.div
                        className='lg:order-none order-3 flex flex-col w-full gap-4 py-2 mb-0 lg:mb-2'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='flex w-full text-center text-[#8889a5] items-center justify-center text-xs p-2 bg-gradient-to-r from-[#2a2b3c]/30 to-[#504d87]/10 rounded-xl border border-[#504d87]/10'>
                            Hey, it's a fellow NTU student! Please fill in their matriculation number and NTU email.
                        </div>
                        <input type='text' onChange={(e) => setMatricNo(e.target.value)} placeholder='Matriculation Number' name="matricNo" value={matricNo} className='ntuDetail' />
                        <input type='email' onChange={(e) => setNtuEmail(e.target.value)} placeholder='NTU Email' name="ntuEmail" value={ntuEmail} className='ntuDetail' />
                    </motion.div>
                )}

                <div className='lg:order-none order-5 grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-r from-[#2a2b3c]/30 to-[#504d87]/10 rounded-xl border border-[#504d87]/10 divide-none lg:divide-x divide-[#1b1a2c] px-2 lg:px-0'>
                    <div className='flex gap-3 flex-col w-full h-full text-[#c1c1d1] text-xs px-4 py-4'>
                        <div className='flex lg:ml-0 font-medium'>
                            Contact Information
                        </div>
                        <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Personal Email' name="email" value={email} className='flex text-xs px-3 py-2 text-[#c1c1d1] placeholder:text-[#595975] rounded-xl outline-none border border-[#595975]/40 hover:border-[#504d87] duration-200 transition ease-in-out font-medium tracking-tight z-30 bg-transparent' />
                        <input type='text' onChange={(e) => setTele(e.target.value)} placeholder='Telegram Handle' name="tele" value={tele} className='flex text-xs px-3 py-2 text-[#c1c1d1] placeholder:text-[#595975] rounded-xl outline-none border border-[#595975]/40 hover:border-[#504d87] duration-200 transition ease-in-out font-medium tracking-tight z-30 bg-transparent' />
                    </div>
                    <div className='flex gap-3 flex-col w-full h-full text-[#c1c1d1] text-xs px-4 py-4'>
                        <div className='flex font-medium'>
                            Preferences
                        </div>
                        <input type='text' onChange={(e) => setDiet(e.target.value)} placeholder='Dietary Preferences' name="diet" value={diet} className='flex text-xs px-3 py-2 text-[#c1c1d1] placeholder:text-[#595975] rounded-xl outline-none border border-[#504d87]/30 hover:border-[#504d87] duration-200 transition ease-in-out font-medium tracking-tight z-30 bg-transparent' />
                        <div className='flex items-center h-full ml-1 mt-3 lg:mt-0'>
                            <input
                                type='checkbox'
                                onChange={(e) => setNight(e.target.checked)}
                                checked={night === true}
                                className='flex w-6 h-6 lg:w-4 lg:h-4 rounded-xl outline-none border mr-4 lg:mr-2 border-[#504d87]/30 hover:border-[#504d87] duration-200 transition ease-in-out z-30 bg-transparent'
                            />

                            <span className='text-xs text-[#c1c1d1] mr-4'>Staying overnight?</span>
                        </div>
                    </div>
                </div>
                {errorText && (
                    <div className='flex px-1 text-center text-xs w-full justify-center mt-6 text-red-500/70 lg:order-none order-6'>{errorText}</div>
                )};
            </div>
        </div>
    )
});

export default MemberCard