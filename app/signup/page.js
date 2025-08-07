import EventPage from "./EventPage";

export const metadata = {
  title: "Sign Up | Deep Learning Week",
  description: "Sign up for the Deep Learning Week event to secure your spot and receive updates.",
  openGraph: {
    title: "Sign Up | Deep Learning Week",
    description:
      "Sign up for the Deep Learning Week event to secure your spot and receive updates.",
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
    <EventPage />
  )
}

export default SignUpLayout