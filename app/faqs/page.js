'use client'
import React, { useState } from 'react'
import { IoChevronForwardOutline } from "react-icons/io5";

function FAQs() {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
        {
            question: 'Who can participate?',
            answer: 'The hackathon is open to university students across Singapore, including undergraduate, postgraduate, and PhD students from NTU, NUS, SIT, SUTD, SMU, and SUSS. Participants of all skill levels in AI and machine learning are welcome. However, please note that some tracks and prizes will be exclusively reserved for undergraduate students.',
        },
        {
            question: 'Is it open for people with no Computer Science Background?',
            answer: 'Yes, the hackathon is open to participants from all backgrounds, not just those with a Computer Science background. Beginners and non-technical participants are welcome, and resources such as workshops, guides, and tools will be provided to help you get started.',
        },
        {
            question: 'How can I register, and is there a participation fee?',
            answer: 'You can register for the hackathon through our official website by completing the registration form and submitting the required details. Best of all, there is no participation fee! Keep an eye on our website and social media channels for registration deadlines and updates.',
        },
        {
            question: 'How many members can a team have?',
            answer: 'Teams can have 2 to 5 members. If you don\'t have a team, don\'t worry—you\'ll have the opportunity to form one during the registration session at the event.',
        },
        {
            question: 'Will I be provided with resources to get started?',
            answer: 'Yes, participants will be provided with a variety of resources to get started! These include workshops, APIs and tools, cloud credits, and online courses as well as documentation and guides.',
        },
        {
            question: 'Do I need to form a team beforehand?',
            answer: 'No, you don\'t need to form a team beforehand! You can register individually. If you already have a team, you can register together. Teams can consist of 2 to 5 members.',
        },
        {
            question: 'What are the judging criteria for the hackathon?',
            answer: 'Projects will be judged on innovation, technical execution, impact, feasibility, and presentation, with more details revealed closer to the event.',
        },
        {
            question: 'Why is the hackathon overnight?',
            answer: 'The overnight format fosters continuous innovation, team bonding, and immersive problem-solving, while providing a unique experience with engaging late-night activities.',
        },
        {
            question: 'What kind of overnight activities are planned?',
            answer: 'Overnight activities include karaoke, poker tournaments, stargazing, sunrise chasing, and other fun challenges to keep participants energized and engaged. (No Gambling will be involved)',
        },
        {
            question: 'What facilities are available overnight?',
            answer: 'Dedicated resting rooms will be available, with separate spaces for men and women. Washrooms will also be accessible for participants to freshen up during the event.',
        },
        {
            question: 'Is it mandatory to stay overnight?',
            answer: 'No, staying overnight is not mandatory. Participants are free to leave and return as needed, but staying overnight ensures a more immersive and engaging experience.',
        },
        {
            question: 'Are meals or snacks provided overnight?',
            answer: 'Yes, light snacks and refreshments will be available throughout the night, and breakfast will be served in the early morning. Meals, including lunch and dinner, will also be provided at designated times to keep participants energized throughout the event.',
        },
        {
            question: 'Is there security in place for overnight participants?',
            answer: 'Yes, security measures will be in place to ensure the safety of all overnight participants, including restricted access to the venue for registered individuals only and on-site monitoring throughout the event.',
        },
    ];
    

    function handleToggle(index) {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className='bg-bg w-screen h-screen flex items-center justify-center mb-24 lg:mb-0'>
            <div className='flex gap-4 flex-col lg:flex-row h-[60vh] w-[70vw] mt-8'>
                <div className='flex flex-col justify-center w-full h-full mr-12'>
                    <h2 className='text-left animate-gradient text-[34px] md:text-[48px] w-full mb-6'>Any questions&#63; We got you.</h2>
                    <p className='text-sm w-full lg:w-5/6 text-pretty leading-6'>Find answers to frequently asked questions about the event, including logistics, participation guidelines, and more.</p>
                </div>
                <div className='flex w-full h-full items-center justify-center'>
                    <div className='relative grid grid-cols-1 justify-normal divide-y divide-[#d1e1f3] overflow-scroll w-full h-[75%]'>
                        {faqs.map((faq, index) => (
                            <div key={index} className='flex flex-col py-4 w-full'>
                                <button onClick={() => handleToggle(index)} className='flex text-sm font-medium justify-between text-left items-center w-full h-12'>
                                    <div className='w-full'>
                                        {faq.question}
                                    </div>
                                    <IoChevronForwardOutline size={20} className={`ml-4 w-[30px] transition-transform duration-200 ease-in-out ${activeIndex === index ? 'rotate-90' : ''}`} />
                                </button>
                                {activeIndex === index && (
                                    <div className='flex w-full items-center font-light text-pretty pt-2 text-sm'>{faq.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FAQs