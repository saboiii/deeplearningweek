import FAQs from "./FAQs"

export const metadata = {
    title: "FAQs | Deep Learning Week",
    description: "Visit our FAQs page to find answers to common questions about the Deep Learning Week event, including registration, schedule, and more.",
    openGraph: {
        title: "FAQs | Deep Learning Week",
        description:
            "Visit our FAQs page to find answers to common questions about the Deep Learning Week event, including registration, schedule, and more.",
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

function FAQsLayout() {
    return (
        <FAQs />
    )
}

export default FAQsLayout