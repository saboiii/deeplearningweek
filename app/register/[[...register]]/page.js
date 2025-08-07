import SignUpPage from "./SignUpPage";

export const metadata = {
    title: "Register | Deep Learning Week",
    description: "Register for an account to access exclusive content on the website, including a secret game.",
    openGraph: {
        title: "Register | Deep Learning Week",
        description:
            "Register for an account to access exclusive content on the website, including a secret game.",
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

function SignUpLayout() {
    return (
        <SignUpPage />
    )
}

export default SignUpLayout