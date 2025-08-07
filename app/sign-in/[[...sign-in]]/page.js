import SignInPage from "./SignInPage";

export const metadata = {
  title: "Sign In | Deep Learning Week",
  description: "Sign in to access exclusive content on the website, including a secret game.",
  openGraph: {
    title: "Sign In | Deep Learning Week",
    description:
      "Sign in to access exclusive content on the website, including a secret game.",
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

function SignInLayout() {
  return (
    <SignInPage />
  )
}

export default SignInLayout