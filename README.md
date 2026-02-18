# DLWEEK | HACKATHON Portal

Official website for **Deep Learning Week, NTU**. A premier, nationwide event open to students from Singapore universities.

---

## Tech Stack

- **Next.js 15**
- **React 19**
- **Tailwind CSS**
- **MongoDB (via Mongoose)**
- **AWS Lambda and S3**
- **Framer Motion**
- **Clerk**
- **TensorFlow.js**
- **Cloudinary**

---

## Features

- **Hackathon Info & Schedule:**  
  The portal provides a comprehensive, dynamically rendered agenda for Deep Learning Week, allowing users to view detailed schedules for each day. Smooth scrolling and anchor navigation are implemented for an intuitive user experience.

- **FAQ Section:**  
  The FAQ module supports both event and recruitment queries, with content that adapts based on the current version of the event. FAQs are rendered as interactive, collapsible accordions, ensuring clarity and accessibility for all users.

- **Recruitment Portal:**  
  A dedicated recruitment section lists all open executive and main committee roles, with detailed descriptions and requirements. The portal integrates application forms, deadlines, and process explanations, and uses Tailwind CSS for a clean, readable layout. All application links are validated and tracked.

- **AI-Powered Game:**  
  The site features an interactive browser game where users compete against a TensorFlow.js-powered AI adversary. The AI model is trained to predict and counter player moves, providing a challenging experience. The game includes a persistent leaderboard, user authentication via Clerk, and real-time score updates. All game logic and AI inference run client-side for performance and security. AWS Lambda enables the backend to process and save player data via a Node script. This data is used for reinforcement learning, allowing the TensorFlow.js model to improve over time based on real user interactions. Player data is stored as CSV files in AWS S3, providing scalable and secure storage for training datasets and analytics. This integration ensures that the AI opponent can be continuously retrained and updated with real gameplay data, enhancing the challenge and adaptability of the game.

- **Sponsors Showcase:**  
  Sponsors and partners are highlighted with animated banners and logos, implemented using Framer Motion for smooth transitions. The showcase is fully responsive and adapts to different screen sizes, ensuring maximum visibility for all sponsors.

- **Authentication:**  
  User authentication and session management are handled by Clerk, providing secure sign-up, login, and protected routes. JWT-based sessions ensure that sensitive pages (such as the game leaderboard and application forms) are only accessible to authenticated users.

- **Responsive Design:**  
  The entire portal is built with a mobile-first approach using Tailwind CSS. All components are tested for accessibility and usability across devices, with adaptive layouts and scalable typography.

- **Email Confirmation:**  
  Upon registration or application submission, users receive automated confirmation emails. The backend integrates with EmailJS or Nodemailer to handle transactional email delivery.

- **Custom Components:**  
  The codebase is organized into modular, reusable React components for layout, navigation, forms, and UI elements. This structure promotes maintainability, scalability, and rapid development of new features.

---

## Authors

- [@saboiii](https://www.github.com/saboiii)
