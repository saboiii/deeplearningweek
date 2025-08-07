export const metadata = {
    title: "Credits | Deep Learning Week",
    description: "Visit our Credits page to learn more about the contributors and resources behind the Deep Learning Week event.",
    openGraph: {
        title: "Credits | Deep Learning Week",
        description:
            "Visit our Credits page to learn more about the contributors and resources behind the Deep Learning Week event.",
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


function Credits() {
    return (
        <div className='flex flex-col w-screen h-screen bg-bg items-center justify-center px-12 lg:px-24'>
            <div className='flex flex-col w-full lg:w-[60%] items-center justify-center gap-4 text-pretty'>
                <h2 className='animate-gradient w-full text-center'>3D Model</h2>
                <p className='text-sm font-light leading-6 w-full lg:w-1/2 text-center'>
                    <a className='text-[#708aa1]' href='https://skfb.ly/oowYq'>"Singapore"</a> by jack.simmons is licensed under Creative Commons Attribution.
                </p>
            </div>
        </div>
    )
}

export default Credits