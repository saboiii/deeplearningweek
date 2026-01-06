import { Suspense } from 'react';

export const metadata = {
    title: "Agenda | Deep Learning Week",
    description: "Explore the comprehensive agenda for Deep Learning Week, featuring keynote speeches, workshops, and networking events designed to enhance your knowledge and skills in deep learning.",
    openGraph: {
        title: "Agenda | Deep Learning Week",
        description:
            "Explore the comprehensive agenda for Deep Learning Week, featuring keynote speeches, workshops, and networking events designed to enhance your knowledge and skills in deep learning.",
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

export default function AgendaLayout({ children }) {
    return (
        <Suspense fallback={<div className='w-screen h-screen bg-bg text-slate-800 text-xs uppercase'>Loading Agenda...</div>}>
            {children}
        </Suspense>
    );
}
