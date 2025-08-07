import Game from "./Game";

export const metadata = {
  title: "Game | Deep Learning Week",
  description: "Play a fun game against AI and see how you rank on the leaderboard!",
  openGraph: {
    title: "Game | Deep Learning Week",
    description:
      "Play a fun game against AI and see how you rank on the leaderboard!",
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

function GameLayout() {
  return (
    <Game />
  )
}

export default GameLayout