import React, { useRef, useState, useEffect } from 'react';
import MemberCard from './MemberCard';
import SleekButton from './SleekButton';
import SleekButtonBack from './SleekButtonBack';
import { FiMousePointer } from "react-icons/fi";
import { PiHandTap } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation'
import Lenis from '@studio-freight/lenis';

function TeamMembers({ exitFunction }) {
    const router = useRouter()
    const [toggleMenu, setToggleMenu] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [members, setMembers] = useState([
        { id: 2, isLeader: true },
        { id: 3, isLeader: false },
    ]);
    const [canAddMembers, setCanAddMembers] = useState(true);

    const [errorText, setErrorText] = useState("");
    const [submissionMode, setSubmissionMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const memberCardRef = useRef([]);
    const mainRef = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        setCanAddMembers(members.length < 5);
    }, [members]);

    const handleSubmit = async () => {
        const allMemberData = {};
    
        memberCardRef.current.forEach((memberRef, index) => {
            if (memberRef) {
                const memberData = memberRef.getMemberData();
                if (memberData) {
                    allMemberData[`member${index}`] = memberData;
                }
            }
        });
    
        const finalData = {
            teamName: teamName || "",
            members: Object.values(allMemberData),
        };

        if (members.length > 1 && finalData.teamName === "") {
            setErrorText("Team name is required for team registrations.");
            cancelSubmission();
            return;
        }
    
        for (const [index, member] of finalData.members.entries()) {
            const { name, uni, email, ntuEmail, tele, course, gender, size, night } = member;
    
            const requiredFields = [
                { field: 'name', message: `Name is required for member ${index + 1}.` },
                { field: 'uni', message: `University is required for member ${index + 1}.` },
                { field: 'email', message: `Email is required for member ${index + 1}.` },
                { field: 'gender', message: `Gender is required for member ${index + 1}.` },
                { field: 'tele', message: `Telegram handle is required for member ${index + 1}.` },
                { field: 'course', message: `Course/Year is required for member ${index + 1}.` },
                { field: 'size', message: `T-shirt size is required for member ${index + 1}.` },
                { field: 'night', message: `Night preference is required for member ${index + 1}.` },
            ];
    
            for (const { field, message } of requiredFields) {
                if (!member[field] || member[field].trim() === "") {
                    setErrorText(message);
                    cancelSubmission();
                    return;
                }
            }
    
            if (uni === 'Nanyang Technological University') {
                if (!ntuEmail || ntuEmail.trim() === "") {
                    setErrorText(`NTU email is required for member ${index + 1}.`);
                    cancelSubmission();
                    return;
                }
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email && !emailRegex.test(email)) {
                setErrorText(`Invalid email format for member ${index + 1}.`);
                cancelSubmission();
                return;
            }

            if (ntuEmail && !emailRegex.test(ntuEmail)) {
                setErrorText(`Invalid NTU email format for member ${index + 1}.`);
                cancelSubmission();
                return;
            }

            const teleRegex = /^[a-zA-Z0-9_]{5,}$/;
            if (tele && !teleRegex.test(tele)) {
                setErrorText(`Invalid Telegram handle for member ${index + 1}. It must be at least 5 characters long and can only contain letters, numbers, and underscores.`);
                cancelSubmission();
                return;
            }
    
            const courseRegex = /^[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;
            if (course && !courseRegex.test(course)) {
                setErrorText(`Invalid course/year format for member ${index + 1}. It must be alphanumeric and separated by a "/".`);
                cancelSubmission();
                return;
            }
        }
    
        try {
            setLoading(true);
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ team: finalData }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                cancelSubmission();
                setErrorText(errorData.error || "An error occurred while submitting the form.");
                return;
            }
    
            memberCardRef.current.forEach((memberRef) => {
                if (memberRef) {
                    memberRef.resetFields();
                }
            });
    
            setErrorText("");
            router.push('/confirmed');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            cancelSubmission();
            setErrorText("Failed to submit the form. Please try again later.");
        }
    };


    const cancelSubmission = () => {
        setToggleMenu(false);
        setSubmissionMode(false);
    };

    const startSubmission = () => {
        setToggleMenu(true)
    };

    const addMember = async () => {
        if (members.length < 5) {
            const newId = members[members.length - 1]?.id + 1 || 4;
            if (newId <= 6) {
                setMembers([...members, { id: newId, isLeader: false }]);

                await controls.start({
                    y: -25,
                    transition: { type: 'spring', stiffness: 300, damping: 40 },
                });

                await controls.start({
                    y: 0,
                    transition: { type: 'spring', stiffness: 300, damping: 40, duration: 0.2 },
                });

                mainRef.current.scrollTo({
                    top: mainRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    };

    const deleteMember = (id) => {
        setDeletingId(id);
        setTimeout(() => {
            setMembers(members.filter((member) => member.id !== id));
            setDeletingId(null);
        }, 500);
    };

    

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

    return (
        <div className='relative flex flex-col gap-8 w-screen items-center px-8 md:px-12 overflow-hidden'>
            <div className={`fixed flex items-center justify-center w-screen h-screen bg-black/90 z-[20] ${toggleMenu ? "flex" : "hidden"}`}>
                <div className='flex flex-col items-center gap-3 justify-center'>
                    <h2 className='flex text-3xl'>Are you sure?</h2>
                    <p className='flex text-[#9fa6af] text-xs mb-3 text-center px-24'>You can't edit this form once it has been submitted!</p>
                    <div className='flex gap-2'>
                        <SleekButtonBack text="Return" onClick={cancelSubmission} styles={"border-slate-600 text-slate-600 border-[0.5px] rounded-full"} disabled={loading} />
                        <SleekButton text="Submit" onClick={handleSubmit} styles={"border-[#d1e1f3] border-[0.5px] rounded-full"} disabled={loading} />
                    </div>
                </div>
            </div>
            <div className='hidden md:flex text-xs uppercase items-center text-[#8d8eab] font-medium mt-[16vh]'>
                <FiMousePointer size={12} className='inline mr-2' />
                Click on the fields to edit them.
            </div>
            <div className='md:hidden flex text-xs uppercase items-center text-[#8d8eab] font-medium mt-[16vh]'>
                <PiHandTap size={16} className='inline mr-2' />
                Tap on the fields to edit form.
            </div>
            <input type='text' onChange={(e) => setTeamName(e.target.value)} placeholder='Enter team name' name="teamName" value={teamName} className='outline-none w-full overflow-scroll placeholderIndicator bg-transparent text-[30px] md:text-[36px] lg:text-[64px] font-montserrat font-semibold caret-[#525562] tracking-tighter text-center text-slate-50' />
            <p className='flex text-center text-[9px] lg:text-xs px-14 tracking-wider lg:px-0 w-full md:w-1/2 lg:w-[30%] text-[#b9c2e2] mb-8'>
                You can have up 2-5 members in your team. Add members using the button underneath this text and click the
                X icon to delete them.<br /><br /> The topmost profile card will automatically
                be designated as the team leader. Make sure to enter your team name above&#33;
            </p>
            {canAddMembers ? (
                <button
                    onClick={addMember}
                    className="flex w-full mx-8 md:mx-12 text-center px-8 py-4 border text-[#626b90] hover:text-[#8f98be] hover:border-[#3f445d] duration-200 transition ease-in-out text-sm uppercase font-medium border-dashed tracking-tighter border-[#626b90]/40 rounded-xl justify-between items-center bg-gradient-to-br from-[#212738]/20 to-[#1b1b33]/20 backdrop-blur-sm"
                >
                    Add Members
                    <AiOutlinePlus className="inline mr-4" size={16} />
                </button>
            ) : (
                <button
                    disabled
                    className="flex w-full mx-8 md:mx-12 text-center px-8 py-4 border text-[#626b90]/60 bg-gray-700/20 cursor-not-allowed text-sm uppercase font-medium border-dashed tracking-tighter border-[#626b90]/40 rounded-xl justify-center items-center backdrop-blur-sm"
                >
                    Max members reached
                </button>
            )}
            <motion.div
                className="flex flex-col gap-12 w-screen px-8 md:px-12"
                animate={controls}
                ref={mainRef}
            >
                {members.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: deletingId === member.id ? 0 : 1, x: deletingId === member.id ? 500 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="relative flex"
                    >
                        <MemberCard
                            ref={(el) => {
                                if (el) {
                                    memberCardRef.current[index] = el;
                                }
                            }}
                            isLeader={member.isLeader}
                            regType="team"
                            errorText={errorText}
                            memberCardId={member.id}
                        />
                        {!member.isLeader && index !== 1 && (
                            <button
                                onClick={() => deleteMember(member.id)}
                                className="absolute left-0 top-0 translate-x-8 translate-y-6"
                            >
                                <RxCross2
                                    size={20}
                                    className="text-[#7e87ab] hover:opacity-80 opacity-100 transition-opacity cursor-pointer ease-in-out duration-200"
                                />
                            </button>
                        )}
                    </motion.div>
                ))}
            </motion.div>


            <div className='flex w-full justify-center text-center text-xs text-[#3c3c49] px-16'>
                Having trouble with your form? Contact &#64;sabb.exe on telegram&#33;
            </div>
            <div className='flex w-full justify-between mb-[5vh]'>
                <SleekButtonBack text="Go Back" onClick={exitFunction} disabled={submissionMode}/>
                <SleekButton text={'Confirm & Submit'} styles={'text-white'} onClick={startSubmission} disabled={submissionMode} />
            </div>
        </div>
    )
}

export default TeamMembers