'use client'
import { useState } from 'react'
import { IoChevronForwardOutline } from "react-icons/io5";

function FAQs() {
    const [activeIndex, setActiveIndex] = useState(null);
    const version = process.env.NEXT_PUBLIC_VERSION;

    const faqsV1 = [
        {
            question: 'Who can participate?',
            answer: 'The hackathon is open to university students across Singapore, including undergraduate and postgraduate (masters & PhD) students from NTU, NUS, SIT, SUTD, SMU, and SUSS. Participants of all skill levels in AI and machine learning are welcome. However, please note that some tracks and prizes will be exclusively reserved for undergraduate students.',
        },
        {
            question: 'Is it open for people with no Computer Science Background?',
            answer: 'Yes, the hackathon is open to participants from all backgrounds, not just those with a Computer Science background. Beginners and non-technical participants are welcome, and resources such as workshops, guides, and tools will be provided to help you get started.',
        },
        {
            question: 'What sort of projects can we work on?',
            answer: 'Participants can build pretty much anything they want, such as robots, IoT devices, SaaS applications, end-to-end intelligent systems, and more, as long as it uses deep learning and AI technology with a suitably complex architecture, within the given duration (the number of hours will be announced closer to the event). However, additional constraints per track will only be shared in the participant handbook.',
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
            answer: 'Yes, participants will be provided with a variety of resources to get started! These include workshops, APIs and tools, cloud credits, and online courses as well as documentation and guides. This will be available in the participant handbook sent out once the event commences.',
        },
        {
            question: 'When and where will I get the participant handbook?',
            answer: 'The participant handbook will be publicly released at the end of the opening ceremony on Day 1 of the event. It will be sent to all registered participants via email and will also be made available on our official website and telegram channel for easy access.',
        },
        {
            question: 'Do I need to form a team beforehand?',
            answer: 'No, you don\'t need to form a team beforehand! You can register individually. If you already have a team, you can register together. Teams can consist of 2 to 5 members.',
        },
        {
            question: 'If I don\'t have a team, will I be able to find one at the event?',
            answer: 'Yes, if you don\'t have a team, you\'ll have the opportunity to form one during the registration session at the event. We encourage networking and collaboration among participants to help you find team members with complementary skills and interests. You will be provided a form to register your new team before 10:00AM on Day 1 of the event. If you\'re unable to find a team by then, you will be randomly grouped with other individual registrants by 10:30AM (tentative).',
        },
        {
            question: 'What are the judging criteria for the hackathon?',
            answer: 'Projects will be judged on innovation, technical execution, impact, feasibility, and presentation, with more details revealed once the event begins in the participant handbook.',
        },
        {
            question: 'Why is the hackathon overnight?',
            answer: 'The overnight format fosters continuous innovation, team bonding, and immersive problem-solving, while providing a unique experience with engaging late-night activities.',
        },
        {
            question: 'What kind of overnight activities are planned?',
            answer: 'Overnight activities include stargazing and E-sports tournaments to keep participants energized and engaged. (No Gambling will be involved)',
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
        {
            question: 'Will I be provided blankets or sleeping mats?',
            answer: 'No, this year\'s edition of DLW will not be providing blankets or sleeping mats. Participants are encouraged to bring their own if they plan to rest during the event.',
        },
    ];

    const descV1 = "Find answers to frequently asked questions about the event, including logistics, participation guidelines, and more."

    const descV2 = "Find answers to frequently asked questions about the DLW 2026 committee recruitment."

    const faqsV2 = [
        {
            question: 'Who can register for the recruitment?',
            answer: 'All undergraduate students are welcome to apply — regardless of faculty, year of study, or prior experience! We especially encourage freshmen to apply as this is a fantastic opportunity to start your university journey.',
        },
        {
            question: 'Can I apply for more than one position?',
            answer: 'No, you can only apply for one position.',
        },
        {
            question: 'Is the recruitment open to first-year students?',
            answer: 'Absolutely! We actively encourage first-year students to apply. Many of our most impactful and creative members joined as freshmen, bringing fresh perspectives and enthusiasm. Your energy and willingness to learn matter more than experience.',
        },
        {
            question: 'Will I get to interact with sponsors and external partners?',
            answer: 'Yes! As a Subcomm member, you\'ll have unique opportunities to assist with high-level communications and planning. This is an incredible chance to build professional networks early in your university career. We\'re also planning special programs for direct sponsor interaction (details to be confirmed).',
        },
        {
            question: 'Is this a paid position?',
            answer: 'Yes, depending on the hours you put in on the days of the event, you will be compensated for your time through Work Study Scheme (WSS). The amount will be discussed and finalised after DLW.',
        },
        {
            question: 'How do I apply?',
            answer: 'Applying is simple! Just follow the link in our recruitment posts on social media on our website. Don\'t worry about having extensive experience — we value potential and passion!',
        },
        {
            question: 'What is the recruitment process like?',
            answer:
                (
                    <span className="inline">
                        Don't worry — the process is designed to be fair and accessible! It varies by portfolio but typically includes a simple technical assessment (tailored to your chosen role) and a friendly interview where we get to know you better. Find out more on our{' '}
                        <a
                            href="/recruitment"
                            className="text-[#708aa1] inline align-baseline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            recruitment page.
                        </a>
                    </span>
                ),
        },
        {
            question: 'When do applications close?',
            answer: 'Applications will close on 22nd August 2025, 2359. Late applications will not be considered.',
        },
        {
            question: 'Who can I reach out to with questions?',
            answer: (
                <span className="inline">
                    Feel free to contact us through{' '}
                    <a
                        href="mailto:deeplearningweek@gmail.com"
                        className="text-[#708aa1] inline align-baseline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        email
                    </a>
                    {' '}or by DMing us on{' '}
                    <a
                        href="https://instagram.com/deeplearningweek"
                        className="text-[#708aa1] inline align-baseline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        our Instagram.
                    </a>
                </span>
            ),
        },
    ];

    const faqs = version === "1.0.0" ? faqsV1 : faqsV2;

    function handleToggle(index) {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className='bg-bg bg-repeat w-screen h-screen flex items-center justify-center mb-24 lg:mb-0'>
            <div className='flex gap-4 flex-col lg:flex-row h-[60vh] w-[70vw] mt-8'>
                <div className='flex flex-col justify-center w-full h-full mr-12'>
                    <h2 className='text-left animate-gradient text-[34px] md:text-[48px] w-full mb-6'>Any questions&#63; We got you.</h2>
                    <p className='text-sm w-full lg:w-5/6 text-pretty leading-6'>
                        {version === "1.0.0" ? descV1 : descV2}
                    </p>
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