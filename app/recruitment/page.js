import { FiExternalLink } from "react-icons/fi";

export const metadata = {
    title: "Recruitment | Deep Learning Week",
    description: "Join the Deep Learning Week 2026 Committee! Be part of a team that shapes the future of one of the most anticipated student-led events of the year.",
    openGraph: {
        title: "Recruitment | Deep Learning Week",
        description:
            "Join the Deep Learning Week 2026 Committee! Be part of a team that shapes the future of one of the most anticipated student-led events of the year.",
        url: "https://dlweek.com",
        siteName: "Deep Learning Week",
        images: [
            {
                url: "/images/og-image.png",
                width: 800,
                height: 800,
                alt: "Deep Learning Week Photo",
            },
        ],
        locale: "en_SG",
        type: "website",
    },
};

function Recruitment() {
    return (
        <div className='flex flex-col justify-center w-screen min-h-screen lg:h-screen'>
            <div className='flex flex-col items-center justify-center h-[11vh] w-full  border-[#2a2b3c]/80 border-b'>

            </div>
            <div className='flex flex-row justify-center h-[89vh] w-full'>
                {/* <div className='hidden lg:flex flex-col items-center justify-center w-[30vw] h-full border-[#2a2b3c]/80 border-r'>

                </div> */}
                <div className='flex font-light flex-col prose px-8 lg:overscroll-none text-pretty tracking-tight lg:px-16 py-12 w-full text-sm lg:text-base lg:w-[70vw] lg:border-[#2a2b3c]/80 lg:border-l lg:border-r h-full overflow-y-auto'>
                    <h2 className='w-full text-2xl md:text-[40px] leading-none mb-2'>Recruitment 2026</h2>
                    <div className="flex font-normal text-[#b3b5cb] justify-center text-center text-sm text-pretty mb-12 items-center">
                        <span>Posted on 7 Aug, 2025</span>
                        <span className="mx-2 text-lg align-middle">•</span>
                        <span>DLW Exco</span>
                    </div>

                    <section className="flex flex-col mb-12 w-full">
                        <p className='flex'>
                            Each year, Deep Learning Week brings together some of the most creative, driven, and curious minds across our university to design a celebration of learning and innovation. In 2026, we're continuing that legacy — and we're looking for the next group of students to help us make it happen.
                        </p>
                        <p className='flex mt-4 font-medium'>
                            We are excited to announce that applications are now open for the Deep Learning Week 2026 Subcommittee! This is your chance to be part of a team that will shape the future of one of the most anticipated student-led events of the year.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 mb-12 w-full gap-8 flex-col">
                        <div className='flex flex-col w-full benefitBoxA'>
                            <h2 className="flex text-xl text-white mb-4 font-medium">
                                Industry Mentorship
                            </h2>
                            <p className='flex font-normal text-center text-xs'>
                                Work closely with industry leaders to gain invaluable career insights and guidance while contributing to DLW's planning and execution.
                            </p>
                        </div>
                        <div className='flex flex-col w-full benefitBoxB' >
                            <h2 className="flex text-xl text-white mb-4 font-medium">
                                Get Paid!
                            </h2>
                            <p className='flex font-normal text-center text-xs'>
                                Under Work Study Scheme (WSS), if eligible, you will be paid for your contributions to the committee. The exact amount is subject to annual review by the university.
                            </p>
                        </div>
                        <div className='flex flex-col w-full benefitBoxA text-xs'>
                            <h2 className="flex text-xl text-white mb-4 font-medium">
                                Growth at DLWEEK
                            </h2>
                            <p className='flex font-normal text-center text-xs'>
                                You'll have the opportunity to grow within the team to achieve higher leadership positions regardless of your course of study.
                            </p>
                        </div>

                    </section>

                    <section className="flex mb-12 w-full flex-col">
                        <h2 className="flex text-lg lg:text-2xl text-white mb-4 w-full font-medium">Open Roles</h2>
                        <p className='flex'>We are currently recruiting for the following portfolios:</p>
                        <ul className="list-disc ml-8 my-4 space-y-2 font-normal text-left">
                            <li className="pl-2">Academics</li>
                            <li className="pl-2">Operations</li>
                            <li className="pl-2">Design &amp; Innovation</li>
                            <li className="pl-2">Corporate Relations (Sponsorship)</li>
                            <li className="pl-2">Corporate Relations (Affiliations)</li>
                        </ul>
                        <p className='bg-[#0f121a]/70 backdrop-blur-sm rounded-lg border border-[#2a2b3c]/80 py-4 px-8 mb-4 items-center gap-1 flex text-base text-white font-medium'>
                            More info about available portfolios {' '}
                            <a
                                className="group text-[#91adc5] flex justify-center items-center duration-200 ease-in-out transition hover:text-white"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://tinyurl.com/dlw2026portfolios"
                            >
                                here.
                                <FiExternalLink size={16} className="flex text-inherit ml-1 transition-colors duration-200 ease-in-out group-hover:text-inherit" />

                            </a>
                        </p>
                        <p className="mt-2 flex">
                            These portfolios form the backbone of DLW's success — overseeing everything from event logistics and sponsor engagement, to academic content and design strategy. You don't need to have planned a large event before, but we do look for commitment, clarity of thought, and an ability to work calmly under pressure. In other words: people who care, and care well.
                        </p>
                    </section>

                    <section className="flex mb-12 w-full flex-col">
                        <h2 className="flex text-lg lg:text-2xl text-white mb-4 w-full font-medium">What is Deep Learning Week?</h2>
                        <p className='flex'>
                            At the heart of DLW is our flagship hackathon — an interdisciplinary challenge where participants across fields collaborate, build, and present bold new ideas. But DLW is more than a hackathon. It's a platform. A space where creativity and critical thinking are celebrated equally, and where academic excellence meets real-world impact.
                        </p>
                        <p className='flex mt-4'>
                            DLW committee members enjoy unique behind-the-scenes access to representatives from our partner organisations. These are conversations happen not just at a lecture theatre or a public event, but in our rooms, over project pitches, and around plans that you'll help shape.
                        </p>
                    </section>

                    <section className="flex mb-12 w-full flex-col">
                        <h2 className="flex text-lg lg:text-2xl text-white mb-4 w-full font-medium">Who Should Apply?</h2>
                        <p className='flex'>
                            This is a cohort designed for students who are thoughtful, deliberate, and genuinely excited about building something meaningful together. We're looking for students who think deeply, work collaboratively, and take pride in doing things well. You don't need to have all the answers — but you should be curious, committed, and ready to bring your perspective to the table. In joining us, you'll not only contribute to one of the most anticipated student-led events of the year — you'll help shape its voice, values, and future.
                        </p>
                    </section>

                    <section className="flex mb-12 w-full flex-col">
                        <h2 className="flex text-lg lg:text-2xl text-white mb-4 w-full font-medium">Ready to Join?</h2>
                        <p>
                            Applications will close on <strong>22 August 2025</strong>, and interviews will be conducted shortly thereafter. We encourage you to apply early and to reach out with any questions you might have about the portfolios or the process.
                        </p>
                        <p className='bg-[#0f121a]/70 backdrop-blur-sm rounded-lg border border-[#2a2b3c]/80 py-4 px-8 mt-8 items-center gap-1 flex text-base text-white font-medium'>
                            You can apply{' '}
                            <a
                                className="group text-[#91adc5] flex justify-center items-center duration-200 ease-in-out transition hover:text-white"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://tinyurl.com/dlw2026subcom"
                            >
                                here.
                                <FiExternalLink size={16} className="flex text-inherit ml-1 transition-colors duration-200 ease-in-out group-hover:text-inherit" />

                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Recruitment