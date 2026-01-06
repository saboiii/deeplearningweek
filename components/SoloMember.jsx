import React, { useRef, useState } from 'react'
import MemberCard from './MemberCard'
import SleekButton from './SleekButton'
import SleekButtonBack from './SleekButtonBack'
import { FiMousePointer } from "react-icons/fi";
import { PiHandTap } from "react-icons/pi";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SoloMember({ exitFunction }) {
    const router = useRouter()
    const [toggleMenu, setToggleMenu] = useState(false);
    const memberCardRef = useRef(null);

    const [errorText, setErrorText] = useState("");
    const [submissionMode, setSubmissionMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async () => {
        const memberData = memberCardRef.current.getMemberData();

        const requiredFields = [
            { field: 'name', message: 'Name is a required field.' },
            { field: 'uni', message: 'University is a required field.' },
            { field: 'email', message: 'Email is a required field.' },
            { field: 'gender', message: 'Gender is a required field.' },
            { field: 'tele', message: 'Telegram handle is a required field.' },
            { field: 'course', message: 'Course is a required field.' },
            { field: 'school', message: 'School is a required field.' },
            { field: 'degreeType', message: 'Degree type is a required field.' },
            { field: 'year', message: 'Year is a required field.' },
            { field: 'nationality', message: 'Nationality is a required field.' },
            { field: 'diet', message: 'Dietary preference is a required field.' },
            { field: 'size', message: 'T-shirt size is a required field.' },
        ];

        for (const { field, message } of requiredFields) {
            if (!memberData[field] || (typeof memberData[field] === 'string' && memberData[field].trim() === "")) {
                setErrorText(message);
                cancelSubmission();
                return;
            }
        }

        const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (memberData.email && !emailCheck.test(memberData.email)) {
            setErrorText('Please enter a valid email address.');
            cancelSubmission();
            return;
        }

        if (memberData.ntuEmail && !emailCheck.test(memberData.ntuEmail)) {
            setErrorText('Please enter a valid NTU email address.');
            cancelSubmission();
            return;
        }

        const telePattern = /^[a-zA-Z0-9_]{5,}$/;
        if (memberData.tele && !telePattern.test(memberData.tele)) {
            setErrorText('Telegram handle must be at least 5 characters long and may consist only of a-z, 0-9, and underscores.');
            cancelSubmission();
            return;
        }

        if (memberData.uni === 'Nanyang Technological University') {
            if (!memberData.matricNo || memberData.matricNo.trim() === "") {
                setErrorText('Matriculation number is required for NTU students.');
                cancelSubmission();
                return;
            }
            if (!memberData.ntuEmail || memberData.ntuEmail.trim() === "") {
                setErrorText('NTU email is required for NTU students.');
                cancelSubmission();
                return;
            }
        }

        performSubmit();
    };

    const performSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ solo: memberData }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorText(errorData.error || "An error occurred while submitting the form.");
                cancelSubmission();
                return;
            }

            memberCardRef.current.resetFields();
            setErrorText("");
            router.push('/confirmed');
            setLoading(false);
        } catch (error) {
            console.log('Submission error:', error);
            setLoading(false);
            cancelSubmission();
            setErrorText("Failed to submit the form. Please try again later.");
        }
    };
    
    const cancelSubmission = () => {
        setToggleMenu(false);
        setSubmissionMode(false);
        setLoading(false);
    };

    const startSubmission = () => {
        setToggleMenu(true);
        setSubmissionMode(true);
    };

    return (
        <div className='relative flex flex-col gap-8 w-full items-center px-8 md:px-12'>
            <div className={`fixed flex items-center justify-center w-screen h-screen bg-black/90 z-[20] ${toggleMenu ? "flex" : "hidden"}`}>
                <div className='flex flex-col items-center gap-3 justify-center'>
                    <h2 className='flex text-3xl'>Are you sure?</h2>
                    <p className='flex text-[#9fa6af] text-xs mb-3 text-center px-24'>You can't edit this form once it has been submitted!</p>
                    <div className='flex gap-2'>
                        <SleekButtonBack text="Return" onClick={cancelSubmission} styles={"border-slate-600 text-slate-600 border-[0.5px] rounded-full"} disabled={loading} />
                        <SleekButton text="Submit" onClick={handleSubmit} styles={"border-[#d1e1f3] border-[0.5px] rounded-full"} disabled={loading}/>
                    </div>
                </div>
            </div>

            {/* Confirm Submission modal removed as requested */}
            <div className='hidden md:flex text-xs uppercase items-center text-[#8d8eab] font-medium mt-[12vh]'>
                <FiMousePointer size={12} className='inline mr-2' />
                Click on the fields to edit them.
            </div>
            <div className='md:hidden flex text-xs uppercase items-center text-[#8d8eab] font-medium mt-[12vh]'>
                <PiHandTap size={16} className='inline mr-2' />
                Tap on the fields to edit form.
            </div>
            <div className='flex w-full'>
                <MemberCard isLeader={true} regType={'solo'} memberCardId={1} ref={memberCardRef} errorText={errorText} />
            </div>
            <div className='flex w-full justify-center text-center text-xs text-[#3c3c49] px-16'>
                Having trouble with your form? Contact &#64;sabb.exe on telegram&#33;
            </div>
            <div className='flex w-full justify-between mb-[5vh]'>
                <SleekButtonBack text="Go Back" onClick={exitFunction} disabled={submissionMode} />
                <SleekButton text={'Confirm & Submit'} styles={'text-white'} onClick={startSubmission} disabled={submissionMode} />
            </div>
        </div>

    )
}

export default SoloMember